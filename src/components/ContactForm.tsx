"use client";

import { useState } from "react";
import Link from "next/link";

const inputClass =
  "w-full rounded-xl border border-brand-100 bg-white px-4 py-3.5 text-base text-ink outline-none transition placeholder:text-brand-300 focus:border-brand-400";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", telefon: "", email: "", nachricht: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  const update = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        setErrors(data.errors ?? {});
        setMessage(data.error ?? "Die Nachricht konnte nicht gesendet werden.");
        setStatus("error");
        return;
      }
      setStatus("sent");
      setForm({ name: "", telefon: "", email: "", nachricht: "" });
    } catch {
      setMessage("Verbindungsfehler. Bitte versuchen Sie es später erneut.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-mint-200 bg-mint-50 p-8 text-center">
        <h2 className="text-xl font-bold text-brand-900">Nachricht erhalten</h2>
        <p className="mt-2 text-base text-muted">
          Vielen Dank für Ihre Nachricht. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-xl border border-brand-200 bg-white px-6 py-3 text-base font-semibold text-brand-800"
        >
          Weitere Nachricht schreiben
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-2xl border border-brand-100 bg-white p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="block text-sm font-semibold text-brand-900">
            Name *
          </label>
          <input
            id="c-name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            className={`${inputClass} mt-2`}
          />
          {errors.name && <Error message={errors.name} />}
        </div>

        <div>
          <label htmlFor="c-telefon" className="block text-sm font-semibold text-brand-900">
            Telefon *
          </label>
          <input
            id="c-telefon"
            type="tel"
            autoComplete="tel"
            placeholder="+41 79 000 00 00"
            value={form.telefon}
            onChange={(event) => update("telefon", event.target.value)}
            aria-invalid={Boolean(errors.telefon)}
            className={`${inputClass} mt-2`}
          />
          {errors.telefon && <Error message={errors.telefon} />}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="c-email" className="block text-sm font-semibold text-brand-900">
            E-Mail *
          </label>
          <input
            id="c-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            className={`${inputClass} mt-2`}
          />
          {errors.email && <Error message={errors.email} />}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="c-nachricht" className="block text-sm font-semibold text-brand-900">
            Nachricht *
          </label>
          <textarea
            id="c-nachricht"
            rows={5}
            maxLength={2000}
            value={form.nachricht}
            onChange={(event) => update("nachricht", event.target.value)}
            aria-invalid={Boolean(errors.nachricht)}
            className={`${inputClass} mt-2 resize-y`}
          />
          {errors.nachricht && <Error message={errors.nachricht} />}
        </div>
      </div>

      {status === "error" && message && (
        <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {message}
        </p>
      )}

      <p className="mt-5 text-xs leading-relaxed text-muted">
        Ihre Angaben werden ausschliesslich zur Bearbeitung Ihrer Anfrage verwendet – siehe{" "}
        <Link href="/datenschutz" className="underline hover:text-brand-700">
          Datenschutzerklärung
        </Link>
        .
      </p>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-mint-600 px-7 py-4 text-base font-semibold text-white transition hover:bg-mint-700 disabled:opacity-70 sm:w-auto"
      >
        {status === "sending" && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
        )}
        {status === "sending" ? "Wird gesendet …" : "Nachricht senden"}
      </button>
    </form>
  );
}

function Error({ message }: { message: string }) {
  return (
    <p role="alert" className="mt-2 text-sm font-medium text-red-700">
      {message}
    </p>
  );
}
