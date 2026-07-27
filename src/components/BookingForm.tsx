"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Calendar from "@/components/Calendar";
import { ServiceIcon } from "@/components/Icons";
import { services } from "@/config/services";
import { site } from "@/config/site";
import { formatDateDE } from "@/lib/slots";

type Slot = { time: string; available: boolean };
type Objekttyp = "Wohnung" | "Haus" | "Büro";

type FormState = {
  leistungen: string[];
  objekttyp: Objekttyp | "";
  flaeche: string;
  adresse: string;
  datum: string;
  uhrzeit: string;
  name: string;
  telefon: string;
  email: string;
  nachricht: string;
};

const EMPTY: FormState = {
  leistungen: [],
  objekttyp: "",
  flaeche: "",
  adresse: "",
  datum: "",
  uhrzeit: "",
  name: "",
  telefon: "",
  email: "",
  nachricht: "",
};

const STEPS = [
  "Leistung",
  "Objekt",
  "Termin",
  "Kontakt",
  "Übersicht",
] as const;

const OBJEKTTYPEN: Objekttyp[] = ["Wohnung", "Haus", "Büro"];

const inputClass =
  "w-full rounded-xl border border-brand-100 bg-white px-4 py-3.5 text-base text-ink outline-none transition placeholder:text-brand-300 focus:border-brand-400";

export default function BookingForm() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("leistung");
  const container = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [done, setDone] = useState(false);

  // Vorauswahl aus der Leistungsseite (?leistung=<id>) übernehmen.
  useEffect(() => {
    if (preselected && services.some((service) => service.id === preselected)) {
      setForm((current) =>
        current.leistungen.includes(preselected)
          ? current
          : { ...current, leistungen: [...current.leistungen, preselected] },
      );
    }
  }, [preselected]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key as string]) return current;
      const next = { ...current };
      delete next[key as string];
      return next;
    });
  };

  const toggleService = (id: string) => {
    setForm((current) => ({
      ...current,
      leistungen: current.leistungen.includes(id)
        ? current.leistungen.filter((entry) => entry !== id)
        : [...current.leistungen, id],
    }));
    setErrors((current) => {
      const next = { ...current };
      delete next.leistungen;
      return next;
    });
  };

  // Verfügbare Zeitfenster laden, sobald ein Datum gewählt wurde.
  const loadSlots = useCallback(async (datum: string) => {
    setSlotsLoading(true);
    setSlotsError("");
    try {
      const response = await fetch(`/api/slots?datum=${encodeURIComponent(datum)}`);
      const data = await response.json();
      if (!response.ok) {
        setSlots([]);
        setSlotsError(data.error ?? "Zeitfenster konnten nicht geladen werden.");
        return;
      }
      setSlots(data.slots as Slot[]);
    } catch {
      setSlots([]);
      setSlotsError("Zeitfenster konnten nicht geladen werden. Bitte prüfen Sie Ihre Verbindung.");
    } finally {
      setSlotsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (form.datum) loadSlots(form.datum);
  }, [form.datum, loadSlots]);

  /** Clientseitige Prüfung des aktuellen Schritts. */
  const validateStep = (index: number): boolean => {
    const found: Record<string, string> = {};

    if (index === 0 && form.leistungen.length === 0) {
      found.leistungen = "Bitte wählen Sie mindestens eine Leistung.";
    }

    if (index === 1) {
      if (!form.objekttyp) found.objekttyp = "Bitte wählen Sie die Art des Objekts.";
      if (form.adresse.trim().length < 5) found.adresse = "Bitte geben Sie die Adresse des Einsatzorts an.";
      if (form.flaeche && (Number(form.flaeche) <= 0 || !Number.isFinite(Number(form.flaeche)))) {
        found.flaeche = "Bitte geben Sie eine gültige Fläche an.";
      }
    }

    if (index === 2) {
      if (!form.datum) found.datum = "Bitte wählen Sie ein Datum.";
      if (!form.uhrzeit) found.uhrzeit = "Bitte wählen Sie ein Zeitfenster.";
    }

    if (index === 3) {
      if (form.name.trim().length < 2) found.name = "Bitte geben Sie Ihren Namen an.";
      if (!/^[+\d][\d\s/().-]{8,}$/.test(form.telefon.trim())) {
        found.telefon = "Bitte geben Sie eine gültige Telefonnummer an.";
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
        found.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
      }
    }

    setErrors(found);
    return Object.keys(found).length === 0;
  };

  /** Nach einem Schrittwechsel an den Anfang des Formulars scrollen. */
  const scrollToTop = () => container.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const next = () => {
    if (!validateStep(step)) return;
    setStep((current) => Math.min(current + 1, STEPS.length - 1));
    scrollToTop();
  };
  const back = () => {
    setErrors({});
    setStep((current) => Math.max(current - 1, 0));
    scrollToTop();
  };

  const submit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          flaeche: form.flaeche === "" ? null : Number(form.flaeche),
          nachricht: form.nachricht.trim(),
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors ?? {});
        setSubmitError(data.error ?? "Die Buchung konnte nicht gesendet werden.");
        // Bei belegtem Slot zurück zur Terminwahl und Verfügbarkeiten neu laden.
        if (response.status === 409) {
          update("uhrzeit", "");
          setStep(2);
          scrollToTop();
          if (form.datum) loadSlots(form.datum);
        }
        return;
      }

      setDone(true);
      scrollToTop();
    } catch {
      setSubmitError("Verbindungsfehler. Bitte versuchen Sie es später erneut.");
    } finally {
      setSubmitting(false);
    }
  };

  // ---------- Bestätigung ----------
  if (done) {
    return (
      <div
        ref={container}
        className="scroll-mt-28 rounded-3xl border border-mint-200 bg-mint-50 p-8 text-center sm:p-12"
      >
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mint-600 text-white">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="m5 12.5 5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="mt-6 text-2xl font-bold text-brand-900 sm:text-3xl">Anfrage erhalten</h2>
        <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-muted">
          Vielen Dank! Wir melden uns innerhalb von 24 Stunden bei Ihnen, um den Termin am{" "}
          <strong className="text-brand-900">
            {formatDateDE(form.datum)} um {form.uhrzeit} Uhr
          </strong>{" "}
          definitiv zu bestätigen.
        </p>
        <p className="mt-3 text-sm text-muted">
          Dringend? Rufen Sie uns an: <strong className="text-brand-900">{site.phone}</strong>
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-brand-700 px-7 py-4 text-base font-semibold text-white transition hover:bg-brand-800"
          >
            Zur Startseite
          </Link>
          <button
            type="button"
            onClick={() => {
              setForm(EMPTY);
              setStep(0);
              setDone(false);
            }}
            className="inline-flex items-center justify-center rounded-xl border border-brand-200 bg-white px-7 py-4 text-base font-semibold text-brand-800 transition hover:bg-brand-50"
          >
            Weitere Buchung
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={container}
      className="scroll-mt-28 rounded-3xl border border-brand-100 bg-white p-5 shadow-sm sm:p-8"
    >
      {/* ---------- Fortschritt ---------- */}
      <ol className="flex flex-wrap items-center gap-2" aria-label="Fortschritt">
        {STEPS.map((label, index) => {
          const state = index === step ? "current" : index < step ? "done" : "todo";
          return (
            <li key={label} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => index < step && setStep(index)}
                disabled={index > step}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  state === "current"
                    ? "bg-brand-600 text-white"
                    : state === "done"
                      ? "bg-brand-50 text-brand-800 hover:bg-brand-100"
                      : "text-brand-300"
                }`}
                aria-current={state === "current" ? "step" : undefined}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    state === "current" ? "bg-white/20" : state === "done" ? "bg-brand-200/60" : "bg-brand-50"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </button>
              {index < STEPS.length - 1 && <span className="text-brand-200" aria-hidden="true">·</span>}
            </li>
          );
        })}
      </ol>

      <div className="mt-8">
        {/* ---------- Schritt 1: Leistung ---------- */}
        {step === 0 && (
          <fieldset>
            <legend className="text-xl font-bold text-brand-900">Welche Leistung benötigen Sie?</legend>
            <p className="mt-2 text-sm text-muted">Mehrfachauswahl möglich.</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {services.map((service) => {
                const checked = form.leistungen.includes(service.id);
                return (
                  <label
                    key={service.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition ${
                      checked
                        ? "border-brand-500 bg-brand-50"
                        : "border-brand-100 bg-white hover:border-brand-200"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleService(service.id)}
                      className="mt-1 h-5 w-5 accent-[#23678a]"
                    />
                    <span className="flex-1">
                      <span className="flex items-center gap-2 font-semibold text-brand-900">
                        <ServiceIcon name={service.icon} className="h-5 w-5 text-brand-600" />
                        {service.title}
                      </span>
                      <span className="mt-1 block text-sm text-muted">{service.short}</span>
                    </span>
                  </label>
                );
              })}
            </div>

            {errors.leistungen && <FieldError message={errors.leistungen} />}
          </fieldset>
        )}

        {/* ---------- Schritt 2: Objektdetails ---------- */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold text-brand-900">Angaben zum Objekt</h2>
            <p className="mt-2 text-sm text-muted">
              So können wir den Aufwand realistisch einschätzen.
            </p>

            <fieldset className="mt-6">
              <legend className="text-sm font-semibold text-brand-900">Art des Objekts *</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {OBJEKTTYPEN.map((typ) => (
                  <label
                    key={typ}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${
                      form.objekttyp === typ
                        ? "border-brand-500 bg-brand-50"
                        : "border-brand-100 hover:border-brand-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="objekttyp"
                      value={typ}
                      checked={form.objekttyp === typ}
                      onChange={() => update("objekttyp", typ)}
                      className="h-5 w-5 accent-[#23678a]"
                    />
                    <span className="font-medium text-brand-900">{typ}</span>
                  </label>
                ))}
              </div>
              {errors.objekttyp && <FieldError message={errors.objekttyp} />}
            </fieldset>

            <div className="mt-6">
              <label htmlFor="flaeche" className="block text-sm font-semibold text-brand-900">
                Ungefähre Fläche in m² <span className="font-normal text-muted">(optional)</span>
              </label>
              <input
                id="flaeche"
                type="number"
                inputMode="numeric"
                min={1}
                placeholder="z.B. 85"
                value={form.flaeche}
                onChange={(event) => update("flaeche", event.target.value)}
                className={`${inputClass} mt-2`}
              />
              {errors.flaeche && <FieldError message={errors.flaeche} />}
            </div>

            <div className="mt-6">
              <label htmlFor="adresse" className="block text-sm font-semibold text-brand-900">
                Adresse des Einsatzorts *
              </label>
              <input
                id="adresse"
                type="text"
                autoComplete="street-address"
                placeholder="Strasse Nr., PLZ Ort"
                value={form.adresse}
                onChange={(event) => update("adresse", event.target.value)}
                aria-invalid={Boolean(errors.adresse)}
                className={`${inputClass} mt-2`}
              />
              {errors.adresse && <FieldError message={errors.adresse} />}
            </div>
          </div>
        )}

        {/* ---------- Schritt 3: Terminwahl ---------- */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold text-brand-900">Wunschtermin</h2>
            <p className="mt-2 text-sm text-muted">
              Bereits vergebene Zeitfenster sind nicht auswählbar.
            </p>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div>
                <Calendar
                  value={form.datum}
                  onSelect={(iso) => {
                    update("datum", iso);
                    update("uhrzeit", "");
                  }}
                />
                {errors.datum && <FieldError message={errors.datum} />}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-brand-900">
                  {form.datum ? `Zeitfenster am ${formatDateDE(form.datum)}` : "Zeitfenster"}
                </h3>

                {!form.datum && (
                  <p className="mt-3 rounded-2xl bg-brand-50 p-4 text-sm text-muted">
                    Bitte wählen Sie zuerst ein Datum im Kalender.
                  </p>
                )}

                {form.datum && slotsLoading && (
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3" aria-live="polite">
                    {Array.from({ length: 10 }).map((_, index) => (
                      <div key={index} className="h-12 animate-pulse rounded-xl bg-brand-50" />
                    ))}
                    <span className="sr-only">Zeitfenster werden geladen…</span>
                  </div>
                )}

                {form.datum && !slotsLoading && slotsError && (
                  <div className="mt-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                    <p>{slotsError}</p>
                    <button
                      type="button"
                      onClick={() => loadSlots(form.datum)}
                      className="mt-2 font-semibold underline"
                    >
                      Erneut versuchen
                    </button>
                  </div>
                )}

                {form.datum && !slotsLoading && !slotsError && (
                  <>
                    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {slots.map((slot) => {
                        const selected = form.uhrzeit === slot.time;
                        return (
                          <button
                            key={slot.time}
                            type="button"
                            disabled={!slot.available}
                            onClick={() => update("uhrzeit", slot.time)}
                            aria-pressed={selected}
                            className={`h-12 rounded-xl border text-sm font-semibold transition ${
                              selected
                                ? "border-brand-600 bg-brand-600 text-white"
                                : slot.available
                                  ? "border-brand-100 bg-white text-ink hover:border-brand-300"
                                  : "cursor-not-allowed border-brand-50 bg-brand-50 text-brand-300 line-through"
                            }`}
                          >
                            {slot.time}
                          </button>
                        );
                      })}
                    </div>
                    {slots.every((slot) => !slot.available) && (
                      <p className="mt-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-900">
                        An diesem Tag sind alle Zeitfenster belegt. Bitte wählen Sie ein anderes Datum.
                      </p>
                    )}
                  </>
                )}

                {errors.uhrzeit && <FieldError message={errors.uhrzeit} />}
              </div>
            </div>
          </div>
        )}

        {/* ---------- Schritt 4: Kontaktdaten ---------- */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold text-brand-900">Ihre Kontaktdaten</h2>
            <p className="mt-2 text-sm text-muted">Damit wir Ihnen den Termin bestätigen können.</p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-brand-900">
                  Name *
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => update("name", event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  className={`${inputClass} mt-2`}
                />
                {errors.name && <FieldError message={errors.name} />}
              </div>

              <div>
                <label htmlFor="telefon" className="block text-sm font-semibold text-brand-900">
                  Telefon *
                </label>
                <input
                  id="telefon"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+41 79 000 00 00"
                  value={form.telefon}
                  onChange={(event) => update("telefon", event.target.value)}
                  aria-invalid={Boolean(errors.telefon)}
                  className={`${inputClass} mt-2`}
                />
                {errors.telefon && <FieldError message={errors.telefon} />}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-semibold text-brand-900">
                  E-Mail *
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => update("email", event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  className={`${inputClass} mt-2`}
                />
                {errors.email && <FieldError message={errors.email} />}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="nachricht" className="block text-sm font-semibold text-brand-900">
                  Nachricht / Zusatzwünsche <span className="font-normal text-muted">(optional)</span>
                </label>
                <textarea
                  id="nachricht"
                  rows={4}
                  maxLength={2000}
                  placeholder="z.B. Haustiere, Parkmöglichkeiten, Schlüsselübergabe …"
                  value={form.nachricht}
                  onChange={(event) => update("nachricht", event.target.value)}
                  className={`${inputClass} mt-2 resize-y`}
                />
              </div>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-muted">
              Mit dem Absenden stimmen Sie der Bearbeitung Ihrer Daten gemäss unserer{" "}
              <Link href="/datenschutz" className="underline hover:text-brand-700">
                Datenschutzerklärung
              </Link>{" "}
              zu.
            </p>
          </div>
        )}

        {/* ---------- Schritt 5: Zusammenfassung ---------- */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold text-brand-900">Zusammenfassung</h2>
            <p className="mt-2 text-sm text-muted">
              Bitte prüfen Sie Ihre Angaben vor dem Absenden.
            </p>

            <dl className="mt-6 divide-y divide-brand-50 rounded-2xl border border-brand-100">
              <Row
                label="Leistungen"
                value={form.leistungen
                  .map((id) => services.find((service) => service.id === id)?.title ?? id)
                  .join(", ")}
                onEdit={() => setStep(0)}
              />
              <Row
                label="Objekt"
                value={`${form.objekttyp}${form.flaeche ? ` · ca. ${form.flaeche} m²` : ""}`}
                onEdit={() => setStep(1)}
              />
              <Row label="Einsatzort" value={form.adresse} onEdit={() => setStep(1)} />
              <Row
                label="Termin"
                value={`${formatDateDE(form.datum)}, ${form.uhrzeit} Uhr`}
                onEdit={() => setStep(2)}
              />
              <Row label="Name" value={form.name} onEdit={() => setStep(3)} />
              <Row label="Telefon" value={form.telefon} onEdit={() => setStep(3)} />
              <Row label="E-Mail" value={form.email} onEdit={() => setStep(3)} />
              {form.nachricht && (
                <Row label="Nachricht" value={form.nachricht} onEdit={() => setStep(3)} />
              )}
            </dl>

            {submitError && (
              <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                {submitError}
              </p>
            )}

            <p className="mt-5 rounded-xl bg-brand-50 p-4 text-sm text-muted">
              Es handelt sich um eine unverbindliche Anfrage. Der Termin gilt erst nach unserer
              Bestätigung als definitiv – wir melden uns innerhalb von 24 Stunden.
            </p>
          </div>
        )}
      </div>

      {/* ---------- Navigation ---------- */}
      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-brand-50 pt-6 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={back}
          disabled={step === 0 || submitting}
          className="rounded-xl border border-brand-200 px-7 py-4 text-base font-semibold text-brand-800 transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Zurück
        </button>

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="rounded-xl bg-brand-700 px-7 py-4 text-base font-semibold text-white transition hover:bg-brand-800"
          >
            Weiter
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-mint-600 px-7 py-4 text-base font-semibold text-white transition hover:bg-mint-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting && (
              <span
                className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                aria-hidden="true"
              />
            )}
            {submitting ? "Wird gesendet …" : "Buchung anfragen"}
          </button>
        )}
      </div>
    </div>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <p role="alert" className="mt-2 text-sm font-medium text-red-700">
      {message}
    </p>
  );
}

function Row({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 p-4">
      <div className="min-w-0">
        <dt className="text-sm text-muted">{label}</dt>
        <dd className="mt-0.5 break-words font-medium text-brand-900">{value || "–"}</dd>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="shrink-0 text-sm font-semibold text-brand-700 underline hover:text-brand-900"
      >
        Ändern
      </button>
    </div>
  );
}
