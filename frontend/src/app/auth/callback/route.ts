import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabaseServer';
import { isAdminEmail } from '@/lib/adminEmails';
import { safeNextPath, resolvePostLoginPath } from '@/lib/auth/redirect';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const requestedNext = url.searchParams.get('next');
  const next = safeNextPath(requestedNext);
  const fail = (code: string) => {
    const target = new URL('/login', url.origin);
    target.searchParams.set('error', code);
    target.searchParams.set('next', next);
    return NextResponse.redirect(target, { headers: { 'Cache-Control': 'private, no-store' } });
  };
  const code = url.searchParams.get('code');
  if (!code) return fail('auth-callback-failed');
  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) return fail('auth-callback-failed');
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.email_confirmed_at || !user.email ||
        (!user.email.toLowerCase().endsWith('@bitsathy.ac.in') && !isAdminEmail(user.email))) {
      await supabase.auth.signOut();
      return fail('campus-account-required');
    }
    // The Library signup trigger normally creates this row. Handle older accounts too.
    const { data: profile, error: profileError } = await supabase.from('profiles').select('id').eq('id', user.id).maybeSingle();
    if (profileError) return fail('profile-unavailable');
    if (!profile) {
      const { error: insertError } = await supabase.from('profiles').insert({ id: user.id, email: user.email, name: user.user_metadata.full_name || user.user_metadata.name || user.email.split('@')[0] });
      if (insertError && insertError.code !== '23505') return fail('profile-unavailable');
    }
    if (!isAdminEmail(user.email)) await supabase.rpc('increment_login_count', { target_user_id: user.id });
    // Administrators normally sign in with a personal Google account and cannot
    // use the campus-only Hub, so a plain sign-in lands on the admin view.
    const destination = resolvePostLoginPath(requestedNext, isAdminEmail(user.email));
    return NextResponse.redirect(new URL(destination, url.origin), { headers: { 'Cache-Control': 'private, no-store' } });
  } catch { return fail('auth-callback-failed'); }
}
