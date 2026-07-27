import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/config/services";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Leistungen – Reinigungsfirma ${site.region}`,
  description: `Unterhaltsreinigung, Umzugs- und Endreinigung, Fensterreinigung, Büroreinigung, Treppenhausreinigung sowie Teppich- und Polsterreinigung in ${site.region}.`,
  alternates: { canonical: "/leistungen" },
};

export default function LeistungenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Leistungen"
        title="Unsere Reinigungsleistungen"
        lead={`Für Privathaushalte, Büros und Liegenschaften in ${site.region}. Wählen Sie eine Leistung – die Auswahl wird im Buchungsformular automatisch übernommen.`}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} detailed />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="rounded-3xl bg-brand-50 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight text-brand-900 sm:text-3xl">
            Ihre Leistung ist nicht dabei?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted">
            {/* TODO: echten Text einfügen – z.B. Spezialreinigungen, Baureinigung, Gartenunterhalt */}
            Schreiben Sie uns Ihr Anliegen – wir prüfen gerne, ob wir Ihnen weiterhelfen können.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/buchung"
              className="inline-flex items-center justify-center rounded-xl bg-mint-600 px-7 py-4 text-base font-semibold text-white transition hover:bg-mint-700"
            >
              Jetzt Termin buchen
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center rounded-xl border border-brand-200 bg-white px-7 py-4 text-base font-semibold text-brand-800 transition hover:bg-white/70"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
