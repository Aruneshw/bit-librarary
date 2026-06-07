import { create } from 'zustand';
import { type User } from '@supabase/supabase-js';
import { type Profile, type Department } from '@/types';
import { createClient } from '@/lib/supabase';

const ALLOWED_EMAIL_DOMAIN = '@bitsathy.ac.in';
const ALLOWED_DEPARTMENTS: Department[] = ['CS', 'IT', 'AL', 'AD', 'EEE', 'EIE', 'ME', 'MZ', 'AG', 'BT'];
const ADMIN_EMAIL = 'aruneshownsty1@gmail.com';

type AuthUser = User & {
  raw_user_meta_data?: Record<string, unknown>;
};

type AuthMetadata = {
  full_name?: string;
  name?: string;
  avatar_url?: string;
  picture?: string;
};

function getUserMetadata(authUser: AuthUser): AuthMetadata {
  return (authUser.user_metadata || authUser.raw_user_meta_data || {}) as AuthMetadata;
}

function getDisplayName(authUser: AuthUser): string | null {
  const metadata = getUserMetadata(authUser);
  return metadata.full_name || metadata.name || authUser.email?.split('@')[0] || null;
}

function getAvatarUrl(authUser: AuthUser): string | null {
  const metadata = getUserMetadata(authUser);
  return metadata.avatar_url || metadata.picture || null;
}

function extractDepartmentFromEmail(email: string): Department | null {
  const emailPrefix = email.split('@')[0];
  const parts = emailPrefix.split('.');
  const lastPart = parts[parts.length - 1];
  const deptMatch = lastPart.match(/^[a-zA-Z]+/);
  const extractedDept = deptMatch?.[0]?.toUpperCase() as Department | undefined;

  return extractedDept && ALLOWED_DEPARTMENTS.includes(extractedDept) ? extractedDept : null;
}

interface AuthState {
  user: Profile | null;
  avatarUrl: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
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
  isAdmin: false,

  setUser: (user) => set({ user, isAuthenticated: !!user, isAdmin: user?.email === ADMIN_EMAIL }),
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

      if (!authUser.email || (!authUser.email.endsWith(ALLOWED_EMAIL_DOMAIN) && authUser.email !== ADMIN_EMAIL)) {
        await supabase.auth.signOut();
        set({ user: null, avatarUrl: null, isAuthenticated: false, isAdmin: false, isLoading: false });
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      let userProfile = profile as Profile | null;

      if (!userProfile) {
        userProfile = {
          id: authUser.id,
          email: authUser.email,
          name: getDisplayName(authUser),
          department: null,
          created_at: new Date().toISOString(),
        };

        await supabase
          .from('profiles')
          .upsert({
            id: userProfile.id,
            email: userProfile.email,
            name: userProfile.name,
            department: userProfile.department,
          });

        await supabase
          .from('settings')
          .upsert({ user_id: authUser.id }, { onConflict: 'user_id' });
      }

      // Auto-extract department if missing
      if (!userProfile.department) {
        try {
          const extractedDept = extractDepartmentFromEmail(authUser.email);

          if (extractedDept) {
            await supabase
              .from('profiles')
              .update({ department: extractedDept })
              .eq('id', authUser.id);

            userProfile = { ...userProfile, department: extractedDept };
          }
        } catch (e) {
          console.error("Failed to extract department", e);
        }
      }

      if (userProfile) {
        set({
          user: userProfile as Profile,
          avatarUrl: getAvatarUrl(authUser),
          isAuthenticated: true,
          isAdmin: userProfile.email === ADMIN_EMAIL,
          isLoading: false
        });
      } else {
        set({ user: null, avatarUrl: null, isAuthenticated: false, isAdmin: false, isLoading: false });
      }
    } catch {
      set({ user: null, avatarUrl: null, isAuthenticated: false, isAdmin: false, isLoading: false });
    }
  },

  updateDepartment: async (dept: Department) => {
    const supabase = createClient();
    const user = get().user;
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        email: user.email,
        name: user.name,
        department: dept,
      });

    if (!error) {
      set({ user: { ...user, department: dept } });
    }
  },

  signInWithGoogle: async () => {
    const supabase = createClient();
    const result = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/login`,
        queryParams: {
          hd: 'bitsathy.ac.in',
          prompt: 'select_account',
        },
      },
    });

    if (result?.error) throw result.error;
  },

  signOut: async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    set({ user: null, isAuthenticated: false, isAdmin: false });
  },
}));
