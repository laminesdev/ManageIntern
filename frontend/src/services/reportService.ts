import api from "./api";
import type {
  Report,
  GenerateReportRequest,
  ReportStatistics,
  PaginatedResponse,
  ApiResponse
} from "@/types";

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