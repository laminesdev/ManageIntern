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
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
   Plus,
   Search,
   Filter,
   Calendar,
   CheckCircle,
   Clock,
   AlertCircle,
   Edit,
   Trash2,
} from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { taskService, Task } from "@/services/taskService";
import { useAuthStore } from "@/stores/authStore";

export default function TasksPage() {
   const navigate = useNavigate();
   const { user } = useAuthStore();
   const [tasks, setTasks] = useState<Task[]>([]);
   const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [searchTerm, setSearchTerm] = useState("");
   const [statusFilter, setStatusFilter] = useState("all");
   const [priorityFilter, setPriorityFilter] = useState("all");

   useEffect(() => {
      loadTasks();
   }, []);

   useEffect(() => {
      filterTasks();
   }, [tasks, searchTerm, statusFilter, priorityFilter]);

   const loadTasks = async () => {
      try {
         setIsLoading(true);
         const response = await taskService.getTasks();
         setTasks(response.data || []);
         setFilteredTasks(response.data || []);
      } catch (error) {
         console.error("Failed to load tasks:", error);
         toast.error("Failed to load tasks");
      } finally {
         setIsLoading(false);
      }
   };

   const filterTasks = () => {
      let filtered = [...tasks];

      if (searchTerm) {
         const term = searchTerm.toLowerCase();
         filtered = filtered.filter(
            (task) =>
               task.title.toLowerCase().includes(term) ||
               task.description.toLowerCase().includes(term) ||
               task.assigned_to_user?.name.toLowerCase().includes(term)
         );
      }

      if (statusFilter !== "all") {
         filtered = filtered.filter((task) => task.status === statusFilter);
      }

      if (priorityFilter !== "all") {
         filtered = filtered.filter((task) => task.priority === priorityFilter);
      }

      setFilteredTasks(filtered);
   };

   const getStatusBadge = (status: Task["status"]) => {
      switch (status) {
         case "pending":
            return <Badge variant="outline">Pending</Badge>;
         case "in_progress":
            return (
               <Badge className="bg-red-100 text-red-800">In Progress</Badge>
            );
         case "completed":
            return <Badge className="bg-red-100 text-red-800">Completed</Badge>;
         case "overdue":
            return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
         default:
            return <Badge variant="outline">{status}</Badge>;
      }
   };

   const getPriorityBadge = (priority: Task["priority"]) => {
      switch (priority) {
         case "low":
            return <Badge className="bg-gray-100 text-gray-800">Low</Badge>;
         case "medium":
            return <Badge className="bg-red-100 text-red-800">Medium</Badge>;
         case "high":
            return <Badge className="bg-red-100 text-red-800">High</Badge>;
         case "urgent":
            return <Badge className="bg-red-100 text-red-800">Urgent</Badge>;
         default:
            return <Badge variant="outline">{priority}</Badge>;
      }
   };

   const getStatusIcon = (status: Task["status"]) => {
      switch (status) {
         case "completed":
            return <CheckCircle className="h-4 w-4 text-red-500" />;
         case "overdue":
            return <AlertCircle className="h-4 w-4 text-red-500" />;
         default:
            return <Clock className="h-4 w-4 text-red-500" />;
      }
   };

   const handleDeleteTask = async (id: number) => {
      if (!confirm("Are you sure you want to delete this task?")) return;

      try {
         await taskService.deleteTask(id);
         toast.success("Task deleted successfully");
         loadTasks(); // Refresh list
      } catch (error) {
         toast.error("Failed to delete task");
      }
   };

   const handleUpdateStatus = async (id: number, status: Task["status"]) => {
      try {
         await taskService.updateTaskStatus(id, status);
         toast.success("Task status updated");
         loadTasks(); // Refresh list
      } catch (error) {
         toast.error("Failed to update task status");
      }
   };

   if (isLoading) {
      return (
         <div className="space-y-6">
            <div className="flex items-center justify-between">
               <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                     Tasks Management
                  </h1>
                  <p className="text-muted-foreground">
                     Manage tasks for your department interns
                  </p>
               </div>
               <Skeleton className="h-10 w-32" />
            </div>
            <Skeleton className="h-64 w-full" />
         </div>
      );
   }

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-3xl font-bold tracking-tight">
                  Tasks Management
               </h1>
               <p className="text-muted-foreground">
                  Assign and manage tasks for interns in your department
               </p>
            </div>
            <Button onClick={() => navigate("/manager/tasks/new")}>
               <Plus className="mr-2 h-4 w-4" />
               New Task
            </Button>
         </div>

         {/* Filters */}
         <Card>
            <CardContent className="pt-6">
               <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                     <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                           placeholder="Search tasks by title, description, or intern..."
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="pl-10"
                        />
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                     >
                        <SelectTrigger className="w-32">
                           <SelectValue placeholder="Status" />
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
                     <Select
                        value={priorityFilter}
                        onValueChange={setPriorityFilter}
                     >
                        <SelectTrigger className="w-32">
                           <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="all">All Priority</SelectItem>
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

         {/* Stats */}
         <div className="grid gap-6 md:grid-cols-4">
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Total Tasks</p>
                        <p className="text-2xl font-bold">{tasks.length}</p>
                     </div>
                     <Filter className="h-8 w-8 text-red-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Pending</p>
                        <p className="text-2xl font-bold">
                           {tasks.filter((t) => t.status === "pending").length}
                        </p>
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
                        <p className="text-2xl font-bold">
                           {
                              tasks.filter((t) => t.status === "completed")
                                 .length
                           }
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
                        <p className="text-sm text-gray-500">Overdue</p>
                        <p className="text-2xl font-bold">
                           {tasks.filter((t) => t.status === "overdue").length}
                        </p>
                     </div>
                     <AlertCircle className="h-8 w-8 text-red-500" />
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Tasks Table */}
         <Card>
            <CardHeader>
               <CardTitle>All Tasks</CardTitle>
               <CardDescription>
                  Tasks assigned to interns in your department
               </CardDescription>
            </CardHeader>
            <CardContent>
               {filteredTasks.length === 0 ? (
                  <div className="text-center py-12">
                     <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                     <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No Tasks Found
                     </h3>
                     <p className="text-gray-500">
                        {searchTerm ||
                        statusFilter !== "all" ||
                        priorityFilter !== "all"
                           ? "No tasks match your filter criteria"
                           : "No tasks have been assigned yet"}
                     </p>
                     <Button
                        className="mt-4"
                        onClick={() => navigate("/manager/tasks/new")}
                     >
                        <Plus className="mr-2 h-4 w-4" />
                        Create First Task
                     </Button>
                  </div>
               ) : (
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Task Title</TableHead>
                           <TableHead>Assigned To</TableHead>
                           <TableHead>Priority</TableHead>
                           <TableHead>Deadline</TableHead>
                           <TableHead>Status</TableHead>
                           <TableHead>Actions</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {filteredTasks.map((task) => (
                           <TableRow key={task.id}>
                              <TableCell>
                                 <div>
                                    <p className="font-medium">{task.title}</p>
                                    <p className="text-sm text-gray-500 truncate max-w-xs">
                                       {task.description}
                                    </p>
                                 </div>
                              </TableCell>
                              <TableCell className="font-medium">
                                 {task.assigned_to_user?.name || "Unknown"}
                              </TableCell>
                              <TableCell>
                                 {getPriorityBadge(task.priority)}
                              </TableCell>
                              <TableCell>
                                 <div className="flex items-center">
                                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                                    {format(
                                       new Date(task.deadline),
                                       "MMM dd, yyyy"
                                    )}
                                 </div>
                              </TableCell>
                              <TableCell>
                                 <div className="flex items-center gap-2">
                                    {getStatusIcon(task.status)}
                                    {getStatusBadge(task.status)}
                                 </div>
                              </TableCell>
                              <TableCell>
                                 <div className="flex items-center gap-2">
                                    <Select
                                       value={task.status}
                                       onValueChange={(value: Task["status"]) =>
                                          handleUpdateStatus(task.id, value)
                                       }
                                    >
                                       <SelectTrigger className="w-32">
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
                                    <Button
                                       variant="ghost"
                                       size="icon"
                                       onClick={() =>
                                          navigate(
                                             `/manager/tasks/edit/${task.id}`
                                          )
                                       }
                                    >
                                       <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                       variant="ghost"
                                       size="icon"
                                       onClick={() => handleDeleteTask(task.id)}
                                    >
                                       <Trash2 className="h-4 w-4 text-red-500" />
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
   );
}
