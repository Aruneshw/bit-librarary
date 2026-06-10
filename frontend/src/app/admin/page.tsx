'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';
import { sumNonAdminLoginCount } from '@/lib/adminEmails';
import FileManager from '@/components/admin/FileManager';
import AnalyticsCarousel from '@/components/admin/AnalyticsCarousel';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  department: string;
  login_count: number;
  created_at: string;
  app_installed?: boolean;
}

interface StorageStats {
  pdfs: { size: number; count: number; limit?: number };
  media: { size: number; count: number; limit?: number };
  totalSize: number;
  totalLimit: number;
  usedPercent: number;
  remaining: number;
}

interface UserFeedback {
  id: string;
  user_id: string;
  message: string;
  created_at: string;
  reply?: string | null;
  replied_at?: string | null;
  reply_read?: boolean;
  is_broadcast?: boolean;
  profiles?: {
    name: string | null;
    email: string;
  };
}

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAdmin, isLoading, fetchUser } = useAuthStore();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [feedbacks, setFeedbacks] = useState<UserFeedback[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);
  const [onlineUserIds, setOnlineUserIds] = useState<string[]>([]);
  const [systemMetrics, setSystemMetrics] = useState<{ totalUsers: number; totalVisits: number } | null>(null);
  const [replyingFeedbackId, setReplyingFeedbackId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [postVideoUrl, setPostVideoUrl] = useState('');
  const [postImageUrl, setPostImageUrl] = useState('');
  const [postMediaFile, setPostMediaFile] = useState<File | null>(null);
  const [postDownloadable, setPostDownloadable] = useState(true);
  const [posting, setPosting] = useState(false);
  const [postMessage, setPostMessage] = useState('');
  const [storageStats, setStorageStats] = useState<StorageStats | null>(null);
  const [blobStats, setBlobStats] = useState<{ totalSize: number; count: number; totalLimit: number; usedPercent: number; remaining: number } | null>(null);
  const [supabaseStats, setSupabaseStats] = useState<{
    totalSize: number; count: number; totalLimit: number; usedPercent: number; remaining: number;
    details?: Record<string, { size: number; count: number; limit: number }>
  } | null>(null);
  const [storageProvider, setStorageProvider] = useState<'supabase' | 'vercel_blob'>('supabase');
  const [hasBlobToken, setHasBlobToken] = useState(false);
  const [userSearch, setUserSearch] = useState('');

  const fetchSystemMetrics = useCallback(async () => {
    const supabase = createClient();
    const { data, error } = await supabase.rpc('get_system_metrics');
    if (!error && data) {
      setSystemMetrics({
        totalUsers: Number(data.total_users) || 0,
        totalVisits: Number(data.total_visits) || 0,
      });
      return;
    }

    const { data: profiles } = await supabase.from('profiles').select('email, login_count');
    if (profiles) {
      setSystemMetrics({
        totalUsers: profiles.length,
        totalVisits: sumNonAdminLoginCount(profiles),
      });
    }
  }, []);

  const fetchStorageConfig = useCallback(async () => {
    try {
      const res = await fetch('/api/storage-config');
      if (res.ok) {
        const config = await res.json();
        setHasBlobToken(config.hasBlobToken);
        if (config.hasBlobToken) {
          setStorageProvider(localStorage.getItem('admin_storage_provider') as 'supabase' | 'vercel_blob' || 'supabase');
        }
        if (config.blobStats) setBlobStats(config.blobStats);
        if (config.supabaseStats) {
          setSupabaseStats(config.supabaseStats);
          setStorageStats({
            pdfs: config.supabaseStats.details?.pdfs || { size: 0, count: 0 },
            media: config.supabaseStats.details?.media || { size: 0, count: 0 },
            totalSize: config.supabaseStats.totalSize,
            totalLimit: config.supabaseStats.totalLimit,
            usedPercent: config.supabaseStats.usedPercent,
            remaining: config.supabaseStats.remaining,
          });
        }
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!isLoading) {
      if (!isAdmin) {
        router.replace('/dashboard');
      } else {
        fetchUsers();
        fetchFeedbacks();
        fetchSystemMetrics();
        fetchStorageConfig();
      }
    }
  }, [isAdmin, isLoading, router, fetchSystemMetrics, fetchStorageConfig]);

  useEffect(() => {
    if (!isAdmin) return;

    const supabase = createClient();

    const metricsChannel = supabase
      .channel('admin-system-metrics')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'profiles' },
        () => {
          fetchSystemMetrics();
          fetchUsers();
        }
      )
      .subscribe();

    const presenceChannel = supabase.channel('online-users', {
      config: {
        presence: {
          key: user?.id || 'admin',
        },
      },
    });

    presenceChannel
      .on('presence', { event: 'sync' }, () => {
        const state = presenceChannel.presenceState();
        const onlineIds = Object.keys(state);
        setOnlineUserIds(onlineIds);
      })
      .subscribe(async (status: string) => {
        if (status === 'SUBSCRIBED' && user) {
          await presenceChannel.track({
            online_at: new Date().toISOString(),
            name: user.name || user.email,
          });
        }
      });

    const storageInterval = setInterval(() => fetchStorageConfig(), 30000);

    return () => {
      supabase.removeChannel(metricsChannel);
      supabase.removeChannel(presenceChannel);
      clearInterval(storageInterval);
    };
  }, [isAdmin, user, fetchSystemMetrics, fetchStorageConfig]);

  const fetchUsers = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && !error) {
      setUsers(data as UserProfile[]);
    }
    setLoadingUsers(false);
  };

  const fetchFeedbacks = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('user_feedbacks')
      .select('*, profiles(name, email)')
      .order('created_at', { ascending: false });

    if (data && !error) {
      setFeedbacks(data as unknown as UserFeedback[]);
    }
    setLoadingFeedbacks(false);
  };

  const handleDeleteFeedback = async (id: string) => {
    const supabase = createClient();
    await supabase.from('user_feedbacks').delete().eq('id', id);
    setFeedbacks(feedbacks.filter(f => f.id !== id));
  };

  const handleSendReply = async (e: React.FormEvent, feedbackId: string) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const supabase = createClient();
    const { error } = await supabase
      .from('user_feedbacks')
      .update({
        reply: replyText.trim(),
        replied_at: new Date().toISOString(),
        reply_read: false,
      })
      .eq('id', feedbackId);

    if (!error) {
      setFeedbacks(feedbacks.map(f => f.id === feedbackId ? {
        ...f,
        reply: replyText.trim(),
        replied_at: new Date().toISOString(),
        reply_read: false,
      } : f));
      setReplyingFeedbackId(null);
      setReplyText('');
    } else {
      console.error('Failed to save reply:', error);
    }
  };

  const handleToggleBroadcast = async (feedbackId: string, currentBroadcast: boolean) => {
    const supabase = createClient();

    if (!currentBroadcast) {
      await supabase
        .from('user_feedbacks')
        .update({ is_broadcast: false })
        .eq('is_broadcast', true);
    }

    const { error } = await supabase
      .from('user_feedbacks')
      .update({ is_broadcast: !currentBroadcast })
      .eq('id', feedbackId);

    if (!error) {
      setFeedbacks(feedbacks.map(f => f.id === feedbackId ? {
        ...f,
        is_broadcast: !currentBroadcast
      } : f));
    } else {
      console.error('Failed to toggle broadcast:', error);
    }
  };

  const uploadMediaForPost = async (): Promise<{ url: string | null; type: 'image' | 'pdf' | null }> => {
    if (!postMediaFile) return { url: null, type: null };
    const isPdf = postMediaFile.type === 'application/pdf';
    const vercelMaxSize = 50 * 1024 * 1024;

    const uploadTo = async (endpoint: string, provider: string, signal?: AbortSignal): Promise<{ url: string; storage: string }> => {
      const formData = new FormData();
      formData.append('file', postMediaFile);
      formData.append('provider', provider);
      const res = await fetch(endpoint, { method: 'POST', body: formData, signal });
      if (res.ok) return res.json();
      const errBody = await res.json().catch(() => null);
      throw new Error(errBody?.error || `Upload failed (${res.status})`);
    };

    if (storageProvider === 'vercel_blob' && hasBlobToken && postMediaFile.size <= vercelMaxSize) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 120000);
        const result = await uploadTo('/api/upload', 'vercel_blob', controller.signal);
        clearTimeout(timeout);
        return { url: result.url, type: isPdf ? 'pdf' : 'image' };
      } catch (e: any) {
        if (e.name === 'AbortError') throw new Error('Upload timed out. For large files, switch to Supabase.');
        throw e;
      }
    }

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 300000);
      const result = await uploadTo('/api/upload', 'supabase', controller.signal);
      clearTimeout(timeout);
      return { url: result.url, type: isPdf ? 'pdf' : 'image' };
    } catch (e: any) {
      if (e.name === 'AbortError') throw new Error('Upload timed out. Check your connection.');
      throw e;
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postBody.trim()) return;

    setPosting(true);
    setPostMessage('');
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const supabase = createClient();

    try {
      setPostMessage('Uploading media...');
      const { url: mediaUrl, type: mediaType } = await uploadMediaForPost();
      if (postMediaFile && !mediaUrl) {
        setPostMessage('Failed to upload media. File may be too large for storage.');
        setPosting(false);
        return;
      }
      const finalImageUrl = mediaType === 'image' ? mediaUrl : (postImageUrl.trim() || null);
      const finalPdfUrl = mediaType === 'pdf' ? mediaUrl : null;
      const usedProvider = postMediaFile ? storageProvider : null;

      setPostMessage('Publishing post...');

      if (apiUrl) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 30000);
          const res = await fetch(`${apiUrl}/posts`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${session.access_token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: postTitle.trim() || null,
              body: postBody.trim(),
              video_url: postVideoUrl.trim() || null,
              image_url: finalImageUrl,
              pdf_url: finalPdfUrl,
              downloadable: postDownloadable,
              storage_provider: usedProvider,
              file_url: mediaUrl,
              file_size: postMediaFile?.size || null,
              mime_type: postMediaFile?.type || null,
            }),
            signal: controller.signal,
          });
          clearTimeout(timeout);
          if (res.ok) {
            if (postMediaFile && mediaUrl) {
              await supabase.from('file_metadata').insert({
                file_name: postMediaFile.name,
                file_url: mediaUrl,
                storage_provider: storageProvider,
                bucket: storageProvider === 'supabase' ? (postMediaFile.type === 'application/pdf' ? 'pdfs' : 'media') : null,
                blob_path: mediaUrl,
                file_size: postMediaFile.size,
                mime_type: postMediaFile.type,
              });
            }
            setPostTitle('');
            setPostBody('');
            setPostVideoUrl('');
            setPostImageUrl('');
            setPostMediaFile(null);
            setPostDownloadable(true);
            setPostMessage('Post published to all users.');
            setPosting(false);
            fetchStorageConfig();
            return;
          }
          const errBody = await res.json().catch(() => null);
          throw new Error(errBody?.error?.message || `Server error (${res.status})`);
        }
        throw new Error('No auth session — try logging in again');
      }

      const { error } = await supabase.from('admin_posts').insert({
        title: postTitle.trim() || null,
        body: postBody.trim(),
        video_url: postVideoUrl.trim() || null,
        image_url: finalImageUrl,
        pdf_url: finalPdfUrl,
        downloadable: postDownloadable,
        created_by: user?.id,
        storage_provider: usedProvider,
        file_url: mediaUrl,
        file_size: postMediaFile?.size || null,
        mime_type: postMediaFile?.type || null,
      });

      if (!error) {
        if (postMediaFile && mediaUrl) {
          await supabase.from('file_metadata').insert({
            file_name: postMediaFile.name,
            file_url: mediaUrl,
            storage_provider: storageProvider,
            bucket: storageProvider === 'supabase' ? (postMediaFile.type === 'application/pdf' ? 'pdfs' : 'media') : null,
            blob_path: mediaUrl,
            file_size: postMediaFile.size,
            mime_type: postMediaFile.type,
          });
        }
        setPostTitle('');
        setPostBody('');
        setPostVideoUrl('');
        setPostImageUrl('');
        setPostMediaFile(null);
        setPostDownloadable(true);
        setPostMessage('Post published to all users.');
      } else {
        setPostMessage('Failed to publish post. ' + (error.message || ''));
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setPostMessage('Request timed out. The backend server may not be running. Start it with: cd backend && npm run dev');
      } else {
        setPostMessage(err?.message || 'Failed to publish post.');
      }
    }
    setPosting(false);
  };

  if (isLoading || !isAdmin) {
    return <div className="min-h-screen bg-black flex items-center justify-center font-orbitron text-arc-blue animate-pulse">Initializing Terminal...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-text-white p-6 sm:p-12 font-exo2 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,217,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,217,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-12"
        >
          <div>
            <h1 className="font-orbitron text-3xl sm:text-4xl text-arc-blue font-bold tracking-widest drop-shadow-[0_0_10px_rgba(0,217,255,0.5)]">
              ADMIN TERMINAL
            </h1>
            <p className="text-white/50 mt-2 font-mono text-sm">System Access Level: Maximum | Director: {user?.name}</p>
          </div>
          <button 
            onClick={() => router.push('/dashboard')}
            className="px-6 py-2 border border-arc-blue/30 text-arc-blue font-orbitron text-sm rounded hover:bg-arc-blue/10 hover:shadow-[0_0_15px_rgba(0,217,255,0.3)] transition-all"
          >
            RETURN TO NEXUS
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-black/40 border border-arc-blue/20 rounded-xl p-5 backdrop-blur-md shadow-[0_0_20px_rgba(0,217,255,0.05)]">
            <p className="font-orbitron text-[10px] text-arc-blue/60 tracking-widest uppercase mb-2">Users Entered</p>
            <p className="font-orbitron text-3xl text-arc-blue font-bold" style={{ textShadow: '0 0 12px rgba(0,217,255,0.4)' }}>
              {systemMetrics ? systemMetrics.totalUsers : '—'}
            </p>
            <p className="font-mono text-[10px] text-white/40 mt-1">New signups only — returning users not counted</p>
          </div>
          <div className="bg-black/40 border border-arc-blue/20 rounded-xl p-5 backdrop-blur-md shadow-[0_0_20px_rgba(0,217,255,0.05)]">
            <p className="font-orbitron text-[10px] text-arc-blue/60 tracking-widest uppercase mb-2">System Access</p>
            <p className="font-orbitron text-3xl text-white font-bold">
              {systemMetrics ? systemMetrics.totalVisits : '—'}
            </p>
            <p className="font-mono text-[10px] text-white/40 mt-1">Total logins including repeat visits</p>
          </div>
          <div className="bg-black/40 border border-terminal-green/20 rounded-xl p-5 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,65,0.05)]">
            <p className="font-orbitron text-[10px] text-terminal-green/60 tracking-widest uppercase mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse" />
              Online Now
            </p>
            <p className="font-orbitron text-3xl text-terminal-green font-bold" style={{ textShadow: '0 0 12px rgba(0,255,65,0.4)' }}>
              {onlineUserIds.length}
            </p>
            <p className="font-mono text-[10px] text-white/40 mt-1">Currently active on the platform</p>
          </div>
          <div className="bg-black/40 border border-amber-400/20 rounded-xl p-5 backdrop-blur-md shadow-[0_0_20px_rgba(251,191,36,0.05)]">
            <div className="flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
                <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
              </svg>
              <p className="font-orbitron text-[10px] text-amber-400/60 tracking-widest uppercase flex items-center gap-2">
                Storage Network
              </p>
            </div>

            {/* Vercel Blob */}
            {blobStats && (
              <div className="mb-3 pb-3 border-b border-amber-400/10">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-terminal-green shadow-[0_0_6px_rgba(0,255,65,0.6)]" title="Online" />
                    <span className="font-orbitron text-[10px] text-amber-400/80 tracking-wider">Vercel Blob — 1 GB</span>
                  </div>
                  <span className="font-mono text-[9px] text-white/40">{blobStats.count} files</span>
                </div>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-mono text-[9px] text-white/50">
                    Used: {blobStats.totalSize >= 1024 * 1024 * 1024 ? `${(blobStats.totalSize / (1024 * 1024 * 1024)).toFixed(2)} GB` : `${(blobStats.totalSize / (1024 * 1024)).toFixed(1)} MB`}
                    {' / '}
                    {blobStats.remaining >= 1024 * 1024 * 1024 ? `${(blobStats.remaining / (1024 * 1024 * 1024)).toFixed(2)} GB` : `${(blobStats.remaining / (1024 * 1024)).toFixed(1)} MB`} remaining
                  </span>
                  {blobStats.usedPercent >= 95 && (
                    <span className="font-mono text-[8px] text-warning-red bg-warning-red/10 px-1.5 py-0.5 rounded border border-warning-red/30 animate-pulse">CRITICAL</span>
                  )}
                  {blobStats.usedPercent >= 80 && blobStats.usedPercent < 95 && (
                    <span className="font-mono text-[8px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/30">WARNING</span>
                  )}
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-700 ${
                    blobStats.usedPercent >= 95 ? 'bg-warning-red shadow-[0_0_8px_rgba(255,50,50,0.5)]' :
                    blobStats.usedPercent >= 80 ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.3)]' :
                    blobStats.usedPercent > 50 ? 'bg-amber-400' : 'bg-terminal-green'
                  }`} style={{ width: `${Math.min(blobStats.usedPercent, 100)}%` }} />
                </div>
              </div>
            )}

            {/* Supabase */}
            {supabaseStats?.details && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-terminal-green shadow-[0_0_6px_rgba(0,255,65,0.6)]" title="Online" />
                  <span className="font-orbitron text-[10px] text-arc-blue/80 tracking-wider">Supabase</span>
                </div>
                <div className="space-y-2">
                  {Object.entries(supabaseStats.details).map(([name, data]) => {
                    const limit = data.limit || 200 * 1024 * 1024;
                    const usedPercent = data.size > 0 ? Math.round((data.size / limit) * 100) : 0;
                    const remaining = Math.max(0, limit - data.size);
                    const label = name === 'pdfs' ? 'PDFs' : 'Media';
                    return (
                      <div key={name}>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] text-arc-blue/70">{label} — 200 MB</span>
                          <span className="font-mono text-[8px] text-white/35">{data.count} files</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[8px] text-white/40">
                            Used: {data.size >= 1024 * 1024 ? `${(data.size / (1024 * 1024)).toFixed(1)} MB` : `${(data.size / 1024).toFixed(0)} KB`}
                            {' / '}
                            {remaining >= 1024 * 1024 ? `${(remaining / (1024 * 1024)).toFixed(1)} MB left` : `${(remaining / 1024).toFixed(0)} KB left`}
                          </span>
                          {usedPercent >= 95 && (
                            <span className="font-mono text-[7px] text-warning-red bg-warning-red/10 px-1 py-0.5 rounded border border-warning-red/30 animate-pulse">CRITICAL</span>
                          )}
                          {usedPercent >= 80 && usedPercent < 95 && (
                            <span className="font-mono text-[7px] text-amber-400 bg-amber-400/10 px-1 py-0.5 rounded border border-amber-400/30">WARNING</span>
                          )}
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mt-0.5">
                          <div className={`h-full rounded-full transition-all duration-700 ${
                            usedPercent >= 95 ? 'bg-warning-red shadow-[0_0_6px_rgba(255,50,50,0.4)]' :
                            usedPercent >= 80 ? 'bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.2)]' :
                            usedPercent > 50 ? 'bg-amber-400' : 'bg-terminal-green'
                          }`} style={{ width: `${Math.min(usedPercent, 100)}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Fallback when no data */}
            {!blobStats && !supabaseStats && (
              <p className="font-mono text-[10px] text-white/30">Loading storage data...</p>
            )}
          </div>
        </motion.div>

        {/* Analytics Dashboard Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.07 }}
          className="mt-8"
        >
          <AnalyticsCarousel />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-8 bg-black/40 border border-arc-blue/20 rounded-xl backdrop-blur-md overflow-hidden shadow-[0_0_30px_rgba(0,217,255,0.05)]"
        >
          <div className="p-6 border-b border-arc-blue/20 bg-arc-blue/5">
            <h2 className="font-orbitron text-xl text-white tracking-wider flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-arc-blue shadow-[0_0_8px_rgba(0,217,255,1)] animate-pulse" />
              Registered Personnel Directory
            </h2>
            <div className="mt-4 relative">
              <input
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full max-w-md bg-black/60 border border-arc-blue/30 rounded p-2.5 pl-9 text-white font-mono text-sm focus:outline-none focus:border-arc-blue"
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-arc-blue/50">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-arc-blue/20 bg-black/50 text-arc-blue/70 font-orbitron text-xs tracking-widest uppercase">
                  <th className="p-4 pl-6">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Logins</th>
                  <th className="p-4">App</th>
                  <th className="p-4">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-arc-blue/10">
                {loadingUsers ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-white/50 font-mono animate-pulse">Loading personnel data...</td>
                  </tr>
                ) : (
                  (() => {
                    const filtered = userSearch
                      ? users.filter(u =>
                          (u.name || '').toLowerCase().includes(userSearch.toLowerCase()) ||
                          u.email.toLowerCase().includes(userSearch.toLowerCase())
                        )
                      : users;
                    return filtered.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-white/50 font-mono">
                          {userSearch ? 'No personnel matching search.' : 'No personnel records found.'}
                        </td>
                      </tr>
                    ) : (
                      filtered.map((u, i) => (
                        <motion.tr 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.03 * i }}
                          key={u.id} 
                          className="hover:bg-arc-blue/5 transition-colors group"
                        >
                          <td className="p-4 pl-6 text-white group-hover:text-arc-blue transition-colors">
                            <div className="flex items-center gap-2">
                              {onlineUserIds.includes(u.id) && (
                                <span 
                                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-terminal-green shadow-[0_0_6px_rgba(0,255,65,0.8)] animate-pulse shrink-0" 
                                  title="Online"
                                />
                              )}
                              <span>{u.name || 'Unknown'}</span>
                            </div>
                          </td>
                          <td className="p-4 text-white/70 font-mono text-sm">{u.email}</td>
                          <td className="p-4">
                            <span className="px-2 py-1 text-xs font-mono border border-arc-blue/30 rounded bg-arc-blue/10 text-arc-blue">
                              {u.department || 'N/A'}
                            </span>
                          </td>
                          <td className="p-4 text-white/70 font-mono text-sm">
                            {u.login_count || 0}
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono rounded ${
                              u.app_installed
                                ? 'text-terminal-green border border-terminal-green/30 bg-terminal-green/10'
                                : 'text-white/40 border border-white/10 bg-white/5'
                            }`}>
                              {u.app_installed ? 'Installed' : 'Not Installed'}
                            </span>
                          </td>
                          <td className="p-4 text-white/50 font-mono text-xs">
                            {new Date(u.created_at).toLocaleDateString()} {new Date(u.created_at).toLocaleTimeString()}
                          </td>
                        </motion.tr>
                      ))
                    );
                  })()
                )}
              </tbody>
            </table>
            <div className="px-6 py-3 border-t border-arc-blue/10 flex justify-between items-center">
              <span className="font-mono text-[10px] text-white/30">
                Total: {users.length} personnel
                {userSearch && ` (${users.filter(u => (u.name || '').toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase())).length} matching)`}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Director Post Composer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-8 bg-black/40 border border-arc-blue/20 rounded-xl backdrop-blur-md overflow-hidden shadow-[0_0_30px_rgba(0,217,255,0.05)]"
        >
          <div className="p-6 border-b border-arc-blue/20 bg-arc-blue/5">
            <h2 className="font-orbitron text-xl text-white tracking-wider flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-terminal-green shadow-[0_0_8px_rgba(0,255,65,1)]" />
              Publish Post / Video
            </h2>
          </div>
          <form onSubmit={handleCreatePost} className="p-6 space-y-4">
            <input
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              placeholder="Title (optional)"
              className="w-full bg-black/60 border border-arc-blue/30 rounded p-3 text-white font-mono text-sm focus:outline-none focus:border-arc-blue"
            />
            <textarea
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
              placeholder="Write your announcement for all users..."
              className="w-full bg-black/60 border border-arc-blue/30 rounded p-3 text-white font-mono text-sm h-28 focus:outline-none focus:border-arc-blue resize-none"
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                value={postVideoUrl}
                onChange={(e) => setPostVideoUrl(e.target.value)}
                placeholder="YouTube or video URL (optional)"
                className="w-full bg-black/60 border border-arc-blue/30 rounded p-3 text-white font-mono text-sm focus:outline-none focus:border-arc-blue"
              />
              <input
                value={postImageUrl}
                onChange={(e) => setPostImageUrl(e.target.value)}
                placeholder="Image URL (optional)"
                className="w-full bg-black/60 border border-arc-blue/30 rounded p-3 text-white font-mono text-sm focus:outline-none focus:border-arc-blue"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-mono text-[10px] text-white/40 uppercase tracking-wider mb-1">
                Storage Provider
              </label>
              <div className="flex gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => { setStorageProvider('supabase'); localStorage.setItem('admin_storage_provider', 'supabase'); }}
                  className={`flex items-center gap-2 px-3 py-2 text-[10px] font-orbitron tracking-wider rounded-md border transition-all flex-1 ${
                    storageProvider === 'supabase'
                      ? 'bg-arc-blue/20 border-arc-blue text-arc-blue shadow-[0_0_8px_rgba(0,217,255,0.15)]'
                      : 'bg-black/60 border-arc-blue/20 text-white/40 hover:text-white/70 hover:border-arc-blue/40'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                    storageProvider === 'supabase' ? 'border-arc-blue' : 'border-white/30'
                  }`}>
                    {storageProvider === 'supabase' && <span className="w-1.5 h-1.5 rounded-full bg-arc-blue" />}
                  </span>
                  Supabase Storage
                </button>
                <button
                  type="button"
                  onClick={() => { setStorageProvider('vercel_blob'); localStorage.setItem('admin_storage_provider', 'vercel_blob'); }}
                  className={`flex items-center gap-2 px-3 py-2 text-[10px] font-orbitron tracking-wider rounded-md border transition-all flex-1 ${
                    storageProvider === 'vercel_blob'
                      ? 'bg-amber-400/20 border-amber-400 text-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.15)]'
                      : 'bg-black/60 border-arc-blue/20 text-white/40 hover:text-white/70 hover:border-arc-blue/40'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                    storageProvider === 'vercel_blob' ? 'border-amber-400' : 'border-white/30'
                  }`}>
                    {storageProvider === 'vercel_blob' && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                  </span>
                  Vercel Blob Storage
                </button>
              </div>
              {hasBlobToken && (
                <div className="flex items-center gap-2 mb-1 px-0.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${storageProvider === 'vercel_blob' ? 'bg-terminal-green animate-pulse' : 'bg-white/20'}`} />
                  <span className="font-mono text-[9px] text-white/30">
                    {storageProvider === 'vercel_blob' ? 'Vercel Blob selected — 1 GB capacity' : 'Supabase selected — 400 MB total capacity'}
                  </span>
                </div>
              )}
              <label className="font-mono text-[10px] text-white/40 uppercase tracking-wider flex items-center gap-2 mt-1">
                Upload Media (PDF, JPG, PNG — optional)
                <span className={`px-1.5 py-0.5 text-[8px] rounded font-bold ${
                  storageProvider === 'vercel_blob' ? 'bg-amber-400/20 text-amber-400 border border-amber-400/30' : 'bg-arc-blue/20 text-arc-blue border border-arc-blue/30'
                }`}>
                  {storageProvider === 'vercel_blob' ? 'Vercel Blob' : 'Supabase'}
                </span>
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  if (file) {
                    const maxSize = storageProvider === 'vercel_blob' ? 50 * 1024 * 1024 : 200 * 1024 * 1024;
                    if (file.size > maxSize) {
                      setPostMessage(`File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). ${storageProvider === 'vercel_blob' ? 'Vercel Blob max is 50MB. Switch to Supabase for larger files.' : 'Maximum is 200MB.'}`);
                      e.target.value = '';
                      return;
                    }
                  }
                  setPostMediaFile(file);
                }}
                className="w-full bg-black/60 border border-arc-blue/30 rounded p-2.5 text-white font-mono text-sm file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-arc-blue/20 file:text-arc-blue file:text-xs file:font-orbitron hover:file:bg-arc-blue/30 focus:outline-none focus:border-arc-blue cursor-pointer"
              />
              {postMediaFile && (
                <div className="flex flex-col gap-0.5">
                  <p className={`font-mono text-[10px] ${postMediaFile.size > 50 * 1024 * 1024 ? 'text-warning-red' : 'text-terminal-green'}`}>
                    Selected: {postMediaFile.name} ({(postMediaFile.size / 1024 / 1024).toFixed(2)} MB) → {storageProvider === 'vercel_blob' ? 'Vercel Blob' : 'Supabase'}
                  </p>
                  {postMediaFile.size > 50 * 1024 * 1024 && (
                    <p className="font-mono text-[9px] text-warning-red/70">
                      Large file — switch to Supabase for permanent storage.
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <button
                  type="button"
                  onClick={() => setPostDownloadable(!postDownloadable)}
                  className={`w-9 h-5 rounded-full transition-colors relative ${
                    postDownloadable ? 'bg-terminal-green' : 'bg-white/20'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                      postDownloadable ? 'translate-x-4' : 'translate-x-0.5'
                    }`}
                  />
                </button>
                <span className="font-mono text-xs text-white/60">
                  {postDownloadable ? 'Download enabled' : 'View only (no download)'}
                </span>
              </label>
              <button
                type="submit"
                disabled={posting || !postBody.trim()}
                className="px-5 py-2 bg-terminal-green/10 border border-terminal-green text-terminal-green font-orbitron text-xs tracking-widest uppercase rounded hover:bg-terminal-green/20 disabled:opacity-50"
              >
                {posting ? 'Publishing...' : 'Publish Post'}
              </button>
            </div>
            {postMessage && <p className="font-mono text-xs text-arc-blue">{postMessage}</p>}
          </form>
        </motion.div>

        {/* File Manager */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="mt-8"
        >
          <FileManager />
        </motion.div>

        {/* Feedback Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-black/40 border border-arc-blue/20 rounded-xl backdrop-blur-md overflow-hidden shadow-[0_0_30px_rgba(0,217,255,0.05)]"
        >
          <div className="p-6 border-b border-arc-blue/20 bg-arc-blue/5">
            <h2 className="font-orbitron text-xl text-white tracking-wider flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-arc-blue shadow-[0_0_8px_rgba(0,217,255,1)]" />
              User Feedback Transmissions
            </h2>
          </div>
          
          <div className="p-6">
            {loadingFeedbacks ? (
              <p className="text-center text-white/50 font-mono animate-pulse py-8">Decrypting incoming transmissions...</p>
            ) : feedbacks.length === 0 ? (
              <p className="text-center text-white/50 font-mono py-8">No active transmissions.</p>
            ) : (
              <div className="grid gap-4">
                {feedbacks.map((f, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    key={f.id}
                    className="p-4 border border-arc-blue/20 bg-arc-blue/5 rounded-lg group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
                        <span className="font-orbitron text-arc-blue text-sm truncate">
                          {f.profiles?.name || 'Unknown User'}
                        </span>
                        <span className="font-mono text-white/40 text-xs truncate">
                          ({f.profiles?.email})
                        </span>
                      </div>
                      <button 
                        onClick={() => handleDeleteFeedback(f.id)}
                        className="shrink-0 text-white/30 hover:text-warning-red transition-colors p-1"
                        title="Delete Feedback"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                      </button>
                    </div>
                    <p className="font-mono text-white/80 text-sm whitespace-pre-wrap break-words">{f.message}</p>
                    
                    {f.reply && (
                      <div className="mt-3 p-3 border-l-2 border-terminal-green bg-terminal-green/5 rounded font-mono text-sm">
                        <span className="text-terminal-green text-xs font-bold uppercase tracking-wider block mb-1">Reply Transmitted:</span>
                        <p className="text-white/80 whitespace-pre-wrap break-words">{f.reply}</p>
                      </div>
                    )}

                    {replyingFeedbackId === f.id ? (
                      <form onSubmit={(e) => handleSendReply(e, f.id)} className="mt-3 flex flex-col gap-2">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type reply to user..."
                          className="w-full bg-black/60 border border-arc-blue/30 rounded p-2 text-white font-mono text-sm focus:outline-none focus:border-arc-blue"
                          rows={2}
                          required
                        />
                        <div className="flex gap-2 justify-end">
                          <button
                            type="button"
                            onClick={() => { setReplyingFeedbackId(null); setReplyText(''); }}
                            className="px-3 py-1 text-xs border border-white/20 text-white/50 rounded hover:text-white"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-3 py-1 text-xs bg-arc-blue/10 border border-arc-blue text-arc-blue rounded hover:bg-arc-blue/20"
                          >
                            Transmit Reply
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div className="font-mono text-white/30 text-[10px] uppercase">
                          Transmitted: {new Date(f.created_at).toLocaleString()}
                        </div>
                        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                          <button
                            onClick={() => handleToggleBroadcast(f.id, f.is_broadcast || false)}
                            className={`px-3 py-1.5 text-xs border rounded flex items-center gap-1.5 transition-all ${
                              f.is_broadcast
                                ? 'border-terminal-green text-terminal-green bg-terminal-green/10 shadow-[0_0_8px_rgba(0,255,65,0.2)]'
                                : 'border-white/20 text-white/50 hover:text-white hover:border-white/40'
                            }`}
                            title="Broadcast this announcement to all users"
                          >
                            <span>📢</span>
                            {f.is_broadcast ? 'Broadcasted' : 'Broadcast'}
                          </button>
                          
                          <button
                            onClick={() => {
                              setReplyingFeedbackId(f.id);
                              setReplyText(f.reply || '');
                            }}
                            className="px-3 py-1.5 text-xs border border-arc-blue/30 text-arc-blue rounded hover:bg-arc-blue/10 flex items-center gap-1.5 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 17 4 12 9 7"></polyline><path d="M20 18v-2a4 4 0 0 0-4-4H4"></path></svg>
                            {f.reply ? 'Edit Reply' : 'Reply'}
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
