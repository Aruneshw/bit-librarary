export interface JourneyStats {
  name: string | null;
  current_streak: number;
  longest_streak: number;
  total_active_days: number;
  total_study_seconds: number;
  total_downloads: number;
  total_resources_viewed: number;
  current_title: string;
  journey_start_date: string;
  last_active_date: string | null;
  today_seconds: number;
  today_session_count: number;
  title_history: TitleHistoryEntry[];
  achievements: AchievementEntry[];
}

export interface TitleHistoryEntry {
  title: string;
  day_number: number;
  unlocked_at: string;
}

export interface AchievementEntry {
  achievement_type: string;
  title: string;
  description: string | null;
  metadata: Record<string, unknown>;
  unlocked_at: string;
}

export interface HeartbeatResult {
  current_streak: number;
  longest_streak: number;
  total_active_days: number;
  total_study_seconds: number;
  current_title: string;
  today_seconds: number;
  title_unlocked: TitleUnlock | null;
}

export interface TitleUnlock {
  title: string;
  day: number;
  isNew: boolean;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  department: string | null;
  current_streak: number;
  longest_streak: number;
  total_study_seconds: number;
  total_active_days: number;
  total_downloads: number;
  total_resources_viewed: number;
  title: string;
  journey_start_date: string;
}

export interface WelcomeData {
  isNewDay: boolean;
  day: number;
  streak: number;
  title: string;
  newTitle: TitleUnlock | null;
  todaySeconds: number;
}
