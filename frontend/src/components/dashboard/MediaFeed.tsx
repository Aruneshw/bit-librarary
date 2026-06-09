'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';

interface MediaPost {
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

export default function MediaFeed() {
  const { isAuthenticated } = useAuthStore();
  const [posts, setPosts] = useState<MediaPost[]>([]);

  const fetchPosts = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('admin_posts')
      .select('id, title, body, video_url, image_url, created_at')
      .eq('is_active', true)
      .or('image_url.neq.,video_url.neq.')
      .order('created_at', { ascending: false })
      .limit(20);

    if (data) setPosts(data as MediaPost[]);
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchPosts();

    const supabase = createClient();
    const channel = supabase
      .channel('media-feed')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'admin_posts' }, () => fetchPosts())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuthenticated]);

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
                <img src={post.image_url} alt="" className="mt-3 rounded-lg border border-arc-blue/20 max-h-96 w-full object-cover" />
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
              <p className="font-mono text-[10px] text-text-white/30 mt-2">
                {new Date(post.created_at).toLocaleString()}
              </p>
            </motion.article>
          );
        })
      )}
    </div>
  );
}
