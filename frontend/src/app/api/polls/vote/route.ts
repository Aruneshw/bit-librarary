import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: Request) {
  try {
    const { pollId, optionIds, userId } = await request.json();

    if (!pollId || !optionIds?.length || !userId) {
      return NextResponse.json({ error: 'pollId, optionIds[], and userId required' }, { status: 400 });
    }

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: 'Service role not configured' }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Get poll
    const { data: poll, error: pollErr } = await supabaseAdmin
      .from('polls')
      .select('id, status, multiple_choice, end_date')
      .eq('id', pollId)
      .single();

    if (pollErr || !poll) {
      return NextResponse.json({ error: 'Poll not found' }, { status: 404 });
    }

    if (poll.status !== 'active') {
      return NextResponse.json({ error: 'Poll is closed' }, { status: 400 });
    }

    if (poll.end_date && new Date(poll.end_date) < new Date()) {
      return NextResponse.json({ error: 'Poll has ended' }, { status: 400 });
    }

    // Verify option IDs belong to this poll
    const { data: validOptions } = await supabaseAdmin
      .from('poll_options')
      .select('id')
      .eq('poll_id', pollId)
      .in('id', optionIds);

    if (!validOptions || validOptions.length !== optionIds.length) {
      return NextResponse.json({ error: 'Invalid option(s)' }, { status: 400 });
    }

    if (!poll.multiple_choice && optionIds.length > 1) {
      return NextResponse.json({ error: 'Single-choice poll: select only one option' }, { status: 400 });
    }

    if (poll.multiple_choice && optionIds.length > 20) {
      return NextResponse.json({ error: 'Too many selections' }, { status: 400 });
    }

    // Check existing votes
    const { data: existingVotes } = await supabaseAdmin
      .from('poll_votes')
      .select('option_id')
      .eq('poll_id', pollId)
      .eq('user_id', userId);

    if (!poll.multiple_choice && existingVotes && existingVotes.length > 0) {
      return NextResponse.json({ error: 'Already voted' }, { status: 409 });
    }

    // For single-choice: also check if already voted via unique constraint (rollback on conflict)
    const { error: insertErr } = await supabaseAdmin
      .from('poll_votes')
      .insert(
        optionIds.map((oid: string) => ({
          poll_id: pollId,
          option_id: oid,
          user_id: userId,
        }))
      );

    if (insertErr) {
      if (insertErr.code === '23505') {
        return NextResponse.json({ error: 'Already voted' }, { status: 409 });
      }
      return NextResponse.json({ error: insertErr.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
