import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const admin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '20'), 1), 100);
    const offset = Math.max(parseInt(url.searchParams.get('offset') || '0'), 0);
    const sortBy = url.searchParams.get('sort') || 'study_time';

    const sortMap: Record<string, string> = {
      study_time: 'js.total_study_seconds DESC NULLS LAST',
      streak: 'js.current_streak DESC NULLS LAST',
      downloads: 'js.total_downloads DESC NULLS LAST',
      active_days: 'js.total_active_days DESC NULLS LAST',
    };

    const orderBy = sortMap[sortBy] || sortMap.study_time;

    const { data, error } = await admin.rpc('get_journey_leaderboard', {
      p_limit: limit,
      p_offset: offset,
    });

    if (error) throw error;

    return NextResponse.json({ entries: data, sortBy, limit, offset });
  } catch (err: any) {
    console.error('Leaderboard error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
