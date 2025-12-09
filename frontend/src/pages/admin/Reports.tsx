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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  Download,
  Filter,
  Calendar,
  BarChart3,
  TrendingUp,
  Eye,
} from "lucide-react";
import { format } from "date-fns";
import { reportService } from "@/services/reportService";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Report {
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
  department?: {
    id: number;
    name: string;
  };
  generated_by_user?: {
    id: number;
    name: string;
    email: string;
  };
}

export default function AdminReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [departments, setDepartments] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    loadReports();
  }, []);

  useEffect(() => {
    filterReports();
    extractDepartments();
  }, [reports, typeFilter, departmentFilter]);

  const loadReports = async () => {
    try {
      setIsLoading(true);
      const response = await reportService.getReports();
      setReports(response.data || []);
      setFilteredReports(response.data || []);
    } catch (error) {
      console.error("Failed to load reports:", error);
      toast.error("Failed to load reports");
    } finally {
      setIsLoading(false);
    }
  };

  const extractDepartments = () => {
    const uniqueDepartments: { id: number; name: string }[] = [];
    reports.forEach(report => {
      if (report.department && !uniqueDepartments.some(dept => dept.id === report.department?.id)) {
        uniqueDepartments.push(report.department);
      }
    });
    setDepartments(uniqueDepartments);
  };

  const filterReports = () => {
    let filtered = [...reports];

    if (typeFilter !== "all") {
      filtered = filtered.filter((report) => report.type === typeFilter);
    }

    if (departmentFilter !== "all") {
      filtered = filtered.filter((report) => 
        report.department?.id?.toString() === departmentFilter
      );
    }

    setFilteredReports(filtered);
  };

  const getReportTypeBadge = (type: string) => {
    switch (type) {
      case "attendance":
        return <Badge className="bg-red-100 text-red-800">Attendance</Badge>;
      case "performance":
        return <Badge className="bg-red-100 text-red-800">Performance</Badge>;
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

  const getReportStats = (report: Report) => {
    if (!report.data) return { total: 0, description: "No data" };

    if (report.type === "attendance") {
      const overallStats = report.data.overall_statistics || {};
      return {
        total: overallStats.total_records || 0,
        description: `${overallStats.present || 0} present, ${overallStats.absent || 0} absent`,
      };
    } else {
      const overallStats = report.data.overall_statistics || {};
      return {
        total: overallStats.total_interns || 0,
        description: `Avg score: ${(overallStats.average_overall_performance || 0).toFixed(1)}%`,
      };
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

  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setIsViewDialogOpen(true);
  };

  const handleExportReport = async (report: Report) => {
    try {
      const doc = new jsPDF();

      // Add header
      doc.setFontSize(20);
      doc.setTextColor(220, 38, 38); // Red color
      doc.text(
        `${report.type.charAt(0).toUpperCase() + report.type.slice(1)} Report`,
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
          report.created_at,
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

      // Add generated by info if available
      if (report.generated_by_user?.name) {
        doc.text(`Generated by: ${report.generated_by_user.name}`, 14, 56);
      }

      // Add a line separator
      doc.setDrawColor(220, 38, 38);
      doc.setLineWidth(0.5);
      doc.line(14, 62, 196, 62);

      let yPosition = 72;

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
        if (Array.isArray(internAttendance) && internAttendance.length > 0) {
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
            `${(overallStats.average_task_completion_rate || 0).toFixed(2)}%`,
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
            `${(overallStats.average_overall_performance || 0).toFixed(2)}%`,
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
        if (Array.isArray(internPerformance) && internPerformance.length > 0) {
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
                `${(intern.evaluations?.highest_score || 0).toFixed(1)}%`,
              ],
              [
                "Lowest Evaluation",
                `${(intern.evaluations?.lowest_score || 0).toFixed(1)}%`,
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
        report.created_at,
        "yyyy-MM-dd"
      )}.pdf`;
      doc.save(fileName);

      toast.success("Report exported successfully");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export report");
    }
  };

  const renderReportDetails = () => {
    if (!selectedReport) return null;

    const stats = getReportStats(selectedReport);

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Report Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Report Type</p>
                <p className="font-medium">{getReportTypeBadge(selectedReport.type)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Period</p>
                <p className="font-medium">
                  {formatDate(selectedReport.period_start)} - {formatDate(selectedReport.period_end)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium">{selectedReport.department?.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Generated By</p>
                <p className="font-medium">{selectedReport.generated_by_user?.name || "Unknown"}</p>
                <p className="text-sm text-gray-500">{selectedReport.generated_by_user?.email}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Total Records</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Details</p>
                <p className="font-medium">{stats.description}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p>{getStatusBadge(selectedReport.sent_to_admin)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Generated On</p>
                <p className="font-medium">{formatDate(selectedReport.created_at, "MMM dd, yyyy HH:mm")}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detailed Data</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedReport.type === "attendance" ? (
              <div className="space-y-4">
                <h3 className="font-semibold">Overall Statistics</h3>
                {selectedReport.data?.overall_statistics && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {Object.entries(selectedReport.data.overall_statistics).map(([key, value]) => {
                      const val = value as string | number;
                      return (
                        <div key={key} className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 capitalize">{key.replace(/_/g, ' ')}</p>
                          <p className="text-lg font-semibold">
                            {typeof val === 'number' && key.includes('rate') ? `${val}%` : String(val)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="font-semibold">Performance Overview</h3>
                {selectedReport.data?.overall_statistics && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {Object.entries(selectedReport.data.overall_statistics).map(([key, value]) => {
                      const val = value as string | number;
                      return (
                        <div key={key} className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 capitalize">{key.replace(/_/g, ' ')}</p>
                          <p className="text-lg font-semibold">
                            {typeof val === 'number' && key.includes('rate') ? `${val}%` : String(val)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setIsViewDialogOpen(false)}
          >
            Close
          </Button>
          <Button
            onClick={() => {
              handleExportReport(selectedReport);
              setIsViewDialogOpen(false);
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Reports Dashboard
            </h1>
            <p className="text-muted-foreground">View system reports</p>
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Reports Dashboard
            </h1>
            <p className="text-muted-foreground">
              View and manage system reports
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Reports</p>
                  <p className="text-2xl font-bold">{reports.length}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Attendance</p>
                  <p className="text-2xl font-bold">
                    {reports.filter((r) => r.type === "attendance").length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Performance</p>
                  <p className="text-2xl font-bold">
                    {reports.filter((r) => r.type === "performance").length}
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
                  <p className="text-sm text-gray-500">Sent to Admin</p>
                  <p className="text-2xl font-bold">
                    {reports.filter((r) => r.sent_to_admin).length}
                  </p>
                </div>
                <Filter className="h-8 w-8 text-red-500" />
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
                    <SelectItem value="attendance">Attendance</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id.toString()}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reports Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Reports</CardTitle>
            <CardDescription>Reports generated by managers</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredReports.length === 0 ? (
              <div className="text-center py-12">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Reports Found
                </h3>
                <p className="text-gray-500">
                  {typeFilter !== "all" || departmentFilter !== "all"
                    ? "No reports match your filter criteria"
                    : "No reports have been generated yet"}
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Generated By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        {getReportTypeBadge(report.type)}
                      </TableCell>
                      <TableCell>
                        {formatDate(report.period_start, "MMM dd")}{" "}
                        -{" "}
                        {formatDate(report.period_end, "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell>
                        {report.department?.name || "All Departments"}
                      </TableCell>
                      <TableCell className="font-medium">
                        {report.generated_by_user?.name || "Unknown"}
                      </TableCell>
                      <TableCell>
                        {formatDate(report.created_at, "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(report.sent_to_admin)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewReport(report)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleExportReport(report)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Export
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* View Report Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
          </DialogHeader>
          {renderReportDetails()}
        </DialogContent>
      </Dialog>
    </>
  );
}