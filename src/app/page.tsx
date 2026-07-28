import Image from "next/image";
import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import { ClockIcon, PinIcon, ShieldIcon } from "@/components/Icons";
import { services } from "@/config/services";
import { images } from "@/config/images";
import { site } from "@/config/site";

/**
 * Startseite als kompakte Landingpage.
 * Die Details stehen bewusst auf den eigenen Unterseiten
 * (Leistungen, Leistungs-Detailseiten, Über uns, Buchung, Kontakt).
 */

const trustPoints = [
  {
    icon: ShieldIcon,
    title: "Versichert und zuverlässig",
    // TODO: echten Text einfügen (z.B. konkrete Haftpflichtsumme)
    text: "Betriebshaftpflichtversicherung und fest angestelltes Personal – kein Risiko für Sie.",
  },
  {
    icon: PinIcon,
    title: `Zuhause in ${site.region}`,
    text: "Kurze Wege, meist innerhalb weniger Tage bei Ihnen vor Ort.",
  },
  {
    icon: ClockIcon,
    title: "Antwort innert 24 Stunden",
    text: "Auf jede Anfrage melden wir uns spätestens am nächsten Werktag zurück.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative isolate overflow-hidden">
        {/* TODO: durch echte Fotos ersetzen */}
        <Image
          src={images.hero}
          alt="Sauber gereinigter, heller Wohnraum"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-900/90 via-brand-900/70 to-brand-800/40" />

        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white ring-1 ring-white/25">
              <PinIcon className="h-4 w-4" />
              Reinigungsfirma in {site.region}
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {site.name}
            </h1>
            <p className="mt-4 text-xl font-light text-brand-100 sm:text-2xl">{site.slogan}</p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-50/90 sm:text-lg">
              Von der wöchentlichen Unterhaltsreinigung bis zur Endreinigung mit Wohnungsabnahme:
              Wir übernehmen die Reinigung Ihrer Räume – gründlich, pünktlich und diskret.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/buchung"
                className="inline-flex items-center justify-center rounded-xl bg-mint-500 px-7 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-mint-600"
              >
                Jetzt Termin buchen
              </Link>
              <Link
                href="/leistungen"
                className="inline-flex items-center justify-center rounded-xl bg-white/10 px-7 py-4 text-base font-semibold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/20"
              >
                Leistungen ansehen
              </Link>
            </div>

            <p className="mt-6 text-sm text-brand-100/80">
              Unverbindliche Anfrage · Antwort innert 24 Stunden · {site.openingHours}
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Vertrauen (kompakt, direkt unter dem Hero) ---------- */}
      <section className="border-b border-brand-100 bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-3">
          {trustPoints.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint-50 text-mint-700">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-base font-semibold text-brand-900">{title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Leistungsüberblick mit Verweis auf die Unterseiten ---------- */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-mint-700">Leistungen</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
              Alles rund um Ihre Sauberkeit
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Jede Leistung hat eine eigene Seite mit Leistungsumfang, Ablauf und Antworten auf die
              häufigsten Fragen.
            </p>
          </div>
          <Link
            href="/leistungen"
            className="inline-flex items-center gap-1.5 text-base font-semibold text-brand-700 hover:text-brand-900"
          >
            Übersicht
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* ---------- Abschluss: Verweise auf Über uns und Buchung ---------- */}
      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <Link
            href="/ueber-uns"
            className="group relative overflow-hidden rounded-3xl border border-brand-100 bg-white p-8 transition hover:border-brand-300 hover:shadow-md sm:p-10"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-mint-700">Über uns</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-brand-900">
              Ein Familienbetrieb mit Anspruch
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Kleines, festes Team statt anonymer Wechsel: Wer bei Ihnen reinigt, kennt Ihr Objekt.
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-brand-700">
              Wer wir sind
              <span className="transition group-hover:translate-x-0.5" aria-hidden="true">
                →
              </span>
            </span>
          </Link>

          <div className="rounded-3xl bg-brand-800 p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-mint-300">Buchung</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
              In fünf Schritten zum Termin
            </h2>
            <p className="mt-3 text-base leading-relaxed text-brand-100">
              Leistung wählen, Objekt und Wunschtermin angeben, absenden. Bereits vergebene
              Zeitfenster blenden wir automatisch aus.
            </p>
            <Link
              href="/buchung"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-mint-500 px-7 py-4 text-base font-semibold text-white transition hover:bg-mint-600"
            >
              Zum Buchungssystem
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
