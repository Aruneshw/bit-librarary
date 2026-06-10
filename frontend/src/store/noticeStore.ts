import { create } from 'zustand';
import { createClient } from '@/lib/supabase';

export interface FeatureItem {
  title: string;
  description: string;
}

export interface SystemNotice {
  id: string;
  message: string;
  notice_type: 'system' | 'feature';
  features: FeatureItem[];
  duration_seconds: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface NoticeState {
  notice: string | null;
  featureNotice: SystemNotice | null;
  isLoading: boolean;
  fetchNotice: () => Promise<void>;
  updateNotice: (newMessage: string) => Promise<boolean>;
  updateFeatureNotice: (updates: {
    message?: string;
    features?: FeatureItem[];
    duration_seconds?: number;
  }) => Promise<boolean>;
}

export const useNoticeStore = create<NoticeState>((set, get) => ({
  notice: null,
  featureNotice: null,
  isLoading: true,

  fetchNotice: async () => {
    const supabase = createClient();
    set({ isLoading: true });

    try {
      const { data, error } = await supabase
        .from('system_notices')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (data && !error) {
        const parsed = data as SystemNotice;
        set({
          notice: parsed.notice_type === 'feature' ? parsed.message : parsed.message,
          featureNotice: parsed.notice_type === 'feature' ? parsed : null,
          isLoading: false,
        });
      } else {
        set({ notice: null, featureNotice: null, isLoading: false });
      }
    } catch {
      set({ notice: null, featureNotice: null, isLoading: false });
    }
  },

  updateNotice: async (newMessage: string) => {
    const supabase = createClient();

    try {
      await supabase
        .from('system_notices')
        .update({ is_active: false })
        .eq('is_active', true);

      const { error } = await supabase
        .from('system_notices')
        .insert([{ message: newMessage, is_active: true, notice_type: 'system' }]);

      if (!error) {
        set({ notice: newMessage, featureNotice: null });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },

  updateFeatureNotice: async (updates) => {
    const supabase = createClient();
    const current = get().featureNotice;
    if (!current) return false;

    try {
      const { error } = await supabase
        .from('system_notices')
        .update({
          ...(updates.message !== undefined ? { message: updates.message } : {}),
          ...(updates.features !== undefined ? { features: updates.features } : {}),
          ...(updates.duration_seconds !== undefined ? { duration_seconds: updates.duration_seconds } : {}),
        })
        .eq('id', current.id);

      if (!error) {
        set({
          featureNotice: { ...current, ...updates },
          notice: updates.message ?? current.message,
        });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },
}));
