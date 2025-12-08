// src/pages/intern/MyTasksPage.tsx
import { useState, useEffect } from "react";
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
   ListTodo,
   Loader2,
   RefreshCw,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Task {
   id: number;
   title: string;
   description: string;
   status: "pending" | "in_progress" | "completed" | "cancelled";
   priority: "low" | "medium" | "high";
   deadline: string;
   assigned_by: number;
   assigned_to: number;
   completed_at?: string;
   created_at: string;
   updated_at: string;
   assignedBy?: {
      id: number;
      name: string;
      email: string;
   };
}

export default function MyTasksPage() {
   const [tasks, setTasks] = useState<Task[]>([]);
   const [statistics, setStatistics] = useState<any>(null);
   const [isLoading, setIsLoading] = useState(true);
   const [statusFilter, setStatusFilter] = useState("all");
   const [updatingTaskId, setUpdatingTaskId] = useState<number | null>(null);

   useEffect(() => {
      loadTasks();
   }, [statusFilter]);

   const loadTasks = async () => {
      try {
         setIsLoading(true);
         const params: any = {};
         if (statusFilter !== "all") {
            params.status = statusFilter;
         }

         const response = await taskService.getMyTasks(params);
         
         // Handle different response structures
         const tasksData = response.tasks?.data || response.tasks || response.data || response || [];
         const statsData = response.statistics || null;

         setTasks(Array.isArray(tasksData) ? tasksData : []);
         setStatistics(statsData);
      } catch (error: any) {
         console.error("Failed to load tasks:", error);
         toast.error(error.response?.data?.message || "Failed to load tasks");
         setTasks([]);
      } finally {
         setIsLoading(false);
      }
   };

   const handleUpdateStatus = async (taskId: number, newStatus: "pending" | "in_progress" | "completed" | "overdue") => {
      try {
         setUpdatingTaskId(taskId);
         await taskService.updateTaskStatus(taskId, newStatus);
         toast.success("Task status updated successfully!");
         await loadTasks();
      } catch (error: any) {
         console.error("Failed to update task status:", error);
         toast.error(error.response?.data?.message || "Failed to update task status");
      } finally {
         setUpdatingTaskId(null);
      }
   };

   const getStatusBadge = (status: string) => {
      switch (status) {
         case "pending":
            return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
         case "in_progress":
            return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>;
         case "completed":
            return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
         case "cancelled":
            return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">Cancelled</Badge>;
         default:
            return <Badge variant="outline">{status}</Badge>;
      }
   };

   const getPriorityBadge = (priority: string) => {
      switch (priority) {
         case "high":
            return <Badge className="bg-red-500 text-white">High</Badge>;
         case "medium":
            return <Badge className="bg-orange-500 text-white">Medium</Badge>;
         case "low":
            return <Badge className="bg-green-500 text-white">Low</Badge>;
         default:
            return <Badge variant="outline">{priority}</Badge>;
      }
   };

   const isOverdue = (deadline: string, status: string) => {
      if (status === "completed" || status === "cancelled") return false;
      return new Date(deadline) < new Date();
   };

   const formatDate = (dateString: string) => {
      try {
         return format(new Date(dateString), "MMM dd, yyyy");
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
                     {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-24 w-full" />
                     ))}
                  </div>
               </CardContent>
            </Card>
         </div>
      );
   }

   const stats = statistics || {
      total: tasks.length,
      pending: tasks.filter((t) => t.status === "pending").length,
      in_progress: tasks.filter((t) => t.status === "in_progress").length,
      completed: tasks.filter((t) => t.status === "completed").length,
      overdue: tasks.filter((t) => isOverdue(t.deadline, t.status)).length,
   };

   return (
      <div className="space-y-6">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
               <h1 className="text-3xl font-bold">My Tasks</h1>
               <p className="text-muted-foreground">View and manage your assigned tasks</p>
            </div>
            <div className="flex items-center gap-2">
               <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                     <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="all">All Tasks</SelectItem>
                     <SelectItem value="pending">Pending</SelectItem>
                     <SelectItem value="in_progress">In Progress</SelectItem>
                     <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
               </Select>
               <Button variant="outline" size="icon" onClick={loadTasks}>
                  <RefreshCw className="h-4 w-4" />
               </Button>
            </div>
         </div>

         {/* Stats */}
         <div className="grid gap-6 md:grid-cols-4">
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Total Tasks</p>
                        <p className="text-2xl font-bold">{stats.total}</p>
                     </div>
                     <ListTodo className="h-8 w-8 text-blue-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Pending</p>
                        <p className="text-2xl font-bold">{stats.pending}</p>
                     </div>
                     <Clock className="h-8 w-8 text-yellow-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">In Progress</p>
                        <p className="text-2xl font-bold">{stats.in_progress}</p>
                     </div>
                     <Loader2 className="h-8 w-8 text-blue-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Completed</p>
                        <p className="text-2xl font-bold">{stats.completed}</p>
                     </div>
                     <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Tasks List */}
         <Card>
            <CardHeader>
               <CardTitle className="flex items-center">
                  <ListTodo className="mr-2 h-5 w-5 text-blue-500" />
                  Tasks List
               </CardTitle>
            </CardHeader>
            <CardContent>
               {tasks.length === 0 ? (
                  <div className="text-center py-12">
                     <ListTodo className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                     <h3 className="text-lg font-semibold text-gray-900 mb-2">No Tasks Found</h3>
                     <p className="text-gray-500">
                        {statusFilter !== "all"
                           ? `No ${statusFilter.replace("_", " ")} tasks found.`
                           : "You don't have any tasks assigned yet."}
                     </p>
                  </div>
               ) : (
                  <div className="space-y-4">
                     {tasks.map((task) => (
                        <div
                           key={task.id}
                           className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors ${
                              isOverdue(task.deadline, task.status) ? "border-red-300 bg-red-50" : ""
                           }`}
                        >
                           <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                              <div className="flex-1">
                                 <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold text-lg">{task.title}</h3>
                                    {getPriorityBadge(task.priority)}
                                    {getStatusBadge(task.status)}
                                    {isOverdue(task.deadline, task.status) && (
                                       <Badge className="bg-red-500 text-white">
                                          <AlertCircle className="h-3 w-3 mr-1" />
                                          Overdue
                                       </Badge>
                                    )}
                                 </div>
                                 <p className="text-gray-600 mb-2">{task.description}</p>
                                 <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                    <span>
                                       <strong>Deadline:</strong> {formatDate(task.deadline)}
                                    </span>
                                    {task.assignedBy && (
                                       <span>
                                          <strong>Assigned by:</strong> {task.assignedBy.name}
                                       </span>
                                    )}
                                    {task.completed_at && (
                                       <span>
                                          <strong>Completed:</strong> {formatDate(task.completed_at)}
                                       </span>
                                    )}
                                 </div>
                              </div>
                              <div className="flex items-center gap-2">
                                 {task.status !== "completed" && task.status !== "cancelled" && (
                                    <>
                                       {task.status === "pending" && (
                                          <Button
                                             size="sm"
                                             variant="outline"
                                             onClick={() => handleUpdateStatus(task.id, "in_progress")}
                                             disabled={updatingTaskId === task.id}
                                          >
                                             {updatingTaskId === task.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                             ) : (
                                                "Start Task"
                                             )}
                                          </Button>
                                       )}
                                       {task.status === "in_progress" && (
                                          <Button
                                             size="sm"
                                             onClick={() => handleUpdateStatus(task.id, "completed")}
                                             disabled={updatingTaskId === task.id}
                                          >
                                             {updatingTaskId === task.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                             ) : (
                                                "Mark Complete"
                                             )}
                                          </Button>
                                       )}
                                    </>
                                 )}
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               )}
            </CardContent>
         </Card>
      </div>
   );
}
