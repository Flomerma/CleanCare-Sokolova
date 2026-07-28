import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { fullAddress, mailHref, site, telHref } from "@/config/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: `Datenschutzerklärung von ${site.name} gemäss revidiertem Schweizer Datenschutzgesetz (revDSG).`,
  alternates: { canonical: "/datenschutz" },
};

/**
 * Standard-Template gemäss revDSG.
 * TODO: Vor der Veröffentlichung juristisch prüfen lassen und an die
 * tatsächlichen Verarbeitungen anpassen (z.B. eingesetzte Dienstleister).
 */
export default function DatenschutzPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Start", href: "/" }]}
        title="Datenschutzerklärung"
        lead="Gemäss revidiertem Schweizer Datenschutzgesetz (revDSG), in Kraft seit 1. September 2023."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="space-y-10 text-base leading-relaxed text-muted">
          <Section title="1. Verantwortliche Stelle">
            <p>
              Verantwortlich für die Bearbeitung von Personendaten im Sinne des revDSG ist:
            </p>
            {/* TODO: Platzhalterdaten in src/config/site.ts ersetzen */}
            <p className="mt-3">
              {site.name}
              <br />
              {fullAddress}, {site.address.country}
              <br />
              Telefon:{" "}
              <a href={telHref} className="text-brand-700 underline">
                {site.phone}
              </a>
              <br />
              E-Mail:{" "}
              <a href={mailHref} className="break-all text-brand-700 underline">
                {site.email}
              </a>
            </p>
          </Section>

          <Section title="2. Grundsätze">
            <p>
              Wir bearbeiten Personendaten nach Treu und Glauben, verhältnismässig, zweckgebunden und
              nur so lange, wie es für den jeweiligen Zweck erforderlich ist. Wir treffen angemessene
              technische und organisatorische Massnahmen zum Schutz Ihrer Daten vor unbefugtem Zugriff.
            </p>
          </Section>

          <Section title="3. Daten aus dem Kontaktformular">
            <p>Wenn Sie uns über das Kontaktformular schreiben, bearbeiten wir folgende Daten:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Name</li>
              <li>Telefonnummer</li>
              <li>E-Mail-Adresse</li>
              <li>Inhalt Ihrer Nachricht</li>
            </ul>
            <p className="mt-3">
              <strong className="text-brand-900">Zweck:</strong> Bearbeitung und Beantwortung Ihrer
              Anfrage.
              <br />
              <strong className="text-brand-900">Grundlage:</strong> Ihre Einwilligung bzw. die
              Anbahnung eines Vertragsverhältnisses.
              <br />
              <strong className="text-brand-900">Aufbewahrung:</strong> Wir löschen Anfragen, sobald
              sie abschliessend bearbeitet sind und keine gesetzlichen Aufbewahrungspflichten
              entgegenstehen.
              {/* TODO: konkrete Aufbewahrungsfrist festlegen, z.B. 12 Monate */}
            </p>
          </Section>

          <Section title="4. Daten aus dem Buchungssystem">
            <p>Bei einer Terminanfrage über unser Buchungssystem bearbeiten wir folgende Daten:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>gewählte Reinigungsleistungen</li>
              <li>Art des Objekts (Wohnung / Haus / Büro) und optional die Fläche in m²</li>
              <li>Adresse des Einsatzorts</li>
              <li>gewünschtes Datum und Zeitfenster</li>
              <li>Name, Telefonnummer und E-Mail-Adresse</li>
              <li>optionale Nachricht bzw. Zusatzwünsche</li>
              <li>Status der Buchung und Zeitpunkt der Erfassung</li>
            </ul>
            <p className="mt-3">
              <strong className="text-brand-900">Zweck:</strong> Prüfung der Verfügbarkeit,
              Terminbestätigung, Planung und Durchführung der Reinigung sowie Rechnungsstellung.
              <br />
              <strong className="text-brand-900">Grundlage:</strong> Vertragserfüllung bzw.
              vorvertragliche Massnahmen auf Ihre Anfrage hin.
              <br />
              <strong className="text-brand-900">Aufbewahrung:</strong> Buchungsdaten werden für die
              Dauer der Geschäftsbeziehung sowie im Rahmen der gesetzlichen Aufbewahrungspflichten
              (in der Regel 10 Jahre für Geschäftsunterlagen, Art. 958f OR) aufbewahrt.
            </p>
            <p className="mt-3">
              Die Angabe der genannten Daten ist für die Terminvereinbarung erforderlich. Ohne diese
              Angaben können wir Ihre Buchung nicht bearbeiten.
            </p>
          </Section>

          <Section title="5. E-Mail-Bestätigungen">
            <p>
              Nach einer Buchungsanfrage senden wir eine Bestätigung an die von Ihnen angegebene
              E-Mail-Adresse und benachrichtigen unser internes Postfach. Dabei werden Ihre
              Buchungsdaten über unseren E-Mail-Dienstleister übermittelt.
              {/* TODO: Eingesetzten E-Mail-/SMTP-Dienstleister namentlich nennen. */}
            </p>
          </Section>

          <Section title="6. Server-Logdateien und Hosting">
            <p>
              Diese Webseite wird bei Vercel Inc. gehostet. Beim Aufruf der Seite werden technisch
              notwendige Daten verarbeitet (IP-Adresse, Datum und Uhrzeit, aufgerufene Seite,
              Browsertyp und Betriebssystem). Diese Daten dienen dem sicheren und stabilen Betrieb der
              Webseite und werden nicht mit anderen Datenquellen zusammengeführt. Die Bearbeitung
              erfolgt gestützt auf unser überwiegendes berechtigtes Interesse an einem sicheren
              Betrieb.
              {/* TODO: Falls die Datenbank auf Supabase umgestellt wird, den Anbieter hier ergänzen
                  (Supabase Inc., Speicherort der Datenbank angeben). */}
            </p>
          </Section>

          <Section title="7. Cookies">
            <p>
              Diese Webseite verwendet keine Tracking- oder Marketing-Cookies. Für den geschützten
              Administrationsbereich wird ein technisch notwendiges Sitzungs-Cookie gesetzt, das keine
              Analysezwecke verfolgt.
              {/* TODO: Anpassen, falls später Analyse-Tools (z.B. Google Analytics) eingesetzt werden. */}
            </p>
          </Section>

          <Section title="8. Google Maps">
            <p>
              Auf der Kontaktseite binden wir eine Karte von Google Maps ein (Google Ireland Limited,
              Gordon House, Barrow Street, Dublin 4, Irland). Beim Laden der Karte wird Ihre
              IP-Adresse an Google übermittelt und es können Cookies gesetzt werden. Der Zweck ist die
              einfache Auffindbarkeit unseres Standorts. Weitere Informationen finden Sie in der
              Datenschutzerklärung von Google.
            </p>
          </Section>

          <Section title="9. Bekanntgabe an Dritte">
            <p>
              Wir geben Ihre Daten nur weiter, soweit dies zur Leistungserbringung notwendig ist (z.B.
              an eingesetzte Auftragsbearbeiter für Hosting und E-Mail-Versand) oder wir gesetzlich
              dazu verpflichtet sind. Eine Bekanntgabe ins Ausland erfolgt nur an Empfänger in Ländern
              mit angemessenem Datenschutzniveau oder mit geeigneten Garantien (z.B.
              Standardvertragsklauseln).
            </p>
          </Section>

          <Section title="10. Ihre Rechte">
            <p>Sie haben im Rahmen des revDSG insbesondere folgende Rechte:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Auskunft über die von uns bearbeiteten Personendaten</li>
              <li>Berichtigung unrichtiger Daten</li>
              <li>Löschung bzw. Vernichtung von Daten</li>
              <li>Herausgabe oder Übertragung Ihrer Daten (Datenportabilität)</li>
              <li>Widerruf einer erteilten Einwilligung</li>
              <li>Widerspruch gegen bestimmte Bearbeitungen</li>
            </ul>
            <p className="mt-3">
              Zur Ausübung dieser Rechte genügt eine Mitteilung an{" "}
              <a href={mailHref} className="break-all text-brand-700 underline">
                {site.email}
              </a>
              . Zur Identifikation können wir einen geeigneten Nachweis verlangen. Zudem haben Sie das
              Recht, sich beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) zu
              beschweren.
            </p>
          </Section>

          <Section title="11. Datensicherheit">
            <p>
              Die Übertragung der Daten auf dieser Webseite erfolgt verschlüsselt über HTTPS. Der
              Zugriff auf Buchungsdaten ist auf berechtigte Personen beschränkt und passwortgeschützt.
            </p>
          </Section>

          <Section title="12. Änderungen">
            <p>
              Wir können diese Datenschutzerklärung jederzeit anpassen. Massgebend ist die jeweils auf
              dieser Webseite publizierte Fassung.
            </p>
            {/* TODO: Datum bei jeder Anpassung aktualisieren */}
            <p className="mt-3 text-sm">Stand: PLATZHALTER_DATUM</p>
          </Section>
        </div>
      </section>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-brand-900">{title}</h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}
