/**
 * ZENTRALE KONFIGURATIONSDATEI
 * ============================
 * Alle Firmen- und Kontaktdaten der Webseite werden hier gepflegt.
 * Suche im Projekt nach "TODO:" um alle Platzhalter zu finden.
 */

export const site = {
  // --- Firmenidentität ---
  name: "CleanCare Sokolova",
  slogan: "Sauberkeit, der man vertrauen kann",

  // TODO: Platzhalter durch echte Firmendaten ersetzen
  legalForm: "PLATZHALTER_RECHTSFORM", // z.B. "Einzelunternehmen" oder "GmbH"
  owner: "PLATZHALTER_INHABER", // Name der zeichnungsberechtigten Person
  address: {
    street: "PLATZHALTER_ADRESSE",
    zip: "PLATZHALTER_PLZ",
    city: "PLATZHALTER_ORT",
    country: "Schweiz",
  },
  phone: "PLATZHALTER_TELEFON", // TODO: z.B. "+41 79 000 00 00"
  email: "PLATZHALTER_EMAIL", // TODO: z.B. "info@cleancare-sokolova.ch"
  region: "PLATZHALTER_REGION", // TODO: z.B. "Region Zürich / Winterthur"
  uid: "PLATZHALTER_UID", // TODO: z.B. "CHE-123.456.789"

  // TODO: Öffnungs-/Erreichbarkeitszeiten anpassen
  openingHours: "Mo–Sa, 08:00–18:00 Uhr",

  // TODO: Gründungsjahr für die Vertrauens-Sektion anpassen
  foundedYear: "PLATZHALTER_GRUENDUNGSJAHR",

  // --- Website ---
  // TODO: Nach dem Vercel-Deployment durch die echte Domain ersetzen
  // (bzw. Umgebungsvariable NEXT_PUBLIC_SITE_URL in Vercel setzen)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cleancare-sokolova.vercel.app",

  // --- Google Maps ---
  // TODO: Echte Koordinaten / Adresse eintragen (aktuell: Platzhalter Bern, CH)
  maps: {
    lat: 46.947974,
    lng: 7.447447,
    zoom: 14,
    embedQuery: "Bern, Schweiz", // TODO: durch echte Adresse ersetzen
  },
} as const;

/** Vollständige Adresse als einzeilige Zeichenkette. */
export const fullAddress = `${site.address.street}, ${site.address.zip} ${site.address.city}`;

/** Telefonnummer für tel:-Links (ohne Leerzeichen). */
export const telHref = `tel:${site.phone.replace(/\s+/g, "")}`;

/** E-Mail für mailto:-Links. */
export const mailHref = `mailto:${site.email}`;

// --- SEO ---
export const seo = {
  // TODO: Keywords auf die echte Region abstimmen
  keywords: [
    `Reinigungsfirma ${site.region}`,
    `Reinigungsunternehmen ${site.region}`,
    `Umzugsreinigung ${site.region}`,
    `Endreinigung mit Abnahmegarantie ${site.region}`,
    `Büroreinigung ${site.region}`,
    `Fensterreinigung ${site.region}`,
    `Unterhaltsreinigung ${site.region}`,
    "Putzfirma",
    "Reinigungsservice Schweiz",
  ],
  defaultDescription: `${site.name} – ${site.slogan}. Professionelle Unterhalts-, Umzugs-, Fenster- und Büroreinigung in ${site.region}. Jetzt unverbindlich Termin buchen.`,
};

// --- Buchungssystem ---
export const booking = {
  /** Zeitfenster in 1-Stunden-Blöcken. */
  startHour: 8,
  endHour: 18,
  /** 1 = Montag ... 6 = Samstag (Sonntag = 0 ist geschlossen). */
  openWeekdays: [1, 2, 3, 4, 5, 6],
  /** Wie viele Buchungen pro Zeitfenster möglich sind (Teams). */
  // TODO: An die tatsächliche Anzahl Reinigungsteams anpassen
  capacityPerSlot: 1,
  /** Wie viele Tage im Voraus buchbar. */
  maxDaysAhead: 90,
  /** Vorlaufzeit in Tagen (heute + leadTimeDays ist der früheste Termin). */
  leadTimeDays: 1,
};

// --- Admin-Bereich ---
export const admin = {
  /**
   * TODO: Platzhalter-Passwort ersetzen!
   * In der Produktion die Umgebungsvariable ADMIN_PASSWORD in Vercel setzen
   * (Project Settings → Environment Variables) und dieses Fallback entfernen.
   */
  password: process.env.ADMIN_PASSWORD ?? "PLATZHALTER_PASSWORT",
  cookieName: "cc_admin",
  /** Gültigkeit der Admin-Session in Sekunden (8 Stunden). */
  sessionMaxAge: 60 * 60 * 8,
};
