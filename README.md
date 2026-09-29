# BugJu.github.io

Meine persönliche Webseite – Portfolio und kleiner Blog.

Hi, ich bin **David Jansen** (BugJu) – Informatik-Student an der TU Berlin.
Auf dieser Seite sammle ich meine Projekte, schreibe hin und wieder über
Dinge, die mich beim Entwickeln beschäftigen, und stelle mich kurz vor.

## Inhalt

- **Start** – kurze Vorstellung
- **Projekte** – eine Auswahl meiner Arbeiten
- **Über mich** – ein paar Worte zu mir
- **Admin** – Mitglieder- und Rollenverwaltung (nur Admins)
- **Kalender** – Terminübersicht mit Anlegen/Löschen (nur Admins)

## Setup (Supabase)

Die Login-, Admin- und Kalender-Bereiche laufen über [Supabase](https://supabase.com).
Benötigt werden in der `.env` (lokal) bzw. als Repository-Secrets (CI):

```
PUBLIC_SUPABASE_URL=...
PUBLIC_SUPABASE_ANON_KEY=...
```

Für den **Kalender** muss die Tabelle samt Row Level Security einmalig angelegt
werden. Die Datei [`supabase/calendar.sql`](supabase/calendar.sql) im
Supabase-Dashboard unter *SQL Editor* ausführen. Die Policies erlauben den
Zugriff ausschließlich Administratoren.

## Links

- GitHub: [github.com/BugJu](https://github.com/BugJu)

---

© BugJu

