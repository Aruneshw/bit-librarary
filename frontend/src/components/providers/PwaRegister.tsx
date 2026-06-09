'use client';

import { useEffect } from 'react';

export default function PwaRegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Register service worker when layout loads
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

  return null;
}
