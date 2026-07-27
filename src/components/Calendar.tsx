"use client";

import { useMemo, useState } from "react";
import { booking as bookingConfig } from "@/config/site";
import { isBookableDate, toISODate } from "@/lib/slots";

const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const MONTHS = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];

/** Einfaches Monatskalender-Widget ohne externe Abhängigkeiten. */
export default function Calendar({
  value,
  onSelect,
}: {
  value: string;
  onSelect: (iso: string) => void;
}) {
  const today = useMemo(() => new Date(), []);
  const initial = value ? new Date(`${value}T12:00:00`) : today;
  const [cursor, setCursor] = useState(new Date(initial.getFullYear(), initial.getMonth(), 1));

  const lastBookable = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + bookingConfig.maxDaysAhead);
    return date;
  }, []);

  const days = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const firstDay = new Date(year, month, 1);
    // Woche beginnt am Montag: Sonntag (0) → 6
    const leading = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: (Date | null)[] = Array.from({ length: leading }, () => null);
    for (let day = 1; day <= daysInMonth; day++) cells.push(new Date(year, month, day, 12));
    return cells;
  }, [cursor]);

  const canGoBack =
    cursor.getFullYear() > today.getFullYear() ||
    (cursor.getFullYear() === today.getFullYear() && cursor.getMonth() > today.getMonth());

  const canGoForward =
    cursor.getFullYear() < lastBookable.getFullYear() ||
    (cursor.getFullYear() === lastBookable.getFullYear() && cursor.getMonth() < lastBookable.getMonth());

  const shiftMonth = (delta: number) =>
    setCursor((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1));

  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => shiftMonth(-1)}
          disabled={!canGoBack}
          aria-label="Vorheriger Monat"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-brand-100 text-brand-700 transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span aria-hidden="true">←</span>
        </button>
        <p aria-live="polite" className="text-base font-semibold text-brand-900">
          {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
        </p>
        <button
          type="button"
          onClick={() => shiftMonth(1)}
          disabled={!canGoForward}
          aria-label="Nächster Monat"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-brand-100 text-brand-700 transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted">
        {WEEKDAYS.map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          if (!date) return <div key={`empty-${index}`} />;
          const iso = toISODate(date);
          const bookable = isBookableDate(iso);
          const selected = iso === value;

          return (
            <button
              key={iso}
              type="button"
              disabled={!bookable}
              onClick={() => onSelect(iso)}
              aria-pressed={selected}
              aria-label={`${date.getDate()}. ${MONTHS[date.getMonth()]} ${date.getFullYear()}${
                bookable ? "" : " – nicht verfügbar"
              }`}
              className={`flex h-11 items-center justify-center rounded-lg text-sm font-medium transition sm:h-12 ${
                selected
                  ? "bg-brand-600 text-white"
                  : bookable
                    ? "text-ink hover:bg-brand-50"
                    : "cursor-not-allowed text-brand-200"
              }`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-muted">
        Termine sind Montag bis Samstag zwischen 08:00 und 18:00 Uhr buchbar – frühestens ab morgen.
      </p>
    </div>
  );
}
