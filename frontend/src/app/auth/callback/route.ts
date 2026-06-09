import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getSupabasePublishableKey } from '@/lib/supabase';
import { isAdminEmail } from '@/lib/adminEmails';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const tokenHash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const requestedNext = searchParams.get('next') ?? '/dashboard';
  const next = requestedNext.startsWith('/') && !requestedNext.startsWith('//')
    ? requestedNext
    : '/dashboard';

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    getSupabasePublishableKey(),
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.delete({ name, ...options });
        },
      },
    }
  );

  // 1. Handle magic link token verification (Bypass Login)
  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type: type as any,
      token_hash: tokenHash,
    });

    if (!error) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.id && !isAdminEmail(user.email)) {
        await supabase.rpc('increment_login_count', { target_user_id: user.id });
      }
      return NextResponse.redirect(`${origin}${next}`);
    } else {
      console.error('Verify OTP error:', error.message);
    }
  }

  // 2. Handle PKCE Code exchange (Google OAuth)
  if (code) {
    const { data: sessionData, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && sessionData?.session?.user?.id) {
      const authUser = sessionData.session.user;
      if (!isAdminEmail(authUser.email)) {
        await supabase.rpc('increment_login_count', { target_user_id: authUser.id });
      }
      return NextResponse.redirect(`${origin}${next}`);
    } else {
      console.error('Exchange code error:', error?.message);
    }
  }

  // Fallback to error redirect
  return NextResponse.redirect(`${origin}/login?error=auth-callback-failed`);
}
