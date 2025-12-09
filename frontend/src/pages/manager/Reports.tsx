import { useState, useEffect } from "react";
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
   DialogFooter,
} from "@/components/ui/dialog";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
   CalendarIcon,
   BarChart3,
   FileText,
   Send,
   Download,
   Eye,
   Filter,
   Loader2,
   Plus,
} from "lucide-react";
import { format, subDays, startOfMonth, endOfMonth } from "date-fns";
import { cn } from "@/lib/utils";
import { reportService } from "@/services/reportService";
import { attendanceService } from "@/services/attendanceService";
import { evaluationService } from "@/services/evaluationService";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const reportSchema = z.object({
   report_type: z.enum(["attendance", "performance"]),
   period_start: z.date(),
   period_end: z.date(),
   department_id: z.coerce.number().optional(),
});

type ReportFormData = z.infer<typeof reportSchema>;

interface GeneratedReport {
   id: number;
   type: string;
   period_start: string;
   period_end: string;
   generated_at: string;
   created_at: string;
   sent_to_admin: boolean;
   data: any;
   department?: {
      id: number;
      name: string;
   };
}

export default function ManagerReports() {
   const [reports, setReports] = useState<GeneratedReport[]>([]);
   const [filteredReports, setFilteredReports] = useState<GeneratedReport[]>(
      []
   );
   const [isLoading, setIsLoading] = useState(true);
   const [isGenerating, setIsGenerating] = useState(false);
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [typeFilter, setTypeFilter] = useState("all");
   const [statusFilter, setStatusFilter] = useState("all");

   const form = useForm<ReportFormData>({
      resolver: zodResolver(reportSchema),
      defaultValues: {
         report_type: "attendance",
         period_start: startOfMonth(new Date()),
         period_end: endOfMonth(new Date()),
      },
   });

   useEffect(() => {
      loadReports();
   }, []);

   useEffect(() => {
      filterReports();
   }, [reports, typeFilter, statusFilter]);

   const loadReports = async () => {
      try {
         setIsLoading(true);
         const response = await reportService.getManagerReports();
         setReports(response?.data || []);
         setFilteredReports(response?.data || []);
      } catch (error) {
         console.error("Failed to load reports:", error);
         toast.error("Failed to load reports");
      } finally {
         setIsLoading(false);
      }
   };

   const filterReports = () => {
      let filtered = [...reports];

      if (typeFilter !== "all") {
         filtered = filtered.filter((report) => report.type === typeFilter);
      }

      if (statusFilter !== "all") {
         filtered = filtered.filter((report) => {
            if (statusFilter === "sent") return report.sent_to_admin === true;
            if (statusFilter === "pending")
               return report.sent_to_admin === false;
            return true;
         });
      }

      setFilteredReports(filtered);
   };

   const onSubmit = async (data: ReportFormData) => {
      try {
         setIsGenerating(true);

         const reportData = {
            ...data,
            period_start: format(data.period_start, "yyyy-MM-dd"),
            period_end: format(data.period_end, "yyyy-MM-dd"),
         };

         let generatedReport;

         if (data.report_type === "attendance") {
            // Generate attendance report
            const attendanceData = await attendanceService.getAttendanceSummary(
               reportData.period_start,
               reportData.period_end
            );

            generatedReport = await reportService.generateReport({
               type: "attendance",
               period_start: reportData.period_start,
               period_end: reportData.period_end,
               data: attendanceData.data,
            });
         } else {
            // Generate performance report
            const evaluationsData = await evaluationService.getEvaluations({
               start_date: reportData.period_start,
               end_date: reportData.period_end,
            });

            generatedReport = await reportService.generateReport({
               type: "performance",
               period_start: reportData.period_start,
               period_end: reportData.period_end,
               data: evaluationsData.data,
            });
         }

         toast.success(`${data.report_type} report generated successfully!`);
         setIsDialogOpen(false);
         form.reset();
         loadReports(); // Refresh list
      } catch (error: any) {
         console.error("Report generation error:", error);
         toast.error(
            error.response?.data?.message || "Failed to generate report"
         );
      } finally {
         setIsGenerating(false);
      }
   };

   const handleSendToAdmin = async (reportId: number) => {
      try {
         await reportService.sendToAdmin(reportId);
         toast.success("Report sent to admin successfully!");
         loadReports(); // Refresh list
      } catch (error) {
         toast.error("Failed to send report to admin");
      }
   };

   // Helper function to safely format dates
   const formatDate = (
      dateValue: any,
      formatString: string = "MMM dd, yyyy"
   ): string => {
      if (!dateValue) return "N/A";
      try {
         const date = new Date(dateValue);
         if (isNaN(date.getTime())) return "N/A";
         return format(date, formatString);
      } catch {
         return "N/A";
      }
   };

   const handleExportReport = async (report: GeneratedReport) => {
      try {
         const doc = new jsPDF();

         // Add header
         doc.setFontSize(20);
         doc.setTextColor(220, 38, 38); // Red color
         doc.text(
            `${
               report.type.charAt(0).toUpperCase() + report.type.slice(1)
            } Report`,
            14,
            22
         );

         // Add report metadata
         doc.setFontSize(10);
         doc.setTextColor(100);
         doc.text(
            `Period: ${formatDate(report.period_start)} - ${formatDate(
               report.period_end
            )}`,
            14,
            32
         );
         doc.text(
            `Generated: ${formatDate(
               report.created_at || report.data?.generated_at,
               "MMM dd, yyyy HH:mm"
            )}`,
            14,
            38
         );
         doc.text(
            `Status: ${report.sent_to_admin ? "Sent to Admin" : "Pending"}`,
            14,
            44
         );

         // Add department info if available
         if (report.department?.name) {
            doc.text(`Department: ${report.department.name}`, 14, 50);
         }

         // Add a line separator
         doc.setDrawColor(220, 38, 38);
         doc.setLineWidth(0.5);
         doc.line(14, 56, 196, 56);

         let yPosition = 66;

         if (report.type === "attendance") {
            // Attendance Report
            doc.setFontSize(14);
            doc.setTextColor(0);
            doc.text("Overall Statistics", 14, yPosition);
            yPosition += 10;

            doc.setFontSize(10);

            // Access overall_statistics from the data
            const overallStats = report.data?.overall_statistics || {};
            const summaryData = [
               ["Total Records", (overallStats.total_records || 0).toString()],
               ["Present", (overallStats.present || 0).toString()],
               ["Absent", (overallStats.absent || 0).toString()],
               ["Late", (overallStats.late || 0).toString()],
               ["Excused", (overallStats.excused || 0).toString()],
               [
                  "Overall Attendance Rate",
                  `${overallStats.overall_attendance_rate || 0}%`,
               ],
            ];

            autoTable(doc, {
               startY: yPosition,
               head: [["Metric", "Value"]],
               body: summaryData,
               theme: "striped",
               headStyles: { fillColor: [220, 38, 38] },
               margin: { left: 14 },
            });

            // Add intern attendance details
            const internAttendance = report.data?.intern_attendance || [];
            if (
               Array.isArray(internAttendance) &&
               internAttendance.length > 0
            ) {
               yPosition = (doc as any).lastAutoTable.finalY + 15;
               doc.setFontSize(14);
               doc.text("Intern Attendance Summary", 14, yPosition);
               yPosition += 5;

               const internData = internAttendance.map((intern: any) => [
                  intern.intern_name || "N/A",
                  intern.intern_email || "N/A",
                  (intern.total_days || 0).toString(),
                  (intern.present || 0).toString(),
                  (intern.absent || 0).toString(),
                  (intern.late || 0).toString(),
                  `${intern.attendance_rate || 0}%`,
               ]);

               autoTable(doc, {
                  startY: yPosition,
                  head: [
                     [
                        "Intern",
                        "Email",
                        "Total Days",
                        "Present",
                        "Absent",
                        "Late",
                        "Rate",
                     ],
                  ],
                  body: internData,
                  theme: "striped",
                  headStyles: { fillColor: [220, 38, 38] },
                  margin: { left: 14 },
                  styles: { fontSize: 8 },
               });

               // Add detailed attendance records for each intern
               internAttendance.forEach((intern: any) => {
                  if (
                     intern.details &&
                     Array.isArray(intern.details) &&
                     intern.details.length > 0
                  ) {
                     yPosition = (doc as any).lastAutoTable.finalY + 10;

                     // Check if we need a new page
                     if (yPosition > 250) {
                        doc.addPage();
                        yPosition = 20;
                     }

                     doc.setFontSize(12);
                     doc.text(
                        `${intern.intern_name} - Detailed Records`,
                        14,
                        yPosition
                     );
                     yPosition += 5;

                     const detailData = intern.details.map((detail: any) => [
                        formatDate(detail.date),
                        detail.status || "N/A",
                        detail.recorded_at
                           ? formatDate(detail.recorded_at, "HH:mm")
                           : "N/A",
                     ]);

                     autoTable(doc, {
                        startY: yPosition,
                        head: [["Date", "Status", "Recorded At"]],
                        body: detailData,
                        theme: "striped",
                        headStyles: { fillColor: [220, 38, 38] },
                        margin: { left: 14 },
                        styles: { fontSize: 8 },
                     });
                  }
               });
            }
         } else if (report.type === "performance") {
            // Performance Report
            doc.setFontSize(14);
            doc.setTextColor(0);
            doc.text("Overall Statistics", 14, yPosition);
            yPosition += 10;

            doc.setFontSize(10);

            // Access overall_statistics from the data
            const overallStats = report.data?.overall_statistics || {};
            const summaryData = [
               ["Total Interns", (overallStats.total_interns || 0).toString()],
               [
                  "Avg Task Completion",
                  `${(overallStats.average_task_completion_rate || 0).toFixed(
                     2
                  )}%`,
               ],
               [
                  "Avg Evaluation Score",
                  `${(overallStats.average_evaluation_score || 0).toFixed(2)}%`,
               ],
               [
                  "Avg Attendance Rate",
                  `${(overallStats.average_attendance_rate || 0).toFixed(2)}%`,
               ],
               [
                  "Avg Overall Performance",
                  `${(overallStats.average_overall_performance || 0).toFixed(
                     2
                  )}%`,
               ],
            ];

            autoTable(doc, {
               startY: yPosition,
               head: [["Metric", "Value"]],
               body: summaryData,
               theme: "striped",
               headStyles: { fillColor: [220, 38, 38] },
               margin: { left: 14 },
            });

            // Add intern performance details
            const internPerformance = report.data?.intern_performance || [];
            if (
               Array.isArray(internPerformance) &&
               internPerformance.length > 0
            ) {
               yPosition = (doc as any).lastAutoTable.finalY + 15;
               doc.setFontSize(14);
               doc.text("Intern Performance Summary", 14, yPosition);
               yPosition += 5;

               const performanceData = internPerformance.map((intern: any) => [
                  intern.intern_name || "N/A",
                  `${(intern.tasks?.completion_rate || 0).toFixed(1)}%`,
                  `${(intern.evaluations?.average_score || 0).toFixed(1)}%`,
                  `${(intern.attendance?.attendance_rate || 0).toFixed(1)}%`,
                  `${(intern.overall_performance_score || 0).toFixed(1)}%`,
               ]);

               autoTable(doc, {
                  startY: yPosition,
                  head: [
                     [
                        "Intern",
                        "Task Rate",
                        "Eval Score",
                        "Attendance",
                        "Overall",
                     ],
                  ],
                  body: performanceData,
                  theme: "striped",
                  headStyles: { fillColor: [220, 38, 38] },
                  margin: { left: 14 },
                  styles: { fontSize: 8 },
               });

               // Add detailed breakdown for each intern
               internPerformance.forEach((intern: any) => {
                  yPosition = (doc as any).lastAutoTable.finalY + 10;

                  // Check if we need a new page
                  if (yPosition > 230) {
                     doc.addPage();
                     yPosition = 20;
                  }

                  doc.setFontSize(12);
                  doc.text(
                     `${intern.intern_name} - Detailed Breakdown`,
                     14,
                     yPosition
                  );
                  yPosition += 5;

                  const detailData = [
                     ["Task Total", (intern.tasks?.total || 0).toString()],
                     [
                        "Task Completed",
                        (intern.tasks?.completed || 0).toString(),
                     ],
                     [
                        "Task In Progress",
                        (intern.tasks?.in_progress || 0).toString(),
                     ],
                     ["Task Pending", (intern.tasks?.pending || 0).toString()],
                     ["Task Overdue", (intern.tasks?.overdue || 0).toString()],
                     [
                        "Evaluations Total",
                        (intern.evaluations?.total || 0).toString(),
                     ],
                     [
                        "Highest Evaluation",
                        `${(intern.evaluations?.highest_score || 0).toFixed(
                           1
                        )}%`,
                     ],
                     [
                        "Lowest Evaluation",
                        `${(intern.evaluations?.lowest_score || 0).toFixed(
                           1
                        )}%`,
                     ],
                  ];

                  autoTable(doc, {
                     startY: yPosition,
                     head: [["Metric", "Value"]],
                     body: detailData,
                     theme: "striped",
                     headStyles: { fillColor: [220, 38, 38] },
                     margin: { left: 14 },
                     styles: { fontSize: 8 },
                     columnStyles: {
                        0: { cellWidth: 80 },
                        1: { cellWidth: 40 },
                     },
                  });
               });
            }
         }

         // Add footer
         const pageCount = doc.getNumberOfPages();
         for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150);
            doc.text(
               `Page ${i} of ${pageCount}`,
               doc.internal.pageSize.getWidth() / 2,
               doc.internal.pageSize.getHeight() - 10,
               { align: "center" }
            );
         }

         // Save the PDF with safe date formatting
         const fileName = `report-${report.type}-${formatDate(
            report.created_at || report.data?.generated_at,
            "yyyy-MM-dd"
         )}.pdf`;
         doc.save(fileName);

         toast.success("Report exported successfully");
      } catch (error) {
         console.error("Export error:", error);
         toast.error("Failed to export report");
      }
   };

   const getReportTypeBadge = (type: string) => {
      switch (type) {
         case "attendance":
            return (
               <Badge className="bg-red-100 text-red-800">Attendance</Badge>
            );
         case "performance":
            return (
               <Badge className="bg-red-100 text-red-800">Performance</Badge>
            );
         default:
            return <Badge variant="outline">{type}</Badge>;
      }
   };

   const getStatusBadge = (sent: boolean) => {
      return sent ? (
         <Badge className="bg-red-100 text-red-800">Sent to Admin</Badge>
      ) : (
         <Badge variant="outline">Pending</Badge>
      );
   };

   const getReportStats = (report: GeneratedReport) => {
      if (!report.data) return { total: 0, description: "No data" };

      if (report.type === "attendance") {
         const overallStats = report.data.overall_statistics || {};
         return {
            total: overallStats.total_records || 0,
            description: `${overallStats.present || 0} present, ${
               overallStats.absent || 0
            } absent`,
         };
      } else {
         const overallStats = report.data.overall_statistics || {};
         return {
            total: overallStats.total_interns || 0,
            description: `Avg score: ${(
               overallStats.average_overall_performance || 0
            ).toFixed(1)}%`,
         };
      }
   };

   if (isLoading) {
      return (
         <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-red-500" />
         </div>
      );
   }

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
               <p className="text-muted-foreground">
                  Generate and manage reports for your department
               </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
               <DialogTrigger asChild>
                  <Button>
                     <Plus className="mr-2 h-4 w-4" />
                     Generate Report
                  </Button>
               </DialogTrigger>
               <DialogContent className="max-w-md">
                  <DialogHeader>
                     <DialogTitle>Generate New Report</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                     <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                     >
                        <FormField
                           control={form.control}
                           name="report_type"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Report Type *</FormLabel>
                                 <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                 >
                                    <FormControl>
                                       <SelectTrigger>
                                          <SelectValue placeholder="Select report type" />
                                       </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                       <SelectItem value="attendance">
                                          Attendance Report
                                       </SelectItem>
                                       <SelectItem value="performance">
                                          Performance Report
                                       </SelectItem>
                                    </SelectContent>
                                 </Select>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                           <FormField
                              control={form.control}
                              name="period_start"
                              render={({ field }) => (
                                 <FormItem className="flex flex-col">
                                    <FormLabel>Start Date *</FormLabel>
                                    <Popover>
                                       <PopoverTrigger asChild>
                                          <FormControl>
                                             <Button
                                                variant="outline"
                                                className={cn(
                                                   "pl-3 text-left font-normal",
                                                   !field.value &&
                                                      "text-muted-foreground"
                                                )}
                                             >
                                                {field.value ? (
                                                   format(field.value, "PPP")
                                                ) : (
                                                   <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                             </Button>
                                          </FormControl>
                                       </PopoverTrigger>
                                       <PopoverContent
                                          className="w-auto p-0"
                                          align="start"
                                       >
                                          <Calendar
                                             mode="single"
                                             selected={field.value}
                                             onSelect={field.onChange}
                                             initialFocus
                                          />
                                       </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <FormField
                              control={form.control}
                              name="period_end"
                              render={({ field }) => (
                                 <FormItem className="flex flex-col">
                                    <FormLabel>End Date *</FormLabel>
                                    <Popover>
                                       <PopoverTrigger asChild>
                                          <FormControl>
                                             <Button
                                                variant="outline"
                                                className={cn(
                                                   "pl-3 text-left font-normal",
                                                   !field.value &&
                                                      "text-muted-foreground"
                                                )}
                                             >
                                                {field.value ? (
                                                   format(field.value, "PPP")
                                                ) : (
                                                   <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                             </Button>
                                          </FormControl>
                                       </PopoverTrigger>
                                       <PopoverContent
                                          className="w-auto p-0"
                                          align="start"
                                       >
                                          <Calendar
                                             mode="single"
                                             selected={field.value}
                                             onSelect={field.onChange}
                                             initialFocus
                                          />
                                       </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>

                        <DialogFooter>
                           <Button type="submit" disabled={isGenerating}>
                              {isGenerating ? (
                                 <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                 </>
                              ) : (
                                 "Generate Report"
                              )}
                           </Button>
                        </DialogFooter>
                     </form>
                  </Form>
               </DialogContent>
            </Dialog>
         </div>

         {/* Stats */}
         <div className="grid gap-6 md:grid-cols-3">
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Total Reports</p>
                        <p className="text-2xl font-bold">{reports.length}</p>
                     </div>
                     <FileText className="h-8 w-8 text-red-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">
                           Attendance Reports
                        </p>
                        <p className="text-2xl font-bold">
                           {
                              reports.filter((r) => r.type === "attendance")
                                 .length
                           }
                        </p>
                     </div>
                     <BarChart3 className="h-8 w-8 text-red-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Sent to Admin</p>
                        <p className="text-2xl font-bold">
                           {reports.filter((r) => r.sent_to_admin).length}
                        </p>
                     </div>
                     <Send className="h-8 w-8 text-red-500" />
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Filters */}
         <Card>
            <CardContent className="pt-6">
               <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                     <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-full md:w-40">
                           <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="all">All Reports</SelectItem>
                           <SelectItem value="attendance">
                              Attendance
                           </SelectItem>
                           <SelectItem value="performance">
                              Performance
                           </SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
                  <div className="flex-1">
                     <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                     >
                        <SelectTrigger className="w-full md:w-40">
                           <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="all">All Status</SelectItem>
                           <SelectItem value="sent">Sent to Admin</SelectItem>
                           <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Reports Table */}
         <Card>
            <CardHeader>
               <CardTitle>Generated Reports</CardTitle>
               <CardDescription>
                  Reports you have generated for your department
               </CardDescription>
            </CardHeader>
            <CardContent>
               {filteredReports.length === 0 ? (
                  <div className="text-center py-12">
                     <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                     <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No Reports Found
                     </h3>
                     <p className="text-gray-500">
                        {typeFilter !== "all" || statusFilter !== "all"
                           ? "No reports match your filter criteria"
                           : "No reports have been generated yet. Generate your first report!"}
                     </p>
                  </div>
               ) : (
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Type</TableHead>
                           <TableHead>Period</TableHead>
                           <TableHead>Statistics</TableHead>
                           <TableHead>Generated</TableHead>
                           <TableHead>Status</TableHead>
                           <TableHead>Actions</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {filteredReports.map((report) => {
                           const stats = getReportStats(report);
                           return (
                              <TableRow key={report.id}>
                                 <TableCell>
                                    {getReportTypeBadge(report.type)}
                                 </TableCell>
                                 <TableCell>
                                    {report.period_start &&
                                    report.period_end ? (
                                       <>
                                          {formatDate(
                                             report.period_start,
                                             "MMM dd"
                                          )}{" "}
                                          -{" "}
                                          {formatDate(
                                             report.period_end,
                                             "MMM dd, yyyy"
                                          )}
                                       </>
                                    ) : (
                                       "N/A"
                                    )}
                                 </TableCell>
                                 <TableCell>
                                    <div>
                                       <p className="font-medium">
                                          {stats.total} records
                                       </p>
                                       <p className="text-sm text-gray-500">
                                          {stats.description}
                                       </p>
                                    </div>
                                 </TableCell>
                                 <TableCell>
                                    {formatDate(
                                       report.created_at,
                                       "MMM dd, yyyy"
                                    )}
                                 </TableCell>
                                 <TableCell>
                                    {getStatusBadge(report.sent_to_admin)}
                                 </TableCell>
                                 <TableCell>
                                    <div className="flex items-center gap-2">
                                       <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() =>
                                             handleExportReport(report)
                                          }
                                       >
                                          <Download className="h-4 w-4 mr-1" />
                                          Export
                                       </Button>
                                       {!report.sent_to_admin && (
                                          <Button
                                             variant="ghost"
                                             size="sm"
                                             onClick={() =>
                                                handleSendToAdmin(report.id)
                                             }
                                          >
                                             <Send className="h-4 w-4 mr-1" />
                                             Send to Admin
                                          </Button>
                                       )}
                                    </div>
                                 </TableCell>
                              </TableRow>
                           );
                        })}
                     </TableBody>
                  </Table>
               )}
            </CardContent>
         </Card>

         {/* Quick Report Templates */}
         <Card>
            <CardHeader>
               <CardTitle>Quick Report Templates</CardTitle>
               <CardDescription>
                  Generate common reports with one click
               </CardDescription>
            </CardHeader>
            <CardContent>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                     variant="outline"
                     className="h-auto py-4 justify-start"
                     onClick={() => {
                        form.setValue("report_type", "attendance");
                        form.setValue("period_start", startOfMonth(new Date()));
                        form.setValue("period_end", endOfMonth(new Date()));
                        setIsDialogOpen(true);
                     }}
                  >
                     <div className="text-left">
                        <p className="font-medium">Monthly Attendance Report</p>
                        <p className="text-sm text-gray-500">
                           Current month's attendance summary
                        </p>
                     </div>
                  </Button>
                  <Button
                     variant="outline"
                     className="h-auto py-4 justify-start"
                     onClick={() => {
                        form.setValue("report_type", "performance");
                        form.setValue("period_start", startOfMonth(new Date()));
                        form.setValue("period_end", endOfMonth(new Date()));
                        setIsDialogOpen(true);
                     }}
                  >
                     <div className="text-left">
                        <p className="font-medium">
                           Monthly Performance Report
                        </p>
                        <p className="text-sm text-gray-500">
                           Current month's performance evaluation
                        </p>
                     </div>
                  </Button>
                  <Button
                     variant="outline"
                     className="h-auto py-4 justify-start"
                     onClick={() => {
                        form.setValue("report_type", "attendance");
                        form.setValue("period_start", subDays(new Date(), 7));
                        form.setValue("period_end", new Date());
                        setIsDialogOpen(true);
                     }}
                  >
                     <div className="text-left">
                        <p className="font-medium">Weekly Attendance Report</p>
                        <p className="text-sm text-gray-500">
                           Last 7 days attendance
                        </p>
                     </div>
                  </Button>
                  <Button
                     variant="outline"
                     className="h-auto py-4 justify-start"
                     onClick={() => {
                        form.setValue("report_type", "performance");
                        form.setValue("period_start", subDays(new Date(), 30));
                        form.setValue("period_end", new Date());
                        setIsDialogOpen(true);
                     }}
                  >
                     <div className="text-left">
                        <p className="font-medium">Last 30 Days Performance</p>
                        <p className="text-sm text-gray-500">
                           Performance over last month
                        </p>
                     </div>
                  </Button>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
