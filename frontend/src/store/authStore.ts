import { create } from 'zustand';
import { type User } from '@supabase/supabase-js';
import { type Profile, type Department } from '@/types';
import { createClient } from '@/lib/supabase';
import { isAdminEmail } from '@/lib/adminEmails';
import { getAuthToken } from '@/lib/authHelpers';

const ALLOWED_EMAIL_DOMAIN = '@bitsathy.ac.in';
const ALLOWED_DEPARTMENTS: Department[] = ['CS', 'IT', 'AL', 'AD', 'EEE', 'ECE', 'EIE', 'ME', 'MZ', 'AG', 'BT'];

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
  let extractedDept = deptMatch?.[0]?.toUpperCase();

  if (extractedDept === 'EE') {
    extractedDept = 'EEE';
  } else if (extractedDept === 'EC') {
    extractedDept = 'ECE';
  } else if (extractedDept === 'EI') {
    extractedDept = 'EIE';
  }

  const finalDept = extractedDept as Department | undefined;
  return finalDept && ALLOWED_DEPARTMENTS.includes(finalDept) ? finalDept : null;
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

let profileSubscription: any = null;

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  avatarUrl: null,
  isLoading: true,
  isAuthenticated: false,
  isAdmin: false,

  setUser: (user) => set({ user, isAuthenticated: !!user, isAdmin: isAdminEmail(user?.email) }),
  setAvatarUrl: (avatarUrl) => set({ avatarUrl }),
  setLoading: (isLoading) => set({ isLoading }),

  fetchUser: async () => {
    const supabase = createClient();
    try {
      set({ isLoading: true });

      // No local bypass checks needed here, as we authenticate directly via Supabase Auth magic link.

      const { data: { user: authUser } } = await supabase.auth.getUser();

      if (!authUser) {
        set({ user: null, isAuthenticated: false, isLoading: false });
        return;
      }

      if (!authUser.email || (!authUser.email.endsWith(ALLOWED_EMAIL_DOMAIN) && !isAdminEmail(authUser.email))) {
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
          login_count: 1,
          created_at: new Date().toISOString(),
        };

        await supabase
          .from('profiles')
          .upsert({
            id: userProfile.id,
            email: userProfile.email,
            name: userProfile.name,
            department: userProfile.department,
            login_count: 1
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
          isAdmin: isAdminEmail(userProfile.email),
          isLoading: false
        });

        // Setup real-time listener for self-healing when admin manually updates DB
        if (profileSubscription) {
          supabase.removeChannel(profileSubscription);
        }

        profileSubscription = supabase
          .channel(`public:profiles:${authUser.id}`)
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'profiles',
              filter: `id=eq.${authUser.id}`,
            },
            (payload: any) => {
              const updatedProfile = payload.new as Profile;
              set({
                user: updatedProfile,
                isAdmin: isAdminEmail(updatedProfile.email),
              });
            }
          )
          .subscribe();

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
    if (profileSubscription) {
      await supabase.removeChannel(profileSubscription);
      profileSubscription = null;
    }

    try {
      const token = await getAuthToken();
      if (token) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (apiUrl) {
          await fetch(`${apiUrl}/presence/heartbeat?offline=true`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
        }
      }
    } catch (err) {
      console.error('Failed to mark user offline during signout:', err);
    }

    await supabase.auth.signOut();
    set({ user: null, isAuthenticated: false, isAdmin: false });
  },
}));
