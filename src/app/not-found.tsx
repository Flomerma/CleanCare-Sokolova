import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-mint-700">Fehler 404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
        Diese Seite gibt es nicht
      </h1>
      <p className="mt-4 text-base text-muted">
        Die gewünschte Seite wurde verschoben oder existiert nicht mehr.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-xl bg-brand-700 px-7 py-4 text-base font-semibold text-white transition hover:bg-brand-800"
        >
          Zur Startseite
        </Link>
        <Link
          href="/buchung"
          className="rounded-xl border border-brand-200 px-7 py-4 text-base font-semibold text-brand-800 transition hover:bg-brand-50"
        >
          Termin buchen
        </Link>
      </div>
    </section>
  );
}
