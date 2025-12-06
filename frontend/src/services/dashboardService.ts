import api from "./api";

export interface DashboardData {
   // Manager Dashboard
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

   // Admin Dashboard
   total_users?: number;
   total_managers?: number;
   active_interns?: number;
   total_departments?: number;

   // Intern Dashboard
   my_tasks?: number;
   my_evaluations?: number;
   unread_notifications?: number;
   attendance_rate?: number;
}

export const dashboardService = {
   // Get role-specific dashboard data
   getDashboard: async (): Promise<{ data: DashboardData }> => {
      try {
         const response = await api.get("/dashboard");
         return response.data;
      } catch (error) {
         console.error("Dashboard error:", error);
         throw error;
      }
   },

   // Manager Dashboard
   getManagerDashboard: async (): Promise<{ data: DashboardData }> => {
      try {
         const response = await api.get("/dashboard");
         // API returns role-specific data automatically
         return response.data;
      } catch (error) {
         console.error("Manager dashboard error:", error);
         throw error;
      }
   },

   // Admin Dashboard
   getAdminDashboard: async (): Promise<{ data: DashboardData }> => {
      try {
         const response = await api.get("/dashboard");
         return response.data;
      } catch (error) {
         console.error("Admin dashboard error:", error);
         throw error;
      }
   },

   // Intern Dashboard
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
