import { create } from 'zustand';
import type { JourneyStats, HeartbeatResult, TitleUnlock } from '@/lib/journey/types';

interface JourneyState {
  stats: JourneyStats | null;
  newTitleUnlock: TitleUnlock | null;
  setStats: (stats: JourneyStats) => void;
  updateFromHeartbeat: (result: HeartbeatResult) => void;
  clearTitleUnlock: () => void;
  reset: () => void;
}

export const useJourneyStore = create<JourneyState>((set) => ({
  stats: null,
  newTitleUnlock: null,
  setStats: (stats) => set({ stats }),
  updateFromHeartbeat: (result) =>
    set((state) => ({
      stats: state.stats
        ? {
            ...state.stats,
            current_streak: result.current_streak,
            longest_streak: result.longest_streak,
            total_active_days: result.total_active_days,
            total_study_seconds: result.total_study_seconds,
            current_title: result.current_title,
            today_seconds: result.today_seconds,
          }
        : null,
      newTitleUnlock: result.title_unlocked ?? state.newTitleUnlock,
    })),
  clearTitleUnlock: () => set({ newTitleUnlock: null }),
  reset: () => set({ stats: null, newTitleUnlock: null }),
}));
