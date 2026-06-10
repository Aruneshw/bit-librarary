'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';
import { useNotificationStore } from '@/store/notificationStore';
import PostReactions from './PostReactions';

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

export default function MediaFeed() {
  const { isAuthenticated, isAdmin, user } = useAuthStore();
  const [posts, setPosts] = useState<MediaPost[]>([]);
  const [liveViewers, setLiveViewers] = useState<Record<string, number>>({});
  const [trackedViews, setTrackedViews] = useState<Set<string>>(new Set());
  const addNotification = useNotificationStore((s) => s.addNotification);
  const knownIds = useRef(new Set<string>());
  const visiblePostRef = useRef<string | null>(null);

  const fetchPosts = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const supabase = createClient();

    if (apiUrl) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const res = await fetch(`${apiUrl}/posts`, {
            headers: { Authorization: `Bearer ${session.access_token}` },
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
        }
      } catch { /* fallback to direct query */ }
    }

    const { data } = await supabase
      .from('admin_posts')
      .select('id, title, body, video_url, image_url, pdf_url, downloadable, created_at')
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

  const trackView = async (postId: string) => {
    if (trackedViews.has(postId) || !user) return;
    setTrackedViews((prev) => new Set(prev).add(postId));

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const supabase = createClient();

    if (apiUrl) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          await fetch(`${apiUrl}/posts/${postId}/view`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${session.access_token}` },
          });
          return;
        }
      } catch {}
    }

    try {
      await supabase.rpc('increment_post_view', { post_id: postId, user_id: user.id });
    } catch {}
  };

  const handleDelete = async (postId: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const supabase = createClient();

    if (apiUrl) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const res = await fetch(`${apiUrl}/posts/${postId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${session.access_token}` },
          });
          if (res.ok) {
            setPosts((prev) => prev.filter((p) => p.id !== postId));
            return;
          }
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

    const supabase = createClient();

    // Realtime post changes
    const feedChannel = supabase
      .channel('media-feed')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'admin_posts' }, () => fetchPosts())
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
      supabase.removeChannel(presenceChannel);
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [isAuthenticated, user?.id]);

  if (!isAuthenticated) return null;

  return (
    <div className="mb-6 space-y-3">
      {posts.length === 0 ? (
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
        posts.map((post) => {
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
                  {(post.view_count ?? 0) > 0 && (
                    <span className="flex items-center gap-1 font-mono text-[10px] text-arc-blue/50">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      {post.view_count}
                    </span>
                  )}
                  {(liveViewers[post.id] || 0) > 0 && (
                    <span className="flex items-center gap-1 font-mono text-[10px] text-terminal-green animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-terminal-green" />
                      {liveViewers[post.id]} watching
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {post.downloadable && post.image_url && !isPdf && (
                    <a
                      href={getDownloadUrl(post.image_url)}
                      download
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
              <PostReactions postId={post.id} />
            </motion.article>
          );
        })
      )}
    </div>
  );
}
