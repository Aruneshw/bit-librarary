import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { pollId, question, endDate, multipleChoice, anonymous, showLiveResults, options } = body;

    if (!pollId) {
      return NextResponse.json({ error: 'pollId required' }, { status: 400 });
    }

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: 'Service role not configured' }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Verify poll exists
    const { data: existingPoll, error: pollErr } = await supabaseAdmin
      .from('polls')
      .select('id')
      .eq('id', pollId)
      .single();

    if (pollErr || !existingPoll) {
      return NextResponse.json({ error: 'Poll not found' }, { status: 404 });
    }

    // Update poll fields
    const updates: Record<string, unknown> = {};
    if (question !== undefined) updates.question = question;
    if (endDate !== undefined) updates.end_date = endDate || null;
    if (multipleChoice !== undefined) updates.multiple_choice = multipleChoice;
    if (anonymous !== undefined) updates.anonymous = anonymous;
    if (showLiveResults !== undefined) updates.show_live_results = showLiveResults;

    if (Object.keys(updates).length > 0) {
      const { error: updateErr } = await supabaseAdmin
        .from('polls')
        .update(updates)
        .eq('id', pollId);

      if (updateErr) throw new Error(updateErr.message);
    }

    // Handle options: delete removed ones, add new ones, update existing
    if (options !== undefined && Array.isArray(options)) {
      // Get existing options
      const { data: existingOptions } = await supabaseAdmin
        .from('poll_options')
        .select('id')
        .eq('poll_id', pollId);

      const existingIds = new Set((existingOptions ?? []).map((o) => o.id));
      const incomingIds = new Set(options.filter((o: any) => o.id).map((o: any) => o.id));

      // Delete options that were removed
      const toDelete = [...existingIds].filter((id) => !incomingIds.has(id));
      if (toDelete.length > 0) {
        const { error: delErr } = await supabaseAdmin
          .from('poll_options')
          .delete()
          .eq('poll_id', pollId)
          .in('id', toDelete);
        if (delErr) throw new Error('Cannot remove option with existing votes');
      }

      // Upsert remaining options
      for (let i = 0; i < options.length; i++) {
        const opt = options[i];
        if (!opt.option_text?.trim()) continue;

        if (opt.id && existingIds.has(opt.id)) {
          // Update existing
          const { error: updOptErr } = await supabaseAdmin
            .from('poll_options')
            .update({ option_text: opt.option_text.trim(), sort_order: i })
            .eq('id', opt.id);
          if (updOptErr) throw updOptErr;
        } else {
          // Insert new
          const { error: insOptErr } = await supabaseAdmin
            .from('poll_options')
            .insert({ poll_id: pollId, option_text: opt.option_text.trim(), sort_order: i });
          if (insOptErr) throw insOptErr;
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Poll edit error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
