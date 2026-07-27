# CleanCare Sokolova – Firmenwebseite mit Buchungssystem

Vollständige Firmenwebseite für das Reinigungsunternehmen **CleanCare Sokolova**
(«Sauberkeit, der man vertrauen kann») inklusive mehrstufigem Buchungssystem und
einfachem Admin-Bereich.

Technik: [Next.js 15](https://nextjs.org) (App Router) · TypeScript · Tailwind CSS v4 ·
bereit für das Hosting auf [Vercel](https://vercel.com).

---

## Schnellstart (lokal)

```bash
npm install
cp .env.example .env.local   # Werte nach Bedarf anpassen
npm run dev                  # http://localhost:3000
```

Produktions-Build testen:

```bash
npm run build && npm start
```

---

## Seitenstruktur

| Route           | Inhalt                                                        |
| --------------- | ------------------------------------------------------------- |
| `/`             | Startseite: Hero, Leistungen, Vertrauens-Sektion, Über-uns-Teaser, Buchungs-CTA |
| `/leistungen`   | Alle sechs Leistungen als Karten, jeweils mit Link ins Buchungssystem |
| `/ueber-uns`    | Firmengeschichte (Platzhaltertext) und Platzhalterfoto        |
| `/buchung`      | Mehrstufiges Buchungsformular (5 Schritte)                    |
| `/kontakt`      | Kontaktformular, tel:/mailto:-Links, Google-Maps-Karte        |
| `/impressum`    | Pflichtangaben gemäss Art. 3 Abs. 1 lit. s UWG                |
| `/datenschutz`  | Datenschutzerklärung gemäss revDSG                            |
| `/admin`        | Passwortgeschützte Buchungsverwaltung                         |

Zusätzlich: `/sitemap.xml`, `/robots.txt`, strukturierte Daten (`CleaningService`) für lokales SEO.

---

## Was jetzt noch ersetzt werden muss

Alle Platzhalter sind im Code mit `TODO:` markiert. So findest du sie alle:

```bash
grep -rn "TODO:" src/ supabase/ .env.example
grep -rn "PLATZHALTER" src/
```

### 1. Firmendaten → `src/config/site.ts`

Zentrale Datei für **alle** Firmenangaben. Ersetze dort:

| Feld              | Bedeutung                                          |
| ----------------- | -------------------------------------------------- |
| `legalForm`       | Rechtsform, z.B. «Einzelunternehmen» oder «GmbH»   |
| `owner`           | Name der zeichnungsberechtigten Person             |
| `address.*`       | Strasse, PLZ, Ort                                  |
| `phone`           | Telefonnummer, z.B. `+41 79 000 00 00`             |
| `email`           | E-Mail-Adresse                                     |
| `region`          | Einzugsgebiet, z.B. «Region Zürich / Winterthur»   |
| `uid`             | UID/Handelsregisternummer, z.B. `CHE-123.456.789`  |
| `foundedYear`     | Gründungsjahr                                      |
| `openingHours`    | Erreichbarkeitszeiten                              |
| `maps`            | Koordinaten und Suchbegriff für die Google-Maps-Karte |
| `url`             | Endgültige Domain (oder `NEXT_PUBLIC_SITE_URL` in Vercel setzen) |

Die Werte wirken sich automatisch auf Header, Footer, Impressum, Datenschutz,
Kontaktseite, Meta-Tags und die strukturierten Daten aus.

### 2. Fotos → `src/config/images.ts`

Aktuell sind lizenzfreie Platzhalterbilder von Unsplash hinterlegt (jeweils mit
`// TODO: durch echte Fotos ersetzen` markiert). Vorgehen:

1. Eigene Bilder unter `public/images/` ablegen (z.B. `public/images/hero.jpg`).
2. In `src/config/images.ts` die URL durch den lokalen Pfad ersetzen: `"/images/hero.jpg"`.
3. Sobald keine externen Bilder mehr genutzt werden, können die `remotePatterns`
   in `next.config.ts` entfernt werden.
4. Bildnachweise im Impressum ergänzen bzw. den Platzhalterhinweis entfernen.

Empfohlene Formate: Hero ca. 1920×1080 px, Inhaltsbilder ca. 1200×900 px,
Open-Graph-Bild 1200×630 px.

### 3. Texte

* `src/app/ueber-uns/page.tsx` – Firmengeschichte (`PLATZHALTERTEXT`, mehrfach markiert)
* `src/config/services.ts` – Leistungsbeschreibungen und Stichpunkte
* `src/app/page.tsx` – Vertrauens-Sektion und Kennzahlen
* `src/app/datenschutz/page.tsx` – Aufbewahrungsfristen, Dienstleister, Stand-Datum
* `src/app/impressum/page.tsx` – MWST-Nummer

> Impressum und Datenschutzerklärung sind Vorlagen. Vor der Veröffentlichung
> juristisch prüfen lassen.

### 4. SMTP-Zugang (Bestätigungs-E-Mails) → Umgebungsvariablen

Der Versand läuft über Nodemailer (`src/lib/mailer.ts`). **Ohne gesetzte
`SMTP_HOST`-Variable wird keine E-Mail versendet** – der Inhalt landet nur in den
Server-Logs. Buchungen funktionieren davon unabhängig.

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=benutzer
SMTP_PASS=passwort
SMTP_FROM="CleanCare Sokolova <noreply@example.com>"
```

Versendet werden zwei Mails: eine Bestätigung an die Kundschaft und eine
Benachrichtigung an die Firmenadresse aus `site.email`.

### 5. Admin-Passwort

Standard-Platzhalter ist `PLATZHALTER_PASSWORT`. **Vor dem Livegang unbedingt
ändern**: Umgebungsvariable `ADMIN_PASSWORD` in Vercel setzen (überschreibt den
Wert aus der Config). Zusätzlich `ADMIN_SESSION_SECRET` auf einen zufälligen Wert
setzen:

```bash
openssl rand -hex 32
```

---

## Buchungssystem

Fünf Schritte: Leistung → Objektdetails → Termin → Kontaktdaten → Zusammenfassung.

* Zeitfenster: 1-Stunden-Blöcke von 08:00 bis 18:00 Uhr, Montag bis Samstag
* Bereits vergebene Slots werden serverseitig ermittelt und im Formular gesperrt
* Doppelbuchungen werden beim Absenden nochmals geprüft (HTTP 409) – die Person
  wird automatisch zur Terminwahl zurückgeführt
* Pflichtfelder werden im Client und auf dem Server validiert
* Ladezustände (Skeletons, Spinner) und Fehlermeldungen sind abgedeckt

Einstellungen dazu in `src/config/site.ts` unter `booking`:
Öffnungstage, Zeitfenster, Vorlaufzeit, Buchungshorizont und `capacityPerSlot`
(Anzahl parallel möglicher Termine pro Zeitfenster).

### API-Endpunkte

| Methode | Route                   | Zweck                                  |
| ------- | ----------------------- | -------------------------------------- |
| `GET`   | `/api/slots?datum=…`    | Zeitfenster eines Tages inkl. Verfügbarkeit |
| `POST`  | `/api/bookings`         | Buchungsanfrage speichern              |
| `POST`  | `/api/contact`          | Kontaktformular                        |
| `POST`  | `/api/admin/login`      | Admin-Anmeldung (`DELETE` = Abmelden)  |
| `GET`   | `/api/admin/bookings`   | Alle Buchungen (nur angemeldet)        |
| `PATCH` | `/api/admin/bookings`   | Status ändern (nur angemeldet)         |

---

## Datenspeicherung (Übergangslösung → Supabase)

Aktuell werden Buchungen über `src/lib/db.ts` gespeichert:

* **Lokal:** als JSON-Datei unter `data/bookings.json` (nicht im Git)
* **Auf Vercel:** im Arbeitsspeicher, da das Dateisystem dort flüchtig ist –
  Buchungen gehen beim Neustart der Serverless-Funktion verloren. Zum Ausprobieren
  reicht das; für den produktiven Betrieb Supabase anbinden.

### Umstellung auf Supabase

1. Projekt auf [supabase.com](https://supabase.com) erstellen.
2. `supabase/schema.sql` im SQL-Editor ausführen (Tabelle `buchungen`).
3. `npm install @supabase/supabase-js`
4. In Vercel setzen: `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.
5. In `src/lib/db.ts` die vier Funktionen `listBookings`, `getBookedSlots`,
   `createBooking` und `updateBookingStatus` auf Supabase umstellen – passende
   Code-Beispiele stehen als Kommentar direkt in der Datei. Der restliche Code
   greift ausschliesslich über diese Funktionen auf die Daten zu und muss nicht
   angepasst werden.

> Der Service-Role-Key darf nur serverseitig verwendet werden (Route Handler),
> niemals im Client-Code.

---

## Deployment auf Vercel

1. Repository auf GitHub pushen.
2. Auf [vercel.com](https://vercel.com) → **Add New → Project** → Repository importieren.
   Next.js wird automatisch erkannt, es sind keine Build-Einstellungen nötig.
3. Unter **Settings → Environment Variables** eintragen:
   `NEXT_PUBLIC_SITE_URL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` und – sobald
   vorhanden – die SMTP- bzw. Supabase-Variablen.
4. **Deploy** klicken.
5. Eigene Domain unter **Settings → Domains** verbinden und anschliessend
   `NEXT_PUBLIC_SITE_URL` auf diese Domain setzen (wichtig für Sitemap und
   Meta-Tags).

---

## Projektstruktur

```
src/
├── app/
│   ├── page.tsx              Startseite
│   ├── layout.tsx            Grundgerüst, Meta-Tags, strukturierte Daten
│   ├── leistungen/           Leistungsübersicht
│   ├── ueber-uns/            Über uns
│   ├── buchung/              Buchungssystem
│   ├── kontakt/              Kontakt inkl. Karte
│   ├── impressum/            Impressum (UWG)
│   ├── datenschutz/          Datenschutzerklärung (revDSG)
│   ├── admin/                Geschützte Buchungsverwaltung
│   ├── api/                  Route Handler
│   ├── sitemap.ts            /sitemap.xml
│   └── robots.ts             /robots.txt
├── components/               Header, Footer, Formulare, Kalender, Icons
├── config/
│   ├── site.ts               ← alle Firmendaten und Einstellungen
│   ├── services.ts           ← Leistungskatalog
│   └── images.ts             ← Bild-URLs
└── lib/                      Datenspeicher, Validierung, Auth, Mailer
supabase/schema.sql           Tabellen-Schema für die spätere Umstellung
```

---

## Design

Ruhige Palette aus Blau- (`brand`) und Grüntönen (`mint`) mit viel Weissraum,
definiert in `src/app/globals.css`. Buttons sind mit mindestens 44 px Höhe
durchgehend gut antippbar, die Seite ist vollständig responsiv und für
Tastaturbedienung ausgelegt (Skip-Link, sichtbare Fokusrahmen, ARIA-Attribute).
