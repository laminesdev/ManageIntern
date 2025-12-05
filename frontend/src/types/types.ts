// ==================== AUTH TYPES ====================
export interface LoginRequest {
   email: string;
   password: string;
}

export interface LoginResponse {
   user: User;
   token: string;
   redirect_to: string;
   abilities: string[];
}

export interface User {
   id: number;
   name: string;
   email: string;
   role: "admin" | "manager" | "intern";
   department_id?: number;
   manager_id?: number;
   email_verified_at?: string;
   created_at: string;
   updated_at: string;
   deleted_at?: string;
   department?: any;
   manager?: User;
   interns?: User[];
   tasks_assigned?: any[];
   tasks_received?: any[];
   attendances?: any[];
   evaluations_received?: any[];
   evaluations_given?: any[];
   reclamations_sent?: any[];
   reclamations_received?: any[];
   notifications_sent?: any[];
   notification_recipients?: any[];
   reports_generated?: any[];
}

export interface ChangePasswordRequest {
   current_password: string;
   new_password: string;
   new_password_confirmation: string;
}

// ==================== USER MANAGEMENT TYPES ====================
export interface CreateUserRequest {
   name: string;
   email: string;
   password: string;
   role: "admin" | "manager" | "intern";
   department_id?: number;
   manager_id?: number;
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {}

export interface AssignInternRequest {
   department_id: number;
   manager_id: number;
}

// ==================== TASK TYPES ====================
export interface Task {
   id: number;
   title: string;
   description: string;
   status: "pending" | "in_progress" | "completed" | "cancelled";
   priority: "low" | "medium" | "high" | "urgent";
   assigned_by: number;
   assigned_to: number;
   deadline: string;
   created_at: string;
   updated_at: string;
   deleted_at?: string;
   assigned_by_user?: any;
   assigned_to_user?: any;
}

export interface CreateTaskRequest {
   title: string;
   description: string;
   assigned_to: number;
   priority: "low" | "medium" | "high" | "urgent";
   deadline: string;
}

export interface UpdateTaskRequest extends Partial<CreateTaskRequest> {}

export interface UpdateTaskStatusRequest {
   status: "pending" | "in_progress" | "completed" | "cancelled";
}

export interface TaskStatistics {
   total: number;
   pending: number;
   in_progress: number;
   completed: number;
   cancelled: number;
   overdue: number;
}

// ==================== ATTENDANCE TYPES ====================
export interface Attendance {
   id: number;
   intern_id: number;
   recorded_by: number;
   attendance_date: string;
   status: "present" | "absent" | "late" | "excused";
   recorded_at: string;
   created_at: string;
   updated_at: string;
   intern?: any;
   recorded_by_user?: any;
}

export interface CreateAttendanceRequest {
   intern_id: number;
   attendance_date: string;
   status: "present" | "absent" | "late" | "excused";
}

export interface UpdateAttendanceRequest {
   status: "present" | "absent" | "late" | "excused";
}

export interface AttendanceStatistics {
   total: number;
   present: number;
   absent: number;
   late: number;
   excused: number;
   attendance_rate: number;
}

// ==================== EVALUATION TYPES ====================
export interface Evaluation {
   id: number;
   intern_id: number;
   manager_id: number;
   score: number;
   comments: string;
   evaluation_type:
      | "mid_term"
      | "final"
      | "monthly"
      | "weekly"
      | "quarterly"
      | "project";
   evaluated_at: string;
   created_at: string;
   updated_at: string;
   deleted_at?: string;
   intern?: any;
   manager?: any;
}

export interface CreateEvaluationRequest {
   intern_id: number;
   score: number;
   comments: string;
   evaluation_type:
      | "mid_term"
      | "final"
      | "monthly"
      | "weekly"
      | "quarterly"
      | "project";
}

export interface UpdateEvaluationRequest
   extends Partial<CreateEvaluationRequest> {}

export interface EvaluationStatistics {
   total: number;
   average_score: number;
   by_type: Record<string, number>;
}

// ==================== RECLAMATION TYPES ====================
export interface Reclamation {
   id: number;
   intern_id: number;
   manager_id: number;
   subject: string;
   description: string;
   status: "pending" | "in_review" | "solved" | "archived";
   response?: string;
   resolved_at?: string;
   responded_at?: string;
   created_at: string;
   updated_at: string;
   deleted_at?: string;
   intern?: any;
   manager?: any;
}

export interface CreateReclamationRequest {
   subject: string;
   description: string;
}

export interface RespondToReclamationRequest {
   response: string;
   status: "pending" | "in_review" | "solved" | "archived";
}

export interface UpdateReclamationStatusRequest {
   status: "pending" | "in_review" | "solved" | "archived";
}

export interface ReclamationStatistics {
   total: number;
   pending: number;
   in_review: number;
   solved: number;
   archived: number;
}

// ==================== NOTIFICATION TYPES ====================
export interface Notification {
   id: number;
   sender_id: number;
   title: string;
   message: string;
   created_at: string;
   updated_at: string;
   sender?: any;
   recipients?: any[];
   // For frontend use (might come from API or client-side)
   is_read?: boolean;
   is_archived?: boolean;
   read_at?: string | null;
}

export interface NotificationRecipient {
   id: number;
   notification_id: number;
   recipient_id: number;
   is_read: boolean;
   read_at: string | null;
   is_archived: boolean;
   created_at: string;
   updated_at: string;
   notification?: Notification;
   recipient?: any;
}

export interface SendNotificationRequest {
   title: string;
   message: string;
   recipient_ids: number[];
}

export interface UpdateNotificationRequest {
   is_read?: boolean;
   is_archived?: boolean;
}

export interface NotificationStatistics {
   total: number;
   unread: number;
   archived: number;
}

// ==================== REPORT TYPES ====================
export interface Report {
   id: number;
   type: "attendance" | "performance";
   period_start: string;
   period_end: string;
   department_id: number;
   data: any;
   generated_by: number;
   sent_to_admin: boolean;
   created_at: string;
   updated_at: string;
   department?: any;
   generated_by_user?: any;
}

export interface GenerateReportRequest {
   type: "attendance" | "performance";
   period_start: string;
   period_end: string;
}

export interface ReportStatistics {
   total: number;
   attendance_reports: number;
   performance_reports: number;
   sent_to_admin: number;
}

// ==================== API RESPONSE TYPES ====================
export interface ApiResponse<T = any> {
   message?: string;
   data?: T;
   errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
   data: T[];
   links: {
      first: string;
      last: string;
      prev: string | null;
      next: string | null;
   };
   meta: {
      current_page: number;
      from: number;
      last_page: number;
      links: Array<{ url: string | null; label: string; active: boolean }>;
      path: string;
      per_page: number;
      to: number;
      total: number;
   };
}

// ==================== DASHBOARD TYPES ====================
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
   color: "blue" | "green" | "orange" | "purple" | "red";
}

// ==================== STORE STATE TYPES ====================
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
