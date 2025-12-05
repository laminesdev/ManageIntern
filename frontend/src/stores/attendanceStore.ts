import { create } from "zustand";
import type {
   Attendance,
   AttendanceStatistics,
} from "@/services/attendanceService";

interface AttendanceState {
   // State
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

   // Actions
   setAttendances: (attendances: Attendance[]) => void;
   setSelectedAttendance: (attendance: Attendance | null) => void;
   setStatistics: (stats: AttendanceStatistics) => void;
   setLoading: (loading: boolean) => void;
   setError: (error: string | null) => void;
   setFilters: (filters: Partial<AttendanceState["filters"]>) => void;
   resetFilters: () => void;

   // Attendance operations
   addAttendance: (attendance: Attendance) => void;
   updateAttendance: (id: number, updates: Partial<Attendance>) => void;
   deleteAttendance: (id: number) => void;

   // Computed properties
   todayAttendances: Attendance[];
   recentAttendances: Attendance[];
}

export const useAttendanceStore = create<AttendanceState>((set, get) => ({
   // Initial state
   attendances: [],
   selectedAttendance: null,
   statistics: null,
   isLoading: false,
   error: null,
   filters: {},

   // Actions
   setAttendances: (attendances) => set({ attendances }),

   setSelectedAttendance: (attendance) =>
      set({ selectedAttendance: attendance }),

   setStatistics: (statistics) => set({ statistics }),

   setLoading: (loading) => set({ isLoading: loading }),

   setError: (error) => set({ error }),

   setFilters: (filters) =>
      set((state) => ({
         filters: { ...state.filters, ...filters },
      })),

   resetFilters: () => set({ filters: {} }),

   // Attendance operations
   addAttendance: (attendance) =>
      set((state) => ({
         attendances: [attendance, ...state.attendances],
         statistics: state.statistics
            ? {
                 ...state.statistics,
                 total: state.statistics.total + 1,
                 [attendance.status]:
                    (state.statistics[
                       attendance.status as keyof AttendanceStatistics
                    ] as number) + 1,
                 attendance_rate: Math.round(
                    ((state.statistics.present +
                       (attendance.status === "present" ? 1 : 0)) /
                       (state.statistics.total + 1)) *
                       100
                 ),
              }
            : null,
      })),

   updateAttendance: (id, updates) =>
      set((state) => {
         const updatedAttendances = state.attendances.map((attendance) =>
            attendance.id === id ? { ...attendance, ...updates } : attendance
         );

         // Update statistics if status changed
         let newStats = state.statistics;
         if (updates.status && state.statistics) {
            const oldAttendance = state.attendances.find((a) => a.id === id);
            if (oldAttendance) {
               newStats = { ...state.statistics };

               // Decrement old status
               const oldStatus =
                  oldAttendance.status as keyof AttendanceStatistics;
               if (oldStatus in newStats) {
                  (newStats[oldStatus] as number)--;
               }

               // Increment new status
               const newStatus = updates.status as keyof AttendanceStatistics;
               if (newStatus in newStats) {
                  (newStats[newStatus] as number)++;
               }

               // Recalculate attendance rate
               newStats.attendance_rate = Math.round(
                  (newStats.present / newStats.total) * 100
               );
            }
         }

         return {
            attendances: updatedAttendances,
            selectedAttendance:
               state.selectedAttendance?.id === id
                  ? { ...state.selectedAttendance, ...updates }
                  : state.selectedAttendance,
            statistics: newStats,
         };
      }),

   deleteAttendance: (id) =>
      set((state) => {
         const attendanceToDelete = state.attendances.find((a) => a.id === id);
         const updatedAttendances = state.attendances.filter(
            (a) => a.id !== id
         );

         // Update statistics
         let newStats = state.statistics;
         if (attendanceToDelete && state.statistics) {
            newStats = {
               ...state.statistics,
               total: state.statistics.total - 1,
            };

            const status =
               attendanceToDelete.status as keyof AttendanceStatistics;
            if (status in newStats) {
               (newStats[status] as number)--;
            }

            newStats.attendance_rate = Math.round(
               (newStats.present / newStats.total) * 100
            );
         }

         return {
            attendances: updatedAttendances,
            selectedAttendance:
               state.selectedAttendance?.id === id
                  ? null
                  : state.selectedAttendance,
            statistics: newStats,
         };
      }),

   // Computed properties
   get todayAttendances() {
      const today = new Date().toISOString().split("T")[0];
      return get().attendances.filter(
         (attendance) => attendance.attendance_date === today
      );
   },

   get recentAttendances() {
      return get().attendances.slice(0, 10); // Last 10 attendances
   },
}));
