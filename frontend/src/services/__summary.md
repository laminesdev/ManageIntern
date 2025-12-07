# Project: .

## File: api.ts
```ts
// src/services/api.ts
import axios from "axios";
import { config } from "@/config/env";

const API_BASE_URL = config.API_URL;

const api = axios.create({
   baseURL: API_BASE_URL,
   headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
   },
   timeout: 30000,
});

// Request interceptor
api.interceptors.request.use((requestConfig) => {
   const token = localStorage.getItem(config.TOKEN_KEY);  // Use imported config
   console.log('API Request - Token exists:', !!token);
   
   if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
   }
   
   return requestConfig;
});

// Response interceptor
api.interceptors.response.use(
   (response) => {
      console.log('API Response:', response.status, response.config.url);
      return response;
   },
   (error) => {
      console.error('API Error:', error.response?.status, error.config?.url);
      
      if (error.response?.status === 401) {
         // Clear auth data
         localStorage.removeItem(config.TOKEN_KEY);
         localStorage.removeItem(config.USER_KEY);
         
         // Only redirect if not already on login page
         if (!window.location.pathname.includes('/login')) {
            window.location.href = "/login";
         }
      }
      
      return Promise.reject(error);
   }
);

export default api;
```

## File: attendanceService.ts
```ts
import api from "./api";

export interface Attendance {
   id: number;
   intern_id: number;
   recorded_by: number;
   attendance_date: string;
   status: "present" | "absent" | "late" | "excused";
   notes?: string;
   recorded_at: string;
   created_at: string;
   updated_at: string;
   intern?: {
      id: number;
      name: string;
      email: string;
   };
   recorded_by_user?: {
      id: number;
      name: string;
      email: string;
   };
}

export interface AttendanceStatistics {
   total: number;
   present: number;
   absent: number;
   late: number;
   excused: number;
   attendance_rate: number;
}

export interface CreateAttendanceData {
   intern_id: number;
   date: string;
   status: "present" | "absent" | "late" | "excused";
   notes?: string;
}

export const attendanceService = {
   // Manager: Get attendance records
   getAttendance: async (
      params: {
         start_date?: string;
         end_date?: string;
         status?: string;
         intern_id?: number;
      } = {}
   ): Promise<{ data: Attendance[] }> => {
      const response = await api.get("/attendances", { params });
      return response.data;
   },

   // Manager: Mark/Create attendance
   markAttendance: async (
      data: CreateAttendanceData
   ): Promise<{ attendance: Attendance }> => {
      const response = await api.post("/attendances", data);
      return response.data;
   },

   // Manager: Update attendance
   updateAttendance: async (
      id: number,
      data: { status: Attendance["status"]; notes?: string }
   ): Promise<{ attendance: Attendance }> => {
      const response = await api.put(`/attendances/${id}`, data);
      return response.data;
   },

   // Manager: Delete attendance
   deleteAttendance: async (id: number): Promise<{ message: string }> => {
      const response = await api.delete(`/attendances/${id}`);
      return response.data;
   },

   // Manager: Get attendance statistics
   getAttendanceStatistics: async (): Promise<{
      statistics: AttendanceStatistics;
   }> => {
      const response = await api.get("/attendance/statistics");
      return response.data;
   },

   // Manager: Get interns for attendance (department interns)
   getDepartmentInterns: async (): Promise<{
      data: Array<{ id: number; name: string; email: string }>;
   }> => {
      const response = await api.get("/interns-for-attendance");
      return response.data;
   },

   // Manager: Get attendance summary for reports
   getAttendanceSummary: async (
      startDate: string,
      endDate: string
   ): Promise<any> => {
      const response = await api.get("/attendance/statistics", {
         params: {
            start_date: startDate,
            end_date: endDate,
         },
      });
      return response.data;
   },

   // Intern: Get my attendance
   getMyAttendance: async (
      params: {
         start_date?: string;
         end_date?: string;
         status?: string;
      } = {}
   ): Promise<{ data: Attendance[] }> => {
      const response = await api.get("/my-attendance", { params });
      return response.data;
   },

   // Intern: Get my attendance statistics
   getMyAttendanceStatistics: async (): Promise<{
      statistics: AttendanceStatistics;
   }> => {
      const response = await api.get("/my-attendance/statistics");
      return response.data;
   },

   // Intern: Get specific attendance record
   getMyAttendanceById: async (
      id: number
   ): Promise<{ attendance: Attendance }> => {
      const response = await api.get(`/my-attendance/${id}`);
      return response.data;
   },
};

```

## File: authService.ts
```ts
// src/services/authService.ts
import api from "./api";
import type {
  LoginRequest,
  LoginResponse,
  User,
  ChangePasswordRequest
} from "@/types/auth.types";
import type { ApiResponse } from "@/types/api.types";
import { config } from "@/config/env";

class AuthService {
   async login(data: LoginRequest): Promise<LoginResponse> {
      const response = await api.post<LoginResponse>("/login", data);
      
      // Save token and user data
      const { user, token } = response.data;
      localStorage.setItem(config.TOKEN_KEY, token);
      localStorage.setItem(config.USER_KEY, JSON.stringify(user));
      
      return response.data;
   }

   async logout(): Promise<void> {
      try {
         await api.post("/logout");
      } finally {
         // Always clear local storage
         localStorage.removeItem(config.TOKEN_KEY);
         localStorage.removeItem(config.USER_KEY);
      }
   }

   async getCurrentUser(): Promise<User> {
      const response = await api.get<User>("/user");
      return response.data;
   }

   async updateProfile(data: Partial<User>): Promise<User> {
      const response = await api.put<User>("/profile", data);
      
      // Update stored user data
      const updatedUser = response.data;
      localStorage.setItem(config.USER_KEY, JSON.stringify(updatedUser));
      
      return updatedUser;
   }

   async changePassword(data: ChangePasswordRequest): Promise<ApiResponse> {
      const response = await api.put<ApiResponse>("/change-password", data);
      return response.data;
   }

   async getDashboardData(): Promise<any> {
      const response = await api.get("/dashboard");
      return response.data;
   }
}

export const authService = new AuthService();
```

## File: dashboardService.ts
```ts
import api from "./api";

export interface DashboardData {
   total_interns?: number;
   pending_tasks?: number;
   todays_attendance?: string;
   average_score?: number;
   pending_reclamations?: number;
   recent_activity?: Array<{
      user_name: string;
      action: string;
      time: string;
      type: string;
   }>;
   total_users?: number;
   total_managers?: number;
   active_interns?: number;
   total_departments?: number;
   my_tasks?: number;
   my_evaluations?: number;
   unread_notifications?: number;
   attendance_rate?: number;
}

export const dashboardService = {
   getDashboard: async (): Promise<{ data: DashboardData }> => {
      try {
         const response = await api.get("/dashboard");
         return response.data;
      } catch (error) {
         console.error("Dashboard error:", error);
         throw error;
      }
   },

   getManagerDashboard: async (): Promise<{ data: DashboardData }> => {
      try {
         const response = await api.get("/dashboard");
         return response.data;
      } catch (error) {
         console.error("Manager dashboard error:", error);
         throw error;
      }
   },

   getAdminDashboard: async (): Promise<{ data: DashboardData }> => {
      try {
         const response = await api.get("/dashboard");
         return response.data;
      } catch (error) {
         console.error("Admin dashboard error:", error);
         throw error;
      }
   },

   getInternDashboard: async (): Promise<{ data: DashboardData }> => {
      try {
         const response = await api.get("/dashboard");
         return response.data;
      } catch (error) {
         console.error("Intern dashboard error:", error);
         throw error;
      }
   },
};

```

## File: evaluationService.ts
```ts
import api from "./api";

export interface Evaluation {
   id: number;
   intern_id: number;
   manager_id: number;
   score: number;
   comments?: string;
   feedback?: string;
   evaluation_type:
      | "mid_term"
      | "final"
      | "monthly"
      | "weekly"
      | "quarterly"
      | "project";
   strengths?: string;
   areas_for_improvement?: string;
   evaluated_at: string;
   created_at: string;
   updated_at: string;
   deleted_at?: string;
   intern?: {
      id: number;
      name: string;
      email: string;
   };
   manager?: {
      id: number;
      name: string;
      email: string;
   };
}

export interface CreateEvaluationData {
   intern_id: number;
   score: number;
   feedback: string;
   evaluation_type: "weekly" | "monthly" | "quarterly" | "final";
   strengths?: string;
   areas_for_improvement?: string;
}

export const evaluationService = {
   // Manager: Get evaluations
   getEvaluations: async (
      params: {
         evaluation_type?: string;
         start_date?: string;
         end_date?: string;
         intern_id?: number;
      } = {}
   ): Promise<{ data: Evaluation[] }> => {
      const response = await api.get("/evaluations", { params });
      return response.data;
   },

   // Manager: Create evaluation
   createEvaluation: async (
      data: CreateEvaluationData
   ): Promise<{ evaluation: Evaluation }> => {
      const response = await api.post("/evaluations", data);
      return response.data;
   },

   // Manager: Get evaluation details
   getEvaluationById: async (
      id: number
   ): Promise<{ evaluation: Evaluation }> => {
      const response = await api.get(`/evaluations/${id}`);
      return response.data;
   },

   // Manager: Update evaluation
   updateEvaluation: async (
      id: number,
      data: Partial<CreateEvaluationData>
   ): Promise<{ evaluation: Evaluation }> => {
      const response = await api.put(`/evaluations/${id}`, data);
      return response.data;
   },

   // Manager: Delete evaluation
   deleteEvaluation: async (id: number): Promise<{ message: string }> => {
      const response = await api.delete(`/evaluations/${id}`);
      return response.data;
   },

   // Manager: Get evaluation statistics
   getEvaluationStatistics: async (): Promise<{
      statistics: {
         total: number;
         average_score: number;
         by_type: Record<string, number>;
      };
   }> => {
      const response = await api.get("/evaluations/statistics");
      return response.data;
   },

   // Manager: Get interns for evaluation (department interns)
   getInternsForEvaluation: async (): Promise<{
      data: Array<{ id: number; name: string; email: string }>;
   }> => {
      const response = await api.get("/interns-for-evaluation");
      return response.data;
   },

   // Intern: Get my evaluations
   getMyEvaluations: async (
      params: {
         evaluation_type?: string;
         start_date?: string;
         end_date?: string;
      } = {}
   ): Promise<{ data: Evaluation[] }> => {
      const response = await api.get("/my-evaluations", { params });
      return response.data;
   },

   // Intern: Get my evaluation details
   getMyEvaluationById: async (
      id: number
   ): Promise<{ evaluation: Evaluation }> => {
      const response = await api.get(`/my-evaluations/${id}`);
      return response.data;
   },

   // Intern: Get my evaluation statistics
   getMyEvaluationStatistics: async (): Promise<{
      statistics: {
         total: number;
         average_score: number;
         by_type: Record<string, number>;
      };
   }> => {
      const response = await api.get("/my-evaluations/statistics");
      return response.data;
   },
};

```

## File: notificationService.ts
```ts
import api from "./api";

export interface Notification {
   id: number;
   sender_id: number;
   title: string;
   message: string;
   created_at: string;
   updated_at: string;
   sender?: {
      id: number;
      name: string;
      email: string;
   };
   recipients?: any[];
   is_read?: boolean;
   is_archived?: boolean;
   read_at?: string | null;
   read_by?: any[];
}

export interface SendNotificationData {
   title: string;
   message: string;
   recipient_ids: number[];
}

export const notificationService = {
   // Manager: Send notification
   sendNotification: async (
      data: SendNotificationData
   ): Promise<{ notification: Notification }> => {
      const response = await api.post("/notifications/send", data);
      return response.data;
   },

   // Manager: Get sent notifications
   getNotifications: async (
      params: {
         search?: string;
         is_archived?: boolean;
      } = {}
   ): Promise<{ data: Notification[] }> => {
      const response = await api.get("/notifications", { params });
      return response.data;
   },

   // Manager: Get notification details
   getNotificationById: async (
      id: number
   ): Promise<{ notification: Notification }> => {
      const response = await api.get(`/notifications/${id}`);
      return response.data;
   },

   // Manager: Delete notification
   deleteNotification: async (id: number): Promise<{ message: string }> => {
      const response = await api.delete(`/notifications/${id}`);
      return response.data;
   },

   // Manager: Get interns for notifications (department interns)
   getDepartmentInterns: async (): Promise<{
      data: Array<{ id: number; name: string; email: string }>;
   }> => {
      const response = await api.get("/notifications/interns");
      return response.data;
   },

   // Manager: Get interns for notifications (alias)
   getInternsForNotifications: async (): Promise<{
      data: Array<{ id: number; name: string; email: string }>;
   }> => {
      const response = await api.get("/notifications/interns");
      return response.data;
   },

   // Intern: Get my notifications
   getMyNotifications: async (
      params: {
         is_read?: boolean;
         is_archived?: boolean;
         search?: string;
      } = {}
   ): Promise<{ data: Notification[] }> => {
      const response = await api.get("/my-notifications", { params });
      return response.data;
   },

   // Intern: Get my notification details
   getMyNotificationById: async (
      id: number
   ): Promise<{ notification: Notification }> => {
      const response = await api.get(`/my-notifications/${id}`);
      return response.data;
   },

   // Intern: Update notification (mark as read/archived)
   updateMyNotification: async (
      id: number,
      data: {
         is_read?: boolean;
         is_archived?: boolean;
      }
   ): Promise<{ notification: Notification }> => {
      const response = await api.put(`/my-notifications/${id}`, data);
      return response.data;
   },

   // Intern: Mark notification as read
   markNotificationAsRead: async (
      id: number,
      isRead: boolean = true
   ): Promise<{ notification: Notification }> => {
      const response = await api.put(`/my-notifications/${id}`, {
         is_read: isRead,
      });
      return response.data;
   },

   // Intern: Mark as read (alias)
   markAsRead: async (id: number): Promise<{ notification: Notification }> => {
      const response = await api.put(`/my-notifications/${id}`, {
         is_read: true,
      });
      return response.data;
   },

   // Intern: Mark all as read
   markAllAsRead: async (): Promise<{ message: string }> => {
      const response = await api.post("/my-notifications/mark-all-read");
      return response.data;
   },

   // Intern: Delete my notification
   deleteMyNotification: async (id: number): Promise<{ message: string }> => {
      const response = await api.delete(`/my-notifications/${id}`);
      return response.data;
   },
};

```

## File: reclamationService.ts
```ts
import api from "./api";

export interface Reclamation {
   id: number;
   intern_id: number;
   manager_id: number;
   subject: string;
   description: string;
   status: "pending" | "in_review" | "resolved" | "archived";
   response?: string;
   resolved_at?: string;
   responded_at?: string;
   created_at: string;
   updated_at: string;
   deleted_at?: string;
   intern?: {
      id: number;
      name: string;
      email: string;
   };
   manager?: {
      id: number;
      name: string;
      email: string;
   };
}

export interface CreateReclamationData {
   subject: string;
   description: string;
}

export interface RespondToReclamationData {
   response: string;
   status: "pending" | "in_review" | "solved" | "archived";
}

export const reclamationService = {
   // Manager: Get reclamations (department reclamations)
   getReclamations: async (
      params: {
         status?: string;
         search?: string;
         start_date?: string;
         end_date?: string;
      } = {}
   ): Promise<{ data: Reclamation[] }> => {
      const response = await api.get("/reclamations", { params });
      return response.data;
   },

   // Manager: Get department reclamations (same as getReclamations but semantic)
   getDepartmentReclamations: async (): Promise<{ data: Reclamation[] }> => {
      const response = await api.get("/reclamations");
      return response.data;
   },

   // Manager: Get reclamation details
   getReclamationById: async (
      id: number
   ): Promise<{ reclamation: Reclamation }> => {
      const response = await api.get(`/reclamations/${id}`);
      return response.data;
   },

   // Manager: Respond to reclamation
   respondToReclamation: async (
      id: number,
      data: RespondToReclamationData
   ): Promise<{ reclamation: Reclamation }> => {
      const response = await api.put(`/reclamations/${id}/respond`, data);
      return response.data;
   },

   // Manager: Update reclamation (for status updates)
   updateReclamation: async (
      id: number,
      data: { status?: string; resolution_notes?: string }
   ): Promise<{ reclamation: Reclamation }> => {
      const response = await api.put(`/reclamations/${id}/respond`, data);
      return response.data;
   },

   // Manager: Update reclamation status only
   updateReclamationStatus: async (
      id: number,
      status: string
   ): Promise<{ reclamation: Reclamation }> => {
      const response = await api.put(`/reclamations/${id}/status`, { status });
      return response.data;
   },

   // Manager: Delete reclamation
   deleteReclamation: async (id: number): Promise<{ message: string }> => {
      const response = await api.delete(`/reclamations/${id}`);
      return response.data;
   },

   // Manager: Get reclamation statistics
   getReclamationStatistics: async (): Promise<{
      statistics: {
         total: number;
         pending: number;
         in_review: number;
         resolved: number;
         archived: number;
      };
   }> => {
      const response = await api.get("/reclamations/statistics");
      return response.data;
   },

   // Intern: Create reclamation
   createReclamation: async (
      data: CreateReclamationData
   ): Promise<{ reclamation: Reclamation }> => {
      const response = await api.post("/reclamations", data);
      return response.data;
   },

   // Intern: Get my reclamations
   getMyReclamations: async (
      params: {
         status?: string;
      } = {}
   ): Promise<{ data: Reclamation[] }> => {
      const response = await api.get("/my-reclamations", { params });
      return response.data;
   },

   // Intern: Get my reclamation details
   getMyReclamationById: async (
      id: number
   ): Promise<{ reclamation: Reclamation }> => {
      const response = await api.get(`/my-reclamations/${id}`);
      return response.data;
   },

   // Intern: Delete my reclamation
   deleteMyReclamation: async (id: number): Promise<{ message: string }> => {
      const response = await api.delete(`/my-reclamations/${id}`);
      return response.data;
   },
};

```

## File: reportService.ts
```ts
import api from "./api";

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
   department?: {
      id: number;
      name: string;
   };
   generated_by_user?: {
      id: number;
      name: string;
      email: string;
   };
}

export interface GenerateReportData {
   type: "attendance" | "performance";
   period_start: string;
   period_end: string;
   data?: any;
}

export const reportService = {
   // Admin & Manager: Get reports
   getReports: async (
      params: {
         type?: "attendance" | "performance";
         period_start?: string;
         period_end?: string;
         department_id?: number;
      } = {}
   ): Promise<{ data: Report[] }> => {
      const response = await api.get("/reports", { params });
      return response.data;
   },

   // Manager: Get manager's reports (same as getReports but semantic naming)
   getManagerReports: async (): Promise<{ data: Report[] }> => {
      const response = await api.get("/reports");
      return response.data;
   },

   // Manager: Generate report
   generateReport: async (
      data: GenerateReportData
   ): Promise<{ report: Report }> => {
      const response = await api.post("/reports/generate", data);
      return response.data;
   },

   // Manager: Send report to admin
   sendToAdmin: async (reportId: number): Promise<{ message: string }> => {
      const response = await api.post(`/reports/${reportId}/send-to-admin`);
      return response.data;
   },

   // Admin & Manager: Get report statistics
   getReportStatistics: async (): Promise<{
      statistics: {
         total: number;
         attendance_reports: number;
         performance_reports: number;
         sent_to_admin: number;
      };
   }> => {
      const response = await api.get("/reports/statistics");
      return response.data;
   },

   // Admin & Manager: Get report by ID
   getReportById: async (id: number): Promise<{ report: Report }> => {
      const response = await api.get(`/reports/${id}`);
      return response.data;
   },

   // Manager: Delete report
   deleteReport: async (id: number): Promise<{ message: string }> => {
      const response = await api.delete(`/reports/${id}`);
      return response.data;
   },

   // Export report (for downloading)
   exportReport: async (reportId: number): Promise<{ data: any }> => {
      const response = await api.get(`/reports/${reportId}`);
      return response;
   },
};

```

## File: taskService.ts
```ts
import api from "./api";

export interface TaskData {
   title: string;
   description: string;
   assigned_to: number;
   priority: "low" | "medium" | "high" | "urgent";
   deadline: string;
}

export interface Task extends TaskData {
   id: number;
   status: "pending" | "in_progress" | "completed" | "overdue";
   created_at: string;
   updated_at: string;
   assigned_to_user?: {
      id: number;
      name: string;
      email: string;
   };
}

export const taskService = {
   async getTasks(params?: {
      status?: string;
      assigned_to?: number;
      page?: number;
      per_page?: number;
   }) {
      const response = await api.get("/tasks", { params });
      return response.data;
   },

   async createTask(data: TaskData) {
      const response = await api.post("/tasks", data);
      return response.data;
   },

   async updateTask(id: number, data: Partial<TaskData>) {
      const response = await api.put(`/tasks/${id}`, data);
      return response.data;
   },

   async deleteTask(id: number) {
      const response = await api.delete(`/tasks/${id}`);
      return response.data;
   },

   async getInternsForTasks() {
      // Use the correct endpoint from documentation
      try {
         const response = await api.get("/interns-for-tasks");
         return response.data;
      } catch (error) {
         console.error("Error getting interns for tasks:", error);
         throw error;
      }
   },

   async updateTaskStatus(id: number, status: Task["status"]) {
      const response = await api.put(`/tasks/${id}/status`, { status });
      return response.data;
   },

   async getTaskStatistics() {
      const response = await api.get("/tasks/statistics");
      return response.data;
   },

   async getMyTasks(params?: {
      status?: string;
      priority?: string;
      overdue?: boolean;
      page?: number;
      per_page?: number;
   }) {
      const response = await api.get("/my-tasks", { params });
      return response.data;
   },

   async getMyTask(id: number) {
      const response = await api.get(`/my-tasks/${id}`);
      return response.data;
   },

   async updateMyTaskStatus(id: number, status: Task["status"]) {
      const response = await api.put(`/my-tasks/${id}/status`, { status });
      return response.data;
   },
};
```

## File: userService.ts
```ts
import api from './api';

export const userService = {
  // Get all users (Admin only)
  getUsers: async (params: any = {}): Promise<any> => {
    const response = await api.get('/users', { params });
    return response.data;
  },

  // Create user (Admin only)
  createUser: async (data: any): Promise<any> => {
    const response = await api.post('/users', data);
    return response.data;
  },

  // Get user details (Admin only)
  getUser: async (id: number): Promise<any> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Update user (Admin only)
  updateUser: async (id: number, data: any): Promise<any> => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  // Delete user (Admin only)
  deleteUser: async (id: number): Promise<any> => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  // Soft delete user (Admin only)
  softDeleteUser: async (id: number): Promise<any> => {
    const response = await api.delete(`/users/${id}/soft-delete`);
    return response.data;
  },

  // Restore user (Admin only)
  restoreUser: async (id: number): Promise<any> => {
    const response = await api.post(`/users/${id}/restore`);
    return response.data;
  },

  // Get managers list
  getManagers: async (): Promise<any> => {
    const response = await api.get('/managers');
    return response.data;
  },

  // Get interns list
  getInterns: async (params: any = {}): Promise<any> => {
    const response = await api.get('/interns', { params });
    return response.data;
  },

  // Get unassigned interns
  getUnassignedInterns: async (): Promise<any> => {
    const response = await api.get('/unassigned-interns');
    return response.data;
  },

  // Assign intern (Admin only)
  assignIntern: async (id: number, data: any): Promise<any> => {
    const response = await api.post(`/users/${id}/assign`, data);
    return response.data;
  }
};
```

