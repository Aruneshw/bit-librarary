import { createBrowserClient } from '@supabase/ssr';
import { MOCK_SUBJECTS, MOCK_QUESTIONS } from './mockData';

// Determine if we should use Mock Mode
const hasValidEnv =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your_supabase_url_here') &&
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes('your_supabase_anon_key_here');

class MockQueryBuilder {
  private table: string;
  private operation: 'select' | 'update' | 'upsert' = 'select';
  private filters: { type: string; column: string; value: any }[] = [];
  private orderVal: { column: string; ascending: boolean } | null = null;
  private updateValues: any = null;
  private isSingle = false;
  private countOptions: { count?: string; head?: boolean } | null = null;

  constructor(table: string) {
    this.table = table;
  }

  select(columns?: string, options?: { count?: string; head?: boolean }) {
    this.operation = 'select';
    if (options) {
      this.countOptions = options;
    }
    return this;
  }

  update(values: any) {
    this.operation = 'update';
    this.updateValues = values;
    return this;
  }

  upsert(values: any, options?: any) {
    this.operation = 'upsert';
    this.updateValues = values;
    return this;
  }

  contains(column: string, value: any[]) {
    this.filters.push({ type: 'contains', column, value });
    return this;
  }

  eq(column: string, value: any) {
    this.filters.push({ type: 'eq', column, value });
    return this;
  }

  order(column: string, options?: { ascending?: boolean }) {
    this.orderVal = { column, ascending: options?.ascending ?? true };
    return this;
  }

  single() {
    this.isSingle = true;
    return this;
  }

  then(onfulfilled?: (value: any) => any, onrejected?: (reason: any) => any) {
    return this.execute().then(onfulfilled, onrejected);
  }

  private async execute() {
    if (typeof window === 'undefined') {
      return { data: null, error: null, count: 0 };
    }

    const getStorage = (key: string, def: any) => {
      const val = localStorage.getItem(key);
      if (!val) {
        localStorage.setItem(key, JSON.stringify(def));
        return def;
      }
      return JSON.parse(val);
    };

    const setStorage = (key: string, val: any) => {
      localStorage.setItem(key, JSON.stringify(val));
    };

    let data: any = null;
    let count: number | null = null;
    let error: any = null;

    if (this.table === 'profiles') {
      const profiles = getStorage('arc_os_profiles', []);
      if (this.operation === 'select') {
        data = [...profiles];
      } else if (this.operation === 'update') {
        const idFilter = this.filters.find((f) => f.column === 'id');
        if (idFilter) {
          const index = profiles.findIndex((p: any) => p.id === idFilter.value);
          if (index !== -1) {
            profiles[index] = { ...profiles[index], ...this.updateValues };
            setStorage('arc_os_profiles', profiles);
            data = profiles[index];
            // Update auth state cache
            const authUser = getStorage('arc_os_user', null);
            if (authUser && authUser.id === idFilter.value) {
              setStorage('arc_os_user', { ...authUser, ...this.updateValues });
            }
          }
        }
      } else if (this.operation === 'upsert') {
        const index = profiles.findIndex((p: any) => p.id === this.updateValues.id);
        if (index !== -1) {
          profiles[index] = { ...profiles[index], ...this.updateValues };
        } else {
          profiles.push(this.updateValues);
        }
        setStorage('arc_os_profiles', profiles);
        data = this.updateValues;
      }
    } else if (this.table === 'subjects') {
      data = [...MOCK_SUBJECTS];
    } else if (this.table === 'questions') {
      data = [...MOCK_QUESTIONS];
    } else if (this.table === 'question_views') {
      data = getStorage('arc_os_question_views', []);
      if (this.operation === 'upsert') {
        const index = data.findIndex(
          (qv: any) =>
            qv.user_id === this.updateValues.user_id &&
            qv.question_id === this.updateValues.question_id
        );
        if (index !== -1) {
          data[index] = { ...data[index], ...this.updateValues };
        } else {
          data.push({ id: Math.random().toString(), ...this.updateValues });
        }
        setStorage('arc_os_question_views', data);
        data = this.updateValues;
      }
    } else if (this.table === 'settings') {
      const settings = getStorage('arc_os_settings', []);
      if (this.operation === 'select') {
        data = [...settings];
      } else if (this.operation === 'update') {
        const userFilter = this.filters.find((f) => f.column === 'user_id');
        if (userFilter) {
          const index = settings.findIndex((s: any) => s.user_id === userFilter.value);
          if (index !== -1) {
            settings[index] = { ...settings[index], ...this.updateValues };
            setStorage('arc_os_settings', settings);
            data = settings[index];
          }
        }
      } else if (this.operation === 'upsert') {
        const index = settings.findIndex((s: any) => s.user_id === this.updateValues.user_id);
        if (index !== -1) {
          settings[index] = { ...settings[index], ...this.updateValues };
        } else {
          settings.push(this.updateValues);
        }
        setStorage('arc_os_settings', settings);
        data = this.updateValues;
      }
    }

    // Apply filters
    if (data && Array.isArray(data)) {
      for (const filter of this.filters) {
        if (filter.type === 'eq') {
          data = data.filter((item: any) => item[filter.column] === filter.value);
        } else if (filter.type === 'contains') {
          data = data.filter((item: any) => {
            const arr = item[filter.column];
            return Array.isArray(arr) && filter.value.every((v: any) => arr.includes(v));
          });
        }
      }

      // Apply order
      if (this.orderVal) {
        const { column, ascending } = this.orderVal;
        data.sort((a: any, b: any) => {
          if (a[column] < b[column]) return ascending ? -1 : 1;
          if (a[column] > b[column]) return ascending ? 1 : -1;
          return 0;
        });
      }

      // Get count if requested
      if (this.countOptions) {
        count = data.length;
        if (this.countOptions.head) {
          data = [];
        }
      }

      // Apply single
      if (this.isSingle) {
        data = data.length > 0 ? data[0] : null;
      }
    }

    return { data, error, count };
  }
}

export function createClient() {
  if (!hasValidEnv) {
    console.warn('⚠️ ARC_OS: Supabase credentials missing/placeholder. Running in fully functional Client Mock Mode.');
    
    return {
      auth: {
        getUser: async () => {
          if (typeof window === 'undefined') return { data: { user: null }, error: null };
          const userStr = localStorage.getItem('arc_os_user');
          if (userStr) {
            const user = JSON.parse(userStr);
            return { data: { user }, error: null };
          }
          return { data: { user: null }, error: null };
        },
        getSession: async () => {
          if (typeof window === 'undefined') return { data: { session: null }, error: null };
          const userStr = localStorage.getItem('arc_os_user');
          if (userStr) {
            const user = JSON.parse(userStr);
            return {
              data: {
                session: {
                  user,
                  access_token: 'mock-token',
                  refresh_token: 'mock-refresh-token',
                },
              },
              error: null,
            };
          }
          return { data: { session: null }, error: null };
        },
        signInWithOAuth: async (options: any) => {
          if (typeof window === 'undefined') return;
          // Create dummy user
          const mockUser = {
            id: 'mock-operator-uuid',
            email: 'operator@bitsathy.ac.in',
            raw_user_meta_data: {
              full_name: 'Iron Man Operator',
            },
          };
          localStorage.setItem('arc_os_user', JSON.stringify(mockUser));

          // Ensure profile exists in mock profiles
          const profiles = JSON.parse(localStorage.getItem('arc_os_profiles') || '[]');
          if (!profiles.some((p: any) => p.id === mockUser.id)) {
            profiles.push({
              id: mockUser.id,
              email: mockUser.email,
              name: mockUser.raw_user_meta_data.full_name,
              department: 'AL', // Default for mock mode to bypass department checks
              created_at: new Date().toISOString(),
            });
            localStorage.setItem('arc_os_profiles', JSON.stringify(profiles));
          }

          // Ensure settings exist in mock settings
          const settings = JSON.parse(localStorage.getItem('arc_os_settings') || '[]');
          if (!settings.some((s: any) => s.user_id === mockUser.id)) {
            settings.push({
              id: 'mock-settings-uuid',
              user_id: mockUser.id,
              tutorial_seen: false,
            });
            localStorage.setItem('arc_os_settings', JSON.stringify(settings));
          }

          // Simulate redirect delay
          setTimeout(() => {
            window.location.href = '/login';
          }, 500);
        },
        signOut: async () => {
          if (typeof window === 'undefined') return;
          localStorage.removeItem('arc_os_user');
          window.location.href = '/login';
        },
      },
      from: (table: string) => {
        return new MockQueryBuilder(table);
      },
      rpc: (fn: string) => {
        if (fn === 'get_system_metrics') {
          return Promise.resolve({ data: { total_users: 12, total_visits: 148 }, error: null });
        }
        return Promise.resolve({ data: null, error: null });
      },
      channel: (name: string) => {
        const mockChan: any = {
          on: (event: string, filter: any, callback?: () => void) => {
            const cb = typeof filter === 'function' ? filter : callback;
            if (cb) {
              setTimeout(cb, 20);
            }
            return mockChan;
          },
          subscribe: (callback?: (status: string) => void) => {
            if (callback) {
              setTimeout(() => callback('SUBSCRIBED'), 10);
            }
            return mockChan;
          },
          track: async () => {},
          presenceState: () => {
            return { 'mock-operator-uuid': [{ name: 'Iron Man Operator' }] };
          }
        };
        return mockChan;
      },
      removeChannel: (channel: any) => {},
    } as any;
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
