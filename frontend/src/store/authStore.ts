import { create } from 'zustand';
import { type Profile, type Department } from '@/types';
import { createClient } from '@/lib/supabase';

interface AuthState {
  user: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: Profile | null) => void;
  setLoading: (loading: boolean) => void;
  updateDepartment: (dept: Department) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
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

      if (profile) {
        set({ user: profile as Profile, isAuthenticated: true, isLoading: false });
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
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
