import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: Request) {
  try {
    const { action, pollId } = await request.json();

    if (!action || !pollId) {
      return NextResponse.json({ error: 'action and pollId required' }, { status: 400 });
    }

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: 'Service role not configured' }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    switch (action) {
      case 'close':
        await supabaseAdmin.from('polls').update({ status: 'closed' }).eq('id', pollId);
        break;
      case 'reopen':
        await supabaseAdmin.from('polls').update({ status: 'active' }).eq('id', pollId);
        break;
      case 'delete':
        // Cascade deletes poll_options and poll_votes
        await supabaseAdmin.from('polls').delete().eq('id', pollId);
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
