'use client';

import { useEffect, useRef, useState } from 'react';

const DISMISS_COOLDOWN_MS = 24 * 60 * 60 * 1000;
const DISMISS_KEY = 'notification_demo_dismissed_at';

function isOnCooldown(): boolean {
  if (typeof window === 'undefined') return true;
  const raw = localStorage.getItem(DISMISS_KEY);
  if (!raw) return false;
  return Date.now() - Number(raw) < DISMISS_COOLDOWN_MS;
}

export default function PushNotificationDemo() {
  const [permission, setPermission] = useState<NotificationPermission | null>(null);
  const askedRef = useRef(false);
  const [dismissed, setDismissed] = useState(isOnCooldown);
  const [showTip, setShowTip] = useState(false);
  const tipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  useEffect(() => {
    if (!askedRef.current && permission === 'default' && !dismissed) {
      askedRef.current = true;
      Notification.requestPermission().then((p) => setPermission(p));
    }
  }, [permission, dismissed]);

  const handleAsk = async () => {
    if (permission === 'denied') {
      setShowTip(true);
      if (tipTimer.current) clearTimeout(tipTimer.current);
      tipTimer.current = setTimeout(() => setShowTip(false), 4000);
      return;
    }
    if (permission === 'default') {
      const p = await Notification.requestPermission();
      setPermission(p);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setDismissed(true);
  };

  if (permission === 'granted' || dismissed) return null;

  return (
    <div className="fixed bottom-20 left-4 z-50">
      <div className="relative">
        <button
          onClick={handleAsk}
          className="font-orbitron text-xs text-arc-blue uppercase tracking-wider bg-arc-blue/10 border border-arc-blue/30 px-3 py-2 rounded-lg hover:bg-arc-blue/20 transition-all"
          style={{ textShadow: '0 0 8px rgba(0,217,255,0.4)' }}
        >
          {permission === 'denied' ? 'NOTIFICATIONS BLOCKED' : 'ENABLE NOTIFICATIONS'}
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
        {showTip && (
          <div className="absolute bottom-full left-0 mb-2 w-64 p-3 rounded-lg bg-black/90 border border-warning-red/40 backdrop-blur-xl shadow-[0_0_20px_rgba(255,61,61,0.2)] z-[100]">
            <p className="font-mono text-[10px] text-text-white/80 leading-relaxed">
              Notifications are blocked by your browser. Click the lock/info icon in your address bar and enable notifications for this site.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
