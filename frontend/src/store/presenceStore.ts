import { create } from 'zustand';

interface PresenceState {
  onlineCount: number;
  onlineUserIds: string[];
  isConnected: boolean;
  setOnlineCount: (count: number) => void;
  setOnlineUserIds: (ids: string[]) => void;
  setIsConnected: (connected: boolean) => void;
  reset: () => void;
}

export const usePresenceStore = create<PresenceState>((set) => ({
  onlineCount: 0,
  onlineUserIds: [],
  isConnected: false,
  setOnlineCount: (onlineCount) => set({ onlineCount }),
  setOnlineUserIds: (onlineUserIds) => set({ onlineUserIds }),
  setIsConnected: (isConnected) => set({ isConnected }),
  reset: () => set({ onlineCount: 0, onlineUserIds: [], isConnected: false }),
}));
