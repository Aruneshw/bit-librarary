import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { demoAllowed } from '@/lib/auth/redirect';

/** Refresh the shared browser/server session before protected pages render. */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return new NextResponse('Authentication is not configured.', { status: 503 });
  if (request.nextUrl.pathname === '/hub' && request.nextUrl.searchParams.get('demo') === '1' && demoAllowed(process.env.NODE_ENV, process.env.NEXT_PUBLIC_HUB_DEMO_ENABLED)) return response;
  const loginRedirect = (carry: NextResponse) => {
    const target = request.nextUrl.clone();
    target.pathname = '/login'; target.search = '';
    target.searchParams.set('next', request.nextUrl.pathname + request.nextUrl.search);
    const redirect = NextResponse.redirect(target);
    carry.cookies.getAll().forEach(cookie => redirect.cookies.set(cookie));
    redirect.headers.set('Cache-Control', 'private, no-store');
    return redirect;
  };
  // A visitor with no Supabase session cookie cannot possibly be signed in, so
  // redirect without spending a network round trip verifying a nonexistent token.
  const hasSessionCookie = request.cookies.getAll().some(cookie => cookie.name.startsWith('sb-'));
  if (!hasSessionCookie && request.nextUrl.pathname !== '/login') return loginRedirect(response);
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user && request.nextUrl.pathname !== '/login') return loginRedirect(response);
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}
export const config = { matcher: ['/hub/:path*', '/login', '/dashboard', '/journey', '/admin', '/events', '/subject/:path*'] };
