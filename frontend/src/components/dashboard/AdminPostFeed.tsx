'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';
import PostReactions from './PostReactions';

interface AdminPost {
  id: string;
  title: string | null;
  body: string;
  video_url: string | null;
  image_url: string | null;
  created_at: string;
}

function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function AdminPostFeed() {
  const { isAuthenticated, isAdmin } = useAuthStore();
  const [posts, setPosts] = useState<AdminPost[]>([]);

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
            setPosts((data.posts || []).filter((p: AdminPost) => !p.image_url && !p.video_url));
            return;
          }
        }
      } catch {
        // fall through to Supabase
      }
    }

    const { data } = await supabase
      .from('admin_posts')
      .select('id, title, body, video_url, image_url, created_at')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(10);

    if (data) setPosts((data as AdminPost[]).filter((p) => !p.image_url && !p.video_url));
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
    const channel = supabase
      .channel('admin-posts-feed')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'admin_posts' }, () => fetchPosts())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuthenticated]);

  if (!isAuthenticated || posts.length === 0) return null;

  return (
    <div className="mb-6 space-y-3">
      <h2 className="font-orbitron text-xs text-arc-blue/70 tracking-[3px] uppercase">
        Director Posts
      </h2>
      {posts.map((post) => {
        const embedUrl = post.video_url ? getYouTubeEmbedUrl(post.video_url) : null;
        return (
          <motion.article
            key={post.id}
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
              <p className="font-mono text-[10px] text-text-white/30">
                {new Date(post.created_at).toLocaleString()}
              </p>
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
            <PostReactions postId={post.id} />
          </motion.article>
        );
      })}
    </div>
  );
}
