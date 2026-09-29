-- ============================================================
-- Kalender: Tabelle + Row Level Security (nur Admins)
--
-- Einmalig im Supabase-Dashboard ausfuehren:
--   Dashboard -> SQL Editor -> New query -> Inhalt einfuegen -> Run
-- ============================================================

-- 1) Tabelle fuer Termine -------------------------------------
create table if not exists public.calendar_entries (
  id         uuid primary key default gen_random_uuid(),
  title      text not null check (length(trim(title)) > 0),
  event_date date not null,
  start_time time,
  note       text,
  created_by uuid default auth.uid() references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists calendar_entries_date_idx
  on public.calendar_entries (event_date);

-- 2) Row Level Security aktivieren ----------------------------
alter table public.calendar_entries enable row level security;

-- 3) Hilfsfunktion: ist der aktuelle Nutzer Admin? ------------
--    SECURITY DEFINER, damit die Pruefung die RLS auf user_roles
--    umgeht (sonst koennte die Policy sich selbst blockieren).
--    Falls bereits eine gleichnamige Funktion existiert, wird sie
--    durch eine identische Definition ersetzt.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = auth.uid()
      and role = 'admin'
  );
$$;

-- 4) Policies: ausschliesslich Admins duerfen zugreifen --------
drop policy if exists "calendar_select_admin" on public.calendar_entries;
drop policy if exists "calendar_insert_admin" on public.calendar_entries;
drop policy if exists "calendar_update_admin" on public.calendar_entries;
drop policy if exists "calendar_delete_admin" on public.calendar_entries;

create policy "calendar_select_admin"
  on public.calendar_entries for select
  using (public.is_admin());

create policy "calendar_insert_admin"
  on public.calendar_entries for insert
  with check (public.is_admin());

create policy "calendar_update_admin"
  on public.calendar_entries for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "calendar_delete_admin"
  on public.calendar_entries for delete
  using (public.is_admin());
