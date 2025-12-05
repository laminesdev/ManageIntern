import { create } from 'zustand';

export interface DashboardActivity {
  action: string;
  user: string;
  time: string;
  icon?: string;
}

export interface DashboardStats {
  // Admin stats
  totalUsers?: number;
  activeInterns?: number;
  pendingTasks?: number;
  reportsGenerated?: number;
  
  // Manager stats
  myInterns?: number;
  managerPendingTasks?: number;
  attendanceToday?: string;
  averageScore?: number;
  pendingReclamations?: number;
  
  // Intern stats
  myTasks?: number;
  internAverageScore?: number;
  unreadNotifications?: number;
  attendanceRate?: number;
  
  // Activity logs
  recentActivity: DashboardActivity[];
}

export interface FormattedStat {
  value: string | number;
  label: string;
  icon: string;
  color: 'blue' | 'green' | 'orange' | 'purple' | 'red';
}

interface DashboardState {
  // State
  stats: DashboardStats;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setStats: (stats: Partial<DashboardStats>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addActivity: (activity: DashboardActivity) => void;
  clearActivities: () => void;
  
  // Helper methods
  getFormattedStats: (userRole?: 'admin' | 'manager' | 'intern') => Record<string, FormattedStat>;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
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
  getFormattedStats: (userRole?: 'admin' | 'manager' | 'intern') => {
    const { stats } = get();
    
    if (userRole === 'admin') {
      return {
        totalUsers: {
          value: stats.totalUsers || 0,
          label: 'Total Users',
          icon: '👥',
          color: 'blue',
        },
        activeInterns: {
          value: stats.activeInterns || 0,
          label: 'Active Interns',
          icon: '🎓',
          color: 'green',
        },
        pendingTasks: {
          value: stats.pendingTasks || 0,
          label: 'Pending Tasks',
          icon: '📝',
          color: 'orange',
        },
        reportsGenerated: {
          value: stats.reportsGenerated || 0,
          label: 'Reports',
          icon: '📊',
          color: 'purple',
        },
      };
    }
    
    if (userRole === 'manager') {
      return {
        myInterns: {
          value: stats.myInterns || 0,
          label: 'My Interns',
          icon: '👥',
          color: 'blue',
        },
        pendingTasks: {
          value: stats.managerPendingTasks || 0,
          label: 'Pending Tasks',
          icon: '📝',
          color: 'orange',
        },
        attendanceToday: {
          value: stats.attendanceToday || '0/0',
          label: 'Attendance Today',
          icon: '📅',
          color: 'green',
        },
        averageScore: {
          value: `${stats.averageScore || 0}%`,
          label: 'Avg Score',
          icon: '⭐',
          color: 'purple',
        },
        pendingReclamations: {
          value: stats.pendingReclamations || 0,
          label: 'Pending Reclamations',
          icon: '📝',
          color: 'red',
        },
      };
    }
    
    // Intern stats (default)
    return {
      myTasks: {
        value: stats.myTasks || 0,
        label: 'My Tasks',
        icon: '📝',
        color: 'blue',
      },
      averageScore: {
        value: `${stats.internAverageScore || 0}%`,
        label: 'Avg Score',
        icon: '⭐',
        color: 'green',
      },
      unreadNotifications: {
        value: stats.unreadNotifications || 0,
        label: 'Notifications',
        icon: '🔔',
        color: 'orange',
      },
      attendanceRate: {
        value: `${stats.attendanceRate || 0}%`,
        label: 'Attendance',
        icon: '📅',
        color: 'purple',
      },
    };
  },
}));