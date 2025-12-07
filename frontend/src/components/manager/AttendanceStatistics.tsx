import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";

interface AttendanceStatisticsProps {
   statistics: {
      total: number;
      present: number;
      absent: number;
      late: number;
      excused: number;
      attendance_rate: number;
   };
}

export default function AttendanceStatistics({
   statistics,
}: AttendanceStatisticsProps) {
   const getStatusColor = (status: string) => {
      switch (status) {
         case "present":
            return "text-red-600";
         case "absent":
            return "text-red-600";
         case "late":
            return "text-yellow-600";
         case "excused":
            return "text-red-600";
         default:
            return "text-gray-600";
      }
   };

   const getStatusIcon = (status: string) => {
      switch (status) {
         case "present":
            return <CheckCircle className="h-5 w-5 text-red-500" />;
         case "absent":
            return <XCircle className="h-5 w-5 text-red-500" />;
         case "late":
            return <Clock className="h-5 w-5 text-yellow-500" />;
         case "excused":
            return <AlertCircle className="h-5 w-5 text-red-500" />;
         default:
            return null;
      }
   };

   const stats = [
      { label: "Present", value: statistics.present, status: "present" },
      { label: "Absent", value: statistics.absent, status: "absent" },
      { label: "Late", value: statistics.late, status: "late" },
      { label: "Excused", value: statistics.excused, status: "excused" },
   ];

   return (
      <Card>
         <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
         </CardHeader>
         <CardContent className="space-y-6">
            {/* Overall Rate */}
            <div>
               <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">
                     Overall Attendance Rate
                  </span>
                  <span className="text-sm font-bold">
                     {statistics.attendance_rate.toFixed(1)}%
                  </span>
               </div>
               <Progress value={statistics.attendance_rate} className="h-2" />
            </div>

            {/* Breakdown */}
            <div className="space-y-3">
               {stats.map((stat) => (
                  <div
                     key={stat.status}
                     className="flex items-center justify-between"
                  >
                     <div className="flex items-center space-x-2">
                        {getStatusIcon(stat.status)}
                        <span className="text-sm">{stat.label}</span>
                     </div>
                     <div className="flex items-center space-x-4">
                        <span
                           className={`text-sm font-semibold ${getStatusColor(
                              stat.status
                           )}`}
                        >
                           {stat.value}
                        </span>
                        <span className="text-xs text-gray-500">
                           {statistics.total > 0
                              ? `${(
                                   (stat.value / statistics.total) *
                                   100
                                ).toFixed(0)}%`
                              : "0%"}
                        </span>
                     </div>
                  </div>
               ))}
            </div>

            {/* Total */}
            <div className="pt-3 border-t">
               <div className="flex justify-between">
                  <span className="text-sm font-medium">Total Records</span>
                  <span className="text-sm font-bold">{statistics.total}</span>
               </div>
            </div>
         </CardContent>
      </Card>
   );
}
