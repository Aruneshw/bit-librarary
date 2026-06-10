'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';

interface BroadcastMessage {
  id: string;
  message: string;
  reply: string | null;
  created_at: string;
}

const ROTATE_MS = 5000;
const MAX_BROADCASTS = 10;

export default function BroadcastBanner() {
  const { isAuthenticated } = useAuthStore();
  const [broadcasts, setBroadcasts] = useState<BroadcastMessage[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const fetchBroadcasts = useCallback(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('user_feedbacks')
      .select('id, message, reply, created_at')
      .eq('is_broadcast', true)
      .order('created_at', { ascending: false })
      .limit(MAX_BROADCASTS);

    if (data && !error) {
      const all = data as BroadcastMessage[];
      setBroadcasts(all);
      setActiveIndex(0);
      setIsVisible(all.length > 0);
    } else {
      setBroadcasts([]);
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    fetchBroadcasts();

    const supabase = createClient();
    const channel = supabase
      .channel('broadcast-announcements-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'user_feedbacks' },
        () => fetchBroadcasts()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuthenticated, fetchBroadcasts]);

  useEffect(() => {
    if (broadcasts.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % broadcasts.length);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, [broadcasts.length]);

  const current = broadcasts[activeIndex];

  if (!isAuthenticated || !isVisible || !current) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={current.id}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        className="w-full bg-gradient-to-r from-warning-red/20 via-warning-red/10 to-warning-red/20 border-b border-warning-red/40 backdrop-blur-md relative z-[60] px-4 py-2.5 sm:px-6 shadow-[0_4px_20px_rgba(255,75,75,0.15)]"
      >
        <div className="flex items-center gap-1.5 sm:gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-warning-red animate-ping" />
            <span className="font-orbitron text-[10px] sm:text-xs font-bold text-warning-red tracking-[3px] uppercase">
              Broadcast{broadcasts.length > 1 ? ` ${activeIndex + 1}/${broadcasts.length}` : ''}:
            </span>
          </div>
          <p className="font-mono text-[11px] sm:text-xs text-text-white/95 leading-normal break-words whitespace-normal">
            {current.message}
            {current.reply && (
              <span className="text-terminal-green/90 ml-2 font-bold whitespace-normal inline-block">
                (Response: {current.reply})
              </span>
            )}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
