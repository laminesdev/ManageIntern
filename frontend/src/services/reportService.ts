import api, { ApiResponse, PaginatedResponse } from "./api";

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

class ReportService {
   // Admin endpoints
   async getReports(params?: {
      type?: string;
      period_start?: string;
      period_end?: string;
      department_id?: number;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Report>> {
      const response = await api.get<PaginatedResponse<Report>>("/reports", {
         params,
      });
      return response.data;
   }

   async getReportStatistics(): Promise<ReportStatistics> {
      const response = await api.get<ReportStatistics>("/reports/statistics");
      return response.data;
   }

   async getReport(id: number): Promise<Report> {
      const response = await api.get<Report>(`/reports/${id}`);
      return response.data;
   }

   // Manager endpoints
   async generateReport(
      data: GenerateReportRequest
   ): Promise<{ report: Report }> {
      const response = await api.post<{ report: Report }>(
         "/reports/generate",
         data
      );
      return response.data;
   }

   async sendReportToAdmin(id: number): Promise<ApiResponse> {
      const response = await api.post<ApiResponse>(
         `/reports/${id}/send-to-admin`
      );
      return response.data;
   }

   async deleteReport(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(`/reports/${id}`);
      return response.data;
   }
}

export const reportService = new ReportService();
