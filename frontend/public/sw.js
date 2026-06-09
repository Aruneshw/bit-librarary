// ═══════════════════════════════════════════
// BIT LIBRARY — Service Worker
// ═══════════════════════════════════════════

const CACHE_NAME = 'bit-library-v1';

// Install event: skip waiting to activate the worker immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Activate event: claim all open clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Fetch event: simple network-first fallback strategy (safe for dynamic database queries)
self.addEventListener('fetch', (event) => {
  // Pass through all requests directly to the network
  event.respondWith(
    fetch(event.request).catch(() => {
      // Offline fallback can be handled here if needed
      return new Response('Network error occurred. Please check your connection.', {
        status: 503,
        statusText: 'Service Unavailable',
        headers: new Headers({ 'Content-Type': 'text/plain' })
      });
    })
  );
});
