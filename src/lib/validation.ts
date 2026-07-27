import { services } from "@/config/services";
import { isBookableDate, isValidSlot } from "@/lib/slots";
import type { NewBooking } from "@/lib/types";

export type ValidationResult =
  | { ok: true; data: NewBooking }
  | { ok: false; errors: Record<string, string> };

const OBJEKTTYPEN = ["Wohnung", "Haus", "Büro"] as const;

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
/** Schweizer und internationale Formate, mind. 9 Ziffern. */
const isPhone = (value: string) => /^[+\d][\d\s/().-]{8,}$/.test(value);

const str = (value: unknown): string => (typeof value === "string" ? value.trim() : "");

/** Serverseitige Validierung einer Buchungsanfrage. */
export function validateBooking(payload: unknown): ValidationResult {
  const errors: Record<string, string> = {};
  const body = (payload ?? {}) as Record<string, unknown>;

  const validIds = services.map((s) => s.id);
  const leistungen = Array.isArray(body.leistungen)
    ? (body.leistungen as unknown[]).map(str).filter((id) => validIds.includes(id as never))
    : [];
  if (leistungen.length === 0) errors.leistungen = "Bitte wählen Sie mindestens eine Leistung.";

  const objekttyp = str(body.objekttyp);
  if (!OBJEKTTYPEN.includes(objekttyp as (typeof OBJEKTTYPEN)[number])) {
    errors.objekttyp = "Bitte wählen Sie die Art des Objekts.";
  }

  // Die Fläche darf als Zahl oder als String ankommen – beides wird akzeptiert.
  let flaeche: number | null = null;
  const flaecheRaw = typeof body.flaeche === "number" ? String(body.flaeche) : str(body.flaeche);
  if (flaecheRaw !== "") {
    const parsed = Number(flaecheRaw);
    if (!Number.isFinite(parsed) || parsed <= 0 || parsed > 100000) {
      errors.flaeche = "Bitte geben Sie eine gültige Fläche in m² an.";
    } else {
      flaeche = Math.round(parsed);
    }
  }

  const adresse = str(body.adresse);
  if (adresse.length < 5) errors.adresse = "Bitte geben Sie die Adresse des Einsatzorts an.";

  const datum = str(body.datum);
  if (!datum) errors.datum = "Bitte wählen Sie ein Datum.";
  else if (!isBookableDate(datum)) errors.datum = "Dieses Datum ist nicht buchbar (Mo–Sa, ab morgen).";

  const uhrzeit = str(body.uhrzeit);
  if (!uhrzeit) errors.uhrzeit = "Bitte wählen Sie ein Zeitfenster.";
  else if (!isValidSlot(uhrzeit)) errors.uhrzeit = "Ungültiges Zeitfenster (08:00–18:00 Uhr).";

  const name = str(body.name);
  if (name.length < 2) errors.name = "Bitte geben Sie Ihren Namen an.";

  const telefon = str(body.telefon);
  if (!isPhone(telefon)) errors.telefon = "Bitte geben Sie eine gültige Telefonnummer an.";

  const email = str(body.email);
  if (!isEmail(email)) errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";

  const nachricht = str(body.nachricht);
  if (nachricht.length > 2000) errors.nachricht = "Die Nachricht ist zu lang (max. 2000 Zeichen).";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      leistungen,
      objekttyp: objekttyp as NewBooking["objekttyp"],
      flaeche,
      adresse,
      datum,
      uhrzeit,
      name,
      telefon,
      email,
      nachricht: nachricht || null,
    },
  };
}

export function validateContact(payload: unknown):
  | { ok: true; data: { name: string; telefon: string; email: string; nachricht: string } }
  | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  const body = (payload ?? {}) as Record<string, unknown>;

  const name = str(body.name);
  if (name.length < 2) errors.name = "Bitte geben Sie Ihren Namen an.";

  const telefon = str(body.telefon);
  if (!isPhone(telefon)) errors.telefon = "Bitte geben Sie eine gültige Telefonnummer an.";

  const email = str(body.email);
  if (!isEmail(email)) errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";

  const nachricht = str(body.nachricht);
  if (nachricht.length < 5) errors.nachricht = "Bitte schreiben Sie uns kurz Ihr Anliegen.";
  else if (nachricht.length > 2000) errors.nachricht = "Die Nachricht ist zu lang (max. 2000 Zeichen).";

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data: { name, telefon, email, nachricht } };
}
