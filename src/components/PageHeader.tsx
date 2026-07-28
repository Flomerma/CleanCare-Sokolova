import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";

export default function PageHeader({
  eyebrow,
  title,
  lead,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  /** Brotkrumen ohne die aktuelle Seite – diese wird automatisch ergänzt. */
  crumbs?: Crumb[];
}) {
  return (
    <section className="border-b border-brand-100 bg-brand-50/50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {crumbs && <Breadcrumbs items={[...crumbs, { label: title }]} />}
        {eyebrow && (
          <p className={`text-sm font-semibold uppercase tracking-wider text-mint-700 ${crumbs ? "mt-8" : ""}`}>
            {eyebrow}
          </p>
        )}
        <h1 className={`text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl ${eyebrow || crumbs ? "mt-2" : ""}`}>
          {title}
        </h1>
        {lead && <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{lead}</p>}
      </div>
    </section>
  );
}
