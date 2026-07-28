import Link from "next/link";
import { site } from "@/config/site";

export type Crumb = { label: string; href?: string };

/** Brotkrumen-Navigation inklusive strukturierter Daten für Google. */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${site.url}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <nav aria-label="Brotkrumen">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
          {items.map((item, index) => (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href ? (
                <Link href={item.href} className="transition hover:text-brand-700">
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-brand-900" aria-current="page">
                  {item.label}
                </span>
              )}
              {index < items.length - 1 && (
                <span className="text-brand-300" aria-hidden="true">
                  /
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
