import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: 'Supabase credentials not configured' }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const isPdf = file.type === 'application/pdf';
    const ext = isPdf ? '.pdf' : (file.type === 'image/jpeg' ? '.jpg' : '.png');
    const bucket = isPdf ? 'pdfs' : 'media';
    const fileName = `${bucket}/${Date.now()}-${Math.random().toString(36).substring(2)}${ext}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const { data: buckets } = await supabaseAdmin.storage.listBuckets();
    if (!buckets?.find((b: any) => b.name === bucket)) {
      await supabaseAdmin.storage.createBucket(bucket, {
        public: false,
        fileSizeLimit: 200 * 1024 * 1024,
        allowedMimeTypes: isPdf ? ['application/pdf'] : ['image/jpeg', 'image/png'],
      });
    }

    const { error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(fileName, buffer, { contentType: file.type, upsert: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: urlData } = supabaseAdmin.storage.from(bucket).getPublicUrl(fileName);

    return NextResponse.json({ url: urlData.publicUrl, storage: 'supabase' });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Upload failed' }, { status: 500 });
  }
}
