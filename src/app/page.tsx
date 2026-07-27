import Image from "next/image";
import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import { ClockIcon, LeafIcon, PinIcon, ShieldIcon, UsersIcon } from "@/components/Icons";
import { services } from "@/config/services";
import { images } from "@/config/images";
import { site } from "@/config/site";

const trustPoints = [
  {
    icon: ShieldIcon,
    title: "Versichert und zuverlässig",
    // TODO: echten Text einfügen (z.B. konkrete Haftpflichtsumme)
    text: "Wir arbeiten mit Betriebshaftpflichtversicherung und fest angestelltem Personal – kein Risiko für Sie.",
  },
  {
    icon: PinIcon,
    title: `Zuhause in ${site.region}`,
    text: `Wir sind in ${site.region} unterwegs und meist innerhalb weniger Tage bei Ihnen vor Ort.`,
  },
  {
    icon: ClockIcon,
    title: "Termintreu",
    text: "Vereinbarte Termine halten wir ein. Sie erhalten innerhalb von 24 Stunden eine Rückmeldung auf Ihre Anfrage.",
  },
  {
    icon: UsersIcon,
    title: "Immer dasselbe Team",
    text: "Bei wiederkehrenden Aufträgen kommt stets das gleiche, eingespielte Team – das schafft Vertrauen.",
  },
  {
    icon: LeafIcon,
    title: "Umweltschonende Mittel",
    text: "Wir setzen auf sparsam dosierte, biologisch abbaubare Reinigungsmittel.",
  },
  {
    icon: ShieldIcon,
    title: "Faire, transparente Preise",
    // TODO: echten Text einfügen (Preismodell, Stundenansatz oder Pauschalen)
    text: "Sie erhalten vorab eine klare Offerte – ohne versteckte Kosten und ohne Abo-Zwang.",
  },
];

const steps = [
  { number: "1", title: "Leistung wählen", text: "Sagen Sie uns, was gereinigt werden soll." },
  { number: "2", title: "Objekt & Termin", text: "Objektart, Adresse und Wunschtermin angeben." },
  { number: "3", title: "Anfrage senden", text: "Wir melden uns innerhalb von 24 Stunden mit der Bestätigung." },
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

        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
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

      {/* ---------- Leistungen (Kurzüberblick) ---------- */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-mint-700">Unsere Leistungen</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
            Alles rund um Ihre Sauberkeit
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Ob Privathaushalt, Büro oder Liegenschaft – wählen Sie die passende Leistung und buchen
            Sie Ihren Wunschtermin direkt online.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/leistungen"
            className="inline-flex items-center gap-1.5 text-base font-semibold text-brand-700 hover:text-brand-900"
          >
            Alle Leistungen im Detail
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ---------- Vertrauen ---------- */}
      <section className="bg-brand-50/60 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-mint-700">
              Warum {site.name}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
              Sauberkeit, der man vertrauen kann
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trustPoints.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl bg-white p-6 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint-50 text-mint-700">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-brand-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            ))}
          </div>

          {/* TODO: echte Kennzahlen einfügen */}
          <dl className="mt-10 grid gap-6 rounded-2xl bg-white p-8 shadow-sm sm:grid-cols-3">
            <div>
              <dt className="text-sm text-muted">Im Einsatz seit</dt>
              <dd className="mt-1 text-2xl font-bold text-brand-900">{site.foundedYear}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Einzugsgebiet</dt>
              <dd className="mt-1 text-2xl font-bold text-brand-900">{site.region}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Erreichbar</dt>
              <dd className="mt-1 text-2xl font-bold text-brand-900">{site.openingHours}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ---------- Über uns Teaser ---------- */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
            {/* TODO: durch echte Fotos ersetzen */}
            <Image
              src={images.about}
              alt="Reinigungsteam bei der Arbeit"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-mint-700">Über uns</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
              Ein Familienbetrieb mit Anspruch
            </h2>
            {/* TODO: echten Text einfügen */}
            <p className="mt-4 text-base leading-relaxed text-muted">
              {site.name} ist ein inhabergeführtes Reinigungsunternehmen in {site.region}. Wir
              arbeiten mit einem kleinen, festen Team, das seine Kundinnen und Kunden persönlich
              kennt. Das heisst für Sie: eine Ansprechperson, verlässliche Qualität und keine
              anonymen Wechsel beim Personal.
            </p>
            <Link
              href="/ueber-uns"
              className="mt-6 inline-flex items-center gap-1.5 text-base font-semibold text-brand-700 hover:text-brand-900"
            >
              Mehr über uns erfahren
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Buchungs-CTA ---------- */}
      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-brand-800">
          <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                In 5 Schritten zum Termin
              </h2>
              <p className="mt-4 text-base leading-relaxed text-brand-100">
                Unser Buchungssystem führt Sie durch Leistung, Objekt, Wunschtermin und Kontaktdaten.
                Bereits vergebene Zeitfenster werden automatisch ausgeblendet.
              </p>
              <Link
                href="/buchung"
                className="mt-8 inline-flex items-center justify-center rounded-xl bg-mint-500 px-7 py-4 text-base font-semibold text-white transition hover:bg-mint-600"
              >
                Zum Buchungssystem
              </Link>
            </div>

            <ol className="space-y-4">
              {steps.map((step) => (
                <li key={step.number} className="flex gap-4 rounded-2xl bg-white/10 p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-brand-800">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-semibold text-white">{step.title}</h3>
                    <p className="mt-1 text-sm text-brand-100">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
