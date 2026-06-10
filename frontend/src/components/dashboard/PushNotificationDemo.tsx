'use client';

import { useEffect, useRef, useState } from 'react';
import { useNotification } from '@/hooks/useNotification';

const DISMISS_COOLDOWN_MS = 24 * 60 * 60 * 1000;
const DISMISS_KEY = 'notification_demo_dismissed_at';

function isOnCooldown(): boolean {
  if (typeof window === 'undefined') return true;
  const raw = localStorage.getItem(DISMISS_KEY);
  if (!raw) return false;
  return Date.now() - Number(raw) < DISMISS_COOLDOWN_MS;
}

export default function PushNotificationDemo() {
  const { permission, askPermission, swReady } = useNotification();
  const askedRef = useRef(false);
  const [dismissed, setDismissed] = useState(isOnCooldown);

  useEffect(() => {
    if (!askedRef.current && swReady && !dismissed && permission === 'default') {
      askedRef.current = true;
      askPermission();
    }
  }, [swReady, askPermission, dismissed, permission]);

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setDismissed(true);
  };

  if (permission === 'granted' || dismissed) return null;

  return (
    <div className="fixed bottom-20 left-4 z-50">
      <div className="relative">
        <button
          onClick={askPermission}
          className="font-orbitron text-xs text-arc-blue uppercase tracking-wider bg-arc-blue/10 border border-arc-blue/30 px-3 py-2 rounded-lg hover:bg-arc-blue/20 transition-all"
          style={{ textShadow: '0 0 8px rgba(0,217,255,0.4)' }}
        >
          ENABLE NOTIFICATIONS
        </button>
        <button
          onClick={handleDismiss}
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-black/60 border border-arc-blue/30 flex items-center justify-center text-text-white/50 hover:text-white transition-colors"
          aria-label="Dismiss"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
}
