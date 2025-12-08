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
   attendance_date: string;
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
      // API returns array directly, wrap it in { data: [...] } for consistency
      const interns = Array.isArray(response.data) ? response.data : (response.data?.data || []);
      return { data: interns };
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
