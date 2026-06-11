'use client';

import { useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';
import { usePresenceStore } from '@/store/presenceStore';

export default function PresenceProvider() {
  const { user, isAuthenticated } = useAuthStore();
  const { setOnlineCount, setOnlineUserIds, setIsConnected, reset } = usePresenceStore();
  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const supabase = createClient();

    const channel = supabase.channel('online-users', {
      config: {
        presence: {
          key: user.id,
        },
      },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const userIds = Object.keys(state);
        setOnlineCount(userIds.length);
        setOnlineUserIds(userIds);
      })
      .subscribe(async (status: string) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            online_at: new Date().toISOString(),
            user_id: user.id,
            name: user.name || user.email,
          });
          setIsConnected(true);
        }
      });

    const sendHeartbeat = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.access_token) {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          if (apiUrl) {
            await fetch(`${apiUrl}/presence/heartbeat`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${session.access_token}`,
                'Content-Type': 'application/json',
              },
            });
          }
        }
      } catch {
        // Silently fail — Presence handles real-time, DB is async fallback
      }
    };

    sendHeartbeat();
    heartbeatRef.current = setInterval(sendHeartbeat, 60000);

    return () => {
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current);
        heartbeatRef.current = null;
      }
      supabase.removeChannel(channel);
      reset();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user?.id, setOnlineCount, setOnlineUserIds, setIsConnected, reset]);

  return null;
}
