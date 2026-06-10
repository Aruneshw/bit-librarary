import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

async function getSupabaseStats() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceRoleKey) return null;

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    let totalSize = 0;
    const buckets: { name: string; limit: number }[] = [
      { name: 'pdfs', limit: 200 * 1024 * 1024 },
      { name: 'media', limit: 200 * 1024 * 1024 },
    ];
    const details: Record<string, { size: number; count: number; limit: number }> = {};

    for (const { name, limit } of buckets) {
      const { data: files } = await supabaseAdmin.storage.from(name).list('', { limit: 1000 });
      if (files) {
        const filtered = files.filter((f: any) => !f.id?.endsWith('/'));
        const size = filtered.reduce((acc: number, f: any) => acc + ((f.metadata?.size as number) || 0), 0);
        details[name] = { size, count: filtered.length, limit };
        totalSize += size;
      }
    }

    const totalLimit = buckets.reduce((acc, b) => acc + b.limit, 0);
    return {
      details,
      totalSize,
      totalLimit,
      usedPercent: totalSize > 0 ? Math.round((totalSize / totalLimit) * 100) : 0,
      remaining: Math.max(0, totalLimit - totalSize),
    };
  } catch {
    return null;
  }
}

async function getVercelBlobStats() {
  try {
    const { list } = await import('@vercel/blob');
    const { blobs } = await list();
    const totalSize = blobs.reduce((acc, b) => acc + b.size, 0);
    const planLimit = 1024 * 1024 * 1024; // 1GB Vercel Blob
    return {
      totalSize,
      count: blobs.length,
      totalLimit: planLimit,
      usedPercent: totalSize > 0 ? Math.round((totalSize / planLimit) * 100) : 0,
      remaining: Math.max(0, planLimit - totalSize),
    };
  } catch {
    return null;
  }
}

export async function GET() {
  const hasBlobToken = !!process.env.BLOB_READ_WRITE_TOKEN;

  const [blobStats, supabaseStats] = await Promise.all([
    hasBlobToken ? getVercelBlobStats() : Promise.resolve(null),
    getSupabaseStats(),
  ]);

  return NextResponse.json({
    hasBlobToken,
    storageOptions: ['supabase', 'vercel'],
    defaultStorage: hasBlobToken ? 'vercel' : 'supabase',
    blobStats,
    supabaseStats,
  });
}
