# BugJu.github.io

My Personal Github Pages Page

## Login / geschützter Mitgliederbereich

Die Seite läuft als **statisches** Astro-Projekt auf GitHub Pages. Echte
serverseitige Anmeldung ist hier nicht möglich - der Login läuft daher über
**Supabase Auth**:

- **Login-Seite:** `/login` (E-Mail + Passwort)
- **Geschützter Bereich:** `/members`
- Der Inhalt des geschützten Bereichs kommt aus der Supabase-Tabelle
  `members_content` und ist dort per **Row Level Security (RLS)** nur für
  angemeldete Nutzer lesbar.

> Wichtig: Bei statischem Hosting ist die Seitenhülle öffentlich, der
> Inhalt wird erst nach dem Login aus Supabase geladen und ist damit echt
> geschützt.

### 1. Supabase-Projekt anlegen

1. Auf supabase.com ein kostenloses Projekt erstellen.
2. Unter **Project Settings -> API** die **Project URL** und den
   **anon public** Key kopieren (NICHT den `service_role`-Key!).

### 2. Umgebungsvariablen setzen

`env.example` nach `.env` kopieren und die Werte eintragen:

```bash
PUBLIC_SUPABASE_URL=https://DEle* öffentlich, der
> *Inhalt* wird erst nach dem Login aus Supabase geladen und ist damit echt
> geschützt.

### 1. Supabase-Projekt anlegen

1. Auf supabase.com ein kostenloses Projekt erstellen.
2. Unter **Project Settings -> API** die **Project URL** und den
   **anon public** Key kopieren (NICHT den `service_role`-Key!).

### 2. Umgebungsvariablen setzen

`env.example` nach `.env` kopieren und die Werte eintragen:

```bash
PUBLIC_SUPABASE_URL=https://DEIN-PROJEKT.supabase.co
PUBLIC_SUPABASE_ANON_KEY=DEIN_ANON_KEY
```

Die `.env` ist bereits in `.gitignore` und wird **nicht** committet. Beim
Deploy (z. B. GitHub Actions) müssen diese Variablen als Build-Variablen
hinterlegt werden - der anon-Key darf öffentlich sein.

### 3. Nutzer anlegen (invite-only)

Da nur du + 2-3 Personen Zugang brauchen, ist eine offene Registrierung nicht
nötig:

1. In Supabase unter **Authentication -> Providers** den E-Mail-Provider aktiv
   lassen.
2. Unter **Authentication -> Users** die Nutzer manuell anlegen
   ("Add user" / "Invite user").
3. Optional: Unter **Authentication -> Sign In / Providers** die
   Selbst-Registrierung deaktivieren, damit sich niemand fremdes anmelden kann.

### 4. Tabelle für die geschützten Inhalte + RLS

Im Supabase **SQL Editor** ausführen:

```sql
-- Tabelle für die internen Inhalte
create table public.members_content (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text,
  created_at timestamptz not null default now()
);

-- RLS aktivieren
alter table public.members_content enable row level security;

-- Nur angemeldete Nutzer dürfen lesen
create policy "Read for authenticated users"
  on public.members_content
  forIN-PROJEKT.supabase.co
PUBLIC_SUPABASE_ANON_KEY=DEIN_ANON_KEY
```

Die `.env` ist bereits in `.gitignore` und wird **nicht** committet. Beim
Deploy (z. B. GitHub Actions) müssen diese Variablen als Build-Variablen
hinterlegt werden - der anon-Key darf öffentlich sein.

### 3. Nutzer anlegen (invite-only)

Da nur du + 2-3 Personen Zugang brauchen, ist eine offene Registrierung nicht
nötig:

1. In Supabase unter **Authentication -> Providers** den E-Mail-Provider aktiv
   lassen.
2. Unter **Authentication -> Users** die Nutzer manuell anlegen
   ("Add user" / "Invite user").
3. Optional: Unter **Authentication -> Sign In / Providers** die
   Selbst-Registrierung deaktivieren, damit sich niemand fremdes anmelden kann.

### 4. Tabelle für die geschützten Inhalte + RLS

Im Supabase **SQL Editor** ausführen:

```sql
-- Tabelle für die internen Inhalte
create table public.members_content (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text,
  created_at timestamptz not null default now()
);

-- RLS aktivieren
alter table public.members_content enable row level security;

-- Nur angemeldete Nutzer dürfen lesen
create policy "Read for authenticated users"
  on public.members_content
  for select
  to authenticated
  using (true);
```

Inhalte kannst du dort direkt über den Table-Editor anlegen. Sie erscheinen
automatisch im Mitgliederbereich.

### 5. Lokal testen

```bash
npm install
npm run dev
```

Dann `http://localhost:4321/login` aufrufen und mit einem angelegten Nutzer
anmelden.

### 6. Deployen

```bash
npm run build
```

Den Inhalt von `dist/` auf GitHub Pages veröffentlichen (z. B. per
`gh-pages`-Branch oder GitHub-Actions-Workflow). Stelle sicher, dass
`PUBLIC_SUPABASE_URL` und `PUBLIC_SUP select
  to authenticated
  using (true);
```

Inhalte kannst du dort direkt über den Table-Editor anlegen. Sie erscheinen
automatisch im MitgliederABASE_ANON_KEY` zur Build-Zeit gesetzt
sind, da sie in das Client-Bundle eingebaut werden.
