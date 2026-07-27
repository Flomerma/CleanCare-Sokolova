export default function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="border-b border-brand-100 bg-brand-50/50">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wider text-mint-700">{eyebrow}</p>
        )}
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">{title}</h1>
        {lead && <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{lead}</p>}
      </div>
    </section>
  );
}
