import api from "./api";
import type {
  Attendance,
  CreateAttendanceRequest,
  UpdateAttendanceRequest,
  AttendanceStatistics,
  PaginatedResponse,
  ApiResponse
} from "@/types";

class AttendanceService {
   // Manager endpoints
   async getAttendances(params?: {
      start_date?: string;
      end_date?: string;
      status?: string;
      intern_id?: number;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Attendance>> {
      const response = await api.get<PaginatedResponse<Attendance>>(
         "/attendances",
         { params }
      );
      return response.data;
   }

   async getAttendanceStatistics(): Promise<AttendanceStatistics> {
      const response = await api.get<AttendanceStatistics>(
         "/attendance/statistics"
      );
      return response.data;
   }

   async getInternsForAttendance(): Promise<any[]> {
      const response = await api.get("/interns-for-attendance");
      return response.data;
   }

   async createAttendance(
      data: CreateAttendanceRequest
   ): Promise<{ attendance: Attendance }> {
      const response = await api.post<{ attendance: Attendance }>(
         "/attendances",
         data
      );
      return response.data;
   }

   async getAttendance(id: number): Promise<Attendance> {
      const response = await api.get<Attendance>(`/attendances/${id}`);
      return response.data;
   }

   async updateAttendance(
      id: number,
      data: UpdateAttendanceRequest
   ): Promise<{ attendance: Attendance }> {
      const response = await api.put<{ attendance: Attendance }>(
         `/attendances/${id}`,
         data
      );
      return response.data;
   }

   async deleteAttendance(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(`/attendances/${id}`);
      return response.data;
   }

   // Intern endpoints
   async getMyAttendance(params?: {
      start_date?: string;
      end_date?: string;
      status?: string;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Attendance>> {
      const response = await api.get<PaginatedResponse<Attendance>>(
         "/my-attendance",
         { params }
      );
      return response.data;
   }

   async getMyAttendanceRecord(id: number): Promise<Attendance> {
      const response = await api.get<Attendance>(`/my-attendance/${id}`);
      return response.data;
   }

   async getMyAttendanceStatistics(): Promise<AttendanceStatistics> {
      const response = await api.get<AttendanceStatistics>(
         "/my-attendance/statistics"
      );
      return response.data;
   }
}

export const attendanceService = new AttendanceService();