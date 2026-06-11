'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useJourneyStore } from '@/store/journeyStore';
import { useStudyTracker } from '@/lib/journey/tracker';

export default function StudyTrackerProvider() {
  const { user, isAuthenticated } = useAuthStore();
  const updateFromHeartbeat = useJourneyStore((s) => s.updateFromHeartbeat);

  useStudyTracker(isAuthenticated ? user?.id : undefined, {
    onHeartbeat(result) {
      updateFromHeartbeat(result);
    },
  });

  useEffect(() => {
    if (!isAuthenticated) {
      useJourneyStore.getState().reset();
    }
  }, [isAuthenticated]);

  return null;
}
