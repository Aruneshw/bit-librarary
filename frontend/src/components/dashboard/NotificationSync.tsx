'use client';

import { useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';
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
            if (!permitted.current) return;
            const msg = payload.new as { message?: string; reply?: string; id: string };
            showLocalNotification(
              'Broadcast',
              msg.reply ? `${msg.message} — ${msg.reply}` : (msg.message || 'New announcement'),
              { url: '/dashboard', tag: `broadcast-${msg.id}` }
            );
          }
        )
        .subscribe(),

      supabase
        .channel('notify-admin-posts')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'admin_posts' },
          (payload: PostgresPayload) => {
            if (!permitted.current) return;
            const post = payload.new as { title?: string; body?: string; id: string };
            showLocalNotification(
              post.title || 'New Post',
              post.body?.slice(0, 120) || '',
              { url: '/dashboard', tag: `post-${post.id}` }
            );
          }
        )
        .subscribe(),

      supabase
        .channel('notify-feedback-reply')
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'user_feedbacks', filter: `user_id=eq.${user.id}` },
          (payload: PostgresPayload) => {
            if (!permitted.current) return;
            const fb = payload.new as { reply?: string | null; message?: string; id: string };
            if (fb.reply) {
              showLocalNotification(
                'Admin Replied',
                `"${(fb.message || '').slice(0, 80)}" — ${fb.reply}`,
                { url: '/dashboard', tag: `reply-${fb.id}` }
              );
            }
          }
        )
        .subscribe(),
    ];

    return () => {
      channels.forEach((c) => supabase.removeChannel(c));
    };
  }, [isAuthenticated, user]);

  return null;
}
