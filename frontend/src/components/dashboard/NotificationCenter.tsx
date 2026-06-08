'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';

interface UserFeedback {
  id: string;
  user_id: string;
  message: string;
  created_at: string;
  reply: string | null;
  replied_at: string | null;
  reply_read: boolean;
}

export default function NotificationCenter() {
  const { user, isAuthenticated } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState<UserFeedback[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const fetchNotifications = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('user_feedbacks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (data && !error) {
        const list = data as UserFeedback[];
        setFeedbacks(list);
        const unread = list.filter((f) => f.reply && !f.reply_read).length;
        setUnreadCount(unread);
      }
    };

    fetchNotifications();

    // Subscribe to real-time updates for user_feedbacks
    const supabase = createClient();
    const channel = supabase
      .channel(`user-feedbacks-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_feedbacks',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuthenticated, user]);

  const handleOpen = async () => {
    setIsOpen(true);
    if (unreadCount === 0 || !user) return;

    // Mark replies as read
    const supabase = createClient();
    const { error } = await supabase
      .from('user_feedbacks')
      .update({ reply_read: true })
      .eq('user_id', user.id)
      .eq('reply_read', false);

    if (!error) {
      setUnreadCount(0);
      setFeedbacks((prev) =>
        prev.map((f) => (f.reply ? { ...f, reply_read: true } : f))
      );
    }
  };

  if (!isAuthenticated) return null;

  return (
    <>
      {/* Floating Action Button (Permanent notification bell) */}
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-20 z-50 w-12 h-12 rounded-full bg-arc-blue/10 border border-arc-blue/30 backdrop-blur-md flex items-center justify-center text-arc-blue hover:bg-arc-blue/20 hover:shadow-[0_0_15px_rgba(0,217,255,0.4)] transition-all duration-300 group"
        aria-label="View Notifications"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:scale-110 transition-transform"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-warning-red border-2 border-black flex items-center justify-center text-[10px] font-orbitron font-bold text-white animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-lg bg-black/85 border border-arc-blue/30 rounded-xl shadow-[0_0_40px_rgba(0,217,255,0.1)] p-6 relative flex flex-col max-h-[80vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-text-white/50 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* Title Section */}
              <div className="mb-6 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-arc-blue/10 border border-arc-blue/30 flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-arc-blue"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                </div>
                <h3 className="font-orbitron text-xl text-arc-blue tracking-widest text-center">
                  COMMUNICATION HUB
                </h3>
                <p className="font-mono text-xs text-text-white/50 mt-1 text-center">
                  Transmissions from System Directory
                </p>
              </div>

              {/* Notifications List */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {feedbacks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <p className="font-mono text-sm text-text-white/40">
                      No active communications or feedback transmissions.
                    </p>
                  </div>
                ) : (
                  feedbacks.map((f) => (
                    <div
                      key={f.id}
                      className={`p-4 rounded-lg border border-arc-blue/10 bg-arc-blue/5 transition-all ${
                        f.reply && !f.reply_read ? 'border-arc-blue bg-arc-blue/10' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-orbitron text-xs text-text-white/60 uppercase tracking-wider">
                          Feedback Sent
                        </span>
                        <span className="font-mono text-[9px] text-text-white/30">
                          {new Date(f.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="font-mono text-sm text-text-white/80 whitespace-pre-wrap">
                        {f.message}
                      </p>

                      {f.reply ? (
                        <div className="mt-3 p-3 border-l-2 border-terminal-green bg-terminal-green/5 rounded font-mono text-xs">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-terminal-green font-bold uppercase tracking-wider">
                              Admin Response:
                            </span>
                            <span className="text-text-white/40 text-[9px]">
                              {f.replied_at
                                ? new Date(f.replied_at).toLocaleDateString()
                                : ''}
                            </span>
                          </div>
                          <p className="text-text-white/80 whitespace-pre-wrap">{f.reply}</p>
                        </div>
                      ) : (
                        <div className="mt-3 flex items-center gap-1.5 font-mono text-[10px] text-text-white/30 uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-arc-blue/50 animate-pulse" />
                          Awaiting Admin Transmissions...
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
