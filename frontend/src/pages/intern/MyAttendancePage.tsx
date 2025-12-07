// src/pages/intern/MyTasksPage.tsx
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { taskService } from "@/services/taskService";
import { toast } from "sonner";
import { format } from "date-fns";
import {
   CheckCircle,
   Clock,
   AlertCircle,
   Calendar,
   Filter,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function MyTasksPage() {
   const [tasks, setTasks] = useState<any[]>([]);
   const [filteredTasks, setFilteredTasks] = useState<any[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [statusFilter, setStatusFilter] = useState("all");
   const [priorityFilter, setPriorityFilter] = useState("all");

   useEffect(() => {
      loadTasks();
   }, []);

   useEffect(() => {
      filterTasks();
   }, [tasks, statusFilter, priorityFilter]);

   const loadTasks = async () => {
      try {
         setIsLoading(true);
         const response = await taskService.getMyTasks();
         // Handle response structure - check for data property or use array directly
         const tasksData = Array.isArray(response)
            ? response
            : response.data || [];
         setTasks(tasksData);
         setFilteredTasks(tasksData);
      } catch (error: any) {
         console.error("Failed to load tasks:", error);
         toast.error(error.response?.data?.message || "Failed to load tasks");
         setTasks([]);
         setFilteredTasks([]);
      } finally {
         setIsLoading(false);
      }
   };

   const filterTasks = () => {
      let filtered = [...tasks];

      if (statusFilter !== "all") {
         filtered = filtered.filter((task) => task.status === statusFilter);
      }

      if (priorityFilter !== "all") {
         filtered = filtered.filter((task) => task.priority === priorityFilter);
      }

      setFilteredTasks(filtered);
   };

   const handleUpdateStatus = async (taskId: number, status: string) => {
      try {
         await taskService.updateMyTaskStatus(taskId, status as any);
         toast.success("Task status updated successfully!");

         // Update local state
         setTasks((prevTasks) =>
            prevTasks.map((task) =>
               task.id === taskId ? { ...task, status } : task
            )
         );
      } catch (error: any) {
         toast.error(
            error.response?.data?.message || "Failed to update task status"
         );
      }
   };

   const getStatusBadge = (status: string): React.ReactElement => {
      const badges: Record<string, React.ReactElement> = {
         pending: (
            <Badge variant="outline" className="border-red-200 text-red-700">
               Pending
            </Badge>
         ),
         in_progress: (
            <Badge className="bg-red-100 text-red-800 border-red-200">
               In Progress
            </Badge>
         ),
         completed: (
            <Badge className="bg-red-100 text-red-800 border-red-200">
               Completed
            </Badge>
         ),
         overdue: (
            <Badge className="bg-red-100 text-red-800 border-red-200">
               Overdue
            </Badge>
         ),
      };
      return badges[status] || <Badge variant="outline">{status}</Badge>;
   };

   const getPriorityBadge = (priority: string): React.ReactElement => {
      const badges: Record<string, React.ReactElement> = {
         low: (
            <Badge className="bg-gray-100 text-gray-800 border-gray-200">
               Low
            </Badge>
         ),
         medium: (
            <Badge className="bg-red-100 text-red-800 border-red-200">
               Medium
            </Badge>
         ),
         high: (
            <Badge className="bg-red-100 text-red-800 border-red-200">
               High
            </Badge>
         ),
         urgent: (
            <Badge className="bg-red-100 text-red-800 border-red-200">
               Urgent
            </Badge>
         ),
      };
      return badges[priority] || <Badge variant="outline">{priority}</Badge>;
   };

   const getTaskStatus = (task: any): string => {
      if (task.status === "completed") return "completed";
      if (task.status === "in_progress") return "in_progress";

      // Check if deadline exists before comparing
      if (task.deadline) {
         const dueDate = new Date(task.deadline);
         const today = new Date();
         today.setHours(0, 0, 0, 0);
         dueDate.setHours(0, 0, 0, 0);

         if (dueDate < today && task.status !== "completed") return "overdue";
      }

      return "pending";
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
                     {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-24 w-full" />
                     ))}
                  </div>
               </CardContent>
            </Card>
         </div>
      );
   }

   // Calculate statistics
   const totalTasks = tasks.length;
   const pendingTasks = tasks.filter(
      (t) => getTaskStatus(t) === "pending"
   ).length;
   const inProgressTasks = tasks.filter(
      (t) => t.status === "in_progress"
   ).length;
   const completedTasks = tasks.filter((t) => t.status === "completed").length;
   const overdueTasks = tasks.filter(
      (t) => getTaskStatus(t) === "overdue"
   ).length;

   return (
      <div className="space-y-6">
         <div>
            <h1 className="text-3xl font-bold">My Tasks</h1>
            <p className="text-muted-foreground">
               View and manage your assigned tasks
            </p>
         </div>

         {/* Stats */}
         <div className="grid gap-6 md:grid-cols-4">
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Total Tasks</p>
                        <p className="text-2xl font-bold">{totalTasks}</p>
                     </div>
                     <CheckCircle className="h-8 w-8 text-red-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Pending</p>
                        <p className="text-2xl font-bold">{pendingTasks}</p>
                     </div>
                     <Clock className="h-8 w-8 text-red-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">In Progress</p>
                        <p className="text-2xl font-bold">{inProgressTasks}</p>
                     </div>
                     <Clock className="h-8 w-8 text-red-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Completed</p>
                        <p className="text-2xl font-bold">{completedTasks}</p>
                     </div>
                     <CheckCircle className="h-8 w-8 text-red-500" />
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Filters */}
         <Card>
            <CardContent className="pt-6">
               <div className="flex flex-col md:flex-row gap-4">
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
                           <SelectItem value="pending">Pending</SelectItem>
                           <SelectItem value="in_progress">
                              In Progress
                           </SelectItem>
                           <SelectItem value="completed">Completed</SelectItem>
                           <SelectItem value="overdue">Overdue</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
                  <div className="flex-1">
                     <Select
                        value={priorityFilter}
                        onValueChange={setPriorityFilter}
                     >
                        <SelectTrigger className="w-full md:w-40">
                           <SelectValue placeholder="Filter by priority" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="all">All Priorities</SelectItem>
                           <SelectItem value="low">Low</SelectItem>
                           <SelectItem value="medium">Medium</SelectItem>
                           <SelectItem value="high">High</SelectItem>
                           <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Tasks List */}
         <div className="space-y-4">
            {filteredTasks.length === 0 ? (
               <Card>
                  <CardContent className="py-12 text-center">
                     <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                     <h3 className="text-lg font-semibold mb-2">
                        {statusFilter !== "all" || priorityFilter !== "all"
                           ? "No tasks match your filters"
                           : "No Tasks Assigned"}
                     </h3>
                     <p className="text-gray-500">
                        {statusFilter !== "all" || priorityFilter !== "all"
                           ? "Try changing your filter criteria"
                           : "You don't have any tasks assigned yet"}
                     </p>
                  </CardContent>
               </Card>
            ) : (
               filteredTasks.map((task) => {
                  const taskStatus = getTaskStatus(task);
                  return (
                     <Card key={task.id}>
                        <CardHeader>
                           <div className="flex items-start justify-between">
                              <div className="space-y-2 flex-1">
                                 <CardTitle className="flex items-center gap-2">
                                    {task.title}
                                    {taskStatus === "overdue" && (
                                       <AlertCircle className="h-4 w-4 text-red-500" />
                                    )}
                                 </CardTitle>
                                 <p className="text-sm text-gray-500 line-clamp-2">
                                    {task.description}
                                 </p>
                              </div>
                              <div className="flex items-center gap-2">
                                 {getPriorityBadge(task.priority)}
                                 {getStatusBadge(taskStatus)}
                              </div>
                           </div>
                        </CardHeader>
                        <CardContent>
                           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                 <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Deadline:{" "}
                                    {task.deadline
                                       ? format(
                                            new Date(task.deadline),
                                            "MMM dd, yyyy"
                                         )
                                       : "No deadline"}
                                    {taskStatus === "overdue" && (
                                       <span className="ml-2 text-red-500 font-medium">
                                          (Overdue)
                                       </span>
                                    )}
                                 </div>
                                 <div>
                                    Assigned by:{" "}
                                    {task.assigned_by_user?.name || "System"}
                                 </div>
                              </div>
                              <Select
                                 value={task.status}
                                 onValueChange={(value) =>
                                    handleUpdateStatus(task.id, value)
                                 }
                                 disabled={taskStatus === "overdue"}
                              >
                                 <SelectTrigger className="w-40">
                                    <SelectValue />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="pending">
                                       Pending
                                    </SelectItem>
                                    <SelectItem value="in_progress">
                                       In Progress
                                    </SelectItem>
                                    <SelectItem value="completed">
                                       Completed
                                    </SelectItem>
                                 </SelectContent>
                              </Select>
                           </div>
                        </CardContent>
                     </Card>
                  );
               })
            )}
         </div>
      </div>
   );
}
