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

interface NotificationState {
  notifications: NotificationItem[];
  addNotification: (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  unreadCount: number;
}

export const useNotificationStore = create<NotificationState>((set, get) => {
  const initial = loadPersisted();
  return {
    notifications: initial,
    unreadCount: initial.filter((n) => !n.read).length,

    addNotification: (item) => {
      set((state) => {
        const within60s = state.notifications.some((n) => {
          if (n.type !== item.type || n.title !== item.title || n.body !== item.body) return false;
          return Date.now() - new Date(n.timestamp).getTime() < 60000;
        });
        if (within60s) return state;

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
