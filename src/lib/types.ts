export type BookingStatus = "offen" | "bestätigt" | "abgeschlossen" | "storniert";

export const BOOKING_STATUSES: BookingStatus[] = [
  "offen",
  "bestätigt",
  "abgeschlossen",
  "storniert",
];

/**
 * Datensatz einer Buchung.
 * Entspricht 1:1 der geplanten Supabase-Tabelle `buchungen`
 * (siehe supabase/schema.sql).
 */
export type Booking = {
  id: string;
  leistungen: string[];
  objekttyp: "Wohnung" | "Haus" | "Büro";
  flaeche: number | null;
  adresse: string;
  datum: string; // YYYY-MM-DD
  uhrzeit: string; // HH:MM
  name: string;
  telefon: string;
  email: string;
  nachricht: string | null;
  status: BookingStatus;
  erstellt_am: string; // ISO-Zeitstempel
};

export type NewBooking = Omit<Booking, "id" | "status" | "erstellt_am">;
