import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { images } from "@/config/images";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Über uns",
  description: `Lernen Sie ${site.name} kennen: inhabergeführtes Reinigungsunternehmen in ${site.region} mit festem Team und persönlicher Betreuung.`,
  alternates: { canonical: "/ueber-uns" },
};

/* TODO: echten Text einfügen – Firmengeschichte, Gründung, Werdegang */
const werte = [
  {
    title: "Sorgfalt",
    text: "Wir arbeiten nach festen Checklisten, damit nichts vergessen geht – vom Fensterfalz bis zum Backofen.",
  },
  {
    title: "Verlässlichkeit",
    text: "Wir kommen zum vereinbarten Zeitpunkt. Sollte etwas dazwischenkommen, melden wir uns rechtzeitig.",
  },
  {
    title: "Diskretion",
    text: "Unser Personal ist geschult im Umgang mit Privaträumen und vertraulichen Geschäftsumgebungen.",
  },
];

export default function UeberUnsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Start", href: "/" }]}
        eyebrow="Über uns"
        title={`Das Team hinter ${site.name}`}
        lead={`${site.slogan} – dieser Anspruch prägt unsere tägliche Arbeit in ${site.region}.`}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-brand-50">
            {/* TODO: durch echtes Foto ersetzen – Platzhalter für Team-/Inhaberfoto */}
            <Image
              src={images.about}
              alt="Platzhalterfoto – Team von CleanCare Sokolova"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <span className="absolute bottom-3 left-3 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-muted">
              Platzhalterbild – TODO: echtes Foto einfügen
            </span>
          </div>

          <div className="prose-none">
            <h2 className="text-2xl font-bold tracking-tight text-brand-900">Unsere Geschichte</h2>
            {/* TODO: echten Text einfügen */}
            <p className="mt-4 text-base leading-relaxed text-muted">
              PLATZHALTERTEXT: {site.name} wurde im Jahr {site.foundedYear} von PLATZHALTER_INHABER
              gegründet. Was mit einzelnen Privathaushalten begann, ist heute ein eingespieltes Team,
              das Wohnungen, Büros und ganze Liegenschaften in {site.region} betreut.
            </p>
            {/* TODO: echten Text einfügen */}
            <p className="mt-4 text-base leading-relaxed text-muted">
              PLATZHALTERTEXT: Uns war von Anfang an wichtig, dass Reinigung nicht anonym ist. Unsere
              Kundinnen und Kunden kennen die Personen, die bei ihnen putzen – und wir kennen die
              Eigenheiten jedes Objekts. Dieses Vertrauen ist die Grundlage unserer Arbeit.
            </p>
            {/* TODO: echten Text einfügen */}
            <p className="mt-4 text-base leading-relaxed text-muted">
              PLATZHALTERTEXT: Heute umfasst unser Angebot die gesamte Bandbreite der Gebäude- und
              Unterhaltsreinigung. Alle Mitarbeitenden sind angestellt, versichert und sorgfältig
              eingeführt.
            </p>

            <h2 className="mt-10 text-2xl font-bold tracking-tight text-brand-900">Was uns wichtig ist</h2>
            <dl className="mt-4 space-y-5">
              {werte.map((wert) => (
                <div key={wert.title}>
                  <dt className="font-semibold text-brand-900">{wert.title}</dt>
                  <dd className="mt-1 text-base leading-relaxed text-muted">{wert.text}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/buchung"
                className="inline-flex items-center justify-center rounded-xl bg-mint-600 px-7 py-4 text-base font-semibold text-white transition hover:bg-mint-700"
              >
                Jetzt Termin buchen
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-xl border border-brand-200 px-7 py-4 text-base font-semibold text-brand-800 transition hover:bg-brand-50"
              >
                Fragen? Kontakt
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
