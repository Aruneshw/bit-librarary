'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';
import { useNotificationStore } from '@/store/notificationStore';
import { getAuthHeaders } from '@/lib/authHelpers';
import PostReactions from './PostReactions';
import PollCard from './PollCard';
import PollComposer from '@/components/admin/PollComposer';
import type { PollData, PollOption } from './PollCard';

interface MediaPost {
  id: string;
  title: string | null;
  body: string;
  video_url: string | null;
  image_url: string | null;
  pdf_url: string | null;
  downloadable: boolean;
  created_at: string;
  view_count?: number;
}

function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

function isDataUrl(url: string): boolean {
  return url.startsWith('data:');
}

function getDownloadUrl(url: string): string {
  if (isDataUrl(url)) return url;
  return url + (url.includes('?') ? '&' : '?') + 'download=1';
}

function trackDownload(fileUrl: string) {
  fetch('/api/files/track-download', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileUrl }),
  }).catch(() => {});
  fetch('/api/journey/heartbeat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ durationSeconds: 0, trackDownload: true }),
  }).catch(() => {});
}

export default function MediaFeed() {
  const { isAuthenticated, isAdmin, user } = useAuthStore();
  const [posts, setPosts] = useState<MediaPost[]>([]);
  const [polls, setPolls] = useState<PollData[]>([]);
  const [liveViewers, setLiveViewers] = useState<Record<string, number>>({});
  const [trackedViews, setTrackedViews] = useState<Set<string>>(new Set());
  const [editingPoll, setEditingPoll] = useState<PollData | null>(null);
  const addNotification = useNotificationStore((s) => s.addNotification);
  const knownIds = useRef(new Set<string>());
  const visiblePostRef = useRef<string | null>(null);

  const fetchPosts = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const supabase = createClient();

    if (apiUrl) {
      try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${apiUrl}/posts`, {
          headers,
        });
        if (res.ok) {
          const result = await res.json();
          const posts = result.posts.filter((p: MediaPost) => p.image_url || p.video_url || p.pdf_url);
          posts.forEach((p: MediaPost) => {
            if (!knownIds.current.has(p.id)) {
              knownIds.current.add(p.id);
              addNotification({
                type: 'media',
                title: p.title || 'New Media',
                body: p.body.slice(0, 120),
                data: { url: '/dashboard' },
              });
            }
          });
          setPosts(posts);
          return;
        }
      } catch { /* fallback to direct query */ }
    }

    const { data } = await supabase
      .from('admin_posts')
      .select('id, title, body, video_url, image_url, pdf_url, downloadable, created_at, view_count')
      .eq('is_active', true)
      .or('image_url.neq.,video_url.neq.,pdf_url.neq.')
      .order('created_at', { ascending: false })
      .limit(20);

    if (data) {
      const posts = data as MediaPost[];
      posts.forEach((p) => {
        if (!knownIds.current.has(p.id)) {
          knownIds.current.add(p.id);
          addNotification({
            type: 'media',
            title: p.title || 'New Media',
            body: p.body.slice(0, 120),
            data: { url: '/dashboard' },
          });
        }
      });
      setPosts(posts);
    }
  };

  const fetchPolls = async () => {
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from('polls')
        .select('id, question, created_by, created_at, end_date, multiple_choice, anonymous, show_live_results, status')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(20);
      if (data) {
        const pollsWithOptions = await Promise.all(
          data.map(async (poll: { id: string; question: string; created_by: string | null; created_at: string; end_date: string | null; multiple_choice: boolean; anonymous: boolean; show_live_results: boolean; status: string }) => {
            const { data: opts } = await supabase
              .from('poll_options')
              .select('id, option_text, sort_order')
              .eq('poll_id', poll.id)
              .order('sort_order');
            return { ...poll, options: opts ?? [] } as PollData;
          })
        );
        setPolls(pollsWithOptions);
      }
    } catch { /* ignore */ }
  };

  const trackView = async (postId: string) => {
    if (trackedViews.has(postId) || !user) return;
    setTrackedViews((prev) => new Set(prev).add(postId));

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const supabase = createClient();

    if (apiUrl) {
      try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${apiUrl}/posts/${postId}/view`, {
          method: 'POST',
          headers,
        });
        if (res.ok) {
          const data = await res.json();
          if (data.view_count !== undefined) {
            setPosts((prev) =>
              prev.map((p) => (p.id === postId ? { ...p, view_count: data.view_count } : p))
            );
          }
        }
        return;
      } catch {}
    }

    try {
      await supabase.rpc('increment_post_view', { post_id: postId, user_id: user.id });
    } catch {}
    try { await fetch('/api/journey/heartbeat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ durationSeconds: 0, trackView: true }) }); } catch {}
  };

  const handleDelete = async (postId: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const supabase = createClient();

    if (apiUrl) {
      try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${apiUrl}/posts/${postId}`, {
          method: 'DELETE',
          headers,
        });
        if (res.ok) {
          setPosts((prev) => prev.filter((p) => p.id !== postId));
          return;
        }
      } catch {
        // fall through
      }
    }

    const { error } = await supabase
      .from('admin_posts')
      .update({ is_active: false })
      .eq('id', postId);

    if (!error) setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchPosts();
    fetchPolls();

    const supabase = createClient();

    // Realtime post changes
    const feedChannel = supabase
      .channel('media-feed')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'admin_posts' }, () => fetchPosts())
      .subscribe();

    // Realtime poll changes
    const pollChannel = supabase
      .channel('media-poll-feed')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'polls' }, () => fetchPolls())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'poll_votes' }, () => {
        // Force re-render of PollCards by refreshing polls
        fetchPolls();
      })
      .subscribe();

    // Live viewer presence
    const presenceChannel = supabase.channel('post-live', {
      config: { presence: { key: user?.id || 'anon' } },
    });

    presenceChannel
      .on('presence', { event: 'sync' }, () => {
        const state = presenceChannel.presenceState();
        const counts: Record<string, number> = {};
        for (const key of Object.keys(state)) {
          const presences = state[key] as any[];
          for (const p of presences) {
            const pid = p.currentPostId;
            if (pid) {
              counts[pid] = (counts[pid] || 0) + 1;
            }
          }
        }
        setLiveViewers(counts);
      })
      .subscribe(async (status: string) => {
        if (status === 'SUBSCRIBED') {
          await presenceChannel.track({ currentPostId: null });
        }
      });

    // IntersectionObserver to detect visible post and track views
    const observer = new IntersectionObserver(
      (entries) => {
        let mostVisible: string | null = null;
        let maxRatio = 0;

        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisible = entry.target.getAttribute('data-post-id');
          }
        }

        if (mostVisible) {
          visiblePostRef.current = mostVisible;
          presenceChannel.track({ currentPostId: mostVisible });
          trackView(mostVisible);
        } else {
          visiblePostRef.current = null;
          presenceChannel.track({ currentPostId: null });
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    // Observe all post cards after render
    const timer = setTimeout(() => {
      document.querySelectorAll('[data-post-id]').forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      supabase.removeChannel(feedChannel);
      supabase.removeChannel(pollChannel);
      supabase.removeChannel(presenceChannel);
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [isAuthenticated, user?.id]);

  if (!isAuthenticated) return null;

  // Merge posts and polls, sorted by created_at desc
  const mergedFeed = [
    ...posts.map((p) => ({ type: 'post' as const, id: p.id, created_at: p.created_at, data: p })),
    ...polls.map((p) => ({ type: 'poll' as const, id: p.id, created_at: p.created_at, data: p })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div className="mb-6 space-y-3">
      {mergedFeed.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-arc-blue/30 mb-4">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          <p className="font-mono text-sm text-text-white/40">No media shared yet.</p>
          <p className="font-mono text-xs text-text-white/20 mt-1">Be the first to share an image or video!</p>
        </div>
      ) : (
        mergedFeed.map((item) => {
          if (item.type === 'poll') {
            return (
              <PollCard
                key={`poll-${item.id}`}
                poll={item.data as PollData}
                onEdit={(p) => setEditingPoll(p)}
                onDelete={(id) => setPolls((prev) => prev.filter((pl) => pl.id !== id))}
              />
            );
          }
          const post = item.data as MediaPost;
          const embedUrl = post.video_url ? getYouTubeEmbedUrl(post.video_url) : null;
          const isPdf = !!post.pdf_url;
          return (
            <motion.article
              key={post.id}
              data-post-id={post.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-4 border border-arc-blue/20"
            >
              {post.title && (
                <h3 className="font-orbitron text-sm text-arc-blue mb-2">{post.title}</h3>
              )}
              <p className="font-mono text-sm text-text-white/85 whitespace-pre-wrap">{post.body}</p>

              {/* Image display */}
              {post.image_url && !isPdf && (
                <div className="mt-3 relative group/image">
                  <img
                    src={post.image_url}
                    alt={post.title || 'Media'}
                    className="rounded-lg border border-arc-blue/20 max-h-96 w-full object-cover"
                    draggable={post.downloadable}
                    loading="lazy"
                    decoding="async"
                    onContextMenu={post.downloadable ? undefined : (e) => e.preventDefault()}
                  />
                  {post.downloadable && (
                    <a
                      href={getDownloadUrl(post.image_url)}
                      download
                      onClick={() => trackDownload(post.image_url!)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 border border-arc-blue/30 flex items-center justify-center text-arc-blue opacity-0 group-hover/image:opacity-100 transition-opacity hover:bg-arc-blue/20"
                      title="Download image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    </a>
                  )}
                  {!post.downloadable && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 border border-arc-blue/20 text-[9px] font-mono text-arc-blue/60 uppercase tracking-wider">
                      View only
                    </div>
                  )}
                </div>
              )}

              {/* Video embed */}
              {embedUrl && (
                <div className="mt-3 aspect-video rounded-lg overflow-hidden border border-arc-blue/20">
                  <iframe
                    src={embedUrl}
                    title={post.title || 'Video'}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              {post.video_url && !embedUrl && (
                <a href={post.video_url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-arc-blue text-xs font-mono underline">
                  Open video link
                </a>
              )}

              {/* PDF display */}
              {isPdf && (
                <div className="mt-3 rounded-lg overflow-hidden border border-arc-blue/20 bg-black/40">
                  <div className="flex items-center justify-between px-3 py-2 bg-arc-blue/5 border-b border-arc-blue/20">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-warning-red">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                      </svg>
                      <span className="font-mono text-[10px] text-text-white/60 uppercase tracking-wider">PDF Document</span>
                      {!post.downloadable && (
                        <span className="font-mono text-[9px] text-arc-blue/60 uppercase tracking-wider">(View only)</span>
                      )}
                    </div>
                    {post.downloadable && (
                      <a
                        href={getDownloadUrl(post.pdf_url!)}
                        download
                        onClick={() => trackDownload(post.pdf_url!)}
                        className="flex items-center gap-1 px-2 py-1 text-xs font-mono text-arc-blue border border-arc-blue/30 rounded hover:bg-arc-blue/10 transition-colors"
                        title="Download PDF"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Download
                      </a>
                    )}
                  </div>
                  <div className="w-full" style={{ height: '70vh', maxHeight: '600px' }}>
                    <embed
                      src={post.pdf_url! + (post.downloadable ? '' : '#toolbar=0&navpanes=0')}
                      type="application/pdf"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <p className="font-mono text-[10px] text-text-white/30">
                    {new Date(post.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {post.downloadable && post.image_url && !isPdf && (
                    <a
                      href={getDownloadUrl(post.image_url)}
                      download
                      onClick={() => trackDownload(post.image_url!)}
                      className="text-arc-blue/50 hover:text-arc-blue transition-colors p-1 sm:hidden"
                      title="Download"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    </a>
                  )}
                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-warning-red/50 hover:text-warning-red transition-colors p-1"
                      aria-label="Delete post"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              <PostReactions postId={post.id} viewCount={post.view_count ?? 0} liveViewerCount={liveViewers[post.id] || 0} />
            </motion.article>
          );
        })
      )}

      <PollComposer
        isOpen={!!editingPoll}
        onClose={() => setEditingPoll(null)}
        onCreated={() => setEditingPoll(null)}
        editPoll={editingPoll}
      />
    </div>
  );
}
