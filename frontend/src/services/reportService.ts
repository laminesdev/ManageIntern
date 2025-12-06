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
