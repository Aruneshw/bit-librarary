'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import { FileEntry } from '@/lib/storage/types';

function formatSize(bytes: number): string {
  if (bytes >= 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${bytes} B`;
}

export default function FileManager() {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'supabase' | 'vercel_blob'>('all');
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchFiles = async () => {
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from('file_metadata')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (data) setFiles(data as unknown as FileEntry[]);
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleDelete = async (entry: FileEntry) => {
    if (!confirm(`Delete ${entry.file_name}? This will remove the file from storage.`)) return;
    setDeleting(entry.id);
    try {
      await fetch('/api/files/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileId: entry.id,
          storage_provider: entry.storage_provider,
          blob_path: entry.blob_path || entry.file_url,
          file_url: entry.file_url,
          post_id: entry.post_id,
        }),
      });
      setFiles((prev) => prev.filter((f) => f.id !== entry.id));
    } catch {} finally {
      setDeleting(null);
    }
  };

  const filtered = filter === 'all' ? files : files.filter((f) => f.storage_provider === filter);

  return (
    <div className="bg-black/40 border border-arc-blue/20 rounded-xl backdrop-blur-md overflow-hidden shadow-[0_0_30px_rgba(0,217,255,0.05)]">
      <div className="p-5 border-b border-arc-blue/20 bg-arc-blue/5">
        <h2 className="font-orbitron text-lg text-white tracking-wider flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-arc-blue">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          File Manager
        </h2>
        <div className="flex gap-2 mt-3">
          {(['all', 'supabase', 'vercel_blob'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-[10px] font-orbitron tracking-wider rounded border transition-all ${
                filter === f
                  ? 'bg-arc-blue/20 border-arc-blue text-arc-blue'
                  : 'border-arc-blue/20 text-white/40 hover:text-white/70'
              }`}
            >
              {f === 'all' ? 'All' : f === 'supabase' ? 'Supabase' : 'Vercel Blob'}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center font-mono text-white/40 animate-pulse">Loading files...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center font-mono text-white/30">No files found.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-arc-blue/20 bg-black/50 text-arc-blue/70 font-orbitron text-[10px] tracking-widest uppercase">
                <th className="p-3 pl-5">File Name</th>
                <th className="p-3">Provider</th>
                <th className="p-3">Size</th>
                <th className="p-3">Uploaded</th>
                <th className="p-3 text-right pr-5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-arc-blue/10">
              {filtered.map((entry, i) => (
                <motion.tr
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.02 * i }}
                  key={entry.id}
                  className="hover:bg-arc-blue/5 transition-colors group"
                >
                  <td className="p-3 pl-5">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${entry.mime_type === 'application/pdf' ? 'text-warning-red' : 'text-arc-blue'}`}>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                      </svg>
                      <span className="font-mono text-xs text-white/80 truncate max-w-[200px] sm:max-w-xs">{entry.file_name}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono rounded ${
                      entry.storage_provider === 'vercel_blob'
                        ? 'text-amber-400 border border-amber-400/30 bg-amber-400/10'
                        : 'text-arc-blue border border-arc-blue/30 bg-arc-blue/10'
                    }`}>
                      {entry.storage_provider === 'vercel_blob' ? 'Vercel' : 'Supabase'}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-xs text-white/50">{formatSize(entry.file_size)}</td>
                  <td className="p-3 font-mono text-[10px] text-white/40">
                    {new Date(entry.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-3 pr-5 text-right">
                    <button
                      onClick={() => handleDelete(entry)}
                      disabled={deleting === entry.id}
                      className="text-white/30 hover:text-warning-red transition-colors p-1 disabled:opacity-30"
                      title="Delete file"
                    >
                      {deleting === entry.id ? (
                        <span className="animate-pulse">...</span>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        </svg>
                      )}
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="px-5 py-2.5 border-t border-arc-blue/10">
        <p className="font-mono text-[10px] text-white/30">
          {files.length} file{files.length !== 1 ? 's' : ''} total
          {filter !== 'all' && ` (${filtered.length} ${filter})`}
        </p>
      </div>
    </div>
  );
}
