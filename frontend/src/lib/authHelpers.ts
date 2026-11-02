import { createClient } from '@/lib/supabase';
import { getDeviceFingerprint } from './fingerprint';
/** Only Supabase-issued sessions can authorize API calls. */
export async function getAuthToken(): Promise<string | null> {
  if (typeof window !== 'undefined') localStorage.removeItem('admin_bypass_token');
  const { data: { session } } = await createClient().auth.getSession();
  return session?.access_token || null;
}
export async function getAuthHeaders(): Promise<Record<string, string>> {
  const token = await getAuthToken();
  const fingerprint = await getDeviceFingerprint();
  return { ...(token ? { Authorization: `Bearer ${token}` } : {}), 'x-device-fingerprint': fingerprint };
}
