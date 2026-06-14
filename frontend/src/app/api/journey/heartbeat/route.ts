import { createClient } from '@supabase/supabase-js';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifyRS256 } from '@/lib/jwt';
import { PUBLIC_KEY } from '@/lib/keys';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const admin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function getAuthenticatedUser(req: Request) {
  // 1. Try Authorization header
  const authHeader = req.headers.get('Authorization');
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.replace('Bearer ', '');
    try {
      const decoded = verifyRS256(token, PUBLIC_KEY);
      if (decoded && (decoded.sub === 'adminah' || decoded.role === 'admin' || decoded.email === 'aruneshownsty1@gmail.com')) {
        if (decoded.userId) {
          return { id: decoded.userId, email: decoded.email };
        }
      }
    } catch {}

    try {
      const { data: { user } } = await admin.auth.getUser(token);
      if (user) return user;
    } catch {}
  }

  // 2. Try cookies
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      supabaseUrl,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '',
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            try {
              cookieStore.set({ name, value, ...options });
            } catch {}
          },
          remove(name: string, options: CookieOptions) {
            try {
              cookieStore.delete({ name, ...options });
            } catch {}
          },
        },
      }
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (user) return user;
  } catch {}

  return null;
}

export async function POST(req: Request) {
  try {
    const { durationSeconds, trackView, trackDownload } = await req.json();

    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Handle view/download tracking separately from time heartbeat
    if (trackView || trackDownload) {
      const updates: Record<string, unknown> = {};
      if (trackView) updates.total_resources_viewed = admin.rpc('increment_journey_stat', {
        p_user_id: user.id,
        p_column: 'total_resources_viewed',
        p_amount: 1,
      });
      if (trackDownload) updates.total_downloads = admin.rpc('increment_journey_stat', {
        p_user_id: user.id,
        p_column: 'total_downloads',
        p_amount: 1,
      });

      await Promise.all(Object.values(updates));

      const { data: stats } = await admin.rpc('get_user_journey_stats', { p_user_id: user.id });
      return NextResponse.json(stats ?? {});
    }

    const duration = Math.min(Math.max(Math.round(durationSeconds || 0), 0), 3600);

    if (duration <= 0) {
      const { data: stats } = await admin.rpc('get_user_journey_stats', { p_user_id: user.id });
      return NextResponse.json(stats ?? {});
    }

    const { data, error } = await admin.rpc('process_journey_heartbeat', {
      p_user_id: user.id,
      p_seconds: duration,
    });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (err: any) {
    console.error('Heartbeat error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
