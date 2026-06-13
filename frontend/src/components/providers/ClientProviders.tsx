'use client';

import dynamic from 'next/dynamic';
import { PostHogProvider } from './PostHogProvider';

const MatrixBackground = dynamic(() => import('@/components/animations/MatrixBackground'), { ssr: false });
const PresenceProvider = dynamic(() => import('./PresenceProvider'), { ssr: false });
const StudyTrackerProvider = dynamic(() => import('./StudyTrackerProvider'), { ssr: false });

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider>
      <PresenceProvider />
      <StudyTrackerProvider />
      <MatrixBackground />
      {children}
    </PostHogProvider>
  );
}
