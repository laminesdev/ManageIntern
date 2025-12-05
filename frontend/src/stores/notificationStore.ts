import { create } from 'zustand';
import type { 
  Notification, 
  NotificationStoreState 
} from '@/types';

interface NotificationStoreActions {
  // Actions
  setNotifications: (notifications: Notification[]) => void;
  setSelectedNotification: (notification: Notification | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilters: (filters: Partial<NotificationStoreState['filters']>) => void;
  resetFilters: () => void;
  
  // Notification operations
  addNotification: (notification: Notification) => void;
  updateNotification: (id: number, updates: Partial<Notification>) => void;
  deleteNotification: (id: number) => void;
  markAllAsRead: () => void;
}

export const useNotificationStore = create<NotificationStoreState & NotificationStoreActions>((set, get) => ({
  // Initial state
  notifications: [],
  selectedNotification: null,
  isLoading: false,
  error: null,
  filters: {},

  // Actions
  setNotifications: (notifications) => set({ notifications }),
  
  setSelectedNotification: (notification) => set({ selectedNotification: notification }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  
  resetFilters: () => set({ filters: {} }),

  // Notification operations
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),

  updateNotification: (id, updates) =>
    set((state) => {
      const updatedNotifications = state.notifications.map((notification) =>
        notification.id === id ? { ...notification, ...updates } : notification
      );

      return {
        notifications: updatedNotifications,
        selectedNotification:
          state.selectedNotification?.id === id
            ? { ...state.selectedNotification, ...updates }
            : state.selectedNotification,
      };
    }),

  deleteNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((notification) => notification.id !== id),
      selectedNotification: state.selectedNotification?.id === id ? null : state.selectedNotification,
    })),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        is_read: true,
      })),
    })),

  // Helper methods instead of computed properties
  getUnreadCount: () => {
    return get().notifications.filter((notification) => !notification.is_read).length;
  },

  getUnreadNotifications: () => {
    return get().notifications.filter((notification) => !notification.is_read);
  },

  getRecentNotifications: (limit = 10) => {
    return get().notifications.slice(0, limit);
  },
}));