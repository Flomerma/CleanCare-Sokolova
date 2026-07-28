import Link from "next/link";
import { ServiceIcon } from "@/components/Icons";
import type { Service } from "@/config/services";

/**
 * Leistungskarte.
 * Die gesamte Karte verlinkt auf die Detailseite /leistungen/<id>;
 * zusätzlich führt ein Direktlink ins Buchungssystem, wo die Leistung
 * über ?leistung=<id> bereits vorausgewählt ist.
 */
export default function ServiceCard({
  service,
  detailed = false,
}: {
  service: Service;
  detailed?: boolean;
}) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-brand-100 bg-white p-6 shadow-sm transition hover:border-brand-300 hover:shadow-md">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition group-hover:bg-brand-100">
        <ServiceIcon name={service.icon} className="h-6 w-6" />
      </span>

      <h3 className="mt-5 text-lg font-semibold text-brand-900">
        {/* Der Stretched-Link macht die ganze Karte anklickbar. */}
        <Link href={`/leistungen/${service.id}`} className="after:absolute after:inset-0">
          {service.title}
        </Link>
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-muted">
        {detailed ? service.description : service.short}
      </p>

      {detailed && (
        <ul className="mt-4 space-y-2">
          {service.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2 text-sm text-ink">
              <svg
                viewBox="0 0 24 24"
                className="mt-0.5 h-4 w-4 shrink-0 text-mint-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m4.5 12.5 5 5 10-11" />
              </svg>
              {bullet}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 pt-0">
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
          Mehr erfahren
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 transition group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>

        {/* Muss über dem Stretched-Link liegen, damit er klickbar bleibt. */}
        <Link
          href={`/buchung?leistung=${service.id}`}
          className="relative z-10 text-sm font-semibold text-mint-700 underline-offset-4 hover:underline"
        >
          Direkt buchen
        </Link>
      </div>
    </article>
  );
}
