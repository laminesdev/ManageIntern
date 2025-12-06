import { useState, useEffect } from "react";
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
   Download,
   Search,
   Calendar,
   CheckCircle,
   XCircle,
   Clock as ClockIcon,
} from "lucide-react";
import { format } from "date-fns";
import { reportService } from "@/services/reportService";
import { attendanceService } from "@/services/attendanceService";

export default function ViewAttendanceReports() {
   const [reports, setReports] = useState<any[]>([]);
   const [filteredReports, setFilteredReports] = useState<any[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [searchTerm, setSearchTerm] = useState("");
   const [dateRange, setDateRange] = useState("month");

   useEffect(() => {
      loadReports();
   }, [dateRange]);

   useEffect(() => {
      filterReports();
   }, [reports, searchTerm]);

   const loadReports = async () => {
      try {
         setIsLoading(true);
         const response = await reportService.getReports({
            type: "attendance",
         });
         const reportsData = response.data || [];

         setReports(reportsData);
         setFilteredReports(reportsData);
      } catch (error: any) {
         toast.error("Failed to load attendance reports");
         console.error("Reports error:", error);
      } finally {
         setIsLoading(false);
      }
   };

   const filterReports = () => {
      let filtered = [...reports];

      if (searchTerm) {
         const term = searchTerm.toLowerCase();
         filtered = filtered.filter(
            (report) =>
               report.department?.name?.toLowerCase().includes(term) ||
               report.generated_by_user?.name?.toLowerCase().includes(term)
         );
      }

      setFilteredReports(filtered);
   };

   const exportReport = async (report: any) => {
      try {
         const reportData = {
            title: `Attendance Report - ${report.period_start} to ${report.period_end}`,
            generated_by: report.generated_by_user?.name || "Unknown",
            generated_at: format(new Date(report.created_at), "PPP"),
            department: report.department?.name || "All Departments",
            data: report.data,
         };

         const dataStr = JSON.stringify(reportData, null, 2);
         const dataBlob = new Blob([dataStr], { type: "application/json" });
         const url = URL.createObjectURL(dataBlob);
         const link = document.createElement("a");
         link.href = url;
         link.download = `attendance-report-${report.id}-${format(
            new Date(),
            "yyyy-MM-dd"
         )}.json`;
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
         URL.revokeObjectURL(url);

         toast.success("Report exported successfully");
      } catch (error) {
         toast.error("Failed to export report");
      }
   };

   const getStatusBadge = (status: string) => {
      switch (status) {
         case "present":
            return (
               <Badge className="bg-green-100 text-green-800">Present</Badge>
            );
         case "absent":
            return <Badge className="bg-red-100 text-red-800">Absent</Badge>;
         case "late":
            return (
               <Badge className="bg-yellow-100 text-yellow-800">Late</Badge>
            );
         case "excused":
            return <Badge className="bg-blue-100 text-blue-800">Excused</Badge>;
         default:
            return <Badge variant="outline">{status}</Badge>;
      }
   };

   if (isLoading) {
      return (
         <div className="space-y-6">
            <div className="flex items-center justify-between">
               <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                     Attendance Reports
                  </h1>
                  <p className="text-muted-foreground">
                     View and analyze attendance reports
                  </p>
               </div>
               <Skeleton className="h-10 w-32" />
            </div>

            <div className="space-y-4">
               {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-24 w-full" />
               ))}
            </div>
         </div>
      );
   }

   return (
      <div className="space-y-6">
         {/* Header */}
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-3xl font-bold tracking-tight">
                  Attendance Reports
               </h1>
               <p className="text-muted-foreground">
                  View and analyze attendance reports from managers
               </p>
            </div>
            <Select value={dateRange} onValueChange={setDateRange}>
               <SelectTrigger className="w-32">
                  <SelectValue placeholder="Time Range" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
               </SelectContent>
            </Select>
         </div>

         {/* Filters */}
         <Card>
            <CardContent className="pt-6">
               <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                     <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                           placeholder="Search reports by department or manager..."
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="pl-10"
                        />
                     </div>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Reports List */}
         {filteredReports.length === 0 ? (
            <Card>
               <CardContent className="py-12 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                     No Reports Found
                  </h3>
                  <p className="text-gray-500">
                     {searchTerm
                        ? "No reports match your search criteria"
                        : "No attendance reports have been generated yet"}
                  </p>
               </CardContent>
            </Card>
         ) : (
            <div className="space-y-4">
               {filteredReports.map((report) => (
                  <Card key={report.id}>
                     <CardHeader>
                        <div className="flex items-center justify-between">
                           <div>
                              <CardTitle className="flex items-center gap-2">
                                 Attendance Report
                                 {report.sent_to_admin && (
                                    <Badge className="bg-blue-100 text-blue-800">
                                       Sent to Admin
                                    </Badge>
                                 )}
                              </CardTitle>
                              <CardDescription>
                                 Period: {report.period_start} -{" "}
                                 {report.period_end}
                                 {report.department &&
                                    ` • Department: ${report.department.name}`}
                              </CardDescription>
                           </div>
                           <div className="flex items-center gap-2">
                              <Button
                                 variant="outline"
                                 size="sm"
                                 onClick={() => exportReport(report)}
                              >
                                 <Download className="mr-2 h-4 w-4" />
                                 Export
                              </Button>
                           </div>
                        </div>
                     </CardHeader>
                     <CardContent>
                        {report.data && (
                           <>
                              {/* Statistics */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                 <div className="text-center">
                                    <div className="text-2xl font-bold">
                                       {report.data.total || 0}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                       Total Records
                                    </div>
                                 </div>
                                 <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">
                                       {report.data.present || 0}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                       Present
                                    </div>
                                 </div>
                                 <div className="text-center">
                                    <div className="text-2xl font-bold text-red-600">
                                       {report.data.absent || 0}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                       Absent
                                    </div>
                                 </div>
                                 <div className="text-center">
                                    <div className="text-2xl font-bold">
                                       {report.data.attendance_rate
                                          ? `${report.data.attendance_rate.toFixed(
                                               1
                                            )}%`
                                          : "0%"}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                       Attendance Rate
                                    </div>
                                 </div>
                              </div>

                              {/* Summary */}
                              {report.data.summary && (
                                 <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <h4 className="font-semibold text-blue-900 mb-2">
                                       Summary
                                    </h4>
                                    <p className="text-sm text-blue-800">
                                       {report.data.summary}
                                    </p>
                                 </div>
                              )}
                           </>
                        )}

                        <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
                           <div>
                              Generated by:{" "}
                              <span className="font-medium">
                                 {report.generated_by_user?.name || "Unknown"}
                              </span>
                           </div>
                           <div>
                              Generated on:{" "}
                              {format(new Date(report.created_at), "PPpp")}
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               ))}
            </div>
         )}
      </div>
   );
}
