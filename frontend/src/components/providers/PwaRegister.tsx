'use client';

import { useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase';

function isPwaInstalled(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  );
}

export default function PwaRegister() {
  const reported = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('BIT LIBRARY: Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('BIT LIBRARY: Service Worker registration failed:', error);
        });
    }
  }, []);

  useEffect(() => {
    if (reported.current) return;

    const checkAndReport = async () => {
      const installed = isPwaInstalled();
      if (!installed) return;

      reported.current = true;
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.id) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('app_installed')
            .eq('id', user.id)
            .single();

          if (!profile?.app_installed) {
            await supabase
              .from('profiles')
              .update({ app_installed: true })
              .eq('id', user.id);
            console.log('BIT LIBRARY: App install detected — profile updated.');
          }
        }
      } catch {
        // silently fail — not critical
      }
    };

    checkAndReport();

    const mql = window.matchMedia('(display-mode: standalone)');
    const handler = () => {
      if (isPwaInstalled()) checkAndReport();
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return null;
}
