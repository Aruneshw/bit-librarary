'use client';

import { useEffect, useRef } from 'react';
import { useNotification } from '@/hooks/useNotification';

export default function PushNotificationDemo() {
  const { permission, askPermission, swReady } = useNotification();
  const askedRef = useRef(false);

  useEffect(() => {
    if (!askedRef.current && swReady) {
      askedRef.current = true;
      askPermission();
    }
  }, [swReady, askPermission]);

  if (permission === 'granted') return null;

  return (
    <div className="fixed bottom-20 left-4 z-50">
      <button
        onClick={askPermission}
        className="font-orbitron text-xs text-arc-blue uppercase tracking-wider bg-arc-blue/10 border border-arc-blue/30 px-3 py-2 rounded-lg hover:bg-arc-blue/20 transition-all"
        style={{ textShadow: '0 0 8px rgba(0,217,255,0.4)' }}
      >
        ENABLE NOTIFICATIONS
      </button>
    </div>
  );
}
