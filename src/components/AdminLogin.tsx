"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error ?? "Anmeldung fehlgeschlagen.");
        return;
      }
      window.location.reload();
    } catch {
      setError("Verbindungsfehler. Bitte versuchen Sie es erneut.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="mx-auto max-w-md rounded-2xl border border-brand-100 bg-white p-8">
      <h1 className="text-2xl font-bold text-brand-900">Admin-Bereich</h1>
      <p className="mt-2 text-sm text-muted">
        Bitte melden Sie sich an, um die Buchungen zu verwalten.
      </p>

      <label htmlFor="password" className="mt-6 block text-sm font-semibold text-brand-900">
        Passwort
      </label>
      <input
        id="password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="mt-2 w-full rounded-xl border border-brand-100 px-4 py-3.5 text-base outline-none transition focus:border-brand-400"
      />

      {error && (
        <p role="alert" className="mt-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-brand-700 px-6 py-4 text-base font-semibold text-white transition hover:bg-brand-800 disabled:opacity-70"
      >
        {loading ? "Wird geprüft …" : "Anmelden"}
      </button>

      {/* TODO: Platzhalter-Passwort in src/config/site.ts bzw. in der Umgebungsvariable
          ADMIN_PASSWORD ersetzen. */}
      <p className="mt-4 text-xs text-muted">
        Das Passwort wird in der Konfiguration bzw. über die Umgebungsvariable ADMIN_PASSWORD
        gesetzt.
      </p>
    </form>
  );
}
