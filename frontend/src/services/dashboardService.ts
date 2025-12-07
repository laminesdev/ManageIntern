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
