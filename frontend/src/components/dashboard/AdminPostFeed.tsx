'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';
import PostReactions from './PostReactions';
import PollCard from './PollCard';
import PollComposer from '@/components/admin/PollComposer';
import type { PollData } from './PollCard';

interface AdminPost {
  id: string;
  title: string | null;
  body: string;
  video_url: string | null;
  image_url: string | null;
  pdf_url: string | null;
  created_at: string;
  view_count?: number;
}

function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function AdminPostFeed() {
  const { isAuthenticated, isAdmin, user } = useAuthStore();
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [polls, setPolls] = useState<PollData[]>([]);
  const [liveViewers, setLiveViewers] = useState<Record<string, number>>({});
  const [trackedViews, setTrackedViews] = useState<Set<string>>(new Set());
  const [editingPoll, setEditingPoll] = useState<PollData | null>(null);
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
            const data = await res.json();
            setPosts((data.posts || []).filter((p: AdminPost) => !p.image_url && !p.video_url && !p.pdf_url));
            return;
          }
        }
      } catch {
        // fall through to Supabase
      }
    }

    const { data } = await supabase
      .from('admin_posts')
      .select('id, title, body, video_url, image_url, pdf_url, created_at, view_count')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(10);

    if (data) setPosts((data as AdminPost[]).filter((p) => !p.image_url && !p.video_url && !p.pdf_url));
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
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const res = await fetch(`${apiUrl}/posts/${postId}/view`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${session.access_token}` },
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
    fetchPolls();

    const supabase = createClient();

    const feedChannel = supabase
      .channel('admin-posts-feed')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'admin_posts' }, () => fetchPosts())
      .subscribe();

    const pollChannel = supabase
      .channel('admin-poll-feed')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'polls' }, () => fetchPolls())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'poll_votes' }, () => fetchPolls())
      .subscribe();

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

  // Merge posts and polls sorted by created_at
  const mergedFeed = [
    ...posts.map((p) => ({ type: 'post' as const, id: p.id, created_at: p.created_at, data: p })),
    ...polls.map((p) => ({ type: 'poll' as const, id: p.id, created_at: p.created_at, data: p })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  if (!isAuthenticated || mergedFeed.length === 0) return null;

  return (
    <div className="mb-6 space-y-3">
      <h2 className="font-orbitron text-xs text-arc-blue/70 tracking-[3px] uppercase">
        Director Posts
      </h2>
      {mergedFeed.map((item) => {
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
        const post = item.data as AdminPost;
        const embedUrl = post.video_url ? getYouTubeEmbedUrl(post.video_url) : null;
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
            {post.image_url && (
              <img src={post.image_url} alt="" className="mt-3 rounded-lg border border-arc-blue/20 max-h-64 w-full object-cover" />
            )}
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
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <p className="font-mono text-[10px] text-text-white/30">
                    {new Date(post.created_at).toLocaleString()}
                  </p>
                </div>
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
            <PostReactions postId={post.id} viewCount={post.view_count ?? 0} liveViewerCount={liveViewers[post.id] || 0} />
          </motion.article>
        );
      })}

      <PollComposer
        isOpen={!!editingPoll}
        onClose={() => setEditingPoll(null)}
        onCreated={() => setEditingPoll(null)}
        editPoll={editingPoll}
      />
    </div>
  );
}
