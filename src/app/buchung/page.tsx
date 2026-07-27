import type { Metadata } from "next";
import { Suspense } from "react";
import BookingForm from "@/components/BookingForm";
import PageHeader from "@/components/PageHeader";
import { site, telHref } from "@/config/site";

export const metadata: Metadata = {
  title: "Termin buchen",
  description: `Reinigungstermin bei ${site.name} online anfragen: Leistung wählen, Objekt angeben, Wunschtermin buchen. Antwort innert 24 Stunden.`,
  alternates: { canonical: "/buchung" },
};

export default function BuchungPage() {
  return (
    <>
      <PageHeader
        eyebrow="Buchung"
        title="Termin online anfragen"
        lead="In fünf kurzen Schritten zu Ihrem Wunschtermin. Die Anfrage ist unverbindlich und kostenlos."
      />

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <Suspense
          fallback={
            <div className="rounded-3xl border border-brand-100 bg-white p-8">
              <div className="h-6 w-40 animate-pulse rounded bg-brand-50" />
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="h-24 animate-pulse rounded-2xl bg-brand-50" />
                ))}
              </div>
            </div>
          }
        >
          <BookingForm />
        </Suspense>

        <p className="mt-8 text-center text-sm text-muted">
          Lieber persönlich? Rufen Sie uns an unter{" "}
          <a href={telHref} className="font-semibold text-brand-700 underline">
            {site.phone}
          </a>{" "}
          – {site.openingHours}.
        </p>
      </section>
    </>
  );
}
