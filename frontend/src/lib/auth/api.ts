import { NextResponse } from 'next/server';
import type { User } from '@supabase/supabase-js';
import { createSupabaseServerClient } from '@/lib/supabaseServer';
import { canAccessCampus, canAdminister } from './access';
type Result = { user: User; error: null } | { user: null; error: NextResponse };
/** Verify identity and permissions before using a service-role database client. */
export async function requireApiUser(request: Request, adminOnly = false): Promise<Result> {
  const deny = (message: string, status: number): Result => ({ user: null, error: NextResponse.json({ error: message }, { status, headers: { 'Cache-Control': 'private, no-store' } }) });
  try {
    const token = request.headers.get('authorization')?.match(/^Bearer (.+)$/)?.[1];
    const origin = request.headers.get('origin');
    if (!token && !['GET','HEAD','OPTIONS'].includes(request.method) && origin && origin !== new URL(request.url).origin) return deny('Invalid request origin.', 403);
    const client = await createSupabaseServerClient();
    const { data: { user }, error } = await client.auth.getUser(token);
    if (error || !user) return deny('Please sign in.', 401);
    if (!canAccessCampus(user) || (adminOnly && !canAdminister(user))) return deny('You do not have permission for this action.', 403);
    return { user, error: null };
  } catch { return deny('Authentication is temporarily unavailable.', 503); }
}
