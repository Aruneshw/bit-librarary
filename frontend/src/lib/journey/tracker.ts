'use client';

import { useEffect, useRef, useCallback } from 'react';
import type { HeartbeatResult } from './types';

const HEARTBEAT_INTERVAL = 60_000;
const IDLE_TIMEOUT = 300_000;

interface TrackerCallbacks {
  onHeartbeat?: (result: HeartbeatResult) => void;
  onError?: (err: Error) => void;
}

export function useStudyTracker(userId: string | undefined, callbacks?: TrackerCallbacks) {
  const activeSecondsRef = useRef(0);
  const lastActivityRef = useRef(Date.now());
  const isActiveRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isVisibleRef = useRef(true);
  const isSendingRef = useRef(false);

  const sendHeartbeat = useCallback(async () => {
    if (isSendingRef.current) return;
    const seconds = activeSecondsRef.current;
    if (seconds <= 0 || !userId) return;

    isSendingRef.current = true;
    activeSecondsRef.current = 0;

    try {
      const res = await fetch('/api/journey/heartbeat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ durationSeconds: seconds }),
      });
      if (res.ok) {
        const data: HeartbeatResult = await res.json();
        callbacks?.onHeartbeat?.(data);
      }
    } catch (err) {
      activeSecondsRef.current += seconds;
      callbacks?.onError?.(err instanceof Error ? err : new Error('Heartbeat failed'));
    } finally {
      isSendingRef.current = false;
    }
  }, [userId, callbacks]);

  const markActive = useCallback(() => {
    lastActivityRef.current = Date.now();
    if (!isActiveRef.current && isVisibleRef.current) {
      isActiveRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const events = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'];
    for (const ev of events) {
      window.addEventListener(ev, markActive, { passive: true });
    }

    const visHandler = () => {
      isVisibleRef.current = document.visibilityState === 'visible';
      if (isVisibleRef.current) {
        markActive();
      } else {
        isActiveRef.current = false;
        sendHeartbeat();
      }
    };
    document.addEventListener('visibilitychange', visHandler);

    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastActivityRef.current;
      isActiveRef.current = isVisibleRef.current && elapsed < IDLE_TIMEOUT;

      if (isActiveRef.current) {
        activeSecondsRef.current += Math.min(HEARTBEAT_INTERVAL / 1000, elapsed / 1000);
      }
    }, 1000);

    const unloadHandler = () => {
      sendHeartbeat();
    };
    window.addEventListener('beforeunload', unloadHandler);

    return () => {
      for (const ev of events) {
        window.removeEventListener(ev, markActive);
      }
      document.removeEventListener('visibilitychange', visHandler);
      window.removeEventListener('beforeunload', unloadHandler);
      if (intervalRef.current) clearInterval(intervalRef.current);
      sendHeartbeat();
    };
  }, [userId, markActive, sendHeartbeat]);
}
