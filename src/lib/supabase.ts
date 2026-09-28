import { createClient } from '@supabase/supabase-js';

// PUBLIC_-Variablen werden von Astro an den Browser ausgeliefert.
// Der "anon key" ist bewusst öffentlich – geschützt wird über Supabase RLS.
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;

/** true, sobald beide Umgebungsvariablen gesetzt sind. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  // Nur eine Warnung – damit der statische Build auch ohne .env durchläuft.
  console.warn(
    '[Supabase] PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_ANON_KEY fehlen. ' +
      'Lege eine .env-Datei an (siehe .env.example). Der Login ist erst nach der Konfiguration aktiv.'
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'public-anon-key-placeholder'
);
