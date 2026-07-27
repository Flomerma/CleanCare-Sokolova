import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { Booking, BookingStatus, NewBooking } from "@/lib/types";

/**
 * EINFACHER DATENSPEICHER (Übergangslösung)
 * =========================================
 * Lokal:  Buchungen werden in /data/bookings.json gespeichert.
 * Vercel: Das Dateisystem ist read-only bzw. flüchtig – dort wird automatisch
 *         ein In-Memory-Speicher verwendet. Buchungen überleben dann einen
 *         Neustart der Serverless-Funktion NICHT. Für den Testbetrieb reicht
 *         das; für den produktiven Einsatz Supabase anbinden.
 *
 * // TODO: Auf Supabase umstellen.
 * Alle Datenzugriffe laufen ausschliesslich über die vier Funktionen unten
 * (listBookings, createBooking, updateBookingStatus, getBookedSlots).
 * Für Supabase genügt es, diese vier Funktionen zu ersetzen:
 *
 *   import { createClient } from "@supabase/supabase-js";
 *   const supabase = createClient(
 *     process.env.NEXT_PUBLIC_SUPABASE_URL!,
 *     process.env.SUPABASE_SERVICE_ROLE_KEY!   // nur serverseitig verwenden!
 *   );
 *   export async function listBookings() {
 *     const { data, error } = await supabase
 *       .from("buchungen").select("*")
 *       .order("datum", { ascending: true }).order("uhrzeit", { ascending: true });
 *     if (error) throw error;
 *     return data as Booking[];
 *   }
 *
 * Das passende Tabellen-Schema liegt in supabase/schema.sql.
 */

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "bookings.json");

/** Auf Vercel (serverless) ist nur /tmp beschreibbar → In-Memory-Fallback. */
const useMemory = Boolean(process.env.VERCEL);

// Über globalThis, damit der Speicher den Hot-Reload in der Entwicklung überlebt.
const globalStore = globalThis as unknown as { __bookings?: Booking[] };
globalStore.__bookings ??= [];

async function readAll(): Promise<Booking[]> {
  if (useMemory) return globalStore.__bookings!;
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(raw) as Booking[];
  } catch {
    return [];
  }
}

async function writeAll(bookings: Booking[]): Promise<void> {
  if (useMemory) {
    globalStore.__bookings = bookings;
    return;
  }
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(bookings, null, 2), "utf8");
}

/** Alle Buchungen, sortiert nach Termin (Datum + Uhrzeit) aufsteigend. */
export async function listBookings(): Promise<Booking[]> {
  const bookings = await readAll();
  return [...bookings].sort((a, b) =>
    `${a.datum} ${a.uhrzeit}`.localeCompare(`${b.datum} ${b.uhrzeit}`),
  );
}

/** Belegte Zeitfenster eines Tages (stornierte Buchungen zählen nicht). */
export async function getBookedSlots(datum: string): Promise<string[]> {
  const bookings = await readAll();
  return bookings
    .filter((b) => b.datum === datum && b.status !== "storniert")
    .map((b) => b.uhrzeit);
}

/** Prüft, ob ein Zeitfenster noch freie Kapazität hat. */
export async function isSlotAvailable(
  datum: string,
  uhrzeit: string,
  capacity: number,
): Promise<boolean> {
  const booked = await getBookedSlots(datum);
  return booked.filter((slot) => slot === uhrzeit).length < capacity;
}

export async function createBooking(input: NewBooking): Promise<Booking> {
  const bookings = await readAll();
  const booking: Booking = {
    ...input,
    id: randomUUID(),
    status: "offen",
    erstellt_am: new Date().toISOString(),
  };
  bookings.push(booking);
  await writeAll(bookings);
  return booking;
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus,
): Promise<Booking | null> {
  const bookings = await readAll();
  const index = bookings.findIndex((b) => b.id === id);
  if (index === -1) return null;
  bookings[index] = { ...bookings[index], status };
  await writeAll(bookings);
  return bookings[index];
}

/** Hinweis für den Admin-Bereich, ob die Daten flüchtig sind. */
export const storageIsEphemeral = useMemory;
