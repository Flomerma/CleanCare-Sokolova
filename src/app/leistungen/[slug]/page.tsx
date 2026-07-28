import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CheckIcon, ServiceIcon } from "@/components/Icons";
import { otherServices, serviceById, services } from "@/config/services";
import { serviceImages } from "@/config/images";
import { seo, site, telHref } from "@/config/site";

type Props = { params: Promise<{ slug: string }> };

/** Erzeugt alle sechs Leistungsseiten statisch beim Build. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceById(slug);
  if (!service) return { title: "Leistung nicht gefunden" };

  const title = `${service.title} ${site.region}`;
  return {
    title,
    description: service.metaDescription,
    keywords: [
      `${service.title} ${site.region}`,
      `${service.title} Preise`,
      ...seo.keywords.slice(0, 3),
    ],
    alternates: { canonical: `/leistungen/${service.id}` },
    openGraph: {
      type: "article",
      title: `${title} | ${site.name}`,
      description: service.metaDescription,
      url: `${site.url}/leistungen/${service.id}`,
      images: [{ url: serviceImages[service.id], alt: service.title }],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = serviceById(slug);
  if (!service) notFound();

  const weitere = otherServices(service.id);

  /** Strukturierte Daten: Einzelleistung + FAQ */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        description: service.metaDescription,
        serviceType: service.title,
        areaServed: site.region,
        provider: { "@type": "CleaningService", name: site.name, telephone: site.phone },
        url: `${site.url}/leistungen/${service.id}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faq.map((entry) => ({
          "@type": "Question",
          name: entry.frage,
          acceptedAnswer: { "@type": "Answer", text: entry.antwort },
        })),
      },
    ],
  };

  return (
    <>
      {/* ---------- Kopfbereich ---------- */}
      <section className="border-b border-brand-100 bg-brand-50/50">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <Breadcrumbs
            items={[
              { label: "Start", href: "/" },
              { label: "Leistungen", href: "/leistungen" },
              { label: service.title },
            ]}
          />

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand-700 shadow-sm">
                <ServiceIcon name={service.icon} className="h-7 w-7" />
              </span>
              <h1 className="mt-5 text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
                {service.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted">{service.description}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/buchung?leistung=${service.id}`}
                  className="inline-flex items-center justify-center rounded-xl bg-mint-600 px-7 py-4 text-base font-semibold text-white transition hover:bg-mint-700"
                >
                  {service.title} buchen
                </Link>
                <a
                  href={telHref}
                  className="inline-flex items-center justify-center rounded-xl border border-brand-200 bg-white px-7 py-4 text-base font-semibold text-brand-800 transition hover:bg-white/70"
                >
                  Beratung: {site.phone}
                </a>
              </div>
            </div>

            <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-brand-100">
              {/* TODO: durch echte Fotos ersetzen */}
              <Image
                src={serviceImages[service.id]}
                alt={`${service.title} durch ${site.name}`}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Einleitung ---------- */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="max-w-3xl space-y-4">
          {service.intro.map((absatz) => (
            <p key={absatz.slice(0, 40)} className="text-base leading-relaxed text-muted sm:text-lg">
              {absatz}
            </p>
          ))}
        </div>

        {/* ---------- Leistungsumfang ---------- */}
        <h2 className="mt-14 text-2xl font-bold tracking-tight text-brand-900 sm:text-3xl">
          Was enthalten ist
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {service.umfang.map((block) => (
            <div key={block.titel} className="rounded-2xl border border-brand-100 bg-white p-6">
              <h3 className="text-lg font-semibold text-brand-900">{block.titel}</h3>
              <ul className="mt-4 space-y-2.5">
                {block.punkte.map((punkt) => (
                  <li key={punkt} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-mint-600" />
                    {punkt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* TODO: Leistungsumfang mit dem echten Angebot abgleichen */}
      </section>

      {/* ---------- Ablauf ---------- */}
      <section className="bg-brand-50/60 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-brand-900 sm:text-3xl">
            So läuft es ab
          </h2>
          <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.ablauf.map((schritt, index) => (
              <li key={schritt.titel} className="rounded-2xl bg-white p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-semibold text-brand-900">{schritt.titel}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{schritt.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 rounded-2xl border border-brand-200 bg-white p-6">
            <h3 className="font-semibold text-brand-900">Was kostet das?</h3>
            {/* TODO: echte Preise bzw. Stundenansätze eintragen */}
            <p className="mt-2 text-base leading-relaxed text-muted">{service.preisHinweis}</p>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight text-brand-900 sm:text-3xl">
          Häufige Fragen
        </h2>
        <div className="mt-8 divide-y divide-brand-100 rounded-2xl border border-brand-100 bg-white">
          {service.faq.map((entry) => (
            <details key={entry.frage} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-brand-900">
                {entry.frage}
                <span
                  className="shrink-0 text-brand-400 transition group-open:rotate-45"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-base leading-relaxed text-muted">{entry.antwort}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------- Abschluss-CTA ---------- */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="rounded-3xl bg-brand-800 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {service.title} anfragen
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-brand-100">
            Unverbindlich und in wenigen Minuten. Wir melden uns innerhalb von 24 Stunden mit einer
            Bestätigung.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={`/buchung?leistung=${service.id}`}
              className="inline-flex items-center justify-center rounded-xl bg-mint-500 px-7 py-4 text-base font-semibold text-white transition hover:bg-mint-600"
            >
              Jetzt Termin buchen
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center rounded-xl bg-white/10 px-7 py-4 text-base font-semibold text-white ring-1 ring-white/30 transition hover:bg-white/20"
            >
              Frage stellen
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Weitere Leistungen ---------- */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <h2 className="text-xl font-bold text-brand-900">Weitere Leistungen</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {weitere.map((andere) => (
            <Link
              key={andere.id}
              href={`/leistungen/${andere.id}`}
              className="flex items-center gap-3 rounded-2xl border border-brand-100 bg-white p-4 transition hover:border-brand-300 hover:shadow-sm"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <ServiceIcon name={andere.icon} className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold leading-snug text-brand-900">{andere.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
