import nodemailer from "nodemailer";
import { site } from "@/config/site";
import { formatDateDE } from "@/lib/slots";
import { serviceTitles } from "@/config/services";
import type { Booking } from "@/lib/types";

/**
 * E-MAIL-VERSAND (Platzhalter)
 * ============================
 * // TODO: Echte SMTP-Zugangsdaten hinterlegen.
 * Setze dazu in Vercel (Project Settings → Environment Variables) bzw. in
 * einer lokalen .env.local folgende Variablen:
 *
 *   SMTP_HOST=smtp.example.com
 *   SMTP_PORT=587
 *   SMTP_USER=benutzer
 *   SMTP_PASS=passwort
 *   SMTP_FROM="CleanCare Sokolova <noreply@example.com>"
 *
 * Solange SMTP_HOST nicht gesetzt ist, wird KEINE E-Mail versendet – der
 * Inhalt wird lediglich in die Server-Logs geschrieben. Die Buchung selbst
 * funktioniert davon unabhängig.
 */

const SMTP_HOST = process.env.SMTP_HOST; // TODO: in Vercel setzen
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 587);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM ?? `"${site.name}" <noreply@example.com>`;

function getTransport() {
  if (!SMTP_HOST) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });
}

type Mail = { to: string; subject: string; text: string };

async function send(mail: Mail): Promise<void> {
  const transport = getTransport();
  if (!transport) {
    // TODO: Entfernen, sobald echter SMTP-Zugang konfiguriert ist.
    console.info("[mailer] Kein SMTP konfiguriert – E-Mail wurde nicht versendet:", mail);
    return;
  }
  try {
    await transport.sendMail({ from: SMTP_FROM, ...mail });
  } catch (error) {
    // Ein fehlgeschlagener Mailversand darf die Buchung nie verhindern.
    console.error("[mailer] Versand fehlgeschlagen:", error);
  }
}

function bookingSummary(b: Booking): string {
  return [
    `Leistungen: ${serviceTitles(b.leistungen).join(", ")}`,
    `Objekt: ${b.objekttyp}${b.flaeche ? ` (ca. ${b.flaeche} m²)` : ""}`,
    `Einsatzort: ${b.adresse}`,
    `Termin: ${formatDateDE(b.datum)} um ${b.uhrzeit} Uhr`,
    `Name: ${b.name}`,
    `Telefon: ${b.telefon}`,
    `E-Mail: ${b.email}`,
    b.nachricht ? `Nachricht: ${b.nachricht}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

/** Bestätigung an die Kundin / den Kunden. */
export async function sendCustomerConfirmation(b: Booking): Promise<void> {
  await send({
    to: b.email,
    subject: `Ihre Terminanfrage bei ${site.name}`,
    text: `Guten Tag ${b.name}

Vielen Dank für Ihre Anfrage. Wir haben folgende Angaben erhalten:

${bookingSummary(b)}

Wir melden uns innerhalb von 24 Stunden zur definitiven Terminbestätigung.

Freundliche Grüsse
${site.name}
${site.phone} | ${site.email}`,
  });
}

/** Benachrichtigung an die Firma. */
export async function sendCompanyNotification(b: Booking): Promise<void> {
  await send({
    to: site.email, // TODO: echte Firmen-E-Mail in src/config/site.ts hinterlegen
    subject: `Neue Buchungsanfrage – ${b.name}, ${formatDateDE(b.datum)} ${b.uhrzeit}`,
    text: `Neue Buchungsanfrage über die Webseite:

${bookingSummary(b)}

Buchungs-ID: ${b.id}`,
  });
}

/** Nachricht aus dem Kontaktformular. */
export async function sendContactMessage(input: {
  name: string;
  telefon: string;
  email: string;
  nachricht: string;
}): Promise<void> {
  await send({
    to: site.email,
    subject: `Kontaktanfrage von ${input.name}`,
    text: `Name: ${input.name}
Telefon: ${input.telefon}
E-Mail: ${input.email}

${input.nachricht}`,
  });
}
