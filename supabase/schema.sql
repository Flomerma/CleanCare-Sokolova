-- =====================================================================
-- Supabase-Schema für das Buchungssystem von CleanCare Sokolova
-- ---------------------------------------------------------------------
-- Anwendung:
--   1. Supabase-Projekt erstellen (https://supabase.com)
--   2. SQL Editor öffnen und dieses Skript ausführen
--   3. Projekt-URL und Keys in Vercel als Umgebungsvariablen hinterlegen
--   4. Die vier Funktionen in src/lib/db.ts auf Supabase umstellen
--      (die nötigen Code-Beispiele stehen als Kommentar in der Datei)
-- =====================================================================

create table if not exists public.buchungen (
  id           uuid primary key default gen_random_uuid(),
  leistungen   text[]      not null,
  objekttyp    text        not null check (objekttyp in ('Wohnung', 'Haus', 'Büro')),
  flaeche      integer,
  adresse      text        not null,
  datum        date        not null,
  uhrzeit      text        not null,
  name         text        not null,
  telefon      text        not null,
  email        text        not null,
  nachricht    text,
  status       text        not null default 'offen'
                 check (status in ('offen', 'bestätigt', 'abgeschlossen', 'storniert')),
  erstellt_am  timestamptz not null default now()
);

-- Schneller Zugriff auf die Terminübersicht und die Slot-Prüfung.
create index if not exists buchungen_termin_idx on public.buchungen (datum, uhrzeit);
create index if not exists buchungen_status_idx on public.buchungen (status);

-- ---------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------
-- Der Zugriff erfolgt ausschliesslich serverseitig über den Service-Role-Key
-- (dieser umgeht RLS). Es werden daher bewusst KEINE Policies für anonyme
-- Nutzer angelegt: Ohne Policy kann der öffentliche anon-Key weder lesen
-- noch schreiben.
-- WICHTIG: SUPABASE_SERVICE_ROLE_KEY niemals im Client-Code verwenden.
alter table public.buchungen enable row level security;
