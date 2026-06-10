import { createClient } from './supabase';

export interface DailyAccessPoint {
  date: string;
  count: number;
  dayName: string;
}

export type AccessRange = 'today' | 'yesterday' | 'week' | 'month';

function getRangeDates(range: AccessRange): { start: Date; end: Date } {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);

  switch (range) {
    case 'today': {
      const start = new Date(now);
      start.setHours(0, 0, 0, 0);
      return { start, end };
    }
    case 'yesterday': {
      const start = new Date(now);
      start.setDate(start.getDate() - 1);
      start.setHours(0, 0, 0, 0);
      const yEnd = new Date(start);
      yEnd.setHours(23, 59, 59, 999);
      return { start, end: yEnd };
    }
    case 'week': {
      const start = new Date(now);
      start.setDate(start.getDate() - 6);
      start.setHours(0, 0, 0, 0);
      return { start, end };
    }
    case 'month': {
      const start = new Date(now);
      start.setDate(start.getDate() - 29);
      start.setHours(0, 0, 0, 0);
      return { start, end };
    }
  }
}

export function formatDateParam(d: Date): string {
  return d.toISOString().split('T')[0];
}

export async function fetchAccessData(range: AccessRange): Promise<DailyAccessPoint[]> {
  const supabase = createClient();
  const { start, end } = getRangeDates(range);

  const { data, error } = await supabase.rpc('get_daily_access_counts', {
    p_start_date: formatDateParam(start),
    p_end_date: formatDateParam(end),
  });

  if (error || !data) {
    console.error('Failed to fetch access data:', error);
    return [];
  }

  return data as DailyAccessPoint[];
}

export async function logAccess(userId: string): Promise<void> {
  try {
    const supabase = createClient();
    await supabase.rpc('log_daily_access', { target_user_id: userId });
  } catch {
    // silently fail – analytics should never block UX
  }
}
