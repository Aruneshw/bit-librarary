import { NextResponse } from 'next/server';

export async function GET() {
  const hasBlobToken = !!process.env.BLOB_READ_WRITE_TOKEN;

  let blobStats = null;
  if (hasBlobToken) {
    try {
      const { list } = await import('@vercel/blob');
      const { blobs } = await list();
      const totalSize = blobs.reduce((acc, b) => acc + b.size, 0);
      const planLimit = 500 * 1024 * 1024;
      blobStats = {
        totalSize,
        count: blobs.length,
        totalLimit: planLimit,
        usedPercent: totalSize > 0 ? Math.round((totalSize / planLimit) * 100) : 0,
        remaining: Math.max(0, planLimit - totalSize),
      };
    } catch {
      blobStats = { totalSize: 0, count: 0, totalLimit: 524288000, usedPercent: 0, remaining: 524288000 };
    }
  }

  return NextResponse.json({
    hasBlobToken,
    storageOptions: ['supabase', 'vercel'],
    defaultStorage: hasBlobToken ? 'vercel' : 'supabase',
    blobStats,
  });
}
