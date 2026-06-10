'use client';

import { useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';
import { useNotificationStore } from '@/store/notificationStore';
import { requestNotificationPermission, showLocalNotification } from '@/lib/notify';

interface PostgresPayload {
  new: Record<string, unknown>;
  old: Record<string, unknown>;
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  schema: string;
  table: string;
}

export default function NotificationSync() {
  const { user, isAuthenticated } = useAuthStore();
  const permitted = useRef(false);
  const addNotification = useNotificationStore((s) => s.addNotification);
  const pushEnabled = useNotificationStore((s) => s.pushEnabled);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    requestNotificationPermission().then((granted) => {
      permitted.current = granted;
    });

    const supabase = createClient();

    const channels = [
      supabase
        .channel('notify-broadcasts')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'user_feedbacks', filter: 'is_broadcast=eq.true' },
          (payload: PostgresPayload) => {
            const msg = payload.new as { message?: string; reply?: string; id: string };
            const title = 'Broadcast';
            const body = msg.reply ? `${msg.message} — ${msg.reply}` : (msg.message || 'New announcement');

            addNotification({ type: 'broadcast', title, body, data: { url: '/dashboard' } });

            if (permitted.current && pushEnabled) {
              showLocalNotification(title, body, { url: '/dashboard', tag: `broadcast-${msg.id}` });
            }
          }
        )
        .subscribe(),

      supabase
        .channel('notify-admin-posts')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'admin_posts' },
          (payload: PostgresPayload) => {
            const post = payload.new as { title?: string; body?: string; id: string; image_url?: string; video_url?: string };
            const hasMedia = !!(post.image_url || post.video_url);
            const type = hasMedia ? 'media' : 'post';
            const title = post.title || (hasMedia ? 'New Media' : 'New Post');
            const body = post.body?.slice(0, 120) || '';

            addNotification({ type, title, body, data: { url: '/dashboard' } });

            if (permitted.current && pushEnabled) {
              showLocalNotification(title, body, { url: '/dashboard', tag: `post-${post.id}` });
            }
          }
        )
        .subscribe(),

      supabase
        .channel('notify-feedback-reply')
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'user_feedbacks', filter: `user_id=eq.${user.id}` },
          (payload: PostgresPayload) => {
            const fb = payload.new as { reply?: string | null; message?: string; id: string };
            if (fb.reply) {
              const title = 'Admin Replied';
              const body = `"${(fb.message || '').slice(0, 80)}" — ${fb.reply}`;

              addNotification({ type: 'feedback_reply', title, body, data: { url: '/dashboard' } });

              if (permitted.current && pushEnabled) {
                showLocalNotification(title, body, { url: '/dashboard', tag: `reply-${fb.id}` });
              }
            }
          }
        )
        .subscribe(),
    ];

    return () => {
      channels.forEach((c) => supabase.removeChannel(c));
    };
  }, [isAuthenticated, user, addNotification, pushEnabled]);

  return null;
}
