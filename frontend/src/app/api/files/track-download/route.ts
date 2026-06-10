import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: Request) {
  try {
    const { fileUrl } = await request.json();
    if (!fileUrl) {
      return NextResponse.json({ error: 'fileUrl required' }, { status: 400 });
    }

    if (!supabaseUrl || !serviceRoleKey) {
      // Fallback: try with anon client
      const { createClient: createAnon } = await import('@/lib/supabase');
      const supabase = createAnon();
      const { data } = await supabase
        .from('file_metadata')
        .select('id')
        .eq('file_url', fileUrl)
        .eq('is_active', true)
        .maybeSingle();
      if (data) {
        await supabase.rpc('increment_file_download', { file_id: data.id });
      }
      return NextResponse.json({ tracked: !!data });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data: file, error: findErr } = await supabaseAdmin
      .from('file_metadata')
      .select('id')
      .eq('file_url', fileUrl)
      .eq('is_active', true)
      .maybeSingle();

    if (findErr || !file) {
      return NextResponse.json({ tracked: false, error: findErr?.message || 'File not found' });
    }

    const { error: rpcErr } = await supabaseAdmin.rpc('increment_file_download', {
      file_id: file.id,
    });

    if (rpcErr) {
      return NextResponse.json({ tracked: false, error: rpcErr.message }, { status: 500 });
    }

    return NextResponse.json({ tracked: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
