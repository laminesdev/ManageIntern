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
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
   Download,
   Filter,
   Search,
   BarChart3,
   TrendingUp,
   Target,
   Award,
   Star,
   Users,
   Eye,
} from "lucide-react";
import { format } from "date-fns";
import {
   BarChart,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
   ResponsiveContainer,
   LineChart,
   Line,
} from "recharts";
import { reportService } from "@/services/reportService";
import { evaluationService } from "@/services/evaluationService";
import { userService } from "@/services/userService";
import { formatDate, formatPercentage } from "@/utils/format/dataFormatters";

export default function ViewPerformanceReports() {
   const [reports, setReports] = useState<any[]>([]);
   const [filteredReports, setFilteredReports] = useState<any[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [searchTerm, setSearchTerm] = useState("");
   const [departmentFilter, setDepartmentFilter] = useState("all");
   const [activeTab, setActiveTab] = useState("reports");
   const [departmentStats, setDepartmentStats] = useState<any[]>([]);
   const [topPerformers, setTopPerformers] = useState<any[]>([]);

   useEffect(() => {
      loadReports();
   }, []);

   useEffect(() => {
      filterReports();
   }, [reports, searchTerm, departmentFilter]);

   const loadReports = async () => {
      try {
         setIsLoading(true);

         // Load performance reports
         const reportsResponse = await reportService.getReports({
            type: "performance",
         });
         const reportsData = reportsResponse.data || [];

         // Load evaluations for analysis
         const evaluationsResponse = await evaluationService.getEvaluations({});
         const evaluations = evaluationsResponse.data || [];

         // Load users for analysis
         const usersResponse = await userService.getUsers({ role: "intern" });
         const interns = usersResponse.data || [];

         // Process department statistics
         const stats = processDepartmentStats(interns, evaluations);
         setDepartmentStats(stats);

         // Process top performers
         const performers = processTopPerformers(interns, evaluations);
         setTopPerformers(performers);

         // Add analysis to reports
         const reportsWithAnalysis = reportsData.map((report: any) => ({
            ...report,
            analysis: analyzeReportData(report, evaluations, interns),
         }));

         setReports(reportsWithAnalysis);
      } catch (error: any) {
         toast.error("Failed to load performance reports");
         console.error("Reports error:", error);
      } finally {
         setIsLoading(false);
      }
   };

   const processDepartmentStats = (interns: any[], evaluations: any[]) => {
      const deptMap = new Map();

      interns.forEach((intern) => {
         const deptId = intern.department_id || "unassigned";
         const deptName = intern.department?.name || "Unassigned";

         if (!deptMap.has(deptId)) {
            deptMap.set(deptId, {
               id: deptId,
               name: deptName,
               internCount: 0,
               totalScore: 0,
               evaluationCount: 0,
            });
         }

         deptMap.get(deptId).internCount++;
      });

      evaluations.forEach((evaluation) => {
         const intern = interns.find((i) => i.id === evaluation.intern_id);
         if (intern) {
            const deptId = intern.department_id || "unassigned";
            const dept = deptMap.get(deptId);
            if (dept) {
               dept.totalScore += evaluation.score;
               dept.evaluationCount++;
            }
         }
      });

      return Array.from(deptMap.values()).map((dept) => ({
         ...dept,
         avgScore:
            dept.evaluationCount > 0
               ? dept.totalScore / dept.evaluationCount
               : 0,
      }));
   };

   const processTopPerformers = (interns: any[], evaluations: any[]) => {
      const internScores = new Map();

      evaluations.forEach((evaluation) => {
         const internId = evaluation.intern_id;
         if (!internScores.has(internId)) {
            internScores.set(internId, {
               totalScore: 0,
               count: 0,
               lastEvaluation: evaluation.evaluated_at,
            });
         }

         const data = internScores.get(internId);
         data.totalScore += evaluation.score;
         data.count++;
         if (
            new Date(evaluation.evaluated_at) > new Date(data.lastEvaluation)
         ) {
            data.lastEvaluation = evaluation.evaluated_at;
         }
      });

      return Array.from(internScores.entries())
         .map(([internId, scores]) => {
            const intern = interns.find((i) => i.id === internId);
            return {
               intern,
               avgScore: scores.totalScore / scores.count,
               evaluationCount: scores.count,
               lastEvaluation: scores.lastEvaluation,
            };
         })
         .filter((item) => item.intern)
         .sort((a, b) => b.avgScore - a.avgScore)
         .slice(0, 10);
   };

   const analyzeReportData = (
      report: any,
      evaluations: any[],
      interns: any[]
   ) => {
      const reportEvaluations = evaluations.filter(
         (evalItem) =>
            new Date(evalItem.evaluated_at) >= new Date(report.period_start) &&
            new Date(evalItem.evaluated_at) <= new Date(report.period_end)
      );

      if (report.department_id) {
         const deptInterns = interns.filter(
            (intern) => intern.department_id === report.department_id
         );
         const deptEvaluations = reportEvaluations.filter((evalItem) =>
            deptInterns.some((intern) => intern.id === evalItem.intern_id)
         );
         return calculateStats(deptEvaluations);
      }

      return calculateStats(reportEvaluations);
   };

   const calculateStats = (evaluations: any[]) => {
      if (evaluations.length === 0) {
         return {
            total: 0,
            avgScore: 0,
            minScore: 0,
            maxScore: 0,
            byType: {},
         };
      }

      const scores = evaluations.map((e) => e.score);
      const byType = evaluations.reduce((acc, evalItem) => {
         const type = evalItem.evaluation_type;
         if (!acc[type]) acc[type] = 0;
         acc[type]++;
         return acc;
      }, {});

      return {
         total: evaluations.length,
         avgScore: scores.reduce((a, b) => a + b, 0) / scores.length,
         minScore: Math.min(...scores),
         maxScore: Math.max(...scores),
         byType,
      };
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

      if (departmentFilter !== "all") {
         filtered = filtered.filter(
            (report) => report.department_id?.toString() === departmentFilter
         );
      }

      setFilteredReports(filtered);
   };

   const exportReport = async (reportId: number) => {
      try {
         const report = reports.find((r) => r.id === reportId);
         if (!report) return;

         const reportData = {
            title: `Performance Report - ${report.period_start} to ${report.period_end}`,
            department: report.department?.name || "All Departments",
            period: `${report.period_start} to ${report.period_end}`,
            generated_by: report.generated_by_user?.name || "Unknown",
            generated_at: format(new Date(report.created_at), "PPP"),
            analysis: report.analysis,
            summary: generateSummary(report.analysis),
         };

         const dataStr = JSON.stringify(reportData, null, 2);
         const dataBlob = new Blob([dataStr], { type: "application/json" });
         const url = URL.createObjectURL(dataBlob);
         const link = document.createElement("a");
         link.href = url;
         link.download = `performance-report-${reportId}-${format(
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

   const generateSummary = (analysis: any) => {
      if (analysis.total === 0)
         return "No performance data available for this period.";

      const trends = [];
      if (analysis.avgScore >= 90) trends.push("Excellent overall performance");
      else if (analysis.avgScore >= 80) trends.push("Good overall performance");
      else if (analysis.avgScore >= 70) trends.push("Average performance");
      else trends.push("Performance needs improvement");

      if (analysis.maxScore - analysis.minScore > 20) {
         trends.push("Significant variation in performance scores");
      }

      const topType = Object.entries(analysis.byType).sort(
         ([, a]: any, [, b]: any) => b - a
      )[0];

      if (topType) {
         trends.push(`Most common evaluation type: ${topType[0]}`);
      }

      return trends.join(". ") + ".";
   };

   const getScoreColor = (score: number) => {
      if (score >= 90) return "text-red-600";
      if (score >= 80) return "text-red-600";
      if (score >= 70) return "text-yellow-600";
      return "text-red-600";
   };

   if (isLoading) {
      return (
         <div className="space-y-6">
            <div className="flex items-center justify-between">
               <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                     Performance Reports
                  </h1>
                  <p className="text-muted-foreground">
                     View and analyze performance reports
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
                  Performance Reports
               </h1>
               <p className="text-muted-foreground">
                  View and analyze intern performance reports
               </p>
            </div>
         </div>

         {/* Tabs */}
         <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
               <TabsTrigger value="reports">Reports</TabsTrigger>
               <TabsTrigger value="analytics">Analytics</TabsTrigger>
               <TabsTrigger value="performers">Top Performers</TabsTrigger>
            </TabsList>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
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
                        <Select
                           value={departmentFilter}
                           onValueChange={setDepartmentFilter}
                        >
                           <SelectTrigger className="w-40">
                              <SelectValue placeholder="Filter by department" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="all">
                                 All Departments
                              </SelectItem>
                              {departmentStats.map((dept) => (
                                 <SelectItem
                                    key={dept.id}
                                    value={dept.id.toString()}
                                 >
                                    {dept.name}
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     </div>
                  </CardContent>
               </Card>

               {/* Reports List */}
               {filteredReports.length === 0 ? (
                  <Card>
                     <CardContent className="py-12 text-center">
                        <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                           No Reports Found
                        </h3>
                        <p className="text-gray-500">
                           {searchTerm || departmentFilter !== "all"
                              ? "No reports match your search criteria"
                              : "No performance reports have been generated yet"}
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
                                       Performance Report
                                       {report.sent_to_admin && (
                                          <Badge className="bg-red-100 text-red-800">
                                             Sent to Admin
                                          </Badge>
                                       )}
                                    </CardTitle>
                                    <CardDescription>
                                       Period: {formatDate(report.period_start)}{" "}
                                       - {formatDate(report.period_end)}
                                       {report.department &&
                                          ` • Department: ${report.department.name}`}
                                    </CardDescription>
                                 </div>
                                 <div className="flex items-center gap-2">
                                    <Button
                                       variant="outline"
                                       size="sm"
                                       onClick={() => exportReport(report.id)}
                                    >
                                       <Download className="mr-2 h-4 w-4" />
                                       Export
                                    </Button>
                                 </div>
                              </div>
                           </CardHeader>
                           <CardContent>
                              {/* Analysis Summary */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                 <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div
                                       className={`text-2xl font-bold ${getScoreColor(
                                          report.analysis.avgScore
                                       )}`}
                                    >
                                       {formatPercentage(
                                          report.analysis.avgScore
                                       )}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                       Average Score
                                    </div>
                                 </div>
                                 <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div className="text-2xl font-bold">
                                       {report.analysis.total}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                       Total Evaluations
                                    </div>
                                 </div>
                                 <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div
                                       className={`text-2xl font-bold ${getScoreColor(
                                          report.analysis.maxScore
                                       )}`}
                                    >
                                       {formatPercentage(
                                          report.analysis.maxScore
                                       )}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                       Highest Score
                                    </div>
                                 </div>
                                 <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div
                                       className={`text-2xl font-bold ${getScoreColor(
                                          report.analysis.minScore
                                       )}`}
                                    >
                                       {formatPercentage(
                                          report.analysis.minScore
                                       )}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                       Lowest Score
                                    </div>
                                 </div>
                              </div>

                              {/* Evaluation Types */}
                              {Object.keys(report.analysis.byType).length >
                                 0 && (
                                 <div className="mt-6">
                                    <h4 className="font-semibold mb-3">
                                       Evaluation Types
                                    </h4>
                                    <div className="space-y-2">
                                       {Object.entries(
                                          report.analysis.byType
                                       ).map(([type, count]: [string, any]) => (
                                          <div
                                             key={type}
                                             className="flex items-center justify-between"
                                          >
                                             <span className="text-sm capitalize">
                                                {type.replace("_", " ")}
                                             </span>
                                             <div className="flex items-center gap-2">
                                                <Progress
                                                   value={
                                                      (count /
                                                         report.analysis
                                                            .total) *
                                                      100
                                                   }
                                                   className="w-32"
                                                />
                                                <span className="text-sm font-medium">
                                                   {count}
                                                </span>
                                             </div>
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                              )}

                              {/* Summary */}
                              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                 <h4 className="font-semibold text-red-900 mb-2">
                                    Summary
                                 </h4>
                                 <p className="text-sm text-red-800">
                                    {generateSummary(report.analysis)}
                                 </p>
                              </div>

                              <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
                                 <div>
                                    Generated by:{" "}
                                    <span className="font-medium">
                                       {report.generated_by_user?.name ||
                                          "Unknown"}
                                    </span>
                                 </div>
                                 <div>
                                    Generated on:{" "}
                                    {format(
                                       new Date(report.created_at),
                                       "PPpp"
                                    )}
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                     ))}
                  </div>
               )}
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
               <Card>
                  <CardHeader>
                     <CardTitle>Department Performance</CardTitle>
                     <CardDescription>
                        Average scores by department
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                           <BarChart data={departmentStats}>
                              <CartesianGrid
                                 strokeDasharray="3 3"
                                 stroke="#f0f0f0"
                              />
                              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                              <YAxis
                                 tick={{ fontSize: 12 }}
                                 domain={[0, 100]}
                                 label={{
                                    value: "Score (%)",
                                    angle: -90,
                                    position: "insideLeft",
                                 }}
                              />
                              <Tooltip
                                 formatter={(value: number) => [
                                    `${value.toFixed(1)}%`,
                                    "Average Score",
                                 ]}
                              />
                              <Bar
                                 dataKey="avgScore"
                                 fill="#3b82f6"
                                 radius={[4, 4, 0, 0]}
                                 name="Average Score"
                              />
                           </BarChart>
                        </ResponsiveContainer>
                     </div>
                  </CardContent>
               </Card>

               <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                     <CardHeader>
                        <CardTitle>Department Details</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-4">
                           {departmentStats.map((dept) => (
                              <div
                                 key={dept.id}
                                 className="flex items-center justify-between p-3 border rounded-lg"
                              >
                                 <div>
                                    <div className="font-medium">
                                       {dept.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                       {dept.internCount} interns
                                    </div>
                                 </div>
                                 <div className="text-right">
                                    <div
                                       className={`text-xl font-bold ${getScoreColor(
                                          dept.avgScore
                                       )}`}
                                    >
                                       {formatPercentage(dept.avgScore)}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                       Avg. Score
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardHeader>
                        <CardTitle>Performance Trends</CardTitle>
                        <CardDescription>
                           Recent evaluation trends
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-4">
                           <div className="text-center p-6 bg-gray-50 rounded-lg">
                              <div className="text-3xl font-bold text-gray-900">
                                 {reports.length}
                              </div>
                              <div className="text-gray-500">Total Reports</div>
                           </div>
                           <div className="text-center p-6 bg-gray-50 rounded-lg">
                              <div className="text-3xl font-bold text-red-600">
                                 {departmentStats.length}
                              </div>
                              <div className="text-gray-500">
                                 Departments Tracked
                              </div>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </TabsContent>

            {/* Top Performers Tab */}
            <TabsContent value="performers" className="space-y-6">
               <Card>
                  <CardHeader>
                     <CardTitle>Top Performers</CardTitle>
                     <CardDescription>
                        Interns with highest average scores
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     {topPerformers.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                           No performance data available
                        </div>
                     ) : (
                        <Table>
                           <TableHeader>
                              <TableRow>
                                 <TableHead>Rank</TableHead>
                                 <TableHead>Intern</TableHead>
                                 <TableHead>Department</TableHead>
                                 <TableHead>Average Score</TableHead>
                                 <TableHead>Evaluations</TableHead>
                                 <TableHead>Last Evaluation</TableHead>
                              </TableRow>
                           </TableHeader>
                           <TableBody>
                              {topPerformers.map((performer, index) => (
                                 <TableRow key={performer.intern.id}>
                                    <TableCell>
                                       <div
                                          className={`flex items-center justify-center w-8 h-8 rounded-full ${
                                             index === 0
                                                ? "bg-yellow-100 text-yellow-800"
                                                : index === 1
                                                ? "bg-gray-100 text-gray-800"
                                                : index === 2
                                                ? "bg-amber-100 text-amber-800"
                                                : "bg-red-50 text-red-800"
                                          }`}
                                       >
                                          {index + 1}
                                       </div>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                       {performer.intern.name}
                                    </TableCell>
                                    <TableCell>
                                       {performer.intern.department?.name ||
                                          "Unassigned"}
                                    </TableCell>
                                    <TableCell>
                                       <div
                                          className={`font-bold ${getScoreColor(
                                             performer.avgScore
                                          )}`}
                                       >
                                          {formatPercentage(performer.avgScore)}
                                       </div>
                                    </TableCell>
                                    <TableCell>
                                       <Badge variant="outline">
                                          {performer.evaluationCount}
                                       </Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-500">
                                       {format(
                                          new Date(performer.lastEvaluation),
                                          "MMM dd, yyyy"
                                       )}
                                    </TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     )}
                  </CardContent>
               </Card>
            </TabsContent>
         </Tabs>
      </div>
   );
}
