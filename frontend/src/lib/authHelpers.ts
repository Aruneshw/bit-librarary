import { createClient } from '@/lib/supabase';

/**
 * Retrieves the authorization token for API requests.
 * Prioritizes the RS256 admin bypass token if present in localStorage,
 * falling back to the standard Supabase session access token.
 */
export async function getAuthToken(): Promise<string | null> {
  if (typeof window !== 'undefined') {
    const bypassToken = localStorage.getItem('admin_bypass_token');
    if (bypassToken) {
      // Validate that the token is not expired locally (optional check)
      try {
        const payload = JSON.parse(atob(bypassToken.split('.')[1]));
        if (payload.exp && Date.now() / 1000 > payload.exp) {
          localStorage.removeItem('admin_bypass_token');
        } else {
          return bypassToken;
        }
      } catch {
        localStorage.removeItem('admin_bypass_token');
      }
    }
  }
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token || null;
}
