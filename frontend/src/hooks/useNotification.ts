'use client';

import { useState, useEffect, useCallback } from 'react';
import { requestNotificationPermission, showLocalNotification } from '@/lib/notify';

interface UseNotificationReturn {
  permission: NotificationPermission | null;
  askPermission: () => Promise<boolean>;
  notify: (title: string, body: string, url?: string) => Promise<void>;
  swReady: boolean;
}

export function useNotification(): UseNotificationReturn {
  const [permission, setPermission] = useState<NotificationPermission | null>(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return null;
  });
  const [swReady, setSwReady] = useState(false);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker.register('/sw.js').then(() => {
      setSwReady(true);
    }).catch(() => {
      setSwReady(false);
    });
  }, []);

  const askPermission = useCallback(async () => {
    const granted = await requestNotificationPermission();
    setPermission(granted ? 'granted' : 'denied');
    return granted;
  }, []);

  const notify = useCallback(async (title: string, body: string, url?: string) => {
    await showLocalNotification(title, body, { url });
  }, []);

  return { permission, askPermission, notify, swReady };
}
