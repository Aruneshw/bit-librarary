import { create } from 'zustand';
import { createClient } from '@/lib/supabase';

interface NoticeState {
  notice: string | null;
  isLoading: boolean;
  fetchNotice: () => Promise<void>;
  updateNotice: (newMessage: string) => Promise<boolean>;
}

export const useNoticeStore = create<NoticeState>((set) => ({
  notice: null,
  isLoading: true,

  fetchNotice: async () => {
    const supabase = createClient();
    set({ isLoading: true });
    
    try {
      const { data, error } = await supabase
        .from('system_notices')
        .select('message')
        .eq('is_active', true)
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();
        
      if (data && !error) {
        set({ notice: data.message, isLoading: false });
      } else {
        set({ notice: "Welcome to ARC_OS Academic Nexus", isLoading: false });
      }
    } catch {
      set({ notice: "Welcome to ARC_OS Academic Nexus", isLoading: false });
    }
  },

  updateNotice: async (newMessage: string) => {
    const supabase = createClient();
    
    try {
      // Deactivate all old notices
      await supabase
        .from('system_notices')
        .update({ is_active: false })
        .eq('is_active', true);
        
      // Insert new notice
      const { error } = await supabase
        .from('system_notices')
        .insert([{ message: newMessage, is_active: true }]);
        
      if (!error) {
        set({ notice: newMessage });
        return true;
      }
      return false;
    } catch (e) {
      console.error("Failed to update notice", e);
      return false;
    }
  }
}));
