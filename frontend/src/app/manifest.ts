import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BIT LIBRARY',
    short_name: 'BITLib',
    description: 'Elite AI-powered knowledge system for BIT Sathy students. Access your academic subjects, track progress, and achieve mastery.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#070707',
    theme_color: '#070707',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
