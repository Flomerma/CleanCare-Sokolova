"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { serviceTitles } from "@/config/services";
import { formatDateDE } from "@/lib/slots";
import { BOOKING_STATUSES, type Booking, type BookingStatus } from "@/lib/types";

const statusStyles: Record<BookingStatus, string> = {
  offen: "bg-amber-50 text-amber-900 border-amber-200",
  "bestätigt": "bg-mint-50 text-mint-800 border-mint-200",
  abgeschlossen: "bg-brand-50 text-brand-800 border-brand-200",
  storniert: "bg-red-50 text-red-800 border-red-200",
};

export default function AdminDashboard({ ephemeral }: { ephemeral: boolean }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<BookingStatus | "alle">("alle");
  const [savingId, setSavingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/bookings");
      if (response.status === 401) {
        window.location.reload();
        return;
      }
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Buchungen konnten nicht geladen werden.");
        return;
      }
      setBookings(data.bookings as Booking[]);
    } catch {
      setError("Verbindungsfehler beim Laden der Buchungen.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const changeStatus = async (id: string, status: BookingStatus) => {
    setSavingId(id);
    const previous = bookings;
    // Optimistisches Update
    setBookings((current) => current.map((b) => (b.id === id ? { ...b, status } : b)));
    try {
      const response = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!response.ok) {
        setBookings(previous);
        setError("Status konnte nicht geändert werden.");
      }
    } catch {
      setBookings(previous);
      setError("Verbindungsfehler beim Speichern.");
    } finally {
      setSavingId(null);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    window.location.reload();
  };

  const visible = useMemo(
    () => (filter === "alle" ? bookings : bookings.filter((b) => b.status === filter)),
    [bookings, filter],
  );

  const counts = useMemo(() => {
    const result: Record<string, number> = { alle: bookings.length };
    for (const status of BOOKING_STATUSES) {
      result[status] = bookings.filter((b) => b.status === status).length;
    }
    return result;
  }, [bookings]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-900">Buchungen</h1>
          <p className="mt-1 text-sm text-muted">Sortiert nach Termin (Datum und Uhrzeit).</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={load}
            className="rounded-xl border border-brand-200 px-5 py-3 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
          >
            Aktualisieren
          </button>
          <button
            type="button"
            onClick={logout}
            className="rounded-xl border border-brand-200 px-5 py-3 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
          >
            Abmelden
          </button>
        </div>
      </div>

      {ephemeral && (
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Hinweis:</strong> Auf Vercel werden Buchungen aktuell nur im Arbeitsspeicher
          gehalten und gehen bei einem Neustart der Serverless-Funktion verloren.
          {" "}TODO: Supabase anbinden (siehe README).
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        {(["alle", ...BOOKING_STATUSES] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition ${
              filter === value ? "bg-brand-700 text-white" : "bg-brand-50 text-brand-800 hover:bg-brand-100"
            }`}
          >
            {value} ({counts[value] ?? 0})
          </button>
        ))}
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {error}
        </p>
      )}

      {loading ? (
        <div className="mt-6 space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-24 animate-pulse rounded-2xl bg-brand-50" />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-brand-100 bg-white p-8 text-center text-muted">
          Keine Buchungen vorhanden.
        </p>
      ) : (
        <>
          {/* Tabelle ab Desktop */}
          <div className="mt-6 hidden overflow-x-auto rounded-2xl border border-brand-100 lg:block">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-brand-50 text-xs uppercase tracking-wide text-brand-800">
                <tr>
                  <th className="px-4 py-3">Termin</th>
                  <th className="px-4 py-3">Kunde</th>
                  <th className="px-4 py-3">Leistungen</th>
                  <th className="px-4 py-3">Objekt / Adresse</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-50">
                {visible.map((b) => (
                  <tr key={b.id} className="align-top">
                    <td className="px-4 py-4">
                      <div className="font-semibold text-brand-900">{formatDateDE(b.datum)}</div>
                      <div className="text-muted">{b.uhrzeit} Uhr</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-brand-900">{b.name}</div>
                      <a href={`tel:${b.telefon}`} className="block text-brand-700 hover:underline">
                        {b.telefon}
                      </a>
                      <a href={`mailto:${b.email}`} className="block break-all text-brand-700 hover:underline">
                        {b.email}
                      </a>
                    </td>
                    <td className="px-4 py-4 text-muted">
                      {serviceTitles(b.leistungen).join(", ")}
                      {b.nachricht && (
                        <p className="mt-2 italic text-brand-800">„{b.nachricht}“</p>
                      )}
                    </td>
                    <td className="px-4 py-4 text-muted">
                      <div className="font-medium text-brand-900">
                        {b.objekttyp}
                        {b.flaeche ? ` · ${b.flaeche} m²` : ""}
                      </div>
                      {b.adresse}
                    </td>
                    <td className="px-4 py-4">
                      <StatusSelect
                        value={b.status}
                        disabled={savingId === b.id}
                        onChange={(status) => changeStatus(b.id, status)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Karten auf Mobile */}
          <div className="mt-6 space-y-4 lg:hidden">
            {visible.map((b) => (
              <article key={b.id} className="rounded-2xl border border-brand-100 bg-white p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-brand-900">{formatDateDE(b.datum)}</p>
                    <p className="text-sm text-muted">{b.uhrzeit} Uhr</p>
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${statusStyles[b.status]}`}
                  >
                    {b.status}
                  </span>
                </div>

                <dl className="mt-4 space-y-2 text-sm">
                  <Line label="Kunde" value={b.name} />
                  <Line label="Telefon" value={b.telefon} href={`tel:${b.telefon}`} />
                  <Line label="E-Mail" value={b.email} href={`mailto:${b.email}`} />
                  <Line label="Leistungen" value={serviceTitles(b.leistungen).join(", ")} />
                  <Line
                    label="Objekt"
                    value={`${b.objekttyp}${b.flaeche ? ` · ${b.flaeche} m²` : ""}`}
                  />
                  <Line label="Adresse" value={b.adresse} />
                  {b.nachricht && <Line label="Nachricht" value={b.nachricht} />}
                </dl>

                <div className="mt-4">
                  <StatusSelect
                    value={b.status}
                    disabled={savingId === b.id}
                    onChange={(status) => changeStatus(b.id, status)}
                  />
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function StatusSelect({
  value,
  disabled,
  onChange,
}: {
  value: BookingStatus;
  disabled: boolean;
  onChange: (status: BookingStatus) => void;
}) {
  return (
    <label className="block">
      <span className="sr-only">Status ändern</span>
      <select
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value as BookingStatus)}
        className={`w-full rounded-xl border px-3 py-2.5 text-sm font-semibold capitalize outline-none disabled:opacity-50 ${statusStyles[value]}`}
      >
        {BOOKING_STATUSES.map((status) => (
          <option key={status} value={status} className="bg-white text-ink">
            {status}
          </option>
        ))}
      </select>
    </label>
  );
}

function Line({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-2">
      <dt className="text-muted">{label}</dt>
      <dd className="break-words font-medium text-brand-900">
        {href ? (
          <a href={href} className="text-brand-700 hover:underline">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
