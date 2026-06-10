import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { fileId, storage_provider, blob_path, file_url, post_id } = await request.json();

    if (!storage_provider || (!blob_path && !file_url)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: 'Not configured' }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Delete from storage provider
    if (storage_provider === 'supabase' && blob_path) {
      const bucket = blob_path.startsWith('pdfs/') ? 'pdfs' : 'media';
      const path = blob_path.startsWith('pdfs/') || blob_path.startsWith('media/') ? blob_path : blob_path;
      await supabaseAdmin.storage.from(bucket).remove([path]);
    } else if (storage_provider === 'vercel_blob' && blob_path) {
      try {
        const { del } = await import('@vercel/blob');
        await del(blob_path);
      } catch {
        // Try with full URL
        try {
          const { del } = await import('@vercel/blob');
          await del(file_url);
        } catch {}
      }
    }

    // Soft-delete from file_metadata
    if (fileId) {
      await supabaseAdmin
        .from('file_metadata')
        .update({ is_active: false })
        .eq('id', fileId);
    }

    // Clear file_url and blob_path on the post
    if (post_id) {
      await supabaseAdmin
        .from('admin_posts')
        .update({
          file_url: null,
          blob_path: null,
          image_url: null,
          pdf_url: null,
          storage_provider: null,
          file_size: null,
          mime_type: null,
        })
        .eq('id', post_id);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Delete failed' }, { status: 500 });
  }
}
