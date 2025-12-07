import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
   Users,
   CheckSquare,
   Calendar,
   Star,
   Bell,
   BarChart3,
   AlertCircle,
   Plus,
   ArrowRight,
   Loader2,
   RefreshCw,
   TrendingUp,
   Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";
import { taskService } from "@/services/taskService";
import { attendanceService } from "@/services/attendanceService";
import { evaluationService } from "@/services/evaluationService";
import { reclamationService } from "@/services/reclamationService";
import { format } from "date-fns";

interface DashboardStats {
   total_interns: number;
   pending_tasks: number;
   todays_attendance: string;
   average_score: number;
   pending_reclamations: number;
   recent_activity: Array<{
      user_name: string;
      action: string;
      time: string;
      type: string;
   }>;
}

export default function ManagerDashboard() {
   const navigate = useNavigate();
   const { user } = useAuthStore();
   const [isLoading, setIsLoading] = useState(true);
   const [isRefreshing, setIsRefreshing] = useState(false);
   const [stats, setStats] = useState<DashboardStats>({
      total_interns: 0,
      pending_tasks: 0,
      todays_attendance: "0/0",
      average_score: 0,
      pending_reclamations: 0,
      recent_activity: [],
   });

   useEffect(() => {
      loadDashboardData();
   }, []);

   const loadDashboardData = async () => {
      try {
         setIsLoading(true);

         // Load all required data in parallel
         const [
            tasksResponse,
            internsResponse,
            attendanceResponse,
            evaluationsResponse,
            reclamationsResponse,
         ] = await Promise.all([
            taskService
               .getTasks({ status: "pending" })
               .catch(() => ({ data: [] })),
            taskService.getInternsForTasks().catch(() => ({ data: [] })),
            attendanceService
               .getAttendance({
                  start_date: format(new Date(), "yyyy-MM-dd"),
                  end_date: format(new Date(), "yyyy-MM-dd"),
               })
               .catch(() => ({ data: [] })),
            evaluationService.getEvaluations().catch(() => ({ data: [] })),
            reclamationService
               .getReclamations({ status: "pending" })
               .catch(() => ({ data: [] })),
         ]);

         // Calculate statistics
         const interns = internsResponse.data || [];
         const tasks = tasksResponse.data || [];
         const todayAttendance = attendanceResponse.data || [];
         const evaluations = evaluationsResponse.data || [];
         const reclamations = reclamationsResponse.data || [];

         // Calculate average score
         const avgScore =
            evaluations.length > 0
               ? evaluations.reduce((sum: number, e: any) => sum + e.score, 0) /
                 evaluations.length
               : 0;

         // Calculate today's attendance
         const presentCount = todayAttendance.filter(
            (a: any) => a.status === "present"
         ).length;
         const attendanceString = `${presentCount}/${interns.length}`;

         // Generate recent activity
         const recentActivity: Array<{
            user_name: string;
            action: string;
            time: string;
            type: string;
         }> = [];

         // Add task activities
         tasks.slice(0, 2).forEach((task: any) => {
            recentActivity.push({
               user_name: task.assigned_to_user?.name || "Unknown",
               action: `Assigned task: ${task.title}`,
               time: format(new Date(task.created_at), "h:mm a"),
               type: "task",
            });
         });

         // Add attendance activities
         todayAttendance.slice(0, 2).forEach((att: any) => {
            recentActivity.push({
               user_name: att.intern?.name || "Unknown",
               action: `Marked ${att.status}`,
               time: format(new Date(att.created_at), "h:mm a"),
               type: "attendance",
            });
         });

         // Add evaluation activities - FIXED: renamed 'eval' to 'evaluation'
         evaluations.slice(0, 2).forEach((evaluation: any) => {
            recentActivity.push({
               user_name: evaluation.intern?.name || "Unknown",
               action: `Evaluated with score ${evaluation.score}%`,
               time: format(new Date(evaluation.created_at), "h:mm a"),
               type: "evaluation",
            });
         });

         setStats({
            total_interns: interns.length,
            pending_tasks: tasks.length,
            todays_attendance: attendanceString,
            average_score: Math.round(avgScore),
            pending_reclamations: reclamations.length,
            recent_activity: recentActivity.slice(0, 5),
         });
      } catch (error: any) {
         console.error("Failed to load dashboard data:", error);
         toast.error("Failed to load dashboard data");
      } finally {
         setIsLoading(false);
      }
   };

   const handleRefresh = async () => {
      try {
         setIsRefreshing(true);
         await loadDashboardData();
         toast.success("Dashboard refreshed successfully");
      } catch (error) {
         toast.error("Failed to refresh dashboard");
      } finally {
         setIsRefreshing(false);
      }
   };

   const handleQuickAction = async (path: string) => {
      if (path === "/manager/attendance") {
         try {
            const internsResponse =
               await attendanceService.getDepartmentInterns();
            if (!internsResponse.data || internsResponse.data.length === 0) {
               toast.error("No interns available in your department");
               return;
            }
         } catch (error) {
            toast.error("Failed to check interns availability");
            return;
         }
      }
      navigate(path);
   };

   if (isLoading) {
      return (
         <div className="space-y-6">
            <div className="flex items-center justify-between">
               <div>
                  <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
               </div>
               <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
                  <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
               </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
               {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="animate-pulse">
                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="h-4 w-24 bg-gray-200 rounded" />
                        <div className="h-8 w-8 bg-gray-200 rounded-full" />
                     </CardHeader>
                     <CardContent>
                        <div className="h-8 w-16 bg-gray-200 rounded mb-2" />
                        <div className="h-4 w-32 bg-gray-200 rounded" />
                     </CardContent>
                  </Card>
               ))}
            </div>
            <div className="flex items-center justify-center py-12">
               <div className="text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                     Loading Dashboard
                  </h3>
                  <p className="text-gray-500">Fetching your team data...</p>
               </div>
            </div>
         </div>
      );
   }

   const statCards = [
      {
         title: "My Interns",
         value: stats.total_interns.toString(),
         icon: Users,
         color: "bg-red-500",
         description: "In your department",
         trend: `${stats.total_interns} total`,
         trendUp: true,
      },
      {
         title: "Pending Tasks",
         value: stats.pending_tasks.toString(),
         icon: CheckSquare,
         color: "bg-amber-500",
         description: "Require attention",
         trend: "Needs review",
         trendUp: false,
      },
      {
         title: "Today's Attendance",
         value: stats.todays_attendance,
         icon: Calendar,
         color: "bg-red-500",
         description: "Present today",
         trend: "Current status",
         trendUp: true,
      },
      {
         title: "Average Score",
         value: `${stats.average_score}%`,
         icon: Star,
         color: "bg-red-500",
         description: "Team average",
         trend: "Performance",
         trendUp: true,
      },
   ];

   const quickActions = [
      {
         title: "Assign New Task",
         description: "Create and assign a task to intern",
         icon: Plus,
         path: "/manager/tasks/new",
         color: "bg-red-100 text-red-600",
         enabled: true,
      },
      {
         title: "Mark Attendance",
         description: "Record today's attendance",
         icon: Calendar,
         path: "/manager/attendance",
         color: "bg-red-100 text-red-600",
         enabled: stats.total_interns > 0,
      },
      {
         title: "Send Notification",
         description: "Notify your team",
         icon: Bell,
         path: "/manager/notifications/send",
         color: "bg-amber-100 text-amber-600",
         enabled: true,
      },
      {
         title: "View Reports",
         description: "Generate performance reports",
         icon: BarChart3,
         path: "/manager/reports",
         color: "bg-red-100 text-red-600",
         enabled: true,
      },
   ];

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-3xl font-bold tracking-tight">
                  Welcome back, {user?.name}!
               </h1>
               <p className="text-muted-foreground">
                  Here's what's happening with your team today
               </p>
            </div>
            <div className="flex items-center space-x-3">
               <Button
                  variant="outline"
                  size="icon"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
               >
                  <RefreshCw
                     className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                  />
               </Button>
               <Button onClick={() => navigate("/manager/tasks/new")}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Task
               </Button>
            </div>
         </div>

         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat) => {
               const Icon = stat.icon;
               return (
                  <Card
                     key={stat.title}
                     className="hover:shadow-lg transition-shadow"
                  >
                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                           {stat.title}
                        </CardTitle>
                        <div
                           className={`p-2 rounded-full ${stat.color} text-white`}
                        >
                           <Icon className="h-4 w-4" />
                        </div>
                     </CardHeader>
                     <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                           {stat.description}
                        </div>
                        <div className="flex items-center mt-2">
                           <TrendingUp
                              className={`h-3 w-3 mr-1 ${
                                 stat.trendUp ? "text-red-500" : "text-red-500"
                              }`}
                           />
                           <span
                              className={`text-xs ${
                                 stat.trendUp ? "text-red-600" : "text-red-600"
                              }`}
                           >
                              {stat.trend}
                           </span>
                        </div>
                     </CardContent>
                  </Card>
               );
            })}
         </div>

         <div>
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
               {quickActions.map((action) => {
                  const Icon = action.icon;
                  const isDisabled = !action.enabled;

                  return (
                     <button
                        key={action.title}
                        onClick={() =>
                           !isDisabled && handleQuickAction(action.path)
                        }
                        className={`p-4 bg-white border rounded-lg transition-all text-left group ${
                           isDisabled
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:border-red-300 hover:shadow-sm"
                        }`}
                        disabled={isDisabled}
                     >
                        <div className="flex items-start justify-between mb-3">
                           <div className={`p-2 rounded-lg ${action.color}`}>
                              <Icon className="h-5 w-5" />
                           </div>
                           {!isDisabled && (
                              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                           )}
                        </div>
                        <h3 className="font-medium text-gray-900">
                           {action.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                           {action.description}
                        </p>
                        {isDisabled &&
                           action.path === "/manager/attendance" && (
                              <p className="text-xs text-red-500 mt-2">
                                 No interns available
                              </p>
                           )}
                     </button>
                  );
               })}
            </div>
         </div>

         <div className="grid gap-6 lg:grid-cols-2">
            <Card>
               <CardHeader>
                  <CardTitle className="flex items-center">
                     <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                     Pending Reclamations
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  {stats.pending_reclamations > 0 ? (
                     <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-200">
                           <div className="flex items-center space-x-3">
                              <div className="flex items-center justify-center w-10 h-10 bg-amber-100 rounded-full">
                                 <AlertCircle className="h-5 w-5 text-amber-600" />
                              </div>
                              <div>
                                 <p className="font-medium text-amber-900">
                                    {stats.pending_reclamations} Reclamation
                                    {stats.pending_reclamations > 1 ? "s" : ""}
                                 </p>
                                 <p className="text-sm text-amber-700">
                                    Waiting for your review
                                 </p>
                              </div>
                           </div>
                           <Button
                              size="sm"
                              onClick={() => navigate("/manager/reclamations")}
                           >
                              Review
                           </Button>
                        </div>
                     </div>
                  ) : (
                     <div className="text-center py-8">
                        <CheckSquare className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                           No pending reclamations
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                           All reclamations have been addressed
                        </p>
                     </div>
                  )}
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle className="flex items-center">
                     <Clock className="mr-2 h-5 w-5 text-red-500" />
                     Recent Activity
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  {stats.recent_activity && stats.recent_activity.length > 0 ? (
                     <div className="space-y-3">
                        {stats.recent_activity
                           .slice(0, 4)
                           .map((activity, index) => {
                              let ActivityIcon = CheckSquare;
                              let iconColor = "text-red-600";
                              let bgColor = "bg-red-100";

                              if (activity.type === "reclamation") {
                                 ActivityIcon = AlertCircle;
                                 iconColor = "text-amber-600";
                                 bgColor = "bg-amber-100";
                              } else if (activity.type === "attendance") {
                                 ActivityIcon = Calendar;
                                 iconColor = "text-red-600";
                                 bgColor = "bg-red-100";
                              } else if (activity.type === "evaluation") {
                                 ActivityIcon = Star;
                                 iconColor = "text-red-600";
                                 bgColor = "bg-red-100";
                              }

                              return (
                                 <div
                                    key={index}
                                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                                 >
                                    <div className="flex items-center space-x-3">
                                       <div
                                          className={`h-8 w-8 rounded-full ${bgColor} flex items-center justify-center`}
                                       >
                                          <ActivityIcon
                                             className={`h-4 w-4 ${iconColor}`}
                                          />
                                       </div>
                                       <div>
                                          <p className="font-medium text-sm">
                                             {activity.user_name}
                                          </p>
                                          <p className="text-xs text-gray-500">
                                             {activity.action}
                                          </p>
                                       </div>
                                    </div>
                                    <span className="text-xs text-gray-400">
                                       {activity.time}
                                    </span>
                                 </div>
                              );
                           })}
                     </div>
                  ) : (
                     <div className="text-center py-8">
                        <Clock className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                           No recent activity
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                           Activity will appear here as your team works
                        </p>
                     </div>
                  )}
               </CardContent>
            </Card>
         </div>

         <Card>
            <CardHeader>
               <CardTitle>Team Overview</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div
                     className="text-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
                     onClick={() => navigate("/manager/tasks")}
                  >
                     <div className="text-2xl font-bold text-red-600">
                        {stats.total_interns}
                     </div>
                     <div className="text-sm text-gray-600 mt-1">
                        Total Interns
                     </div>
                     <div className="text-xs text-red-500 mt-1">View All →</div>
                  </div>
                  <div
                     className="text-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
                     onClick={() => navigate("/manager/attendance")}
                  >
                     <div className="text-2xl font-bold text-red-600">
                        {stats.todays_attendance.split("/")[0]}/
                        {stats.todays_attendance.split("/")[1]}
                     </div>
                     <div className="text-sm text-gray-600 mt-1">
                        Present Today
                     </div>
                     <div className="text-xs text-red-500 mt-1">
                        Mark Attendance →
                     </div>
                  </div>
                  <div
                     className="text-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
                     onClick={() => navigate("/manager/evaluations")}
                  >
                     <div className="text-2xl font-bold text-red-600">
                        {stats.average_score}%
                     </div>
                     <div className="text-sm text-gray-600 mt-1">
                        Average Score
                     </div>
                     <div className="text-xs text-red-500 mt-1">
                        View Evaluations →
                     </div>
                  </div>
                  <div
                     className="text-center p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors cursor-pointer"
                     onClick={() => navigate("/manager/tasks")}
                  >
                     <div className="text-2xl font-bold text-amber-600">
                        {stats.pending_tasks}
                     </div>
                     <div className="text-sm text-gray-600 mt-1">
                        Pending Tasks
                     </div>
                     <div className="text-xs text-amber-500 mt-1">
                        Manage Tasks →
                     </div>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
