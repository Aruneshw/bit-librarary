import { createClient } from '@/lib/supabase';
import { getDeviceFingerprint } from './fingerprint';

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

/**
 * Retrieves authorization and security headers including device fingerprint.
 */
export async function getAuthHeaders(): Promise<Record<string, string>> {
  const headers: Record<string, string> = {};
  const token = await getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  // Enforce device fingerprint (Layer 5 requirement)
  const fingerprint = await getDeviceFingerprint();
  headers['x-device-fingerprint'] = fingerprint;
  
  return headers;
}
