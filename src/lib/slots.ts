import { booking as bookingConfig } from "@/config/site";

/** Alle Zeitfenster eines Tages als "HH:MM"-Strings (1-Stunden-Blöcke). */
export function allSlots(): string[] {
  const slots: string[] = [];
  for (let hour = bookingConfig.startHour; hour < bookingConfig.endHour; hour++) {
    slots.push(`${String(hour).padStart(2, "0")}:00`);
  }
  return slots;
}

/** Datum als YYYY-MM-DD (lokale Zeit, ohne Zeitzonen-Verschiebung). */
export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** YYYY-MM-DD zu einem lokalen Date-Objekt (12:00 Uhr, um DST-Effekte zu vermeiden). */
export function fromISODate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d, 12, 0, 0, 0);
}

/** Ist an diesem Datum überhaupt Betrieb (Mo–Sa) und liegt es im buchbaren Fenster? */
export function isBookableDate(iso: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
  const date = fromISODate(iso);
  if (Number.isNaN(date.getTime())) return false;
  if (!bookingConfig.openWeekdays.includes(date.getDay())) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const earliest = new Date(today);
  earliest.setDate(earliest.getDate() + bookingConfig.leadTimeDays);

  const latest = new Date(today);
  latest.setDate(latest.getDate() + bookingConfig.maxDaysAhead);

  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  return target >= earliest && target <= latest;
}

export function isValidSlot(time: string): boolean {
  return allSlots().includes(time);
}

/** Deutsche Datumsformatierung, z.B. "Montag, 14. Juli 2025". */
export function formatDateDE(iso: string): string {
  try {
    return fromISODate(iso).toLocaleDateString("de-CH", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}
