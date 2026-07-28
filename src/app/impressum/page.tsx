import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { fullAddress, mailHref, site, telHref } from "@/config/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum von ${site.name} gemäss Art. 3 Abs. 1 lit. s UWG.`,
  alternates: { canonical: "/impressum" },
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Start", href: "/" }]} title="Impressum" lead="Angaben gemäss Art. 3 Abs. 1 lit. s UWG (Schweiz)." />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        {/* TODO: Alle Platzhalter in src/config/site.ts durch die echten Firmendaten ersetzen. */}
        <dl className="divide-y divide-brand-50 rounded-2xl border border-brand-100">
          <Entry label="Firmenname" value={site.name} />
          <Entry label="Rechtsform" value={site.legalForm} />
          <Entry label="Vertretungsberechtigte Person" value={site.owner} />
          <Entry label="Adresse" value={`${fullAddress}, ${site.address.country}`} />
          <Entry
            label="Telefon"
            value={
              <a href={telHref} className="text-brand-700 underline">
                {site.phone}
              </a>
            }
          />
          <Entry
            label="E-Mail"
            value={
              <a href={mailHref} className="break-all text-brand-700 underline">
                {site.email}
              </a>
            }
          />
          <Entry label="UID / Handelsregisternummer" value={site.uid} />
          {/* TODO: MWST-Nummer ergänzen, sofern mehrwertsteuerpflichtig */}
          <Entry label="MWST-Nummer" value="PLATZHALTER_MWST_NUMMER" />
        </dl>

        <div className="mt-12 space-y-8 text-base leading-relaxed text-muted">
          <div>
            <h2 className="text-xl font-bold text-brand-900">Haftungsausschluss</h2>
            <p className="mt-3">
              Die Inhalte dieser Webseite werden mit grösstmöglicher Sorgfalt erstellt. {site.name}
              {" "}übernimmt jedoch keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der
              bereitgestellten Informationen. Haftungsansprüche gegen {site.name} wegen Schäden
              materieller oder immaterieller Art, die aus dem Zugriff oder der Nutzung bzw.
              Nichtnutzung der veröffentlichten Informationen entstanden sind, werden ausgeschlossen.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-900">Haftung für Links</h2>
            <p className="mt-3">
              Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres
              Verantwortungsbereichs. Für deren Inhalte wird jegliche Verantwortung abgelehnt. Der
              Zugriff und die Nutzung solcher Webseiten erfolgen auf eigene Gefahr.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-900">Urheberrechte</h2>
            <p className="mt-3">
              Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder sonstigen Dateien
              auf dieser Webseite gehören ausschliesslich {site.name} oder den speziell genannten
              Rechteinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung
              der Urheberrechtsträger im Voraus einzuholen.
            </p>
            {/* TODO: Bildnachweise ergänzen, sobald echte Fotos eingesetzt werden.
                Aktuell werden lizenzfreie Platzhalterbilder von Unsplash verwendet. */}
            <p className="mt-3 text-sm">
              Bildnachweis: Aktuell werden lizenzfreie Platzhalterbilder (Unsplash) verwendet.
              TODO: durch echte Fotos und die entsprechenden Nachweise ersetzen.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-900">Streitbeilegung</h2>
            <p className="mt-3">
              Bei Beanstandungen wenden Sie sich bitte direkt an uns – wir sind bestrebt, jede
              Reklamation rasch und unkompliziert zu lösen.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function Entry({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid gap-1 p-5 sm:grid-cols-[220px_1fr] sm:gap-4">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="font-medium text-brand-900">{value}</dd>
    </div>
  );
}
