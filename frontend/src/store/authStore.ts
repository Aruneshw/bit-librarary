import { create } from 'zustand';
import { type Profile, type Department } from '@/types';
import { createClient } from '@/lib/supabase';

interface AuthState {
  user: Profile | null;
  avatarUrl: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: Profile | null) => void;
  setAvatarUrl: (url: string | null) => void;
  setLoading: (loading: boolean) => void;
  updateDepartment: (dept: Department) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  avatarUrl: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setAvatarUrl: (avatarUrl) => set({ avatarUrl }),
  setLoading: (isLoading) => set({ isLoading }),

  fetchUser: async () => {
    const supabase = createClient();
    try {
      set({ isLoading: true });
      const { data: { user: authUser } } = await supabase.auth.getUser();

      if (!authUser) {
        set({ user: null, isAuthenticated: false, isLoading: false });
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      let userProfile = profile;
      
      // Auto-extract department if missing
      if (profile && !profile.department && authUser.email) {
        try {
          const emailPrefix = authUser.email.split('@')[0];
          const parts = emailPrefix.split('.');
          const lastPart = parts[parts.length - 1]; // e.g. "al25"
          const deptMatch = lastPart.match(/^[a-zA-Z]+/); // matches "al"
          
          if (deptMatch) {
            const extractedDept = deptMatch[0].toUpperCase();
            const allowedDepts = ['CS','IT','AL','AD','EEE','EIE','ME','MZ','AG','BT'];
            
            if (allowedDepts.includes(extractedDept)) {
              await supabase
                .from('profiles')
                .update({ department: extractedDept })
                .eq('id', authUser.id);
                
              userProfile = { ...profile, department: extractedDept };
            }
          }
        } catch (e) {
          console.error("Failed to extract department", e);
        }
      }

      if (userProfile) {
        set({
          user: userProfile as Profile,
          avatarUrl: authUser.user_metadata?.avatar_url || null,
          isAuthenticated: true,
          isLoading: false
        });
      } else {
        set({ user: null, avatarUrl: null, isAuthenticated: false, isLoading: false });
      }
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  updateDepartment: async (dept: Department) => {
    const supabase = createClient();
    const user = get().user;
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update({ department: dept })
      .eq('id', user.id);

    if (!error) {
      set({ user: { ...user, department: dept } });
    }
  },

  signInWithGoogle: async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          hd: 'bitsathy.ac.in',
        },
      },
    });
  },

  signOut: async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    set({ user: null, isAuthenticated: false });
  },
}));
