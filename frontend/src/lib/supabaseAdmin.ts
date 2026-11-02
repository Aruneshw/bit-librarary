import 'server-only';
import { createClient } from '@supabase/supabase-js';

/**
 * Service-role Supabase client for server routes only. It is used to read
 * profile names/visibility and the project XP policy, and to deliver approval
 * notifications. Project records themselves live in Neon.
 */
export function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
