import { create } from 'zustand';

export type NotificationType = 'broadcast' | 'post' | 'media' | 'system_notice' | 'feedback_reply';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  data?: { url?: string };
}

const STORAGE_KEY = 'bit_library_notifications';
const PUSH_KEY = 'bit_library_push_enabled';
const MAX_NOTIFICATIONS = 100;

function loadPersisted(): NotificationItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: NotificationItem[] = JSON.parse(raw);
    return parsed.filter((n) => {
      const age = Date.now() - new Date(n.timestamp).getTime();
      return age < 7 * 24 * 60 * 60 * 1000;
    });
  } catch {
    return [];
  }
}

function persist(items: NotificationItem[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_NOTIFICATIONS)));
  } catch {
    // storage full, silently fail
  }
}

function loadPushPref(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(PUSH_KEY) === 'true';
  } catch {
    return false;
  }
}

function savePushPref(enabled: boolean) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PUSH_KEY, enabled ? 'true' : 'false');
  } catch {
    // silently fail
  }
}

function contentKey(item: { type: string; title: string; body: string }): string {
  return `${item.type}:${item.title}:${item.body}`;
}

interface NotificationState {
  notifications: NotificationItem[];
  pushEnabled: boolean;
  addNotification: (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  unreadCount: number;
  setPushEnabled: (enabled: boolean) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => {
  const initial = loadPersisted();
  const initialPush = loadPushPref();
  return {
    notifications: initial,
    unreadCount: initial.filter((n) => !n.read).length,
    pushEnabled: initialPush,

    setPushEnabled: (enabled) => {
      savePushPref(enabled);
      set({ pushEnabled: enabled });
    },

    addNotification: (item) => {
      set((state) => {
        const exists = state.notifications.some((n) => contentKey(n) === contentKey(item));
        if (exists) return state;

        const id = `${item.type}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        const newItem: NotificationItem = {
          ...item,
          id,
          timestamp: new Date().toISOString(),
          read: false,
        };
        const updated = [newItem, ...state.notifications].slice(0, MAX_NOTIFICATIONS);
        persist(updated);
        return {
          notifications: updated,
          unreadCount: updated.filter((n) => !n.read).length,
        };
      });
    },

    markAsRead: (id) => {
      set((state) => {
        const updated = state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        );
        persist(updated);
        return {
          notifications: updated,
          unreadCount: updated.filter((n) => !n.read).length,
        };
      });
    },

    markAllAsRead: () => {
      set((state) => {
        const updated = state.notifications.map((n) => ({ ...n, read: true }));
        persist(updated);
        return {
          notifications: updated,
          unreadCount: 0,
        };
      });
    },

    clearAll: () => {
      persist([]);
      set({ notifications: [], unreadCount: 0 });
    },
  };
});
