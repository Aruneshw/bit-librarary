import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const provider = (formData.get('provider') as string) || 'supabase';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (provider === 'vercel_blob') {
      return handleVercelUpload(file);
    }
    return handleSupabaseUpload(file);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Upload failed' }, { status: 500 });
  }
}

async function handleVercelUpload(file: File) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'Vercel Blob not configured. Add BLOB_READ_WRITE_TOKEN to .env.local' }, { status: 400 });
  }

  const { put } = await import('@vercel/blob');
  const blob = await put(file.name, file, {
    access: 'public',
    addRandomSuffix: true,
  });

  return NextResponse.json({
    url: blob.url,
    provider: 'vercel_blob',
    blobPath: blob.pathname,
    fileSize: file.size,
    mimeType: file.type,
    fileName: file.name,
    storage: 'vercel',
  });
}

async function handleSupabaseUpload(file: File) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ error: 'Supabase credentials not configured' }, { status: 500 });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const isPdf = file.type === 'application/pdf';
  const ext = isPdf ? '.pdf' : (file.type === 'image/jpeg' ? '.jpg' : file.type === 'image/png' ? '.png' : '.bin');
  const bucket = isPdf ? 'pdfs' : 'media';
  const fileName = `${bucket}/${Date.now()}-${Math.random().toString(36).substring(2)}${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  const { data: buckets } = await supabaseAdmin.storage.listBuckets();
  const existing = buckets?.find((b: any) => b.name === bucket);
  if (!existing) {
    await supabaseAdmin.storage.createBucket(bucket, {
      public: true,
      fileSizeLimit: 200 * 1024 * 1024,
      allowedMimeTypes: isPdf ? ['application/pdf'] : ['image/jpeg', 'image/png'],
    });
  } else if (!existing.public) {
    await supabaseAdmin.storage.updateBucket(bucket, { public: true });
  }

  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(fileName, buffer, { contentType: file.type, upsert: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: urlData } = supabaseAdmin.storage.from(bucket).getPublicUrl(fileName);

  return NextResponse.json({
    url: urlData.publicUrl,
    provider: 'supabase',
    blobPath: fileName,
    fileSize: file.size,
    mimeType: file.type,
    fileName: file.name,
    storage: 'supabase',
  });
}
