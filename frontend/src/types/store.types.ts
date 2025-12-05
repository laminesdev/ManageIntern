import type {
   User,
   Task,
   TaskStatistics,
   Attendance,
   AttendanceStatistics,
   Evaluation,
   EvaluationStatistics,
   Reclamation,
   ReclamationStatistics,
   Notification,
   DashboardStats,
   FormattedStat,
} from "./index";

// Auth Store
export interface AuthState {
   user: User | null;
   token: string | null;
   isAuthenticated: boolean;
   isLoading: boolean;
   error: string | null;
}

// Task Store
export interface TaskStoreState {
   tasks: Task[];
   selectedTask: Task | null;
   statistics: TaskStatistics | null;
   isLoading: boolean;
   error: string | null;
   pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      perPage: number;
   };
   filters: {
      status?: string;
      priority?: string;
      assigned_to?: number;
      search?: string;
      overdue?: boolean;
   };
   sort: {
      field: string;
      order: "asc" | "desc";
   };
}

// Attendance Store
export interface AttendanceStoreState {
   attendances: Attendance[];
   selectedAttendance: Attendance | null;
   statistics: AttendanceStatistics | null;
   isLoading: boolean;
   error: string | null;
   filters: {
      start_date?: string;
      end_date?: string;
      status?: string;
      intern_id?: number;
   };
}

// Evaluation Store
export interface EvaluationStoreState {
   evaluations: Evaluation[];
   selectedEvaluation: Evaluation | null;
   statistics: EvaluationStatistics | null;
   isLoading: boolean;
   error: string | null;
   filters: {
      evaluation_type?: string;
      start_date?: string;
      end_date?: string;
      intern_id?: number;
   };
}

// Reclamation Store
export interface ReclamationStoreState {
   reclamations: Reclamation[];
   selectedReclamation: Reclamation | null;
   statistics: ReclamationStatistics | null;
   isLoading: boolean;
   error: string | null;
   filters: {
      status?: string;
      search?: string;
   };
}

// Notification Store
export interface NotificationStoreState {
   notifications: Notification[];
   selectedNotification: Notification | null;
   isLoading: boolean;
   error: string | null;
   filters: {
      is_read?: boolean;
      is_archived?: boolean;
      search?: string;
   };
}

// Dashboard Store
export interface DashboardStoreState {
   stats: DashboardStats;
   isLoading: boolean;
   error: string | null;
}
