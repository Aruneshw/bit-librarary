import { StorageProvider, UploadResult } from './types';

const VERCEl_MAX_SIZE = 50 * 1024 * 1024;

export async function uploadFile(
  file: File,
  provider: StorageProvider,
  signal?: AbortSignal
): Promise<UploadResult> {
  if (provider === 'vercel_blob') {
    if (file.size > VERCEl_MAX_SIZE) {
      throw new Error(`Vercel Blob max file size is 50MB. File is ${(file.size / 1024 / 1024).toFixed(1)}MB. Use Supabase for larger files.`);
    }
    return uploadToVercel(file, signal);
  }
  return uploadToSupabase(file, signal);
}

async function uploadToVercel(file: File, signal?: AbortSignal): Promise<UploadResult> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('provider', 'vercel_blob');

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
    signal,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.error || `Upload failed (${res.status})`);
  }

  const data = await res.json();
  return {
    url: data.url,
    provider: 'vercel_blob',
    blobPath: data.blobPath,
    fileSize: file.size,
    mimeType: file.type,
    fileName: file.name,
  };
}

async function uploadToSupabase(file: File, signal?: AbortSignal): Promise<UploadResult> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('provider', 'supabase');

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
    signal,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.error || `Upload failed (${res.status})`);
  }

  const data = await res.json();
  return {
    url: data.url,
    provider: 'supabase',
    blobPath: data.blobPath,
    fileSize: file.size,
    mimeType: file.type,
    fileName: file.name,
  };
}

export async function deleteFile(fileEntry: {
  storage_provider: string;
  blob_path: string | null;
  file_url: string;
}): Promise<void> {
  const res = await fetch('/api/files/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      storage_provider: fileEntry.storage_provider,
      blob_path: fileEntry.blob_path,
      file_url: fileEntry.file_url,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.error || `Delete failed (${res.status})`);
  }
}
