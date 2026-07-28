"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site, telHref } from "@/config/site";
import { services } from "@/config/services";
import { PhoneIcon, ServiceIcon } from "@/components/Icons";

const nav = [
  { href: "/", label: "Start" },
  { href: "/leistungen", label: "Leistungen", hasSubmenu: true },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/buchung", label: "Termin buchen" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState(false);
  const submenuRef = useRef<HTMLDivElement>(null);

  // Menüs bei Seitenwechsel schliessen.
  useEffect(() => {
    setOpen(false);
    setSubmenu(false);
  }, [pathname]);

  // Untermenü schliessen, wenn ausserhalb geklickt oder Escape gedrückt wird.
  useEffect(() => {
    if (!submenu) return;
    const onClick = (event: MouseEvent) => {
      if (!submenuRef.current?.contains(event.target as Node)) setSubmenu(false);
    };
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setSubmenu(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [submenu]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
            const active = isActive(item.href);

            if (item.hasSubmenu) {
              return (
                /*
                 * Das Untermenü wird ausschliesslich über den Pfeil-Button
                 * geöffnet und geschlossen. Ein zusätzliches Öffnen beim
                 * Hovern würde sich mit dem Klick in die Quere kommen (der
                 * Klick würde das gerade per Hover geöffnete Menü sofort
                 * wieder schliessen) und funktioniert auf Touch-Geräten
                 * ohnehin nicht.
                 */
                <div key={item.href} ref={submenuRef} className="relative">
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`whitespace-nowrap rounded-l-lg py-2 pl-3 pr-1 text-sm font-medium transition ${
                        active ? "bg-brand-50 text-brand-800" : "text-ink hover:bg-brand-50 hover:text-brand-800"
                      }`}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setSubmenu((value) => !value)}
                      aria-expanded={submenu}
                      aria-label="Leistungen aufklappen"
                      className={`rounded-r-lg py-2 pl-1 pr-2.5 transition ${
                        active ? "bg-brand-50 text-brand-800" : "text-ink hover:bg-brand-50"
                      }`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className={`h-4 w-4 transition ${submenu ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  </div>

                  {submenu && (
                    <div className="absolute left-0 top-full w-72 pt-2">
                      <ul className="rounded-2xl border border-brand-100 bg-white p-2 shadow-lg">
                        {services.map((service) => (
                          <li key={service.id}>
                            <Link
                              href={`/leistungen/${service.id}`}
                              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition hover:bg-brand-50 ${
                                pathname === `/leistungen/${service.id}`
                                  ? "bg-brand-50 text-brand-800"
                                  : "text-ink"
                              }`}
                            >
                              <ServiceIcon name={service.icon} className="h-4 w-4 shrink-0 text-brand-600" />
                              {service.title}
                            </Link>
                          </li>
                        ))}
                        <li className="mt-1 border-t border-brand-50 pt-1">
                          <Link
                            href="/leistungen"
                            className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
                          >
                            Alle Leistungen im Überblick →
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active ? "bg-brand-50 text-brand-800" : "text-ink hover:bg-brand-50 hover:text-brand-800"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Ab xl eingeblendet – auf schmaleren Bildschirmen bliebe zu wenig Platz. */}
          <a
            href={telHref}
            className="ml-2 hidden items-center gap-2 whitespace-nowrap rounded-lg border border-brand-200 px-3 py-2 text-sm font-medium text-brand-800 transition hover:bg-brand-50 xl:flex"
          >
            <PhoneIcon className="h-4 w-4" />
            {site.phone}
          </a>
          <Link
            href="/buchung"
            className="ml-1 whitespace-nowrap rounded-lg bg-mint-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-mint-700"
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
        <nav
          id="mobile-nav"
          className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-brand-100 bg-white lg:hidden"
          aria-label="Mobile Navigation"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {nav.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-lg px-3 py-3 text-base font-medium ${
                    isActive(item.href) ? "bg-brand-50 text-brand-800" : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>

                {item.hasSubmenu && (
                  <ul className="ml-3 border-l border-brand-100 pl-3">
                    {services.map((service) => (
                      <li key={service.id}>
                        <Link
                          href={`/leistungen/${service.id}`}
                          className={`block rounded-lg px-3 py-2.5 text-sm ${
                            pathname === `/leistungen/${service.id}`
                              ? "font-semibold text-brand-800"
                              : "text-muted"
                          }`}
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
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
