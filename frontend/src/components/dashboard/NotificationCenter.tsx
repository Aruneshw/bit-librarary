'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';
import { useNotificationStore, type NotificationType } from '@/store/notificationStore';

interface UserFeedback {
  id: string;
  user_id: string;
  message: string;
  created_at: string;
  reply: string | null;
  replied_at: string | null;
  reply_read: boolean;
}

interface Props {
  mobileInline?: boolean;
}

const TYPE_CONFIG: Record<NotificationType, { label: string; color: string; border: string; bg: string; icon: string }> = {
  broadcast: {
    label: 'Broadcast',
    color: 'text-warning-red',
    border: 'border-warning-red/40',
    bg: 'bg-warning-red/10',
    icon: '📢',
  },
  post: {
    label: 'Post',
    color: 'text-arc-blue',
    border: 'border-arc-blue/40',
    bg: 'bg-arc-blue/10',
    icon: '📝',
  },
  media: {
    label: 'Media',
    color: 'text-terminal-green',
    border: 'border-terminal-green/40',
    bg: 'bg-terminal-green/10',
    icon: '🎬',
  },
  system_notice: {
    label: 'System',
    color: 'text-arc-blue',
    border: 'border-arc-blue/40',
    bg: 'bg-arc-blue/10',
    icon: '⚡',
  },
  feedback_reply: {
    label: 'Reply',
    color: 'text-terminal-green',
    border: 'border-terminal-green/40',
    bg: 'bg-terminal-green/10',
    icon: '💬',
  },
};

export default function NotificationCenter({ mobileInline }: Props) {
  const { user, isAuthenticated } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState<UserFeedback[]>([]);
  const [feedbackUnread, setFeedbackUnread] = useState(0);
  const [activeTab, setActiveTab] = useState<'all' | 'feedback'>('all');

  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotificationStore();

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
        setFeedbackUnread(list.filter((f) => f.reply && !f.reply_read).length);
      }
    };

    fetchNotifications();

    const supabase = createClient();
    const channelId = `user-feedbacks-own-${Math.random().toString(36).substring(2, 9)}`;
    const channel = supabase
      .channel(channelId)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'user_feedbacks', filter: `user_id=eq.${user.id}` },
        () => fetchNotifications()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuthenticated, user]);

  const totalUnread = unreadCount + feedbackUnread;

  const handleOpen = async () => {
    setIsOpen(true);
    markAllAsRead();

    if (!user) return;
    const supabase = createClient();
    await supabase
      .from('user_feedbacks')
      .update({ reply_read: true })
      .eq('user_id', user.id)
      .eq('reply_read', false);

    setFeedbackUnread(0);
    setFeedbacks((prev) => prev.map((f) => (f.reply ? { ...f, reply_read: true } : f)));
  };

  if (!isAuthenticated) return null;

  const fabClass = mobileInline
    ? 'w-12 h-12 rounded-full bg-arc-blue/10 border border-arc-blue/30 backdrop-blur-md flex items-center justify-center text-arc-blue hover:bg-arc-blue/20 transition-all relative'
    : 'fixed w-12 h-12 rounded-full bg-arc-blue/10 border border-arc-blue/30 backdrop-blur-md flex items-center justify-center text-arc-blue hover:bg-arc-blue/20 hover:shadow-[0_0_15px_rgba(0,217,255,0.4)] transition-all duration-300 group z-50';

  const fabStyle = mobileInline
    ? undefined
    : {
        bottom: 'calc(5rem + env(safe-area-inset-bottom, 0px))',
        right: 'calc(1.25rem + env(safe-area-inset-right, 0px))',
      };

  return (
    <>
      <button
        onClick={handleOpen}
        className={fabClass}
        style={fabStyle}
        aria-label="View Notifications"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={mobileInline ? '' : 'group-hover:scale-110 transition-transform'}>
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        {totalUnread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-warning-red border-2 border-black flex items-center justify-center text-[10px] font-orbitron font-bold text-white animate-pulse">
            {totalUnread > 99 ? '99+' : totalUnread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 40 }}
              className="w-full sm:max-w-lg bg-black/90 border border-arc-blue/30 rounded-t-2xl sm:rounded-xl shadow-[0_0_40px_rgba(0,217,255,0.1)] flex flex-col max-h-[85vh]"
              style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
            >
              <div className="p-6 pb-0 relative">
                <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-text-white/50 hover:text-white transition-colors p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                <h3 className="font-orbitron text-lg sm:text-xl text-arc-blue tracking-widest text-center mb-4">NOTIFICATIONS</h3>

                <div className="flex gap-1 bg-arc-blue/5 border border-arc-blue/20 rounded-lg p-1 mb-4">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`flex-1 px-3 py-1.5 font-orbitron text-xs tracking-wider rounded-md transition-all ${
                      activeTab === 'all'
                        ? 'bg-arc-blue/20 text-arc-blue shadow-[0_0_8px_rgba(0,217,255,0.2)]'
                        : 'text-text-white/50 hover:text-text-white/80'
                    }`}
                  >
                    All {unreadCount > 0 && <span className="ml-1 text-warning-red">({unreadCount})</span>}
                  </button>
                  <button
                    onClick={() => setActiveTab('feedback')}
                    className={`flex-1 px-3 py-1.5 font-orbitron text-xs tracking-wider rounded-md transition-all ${
                      activeTab === 'feedback'
                        ? 'bg-arc-blue/20 text-arc-blue shadow-[0_0_8px_rgba(0,217,255,0.2)]'
                        : 'text-text-white/50 hover:text-text-white/80'
                    }`}
                  >
                    Feedback {feedbackUnread > 0 && <span className="ml-1 text-warning-red">({feedbackUnread})</span>}
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 p-6 pt-2 pr-3">
                {activeTab === 'all' && (
                  <>
                    {notifications.length === 0 ? (
                      <p className="font-mono text-sm text-text-white/40 text-center py-8">No notifications yet.</p>
                    ) : (
                      notifications.map((n) => {
                        const cfg = TYPE_CONFIG[n.type];
                        return (
                          <div
                            key={n.id}
                            onClick={() => { markAsRead(n.id); }}
                            className={`p-4 rounded-lg border transition-all cursor-pointer ${
                              !n.read ? `${cfg.border} ${cfg.bg}` : 'border-arc-blue/10 bg-arc-blue/5 opacity-70'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <span className="text-lg shrink-0 mt-0.5">{cfg.icon}</span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span className={`font-orbitron text-[10px] uppercase tracking-wider ${cfg.color}`}>
                                    {cfg.label}
                                  </span>
                                  {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-arc-blue animate-pulse" />}
                                </div>
                                <p className="font-orbitron text-xs text-text-white/90 mb-1">{n.title}</p>
                                <p className="font-mono text-[11px] text-text-white/60 leading-relaxed whitespace-pre-wrap break-words">{n.body}</p>
                                <p className="font-mono text-[9px] text-text-white/30 mt-1">
                                  {new Date(n.timestamp).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </>
                )}

                {activeTab === 'feedback' && (
                  <>
                    {feedbacks.length === 0 ? (
                      <p className="font-mono text-sm text-text-white/40 text-center py-8">No feedback sent yet.</p>
                    ) : (
                      feedbacks.map((f) => (
                        <div key={f.id} className={`p-4 rounded-lg border ${f.reply && !f.reply_read ? 'border-arc-blue bg-arc-blue/10' : 'border-arc-blue/10 bg-arc-blue/5'}`}>
                          <p className="font-mono text-sm text-text-white/80 whitespace-pre-wrap">{f.message}</p>
                          {f.reply ? (
                            <div className="mt-3 p-3 border-l-2 border-terminal-green bg-terminal-green/5 rounded font-mono text-xs">
                              <span className="text-terminal-green font-bold uppercase tracking-wider">Admin Reply:</span>
                              <p className="text-text-white/80 whitespace-pre-wrap mt-1">{f.reply}</p>
                            </div>
                          ) : (
                            <p className="mt-2 font-mono text-[10px] text-text-white/30 uppercase">Awaiting reply...</p>
                          )}
                        </div>
                      ))
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
