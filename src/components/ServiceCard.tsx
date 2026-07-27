import Link from "next/link";
import { ServiceIcon } from "@/components/Icons";
import type { Service } from "@/config/services";

/**
 * Leistungskarte. Der Link führt zum Buchungssystem und wählt die Leistung
 * dort über den Query-Parameter ?leistung=<id> vor.
 */
export default function ServiceCard({
  service,
  detailed = false,
}: {
  service: Service;
  detailed?: boolean;
}) {
  return (
    <article
      id={service.id}
      className="flex h-full scroll-mt-28 flex-col rounded-2xl border border-brand-100 bg-white p-6 shadow-sm transition hover:border-brand-200 hover:shadow-md"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
        <ServiceIcon name={service.icon} className="h-6 w-6" />
      </span>
      <h3 className="mt-5 text-lg font-semibold text-brand-900">{service.title}</h3>
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

      <Link
        href={`/buchung?leistung=${service.id}`}
        className="mt-6 inline-flex items-center gap-1.5 self-start rounded-lg bg-brand-50 px-4 py-2.5 text-sm font-semibold text-brand-800 transition hover:bg-brand-100"
      >
        Termin buchen
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </Link>
    </article>
  );
}
