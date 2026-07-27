import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { admin } from "@/config/site";

/**
 * Sehr einfacher Passwortschutz für /admin.
 * // TODO: Für den produktiven Betrieb durch echte Authentifizierung ersetzen
 * (z.B. Supabase Auth). Das Passwort gehört in die Umgebungsvariable
 * ADMIN_PASSWORD und nicht in den Code.
 */

const secret = process.env.ADMIN_SESSION_SECRET ?? admin.password;

/** Signierter Session-Wert, damit das Cookie nicht einfach gefälscht werden kann. */
function sign(value: string): string {
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function createSessionToken(): string {
  const issued = String(Date.now());
  return `${issued}.${sign(issued)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const [issued, signature] = token.split(".");
  if (!issued || !signature) return false;

  const expected = sign(issued);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  const age = (Date.now() - Number(issued)) / 1000;
  return Number.isFinite(age) && age >= 0 && age < admin.sessionMaxAge;
}

export function checkPassword(input: unknown): boolean {
  if (typeof input !== "string") return false;
  const a = Buffer.from(input);
  const b = Buffer.from(admin.password);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Prüft in Server-Komponenten und Route-Handlern, ob eine Admin-Session besteht. */
export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(admin.cookieName)?.value);
}
