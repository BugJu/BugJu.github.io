import { supabase } from './supabase';

export type Role = 'admin' | 'member';

/**
 * Liest die Rolle des aktuell angemeldeten Nutzers aus der Tabelle
 * `user_roles`. Ist kein Nutzer angemeldet, wird `null` zurückgegeben.
 *
 * Hinweis: Das ist nur Komfort für die UI. Die eigentliche Absicherung
 * passiert in der Datenbank über Row Level Security (RLS) – ein Nutzer
 * kann sich hier nicht "hochschummeln", weil Schreibzugriffe abgelehnt
 * werden, wenn die Rolle nicht passt.
 */
export async function getRole(): Promise<Role | null> {
  const { data: sessionData } = await supabase.auth.getSession();
  const user = sessionData.session?.user;
  if (!user) return null;

  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error || !data) return 'member';
  return (data.role as Role) ?? 'member';
}

/** true, wenn der aktuell angemeldete Nutzer Admin ist. */
export async function isAdmin(): Promise<boolean> {
  return (await getRole()) === 'admin';
}
