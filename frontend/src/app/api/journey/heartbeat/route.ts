import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const admin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

export async function POST(req: Request) {
  try {
    const { durationSeconds, trackView, trackDownload } = await req.json();

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authErr } = await admin.auth.getUser(token);
    if (authErr || !user) {
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
