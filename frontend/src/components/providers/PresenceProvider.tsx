'use client';

import { useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';
import { usePresenceStore } from '@/store/presenceStore';

export default function PresenceProvider() {
  const { user, isAuthenticated } = useAuthStore();
  const { setOnlineCount, setOnlineUserIds, setIsConnected, reset } = usePresenceStore();
  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const channelRef = useRef<ReturnType<ReturnType<typeof createClient>['channel']> | null>(null);
  const userIdRef = useRef<string | undefined>(undefined);
  const userNameRef = useRef<string>('Unknown');

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    userIdRef.current = user.id;
    userNameRef.current = user.name || user.email || 'Unknown';

    const supabase = createClient();
    const currentUserId = user.id;
    const currentUserName = user.name || user.email || 'Unknown';

    const channel = supabase.channel('online-users', {
      config: {
        presence: {
          key: currentUserId,
        },
      },
    });

    channelRef.current = channel;

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
            user_id: currentUserId,
            name: currentUserName,
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
      }
    };

    sendHeartbeat();
    heartbeatRef.current = setInterval(sendHeartbeat, 60000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendHeartbeat();
      } else if (document.visibilityState === 'visible' && channelRef.current) {
        channelRef.current.track({
          online_at: new Date().toISOString(),
          user_id: userIdRef.current,
          name: userNameRef.current,
        });
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const handleBeforeUnload = () => {
      sendHeartbeat();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current);
        heartbeatRef.current = null;
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      supabase.removeChannel(channel);
      channelRef.current = null;
      reset();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user?.id, setOnlineCount, setOnlineUserIds, setIsConnected, reset]);

  return null;
}
