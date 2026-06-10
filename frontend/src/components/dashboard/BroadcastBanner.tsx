'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';
import { useNotificationStore } from '@/store/notificationStore';

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
  const addNotification = useNotificationStore((s) => s.addNotification);
  const seenIds = useRef(new Set<string>());

  const getVisibleBroadcasts = useCallback((items: BroadcastMessage[]) => {
    const dismissed = JSON.parse(localStorage.getItem('dismissed_broadcasts') || '[]');
    return items.filter((item) => !dismissed.includes(item.id));
  }, []);

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
      all.forEach((b) => {
        if (!seenIds.current.has(b.id)) {
          seenIds.current.add(b.id);
          addNotification({
            type: 'broadcast',
            title: 'Broadcast',
            body: b.reply ? `${b.message} — ${b.reply}` : b.message,
            data: { url: '/dashboard' },
          });
        }
      });
      const visible = getVisibleBroadcasts(all);
      setBroadcasts(visible);
      setActiveIndex(0);
      setIsVisible(visible.length > 0);
    } else {
      setBroadcasts([]);
      setIsVisible(false);
    }
  }, [getVisibleBroadcasts, addNotification]);

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

  const handleDismiss = () => {
    if (!current) return;
    const dismissed = JSON.parse(localStorage.getItem('dismissed_broadcasts') || '[]');
    dismissed.push(current.id);
    localStorage.setItem('dismissed_broadcasts', JSON.stringify(dismissed));
    const remaining = broadcasts.filter((b) => b.id !== current.id);
    setBroadcasts(remaining);
    setActiveIndex(0);
    setIsVisible(remaining.length > 0);
  };

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
        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 mr-8 sm:mr-10">
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

        <button
          onClick={handleDismiss}
          className="absolute right-3 top-2 text-text-white/60 hover:text-white transition-colors p-1"
          aria-label="Dismiss Announcement"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
