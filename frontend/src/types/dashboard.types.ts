export interface DashboardActivity {
   action: string;
   user: string;
   time: string;
   icon?: string;
}

export interface DashboardStats {
   // Admin stats
   totalUsers?: number;
   admins?: number;
   managers?: number;
   interns?: number;
   reportsCount?: number;
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
   color: "red" | "red" | "red" | "red" | "red";
}
