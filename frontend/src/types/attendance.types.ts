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
