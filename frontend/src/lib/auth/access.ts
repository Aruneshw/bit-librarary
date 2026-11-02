import type { User } from '@supabase/supabase-js';
import { ADMIN_EMAILS } from '../adminEmails';
type Identity = Pick<User, 'email' | 'email_confirmed_at' | 'app_metadata' | 'user_metadata'>;
export function canAdminister(user: Identity): boolean {
  return !!user.email_confirmed_at && (!!user.email && ADMIN_EMAILS.some(email => email === user.email!.toLowerCase()) || user.app_metadata?.role === 'admin');
}
export function canAccessCampus(user: Identity): boolean {
  return !!user.email_confirmed_at && !!user.email && (user.email.toLowerCase().endsWith('@bitsathy.ac.in') || ADMIN_EMAILS.some(email => email === user.email!.toLowerCase()));
}
