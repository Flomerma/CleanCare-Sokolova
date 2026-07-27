import Link from "next/link";
import { fullAddress, mailHref, site, telHref } from "@/config/site";
import { services } from "@/config/services";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-brand-100 bg-brand-50/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-lg font-bold text-white">
              CC
            </span>
            <span className="text-lg font-semibold text-brand-900">{site.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            {site.slogan} – Ihre Reinigungsfirma in {site.region}. Wir reinigen Wohnungen, Häuser,
            Büros und Liegenschaften zuverlässig, gründlich und zu fairen Konditionen.
          </p>
          <p className="mt-4 text-sm text-muted">{site.openingHours}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-900">Leistungen</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {services.map((service) => (
              <li key={service.id}>
                <Link href={`/leistungen#${service.id}`} className="transition hover:text-brand-700">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-900">Kontakt</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {/* TODO: Platzhalterdaten in src/config/site.ts ersetzen */}
            <li>{fullAddress}</li>
            <li>
              <a href={telHref} className="transition hover:text-brand-700">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={mailHref} className="transition hover:text-brand-700">
                {site.email}
              </a>
            </li>
          </ul>
          <ul className="mt-6 space-y-2 text-sm text-muted">
            <li>
              <Link href="/impressum" className="transition hover:text-brand-700">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className="transition hover:text-brand-700">
                Datenschutz
              </Link>
            </li>
            <li>
              <Link href="/admin" className="transition hover:text-brand-700">
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-100 px-4 py-6 text-center text-xs text-muted sm:px-6">
        © {new Date().getFullYear()} {site.name}. Alle Rechte vorbehalten.
      </div>
    </footer>
  );
}
