import { create } from 'zustand';
import type { 
  DashboardStats, 
  FormattedStat, 
  DashboardStoreState 
} from '@/types';

interface DashboardStoreActions {
  // Actions
  setStats: (stats: Partial<DashboardStats>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addActivity: (activity: DashboardActivity) => void;
  clearActivities: () => void;
  
  // Helper methods
  getFormattedStats: (userRole?: 'admin' | 'manager' | 'intern') => Record<string, FormattedStat>;
}

type DashboardActivity = {
  action: string;
  user: string;
  time: string;
  icon?: string;
};

export const useDashboardStore = create<DashboardStoreState & DashboardStoreActions>((set, get) => ({
  // Initial state
  stats: {
    recentActivity: [],
  },
  isLoading: false,
  error: null,

  // Actions
  setStats: (newStats) =>
    set((state) => ({
      stats: { ...state.stats, ...newStats },
    })),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  addActivity: (activity) =>
    set((state) => ({
      stats: {
        ...state.stats,
        recentActivity: [activity, ...state.stats.recentActivity.slice(0, 9)], // Keep last 10
      },
    })),
  
  clearActivities: () =>
    set((state) => ({
      stats: { ...state.stats, recentActivity: [] },
    })),

  // Helper method for formatted stats
  // Update the getFormattedStats function:
getFormattedStats: (userRole?: 'admin' | 'manager' | 'intern') => {
  const { stats } = get();
  
  // Default values for all stats
  const safeStats = {
    totalUsers: stats.totalUsers || 0,
    activeInterns: stats.activeInterns || 0,
    pendingTasks: stats.pendingTasks || 0,
    reportsGenerated: stats.reportsGenerated || 0,
    myInterns: stats.myInterns || 0,
    managerPendingTasks: stats.managerPendingTasks || 0,
    attendanceToday: stats.attendanceToday || '0/0',
    averageScore: stats.averageScore || 0,
    pendingReclamations: stats.pendingReclamations || 0,
    myTasks: stats.myTasks || 0,
    internAverageScore: stats.internAverageScore || 0,
    unreadNotifications: stats.unreadNotifications || 0,
    attendanceRate: stats.attendanceRate || 0,
  };

  if (userRole === 'admin') {
    return {
      totalUsers: {
        value: safeStats.totalUsers,
        label: 'Total Users',
        icon: '👥',
        color: 'blue',
      },
      activeInterns: {
        value: safeStats.activeInterns,
        label: 'Active Interns',
        icon: '🎓',
        color: 'green',
      },
      pendingTasks: {
        value: safeStats.pendingTasks,
        label: 'Pending Tasks',
        icon: '📝',
        color: 'orange',
      },
      reportsGenerated: {
        value: safeStats.reportsGenerated,
        label: 'Reports',
        icon: '📊',
        color: 'purple',
      },
    } as Record<string, FormattedStat>; // Cast to the expected type
  }
  
  if (userRole === 'manager') {
    return {
      myInterns: {
        value: safeStats.myInterns,
        label: 'My Interns',
        icon: '👥',
        color: 'blue',
      },
      pendingTasks: {
        value: safeStats.managerPendingTasks,
        label: 'Pending Tasks',
        icon: '📝',
        color: 'orange',
      },
      attendanceToday: {
        value: safeStats.attendanceToday,
        label: 'Attendance Today',
        icon: '📅',
        color: 'green',
      },
      averageScore: {
        value: `${safeStats.averageScore}%`,
        label: 'Avg Score',
        icon: '⭐',
        color: 'purple',
      },
      pendingReclamations: {
        value: safeStats.pendingReclamations,
        label: 'Pending Reclamations',
        icon: '📝',
        color: 'red',
      },
    } as Record<string, FormattedStat>; // Cast to the expected type
  }
  
  // Intern stats (default)
  return {
    myTasks: {
      value: safeStats.myTasks,
      label: 'My Tasks',
      icon: '📝',
      color: 'blue',
    },
    averageScore: {
      value: `${safeStats.internAverageScore}%`,
      label: 'Avg Score',
      icon: '⭐',
      color: 'green',
    },
    unreadNotifications: {
      value: safeStats.unreadNotifications,
      label: 'Notifications',
      icon: '🔔',
      color: 'orange',
    },
    attendanceRate: {
      value: `${safeStats.attendanceRate}%`,
      label: 'Attendance',
      icon: '📅',
      color: 'purple',
    },
  } as Record<string, FormattedStat>; // Cast to the expected type
},

}));