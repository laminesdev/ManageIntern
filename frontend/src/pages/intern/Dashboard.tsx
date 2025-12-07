// src/pages/intern/Dashboard.tsx
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
   CheckSquare,
   Star,
   Bell,
   Calendar,
   TrendingUp,
   Clock,
   AlertCircle,
   Target,
   Award,
   Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { taskService } from "@/services/taskService";
import { evaluationService } from "@/services/evaluationService";
import { notificationService } from "@/services/notificationService";
import { attendanceService } from "@/services/attendanceService";
import { dashboardService } from "@/services/dashboardService";
import { toast } from "sonner";

interface DashboardStats {
   totalTasks: number;
   completedTasks: number;
   averageScore: number;
   unreadNotifications: number;
   attendanceRate: number;
   pendingTasks: number;
   recentTasks: any[];
   recentEvaluations: any[];
}

export default function InternDashboard() {
   const navigate = useNavigate();
   const { user } = useAuthStore();
   const [isLoading, setIsLoading] = useState(true);
   const [stats, setStats] = useState<DashboardStats>({
      totalTasks: 0,
      completedTasks: 0,
      averageScore: 0,
      unreadNotifications: 0,
      attendanceRate: 0,
      pendingTasks: 0,
      recentTasks: [],
      recentEvaluations: [],
   });
   const [upcomingDeadlines, setUpcomingDeadlines] = useState<any[]>([]);

   useEffect(() => {
      loadDashboardData();
   }, []);

   const loadDashboardData = async () => {
      try {
         setIsLoading(true);

         // Load all data in parallel
         const [
            tasksResponse,
            evaluationsResponse,
            notificationsResponse,
            attendanceResponse,
            dashboardResponse,
         ] = await Promise.all([
            taskService.getMyTasks(),
            evaluationService.getMyEvaluations(),
            notificationService.getMyNotifications(),
            attendanceService.getMyAttendance(),
            dashboardService.getInternDashboard(),
         ]);

         const tasks = tasksResponse.data || [];
         const evaluations = evaluationsResponse.data || [];
         const notifications = notificationsResponse.data || [];
         const attendance = attendanceResponse.data || [];
         const dashboardData = dashboardResponse.data || {};

         // Calculate statistics
         const completedTasks = tasks.filter(
            (task: any) => task.status === "completed"
         ).length;
         const pendingTasks = tasks.filter(
            (task: any) =>
               task.status === "pending" || task.status === "in_progress"
         ).length;

         const totalScore = evaluations.reduce(
            (sum: number, evalItem: any) => sum + (evalItem.score || 0),
            0
         );
         const averageScore =
            evaluations.length > 0
               ? Math.round(totalScore / evaluations.length)
               : 0;

         const unreadNotifications = notifications.filter(
            (notif: any) => !notif.is_read
         ).length;

         const presentCount = attendance.filter(
            (record: any) => record.status === "present"
         ).length;
         const attendanceRate =
            attendance.length > 0
               ? Math.round((presentCount / attendance.length) * 100)
               : 100;

         // Get upcoming deadlines (tasks due in next 3 days)
         const today = new Date();
         const threeDaysLater = new Date();
         threeDaysLater.setDate(today.getDate() + 3);

         const upcomingTasks = tasks
            .filter((task: any) => {
               const dueDate = new Date(task.deadline);
               return (
                  dueDate >= today &&
                  dueDate <= threeDaysLater &&
                  task.status !== "completed"
               );
            })
            .map((task: any) => ({
               id: task.id,
               title: task.title,
               deadline: task.deadline,
               priority: task.priority || "medium",
               dueText: getDueText(new Date(task.deadline)),
            }))
            .slice(0, 3);

         setStats({
            totalTasks: tasks.length,
            completedTasks,
            averageScore,
            unreadNotifications,
            attendanceRate,
            pendingTasks,
            recentTasks: tasks.slice(0, 3),
            recentEvaluations: evaluations.slice(0, 2),
         });

         setUpcomingDeadlines(upcomingTasks);
      } catch (error: any) {
         console.error("Failed to load dashboard data:", error);
         toast.error(
            error.response?.data?.message || "Failed to load dashboard data"
         );
      } finally {
         setIsLoading(false);
      }
   };

   const getDueText = (dueDate: Date): string => {
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      if (dueDate.toDateString() === today.toDateString()) {
         return "Today";
      } else if (dueDate.toDateString() === tomorrow.toDateString()) {
         return "Tomorrow";
      } else {
         const diffDays = Math.ceil(
            (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
         );
         return `In ${diffDays} days`;
      }
   };

   const getPriorityColor = (priority: string) => {
      switch (priority) {
         case "high":
         case "urgent":
            return "bg-red-100 text-red-800";
         case "medium":
            return "bg-yellow-100 text-yellow-800";
         default:
            return "bg-gray-100 text-gray-800";
      }
   };

   const statCards = [
      {
         title: "My Tasks",
         value: stats.totalTasks.toString(),
         icon: CheckSquare,
         color: "bg-red-500",
         change: `+${stats.pendingTasks} pending`,
         description: `${stats.completedTasks} completed`,
      },
      {
         title: "Average Score",
         value: `${stats.averageScore}%`,
         icon: Star,
         color: "bg-red-500",
         change: stats.averageScore >= 80 ? "+Good" : "+Needs Improvement",
         description: "Based on evaluations",
      },
      {
         title: "Notifications",
         value: stats.unreadNotifications.toString(),
         icon: Bell,
         color: "bg-amber-500",
         change: "Unread",
         description: "New messages",
      },
      {
         title: "Attendance Rate",
         value: `${stats.attendanceRate}%`,
         icon: Calendar,
         color: "bg-red-500",
         change: stats.attendanceRate === 100 ? "Perfect" : "Good",
         description: "This month",
      },
   ];

   if (isLoading) {
      return (
         <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-center">
               <Loader2 className="h-12 w-12 animate-spin text-red-500 mx-auto mb-4" />
               <p className="text-gray-500">Loading dashboard...</p>
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
                  Welcome, {user?.name}!
               </h1>
               <p className="text-muted-foreground">
                  Track your progress and upcoming tasks
               </p>
            </div>
            <div className="flex items-center space-x-3">
               <Button
                  variant="outline"
                  onClick={() => navigate("/intern/reclamations/new")}
               >
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Submit Reclamation
               </Button>
            </div>
         </div>

         {/* Stats Grid */}
         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat) => {
               const Icon = stat.icon;
               return (
                  <Card key={stat.title}>
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
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                           <TrendingUp className="mr-1 h-3 w-3 text-red-500" />
                           <span className="text-red-500 font-medium">
                              {stat.change}
                           </span>
                           <span className="ml-1">{stat.description}</span>
                        </div>
                     </CardContent>
                  </Card>
               );
            })}
         </div>

         {/* Tasks & Evaluations */}
         <div className="grid gap-6 lg:grid-cols-2">
            {/* Recent Tasks */}
            <Card>
               <CardHeader>
                  <CardTitle className="flex items-center">
                     <CheckSquare className="mr-2 h-5 w-5 text-red-500" />
                     Recent Tasks
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="space-y-3">
                     {stats.recentTasks.map((task: any) => (
                        <div
                           key={task.id}
                           className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100 hover:bg-red-100 transition-colors cursor-pointer"
                           onClick={() => navigate(`/intern/tasks`)}
                        >
                           <div className="flex-1">
                              <p className="font-medium truncate">
                                 {task.title}
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                 <span
                                    className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                                       task.priority
                                    )}`}
                                 >
                                    {task.priority || "medium"}
                                 </span>
                                 <span className="text-xs text-gray-500">
                                    Due:{" "}
                                    {new Date(
                                       task.deadline
                                    ).toLocaleDateString()}
                                 </span>
                              </div>
                           </div>
                           <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                 task.status === "completed"
                                    ? "bg-red-100 text-red-800"
                                    : task.status === "in_progress"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                           >
                              {task.status?.replace("_", " ") || "pending"}
                           </span>
                        </div>
                     ))}
                     {stats.recentTasks.length === 0 && (
                        <p className="text-center text-muted-foreground py-4">
                           No tasks assigned yet
                        </p>
                     )}
                  </div>
                  {stats.recentTasks.length > 0 && (
                     <Button
                        variant="ghost"
                        className="w-full mt-4"
                        onClick={() => navigate("/intern/tasks")}
                     >
                        View All Tasks
                     </Button>
                  )}
               </CardContent>
            </Card>

            {/* Recent Evaluations */}
            <Card>
               <CardHeader>
                  <CardTitle className="flex items-center">
                     <Award className="mr-2 h-5 w-5 text-red-500" />
                     Recent Evaluations
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="space-y-3">
                     {stats.recentEvaluations.map((evaluation: any) => (
                        <div
                           key={evaluation.id}
                           className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100 hover:bg-red-100 transition-colors cursor-pointer"
                           onClick={() => navigate(`/intern/evaluations`)}
                        >
                           <div className="flex-1">
                              <p className="font-medium capitalize">
                                 {evaluation.evaluation_type?.replace(
                                    "_",
                                    " "
                                 ) || "Evaluation"}
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                 <div className="flex items-center">
                                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                    <span className="font-bold">
                                       {evaluation.score || 0}%
                                    </span>
                                 </div>
                                 <span className="text-xs text-gray-500">
                                    {new Date(
                                       evaluation.evaluated_at ||
                                          evaluation.created_at
                                    ).toLocaleDateString()}
                                 </span>
                              </div>
                           </div>
                           <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                 (evaluation.score || 0) >= 90
                                    ? "bg-red-100 text-red-800"
                                    : (evaluation.score || 0) >= 80
                                    ? "bg-red-100 text-red-800"
                                    : (evaluation.score || 0) >= 70
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                           >
                              {(evaluation.score || 0) >= 90
                                 ? "Excellent"
                                 : (evaluation.score || 0) >= 80
                                 ? "Good"
                                 : (evaluation.score || 0) >= 70
                                 ? "Average"
                                 : "Needs Improvement"}
                           </span>
                        </div>
                     ))}
                     {stats.recentEvaluations.length === 0 && (
                        <p className="text-center text-muted-foreground py-4">
                           No evaluations yet
                        </p>
                     )}
                  </div>
                  {stats.recentEvaluations.length > 0 && (
                     <Button
                        variant="ghost"
                        className="w-full mt-4"
                        onClick={() => navigate("/intern/evaluations")}
                     >
                        View All Evaluations
                     </Button>
                  )}
               </CardContent>
            </Card>
         </div>

         {/* Performance Progress */}
         <Card>
            <CardHeader>
               <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5 text-red-500" />
                  Performance Progress
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                     <div className="text-center">
                        <div className="text-2xl font-bold">
                           {stats.totalTasks > 0
                              ? Math.round(
                                   (stats.completedTasks / stats.totalTasks) *
                                      100
                                )
                              : 0}
                           %
                        </div>
                        <p className="text-sm text-gray-500">Task Completion</p>
                     </div>
                     <div className="text-center">
                        <div className="text-2xl font-bold">
                           {stats.attendanceRate}%
                        </div>
                        <p className="text-sm text-gray-500">Attendance</p>
                     </div>
                     <div className="text-center">
                        <div className="text-2xl font-bold">
                           {stats.averageScore}%
                        </div>
                        <p className="text-sm text-gray-500">Avg. Score</p>
                     </div>
                  </div>

                  <div className="pt-4">
                     <div className="flex justify-between text-sm mb-1">
                        <span>Weekly Goals</span>
                        <span>
                           {stats.completedTasks}/{stats.totalTasks} completed
                        </span>
                     </div>
                     <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                           className="h-full bg-red-500 rounded-full transition-all duration-300"
                           style={{
                              width: `${
                                 stats.totalTasks > 0
                                    ? (stats.completedTasks /
                                         stats.totalTasks) *
                                      100
                                    : 0
                              }%`,
                           }}
                        ></div>
                     </div>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Upcoming Deadlines */}
         {upcomingDeadlines.length > 0 && (
            <Card>
               <CardHeader>
                  <CardTitle className="flex items-center">
                     <Clock className="mr-2 h-5 w-5 text-amber-500" />
                     Upcoming Deadlines
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="space-y-3">
                     {upcomingDeadlines.map((task, index) => (
                        <div
                           key={index}
                           className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                           onClick={() => navigate("/intern/tasks")}
                        >
                           <div className="flex items-center space-x-3">
                              <div
                                 className={`h-2 w-2 rounded-full ${
                                    task.priority === "high" ||
                                    task.priority === "urgent"
                                       ? "bg-red-500"
                                       : "bg-yellow-500"
                                 }`}
                              ></div>
                              <div className="flex-1">
                                 <p className="font-medium truncate">
                                    {task.title}
                                 </p>
                                 <p className="text-sm text-gray-500">
                                    Due: {task.dueText}
                                 </p>
                              </div>
                           </div>
                           <span
                              className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                                 task.priority
                              )}`}
                           >
                              {task.priority}
                           </span>
                        </div>
                     ))}
                  </div>
                  <Button
                     variant="ghost"
                     className="w-full mt-4"
                     onClick={() => navigate("/intern/tasks")}
                  >
                     View All Tasks
                  </Button>
               </CardContent>
            </Card>
         )}
      </div>
   );
}
