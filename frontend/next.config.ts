import type { NextConfig } from "next";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: false,
  skipWaiting: true,
  cacheStartUrl: false,
  dynamicStartUrl: false,
  cacheOnFrontEndNav: false,
  runtimeCaching: [
    { urlPattern: ({ request }: { request: Request }) => request.mode === 'navigate', handler: 'NetworkOnly' },
    { urlPattern: /\/api\/|\.supabase\.co\//, handler: 'NetworkOnly' },
    { urlPattern: /\/_next\/static\//, handler: 'CacheFirst', options: { cacheName: 'bithub-static-v1', expiration: { maxEntries: 100, maxAgeSeconds: 604800 } } },
  ],
});

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { VueLoaderPlugin } = require('vue-loader');

const nextConfig: NextConfig = {
  // Turbopack can be re-enabled if desired since custom webpack is removed
  turbopack: {},
  async headers() {
    return [
      { source: '/hub/:path*', headers: [{ key: 'Cache-Control', value: 'private, no-store' }] },
      { source: '/auth/:path*', headers: [{ key: 'Cache-Control', value: 'private, no-store' }] },
      { source: '/api/:path*', headers: [{ key: 'Cache-Control', value: 'private, no-store' }] },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.posthog.com https://us-assets.i.posthog.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https: http://localhost:3001 wss: ws:; frame-src 'self' https://www.youtube.com; worker-src 'self' blob:; object-src 'none';",
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },
};

export default withPWA(nextConfig);
