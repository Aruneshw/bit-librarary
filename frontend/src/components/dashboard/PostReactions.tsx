'use client';

import { useEffect, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';

const QUICK_EMOJIS = ['👍', '❤️', '😂', '😮', '😢', '🔥'];

interface Reaction {
  id: string;
  user_id: string;
  reaction_type: string;
}

interface Props {
  postId: string;
}

export default function PostReactions({ postId }: Props) {
  const { user, isAuthenticated } = useAuthStore();
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [showPicker, setShowPicker] = useState(false);
  const pendingRef = useRef(false);

  const fetchReactions = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('post_reactions')
      .select('id, user_id, reaction_type')
      .eq('post_id', postId);

    if (data) setReactions(data as Reaction[]);
  };

  const toggleReaction = async (type: string) => {
    if (!user || pendingRef.current) return;
    pendingRef.current = true;

    try {
      const supabase = createClient();
      const myReaction = reactions.find((r) => r.user_id === user.id);
      const sameType = myReaction?.reaction_type === type;

      // Tapping same reaction → remove it
      if (sameType) {
        await supabase.from('post_reactions').delete().eq('id', myReaction!.id);
      } else {
        // Remove old reaction if exists, then insert new one
        if (myReaction) {
          await supabase.from('post_reactions').delete().eq('id', myReaction.id);
        }
        await supabase.from('post_reactions').insert({
          post_id: postId,
          user_id: user.id,
          reaction_type: type,
        });
      }

      fetchReactions();
    } finally {
      pendingRef.current = false;
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchReactions();
  }, [isAuthenticated, postId]);

  if (!isAuthenticated) return null;

  const grouped = reactions.reduce<Record<string, Reaction[]>>((acc, r) => {
    if (!acc[r.reaction_type]) acc[r.reaction_type] = [];
    acc[r.reaction_type].push(r);
    return acc;
  }, {});

  const userReacted = (type: string) => reactions.some((r) => r.user_id === user?.id && r.reaction_type === type);

  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-arc-blue/10">
      {/* Like */}
      <button
        onClick={() => toggleReaction('like')}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono transition-all ${
          userReacted('like')
            ? 'bg-arc-blue/20 text-arc-blue border border-arc-blue/40'
            : 'bg-arc-blue/5 text-text-white/50 border border-arc-blue/10 hover:bg-arc-blue/10 hover:text-text-white/80'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={userReacted('like') ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
        </svg>
        {grouped['like']?.length || 0}
      </button>

      {/* Dislike */}
      <button
        onClick={() => toggleReaction('dislike')}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono transition-all ${
          userReacted('dislike')
            ? 'bg-warning-red/20 text-warning-red border border-warning-red/40'
            : 'bg-arc-blue/5 text-text-white/50 border border-arc-blue/10 hover:bg-arc-blue/10 hover:text-text-white/80'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={userReacted('dislike') ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3z"></path>
          <path d="M17 2h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-4"></path>
        </svg>
        {grouped['dislike']?.length || 0}
      </button>

      <div className="w-px h-5 bg-arc-blue/10 mx-1" />

      {/* Emoji reactions */}
      {QUICK_EMOJIS.map((emoji) => {
        const count = grouped[emoji]?.length || 0;
        if (count === 0 && !userReacted(emoji)) return null;
        return (
          <button
            key={emoji}
            onClick={() => toggleReaction(emoji)}
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-all ${
              userReacted(emoji)
                ? 'bg-arc-blue/20 border border-arc-blue/40'
                : 'bg-arc-blue/5 border border-arc-blue/10 hover:bg-arc-blue/10'
            }`}
          >
            <span className="text-sm leading-none">{emoji}</span>
            {count > 0 && <span className="font-mono text-text-white/60">{count}</span>}
          </button>
        );
      })}

      {/* Add emoji button */}
      <button
        onClick={() => setShowPicker((v) => !v)}
        className="w-6 h-6 rounded-full bg-arc-blue/5 border border-arc-blue/10 flex items-center justify-center text-text-white/40 hover:text-arc-blue hover:bg-arc-blue/10 transition-all text-xs"
        aria-label="Add reaction"
      >
        +
      </button>

      {/* Emoji picker popup */}
      {showPicker && (
        <div className="w-full flex gap-1.5 pt-2">
          {QUICK_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => { toggleReaction(emoji); setShowPicker(false); }}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-base transition-all ${
                userReacted(emoji)
                  ? 'bg-arc-blue/20 border border-arc-blue/40'
                  : 'bg-arc-blue/5 border border-arc-blue/10 hover:bg-arc-blue/10'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
