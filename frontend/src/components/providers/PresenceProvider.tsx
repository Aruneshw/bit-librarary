'use client';

import { useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';
import { usePresenceStore } from '@/store/presenceStore';
import { getAuthToken } from '@/lib/authHelpers';

const HEARTBEAT_MS = 45000;

export default function PresenceProvider() {
  const { user, isAuthenticated } = useAuthStore();
  const { setOnlineCount, setOnlineUserIds, setIsConnected, reset } = usePresenceStore();
  const channelRef = useRef<ReturnType<ReturnType<typeof createClient>['channel']> | null>(null);
  const supabaseRef = useRef<ReturnType<typeof createClient> | null>(null);
  const userIdRef = useRef<string | undefined>(undefined);
  const userNameRef = useRef<string>('Unknown');

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    userIdRef.current = user.id;
    userNameRef.current = user.name || user.email || 'Unknown';

    const supabase = createClient();
    supabaseRef.current = supabase;
    const currentUserId = user.id;
    const currentUserName = user.name || user.email || 'Unknown';

    /* ── Supabase Realtime presence channel ── */
    const channel = supabase.channel('online-users', {
      config: {
        presence: { key: currentUserId },
      },
    });
    channelRef.current = channel;

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        setOnlineCount(Object.keys(state).length);
        setOnlineUserIds(Object.keys(state));
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

    /* ── Combined heartbeat: track + DB ── */
    const doHeartbeat = async () => {
      try {
        if (channelRef.current) {
          await channelRef.current.track({
            online_at: new Date().toISOString(),
            user_id: userIdRef.current,
            name: userNameRef.current,
          });
        }
      } catch {}

      try {
        const token = await getAuthToken();
        if (token) {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          if (apiUrl) {
            await fetch(`${apiUrl}/presence/heartbeat`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });
          }
        }
      } catch {}
    };

    doHeartbeat();
    const heartbeatId = setInterval(doHeartbeat, HEARTBEAT_MS);

    /* ── Visibility: untrack on hide, re-track on show ── */
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        try { channelRef.current?.untrack(); } catch {}
      } else if (document.visibilityState === 'visible') {
        try {
          channelRef.current?.track({
            online_at: new Date().toISOString(),
            user_id: userIdRef.current,
            name: userNameRef.current,
          });
        } catch {}
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      clearInterval(heartbeatId);
      document.removeEventListener('visibilitychange', onVisibility);
      supabase.removeChannel(channel);
      channelRef.current = null;
      supabaseRef.current = null;
      reset();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user?.id, setOnlineCount, setOnlineUserIds, setIsConnected, reset]);

  return null;
}
