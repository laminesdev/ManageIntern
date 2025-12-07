// src/pages/intern/MyAttendancePage.tsx
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { attendanceService } from "@/services/attendanceService";
import { toast } from "sonner";
import { format, subDays, startOfMonth, endOfMonth } from "date-fns";
import {
   Calendar,
   CheckCircle,
   XCircle,
   Clock,
   AlertCircle,
   TrendingUp,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function MyAttendancePage() {
   const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
   const [statistics, setStatistics] = useState<any>(null);
   const [isLoading, setIsLoading] = useState(true);
   const [timeRange, setTimeRange] = useState("month");

   useEffect(() => {
      loadAttendanceData();
   }, [timeRange]);

   const loadAttendanceData = async () => {
      try {
         setIsLoading(true);

         // Get date range based on selected timeRange
         const getDateRange = () => {
            const now = new Date();
            switch (timeRange) {
               case "week":
                  const weekAgo = subDays(now, 7);
                  return {
                     start_date: format(weekAgo, "yyyy-MM-dd"),
                     end_date: format(now, "yyyy-MM-dd"),
                  };
               case "month":
                  return {
                     start_date: format(startOfMonth(now), "yyyy-MM-dd"),
                     end_date: format(endOfMonth(now), "yyyy-MM-dd"),
                  };
               case "quarter":
                  const quarterStart = new Date(
                     now.getFullYear(),
                     Math.floor(now.getMonth() / 3) * 3,
                     1
                  );
                  const quarterEnd = new Date(
                     quarterStart.getFullYear(),
                     quarterStart.getMonth() + 3,
                     0
                  );
                  return {
                     start_date: format(quarterStart, "yyyy-MM-dd"),
                     end_date: format(quarterEnd, "yyyy-MM-dd"),
                  };
               case "year":
                  return {
                     start_date: format(
                        new Date(now.getFullYear(), 0, 1),
                        "yyyy-MM-dd"
                     ),
                     end_date: format(
                        new Date(now.getFullYear(), 11, 31),
                        "yyyy-MM-dd"
                     ),
                  };
               case "all":
               default:
                  return {};
            }
         };

         const dateRange = getDateRange();

         const [recordsResponse, statsResponse] = await Promise.all([
            attendanceService.getMyAttendance(dateRange),
            attendanceService.getMyAttendanceStatistics(),
         ]);

         // FIX: Handle the response structure correctly based on the service definition
         // The service returns: Promise<{ statistics: AttendanceStatistics }>
         // So we need to access the statistics property
         const records = Array.isArray(recordsResponse)
            ? recordsResponse
            : recordsResponse.data || [];

         // For statistics, the service returns { statistics: AttendanceStatistics }
         const stats = statsResponse.statistics || statsResponse;

         // Sort records by date (newest first)
         const sortedRecords = records.sort((a: any, b: any) => {
            const dateA = a.attendance_date || a.date;
            const dateB = b.attendance_date || b.date;
            return new Date(dateB).getTime() - new Date(dateA).getTime();
         });

         setAttendanceRecords(sortedRecords);
         setStatistics(stats);
      } catch (error: any) {
         console.error("Failed to load attendance data:", error);
         toast.error(
            error.response?.data?.message || "Failed to load attendance data"
         );
         setAttendanceRecords([]);
         setStatistics(null);
      } finally {
         setIsLoading(false);
      }
   };

   const getStatusBadge = (status: string): React.ReactElement => {
      switch (status) {
         case "present":
            return (
               <Badge className="bg-red-100 text-red-800 border-red-200">
                  Present
               </Badge>
            );
         case "absent":
            return (
               <Badge className="bg-red-100 text-red-800 border-red-200">
                  Absent
               </Badge>
            );
         case "late":
            return (
               <Badge className="bg-red-100 text-red-800 border-red-200">
                  Late
               </Badge>
            );
         case "excused":
            return (
               <Badge className="bg-red-100 text-red-800 border-red-200">
                  Excused
               </Badge>
            );
         default:
            return <Badge variant="outline">{status}</Badge>;
      }
   };

   const getStatusIcon = (status: string): React.ReactElement | null => {
      switch (status) {
         case "present":
            return <CheckCircle className="h-5 w-5 text-red-500" />;
         case "absent":
            return <XCircle className="h-5 w-5 text-red-500" />;
         case "late":
            return <Clock className="h-5 w-5 text-red-500" />;
         case "excused":
            return <AlertCircle className="h-5 w-5 text-red-500" />;
         default:
            return null;
      }
   };

   const formatDate = (dateString: string): string => {
      try {
         const date = new Date(dateString);
         const today = new Date();
         const yesterday = new Date();
         yesterday.setDate(today.getDate() - 1);

         if (date.toDateString() === today.toDateString()) {
            return "Today";
         } else if (date.toDateString() === yesterday.toDateString()) {
            return "Yesterday";
         } else {
            return format(date, "MMM dd, yyyy");
         }
      } catch {
         return "Invalid date";
      }
   };

   if (isLoading) {
      return (
         <div className="space-y-6">
            <div>
               <Skeleton className="h-10 w-48 mb-2" />
               <Skeleton className="h-4 w-64" />
            </div>

            <div className="grid gap-6 md:grid-cols-4">
               {[1, 2, 3, 4].map((i) => (
                  <Card key={i}>
                     <CardContent className="pt-6">
                        <Skeleton className="h-20 w-full" />
                     </CardContent>
                  </Card>
               ))}
            </div>

            <Card>
               <CardHeader>
                  <Skeleton className="h-6 w-32" />
               </CardHeader>
               <CardContent>
                  <div className="space-y-4">
                     {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} className="h-16 w-full" />
                     ))}
                  </div>
               </CardContent>
            </Card>
         </div>
      );
   }

   // Calculate statistics if not provided by API
   const stats = statistics || {
      total: attendanceRecords.length,
      present: attendanceRecords.filter((r: any) => r.status === "present")
         .length,
      absent: attendanceRecords.filter((r: any) => r.status === "absent")
         .length,
      late: attendanceRecords.filter((r: any) => r.status === "late").length,
      excused: attendanceRecords.filter((r: any) => r.status === "excused")
         .length,
      attendance_rate:
         attendanceRecords.length > 0
            ? (attendanceRecords.filter((r: any) => r.status === "present")
                 .length /
                 attendanceRecords.length) *
              100
            : 100,
   };

   const timeRanges = [
      { value: "week", label: "This Week" },
      { value: "month", label: "This Month" },
      { value: "quarter", label: "This Quarter" },
      { value: "year", label: "This Year" },
      { value: "all", label: "All Time" },
   ];

   return (
      <div className="space-y-6">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
               <h1 className="text-3xl font-bold">My Attendance</h1>
               <p className="text-muted-foreground">
                  Track your attendance records
               </p>
            </div>
            <div className="flex flex-wrap gap-2">
               {timeRanges.map((range) => (
                  <Button
                     key={range.value}
                     variant={timeRange === range.value ? "default" : "outline"}
                     size="sm"
                     onClick={() => setTimeRange(range.value)}
                  >
                     {range.label}
                  </Button>
               ))}
            </div>
         </div>

         {/* Stats */}
         <div className="grid gap-6 md:grid-cols-4">
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Attendance Rate</p>
                        <p className="text-2xl font-bold">
                           {typeof stats.attendance_rate === "number"
                              ? stats.attendance_rate.toFixed(1)
                              : 0}
                           %
                        </p>
                     </div>
                     <TrendingUp className="h-8 w-8 text-red-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Present</p>
                        <p className="text-2xl font-bold">
                           {stats.present || 0}
                        </p>
                     </div>
                     <CheckCircle className="h-8 w-8 text-red-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Absent</p>
                        <p className="text-2xl font-bold">
                           {stats.absent || 0}
                        </p>
                     </div>
                     <XCircle className="h-8 w-8 text-red-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Late</p>
                        <p className="text-2xl font-bold">{stats.late || 0}</p>
                     </div>
                     <Clock className="h-8 w-8 text-red-500" />
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Recent Attendance */}
         <Card>
            <CardHeader>
               <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-red-500" />
                  Attendance Records
               </CardTitle>
            </CardHeader>
            <CardContent>
               {attendanceRecords.length === 0 ? (
                  <div className="text-center py-12">
                     <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                     <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No Attendance Records
                     </h3>
                     <p className="text-gray-500">
                        No attendance records found for the selected time
                        period.
                     </p>
                  </div>
               ) : (
                  <div className="space-y-3">
                     {attendanceRecords.slice(0, 20).map((record) => {
                        const date = record.attendance_date || record.date;
                        return (
                           <div
                              key={record.id}
                              className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors gap-3"
                           >
                              <div className="flex items-center space-x-3">
                                 {getStatusIcon(record.status)}
                                 <div>
                                    <p className="font-medium">
                                       {formatDate(date)}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                       {record.notes || "No notes"}
                                    </p>
                                 </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                 {getStatusBadge(record.status)}
                                 {record.recorded_at && (
                                    <span className="text-sm text-gray-500">
                                       Recorded:{" "}
                                       {format(
                                          new Date(record.recorded_at),
                                          "MMM dd, yyyy"
                                       )}
                                    </span>
                                 )}
                              </div>
                           </div>
                        );
                     })}

                     {attendanceRecords.length > 20 && (
                        <div className="text-center pt-4">
                           <p className="text-sm text-gray-500">
                              Showing 20 of {attendanceRecords.length} records
                           </p>
                        </div>
                     )}
                  </div>
               )}
            </CardContent>
         </Card>

         {/* Attendance Summary */}
         <Card>
            <CardHeader>
               <CardTitle>Attendance Summary</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     <div className="text-center p-4 bg-red-50 rounded-lg border border-red-100">
                        <div className="text-xl font-bold text-red-700">
                           {stats.present || 0}
                        </div>
                        <div className="text-sm text-red-600">Present Days</div>
                     </div>
                     <div className="text-center p-4 bg-red-50 rounded-lg border border-red-100">
                        <div className="text-xl font-bold text-red-700">
                           {stats.absent || 0}
                        </div>
                        <div className="text-sm text-red-600">Absent Days</div>
                     </div>
                     <div className="text-center p-4 bg-red-50 rounded-lg border border-red-100">
                        <div className="text-xl font-bold text-red-700">
                           {stats.late || 0}
                        </div>
                        <div className="text-sm text-red-600">Late Days</div>
                     </div>
                     <div className="text-center p-4 bg-red-50 rounded-lg border border-red-100">
                        <div className="text-xl font-bold text-red-700">
                           {stats.excused || 0}
                        </div>
                        <div className="text-sm text-red-600">Excused Days</div>
                     </div>
                  </div>

                  <div className="pt-4">
                     <div className="flex justify-between text-sm mb-1">
                        <span>Overall Attendance Rate</span>
                        <span>
                           {typeof stats.attendance_rate === "number"
                              ? stats.attendance_rate.toFixed(1)
                              : 0}
                           %
                        </span>
                     </div>
                     <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                           className={`h-full rounded-full transition-all duration-300 ${
                              (stats.attendance_rate || 0) >= 90
                                 ? "bg-red-500"
                                 : (stats.attendance_rate || 0) >= 80
                                 ? "bg-red-500"
                                 : (stats.attendance_rate || 0) >= 70
                                 ? "bg-red-500"
                                 : "bg-red-500"
                           }`}
                           style={{
                              width: `${Math.min(
                                 stats.attendance_rate || 0,
                                 100
                              )}%`,
                           }}
                        ></div>
                     </div>
                     <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0%</span>
                        <span>100%</span>
                     </div>
                  </div>

                  <div className="pt-4 text-sm text-gray-500 text-center">
                     Last updated:{" "}
                     {format(new Date(), "MMM dd, yyyy 'at' hh:mm a")}
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
