import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/Icons";
import { fullAddress, mailHref, site, telHref } from "@/config/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: `Kontaktieren Sie ${site.name} in ${site.region} – telefonisch, per E-Mail oder über das Kontaktformular.`,
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title="Wir sind für Sie da"
        lead={`Rufen Sie uns an, schreiben Sie uns eine E-Mail oder nutzen Sie das Formular. Wir antworten innerhalb von 24 Stunden.`}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* ---------- Kontaktdaten ---------- */}
          <div>
            <ul className="space-y-4">
              {/* TODO: Platzhalterdaten in src/config/site.ts ersetzen */}
              <li className="flex gap-4 rounded-2xl border border-brand-100 bg-white p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm text-muted">Telefon</p>
                  <a href={telHref} className="text-lg font-semibold text-brand-900 hover:text-brand-700">
                    {site.phone}
                  </a>
                </div>
              </li>

              <li className="flex gap-4 rounded-2xl border border-brand-100 bg-white p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <MailIcon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-muted">E-Mail</p>
                  <a
                    href={mailHref}
                    className="break-all text-lg font-semibold text-brand-900 hover:text-brand-700"
                  >
                    {site.email}
                  </a>
                </div>
              </li>

              <li className="flex gap-4 rounded-2xl border border-brand-100 bg-white p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <PinIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm text-muted">Adresse</p>
                  <p className="text-lg font-semibold text-brand-900">{fullAddress}</p>
                  <p className="mt-1 text-sm text-muted">Einzugsgebiet: {site.region}</p>
                </div>
              </li>

              <li className="flex gap-4 rounded-2xl border border-brand-100 bg-white p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <ClockIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm text-muted">Erreichbarkeit</p>
                  <p className="text-lg font-semibold text-brand-900">{site.openingHours}</p>
                </div>
              </li>
            </ul>

            <Link
              href="/buchung"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-brand-700 px-7 py-4 text-base font-semibold text-white transition hover:bg-brand-800 sm:w-auto"
            >
              Direkt Termin buchen
            </Link>
          </div>

          {/* ---------- Formular ---------- */}
          <div>
            <h2 className="text-xl font-bold text-brand-900">Nachricht senden</h2>
            <p className="mt-2 text-sm text-muted">Felder mit * sind Pflichtfelder.</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Karte ---------- */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <h2 className="text-xl font-bold text-brand-900">So finden Sie uns</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-brand-100">
          {/*
            TODO: Platzhalter-Koordinaten durch die echte Adresse ersetzen
            (Werte in src/config/site.ts unter `maps` anpassen).
            Für eine Karte ohne API-Key genügt der Embed-Modus unten.
          */}
          <iframe
            title="Standort auf Google Maps"
            src={`https://www.google.com/maps?q=${encodeURIComponent(site.maps.embedQuery)}&z=${site.maps.zoom}&output=embed`}
            width="100%"
            height="420"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block border-0"
          />
        </div>
        <p className="mt-3 text-xs text-muted">
          Kartendarstellung über Google Maps. Beim Laden der Karte werden Daten an Google
          übertragen – siehe{" "}
          <Link href="/datenschutz" className="underline hover:text-brand-700">
            Datenschutzerklärung
          </Link>
          .
        </p>
      </section>
    </>
  );
}
