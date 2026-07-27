"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site, telHref } from "@/config/site";
import { PhoneIcon } from "@/components/Icons";

const nav = [
  { href: "/", label: "Start" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/buchung", label: "Termin buchen" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Menü bei Seitenwechsel schliessen.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} – Startseite`}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-lg font-bold text-white">
            CC
          </span>
          <span className="leading-tight">
            <span className="block text-base font-semibold text-brand-900">{site.name}</span>
            <span className="hidden text-xs text-muted sm:block">{site.slogan}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Hauptnavigation">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active ? "bg-brand-50 text-brand-800" : "text-ink hover:bg-brand-50 hover:text-brand-800"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={telHref}
            className="ml-2 flex items-center gap-2 rounded-lg border border-brand-200 px-3 py-2 text-sm font-medium text-brand-800 transition hover:bg-brand-50"
          >
            <PhoneIcon className="h-4 w-4" />
            {site.phone}
          </a>
          <Link
            href="/buchung"
            className="ml-1 rounded-lg bg-mint-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-mint-700"
          >
            Jetzt Termin buchen
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-brand-200 text-brand-800 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Menü schliessen" : "Menü öffnen"}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
            {open ? <path d="m5 5 14 14M19 5 5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-brand-100 bg-white lg:hidden" aria-label="Mobile Navigation">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-3 text-base font-medium ${
                  pathname === item.href ? "bg-brand-50 text-brand-800" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a href={telHref} className="rounded-lg px-3 py-3 text-base font-medium text-brand-800">
              {site.phone} anrufen
            </a>
            <Link
              href="/buchung"
              className="mt-1 rounded-lg bg-mint-600 px-4 py-3.5 text-center text-base font-semibold text-white"
            >
              Jetzt Termin buchen
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
