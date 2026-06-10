export type StorageProvider = 'supabase' | 'vercel_blob';

export interface UploadResult {
  url: string;
  provider: StorageProvider;
  blobPath?: string;
  fileSize: number;
  mimeType: string;
  fileName: string;
}

export interface StorageStats {
  totalSize: number;
  count: number;
  totalLimit: number;
  usedPercent: number;
  remaining: number;
}

export interface SupabaseBucketDetails {
  size: number;
  count: number;
  limit: number;
}

export interface SupabaseStats extends StorageStats {
  details: Record<string, SupabaseBucketDetails>;
}

export interface StorageConfig {
  hasBlobToken: boolean;
  storageOptions: StorageProvider[];
  defaultStorage: StorageProvider;
  blobStats: StorageStats | null;
  supabaseStats: SupabaseStats | null;
}

export interface FileEntry {
  id: string;
  post_id: string | null;
  file_name: string;
  file_url: string;
  storage_provider: StorageProvider;
  bucket: string | null;
  blob_path: string | null;
  file_size: number;
  mime_type: string | null;
  download_count: number;
  created_at: string;
}
