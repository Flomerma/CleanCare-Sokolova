/**
 * Platzhalterbilder (lizenzfrei von Unsplash).
 * // TODO: durch echte Fotos ersetzen
 *
 * Empfehlung: Eigene Fotos unter /public/images/ ablegen und die URLs unten
 * durch lokale Pfade ersetzen, z.B. "/images/hero.jpg".
 */

export const images = {
  // TODO: durch echte Fotos ersetzen – Hero-Bild Startseite
  hero: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1920&q=80",

  // TODO: durch echte Fotos ersetzen – Team-/Über-uns-Bild
  about: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80",

  // TODO: durch echte Fotos ersetzen – Bild in der Vertrauens-Sektion
  trust: "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=1200&q=80",

  // TODO: durch echte Fotos ersetzen – Bild auf der Leistungsübersicht
  services: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80",

  // TODO: durch echte Fotos ersetzen – Bild auf der Kontaktseite
  contact: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",

  // TODO: durch ein echtes Open-Graph-Bild ersetzen (1200x630px)
  og: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&h=630&q=80",
};

/**
 * Kopfbild je Leistungs-Detailseite (Schlüssel = Service-ID).
 * // TODO: durch echte Fotos der eigenen Einsätze ersetzen
 */
export const serviceImages: Record<string, string> = {
  unterhaltsreinigung:
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80",
  "umzugs-endreinigung":
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  fensterreinigung:
    "https://images.unsplash.com/photo-1596263576925-d90d3f2d0e29?auto=format&fit=crop&w=1600&q=80",
  bueroreinigung:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
  treppenhausreinigung:
    "https://images.unsplash.com/photo-1523413363574-c30aa1c2a516?auto=format&fit=crop&w=1600&q=80",
  "teppich-polsterreinigung":
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=80",
};
