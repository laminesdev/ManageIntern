import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { CalendarIcon, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { taskService } from "@/services/taskService";
import { useAuthStore } from "@/stores/authStore";

const taskSchema = z.object({
   title: z.string().min(1, "Title is required").max(200, "Title is too long"),
   description: z
      .string()
      .min(1, "Description is required")
      .max(1000, "Description is too long"),
   assigned_to: z.coerce.number().min(1, "Please select an intern"),
   priority: z.enum(["low", "medium", "high", "urgent"]),
   deadline: z
      .date()
      .refine(
         (date) => date >= new Date(new Date().setHours(0, 0, 0, 0)),
         "Deadline cannot be in the past"
      ),
});

type TaskFormData = z.infer<typeof taskSchema>;

export default function NewTaskPage() {
   const navigate = useNavigate();
   const { user } = useAuthStore();
   const [isLoading, setIsLoading] = useState(false);
   const [isLoadingInterns, setIsLoadingInterns] = useState(false);
   const [interns, setInterns] = useState<
      Array<{ id: number; name: string; email: string; department_id?: number }>
   >([]);

   const form = useForm<TaskFormData>({
      resolver: zodResolver(taskSchema),
      defaultValues: {
         title: "",
         description: "",
         priority: "medium",
         deadline: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
   });

   useEffect(() => {
      loadInterns();
   }, []);

   const loadInterns = async () => {
      try {
         setIsLoadingInterns(true);
         const response = await taskService.getInternsForTasks();

         // Handle API response safely
         const internsData = response?.data || response || [];

         // Filter interns that belong to the manager's department
         const managerDepartmentId = user?.department_id;
         const filteredInterns = managerDepartmentId
            ? internsData.filter(
                 (intern: any) => intern.department_id === managerDepartmentId
              )
            : internsData;

         setInterns(filteredInterns);

         if (filteredInterns.length === 0) {
            toast.warning("No interns available in your department");
         }
      } catch (error: any) {
         console.error("Failed to load interns:", error);
         toast.error("Failed to load interns");
         setInterns([]);
      } finally {
         setIsLoadingInterns(false);
      }
   };

   const onSubmit = async (data: TaskFormData) => {
      try {
         setIsLoading(true);

         // Validate that selected intern belongs to manager's department
         const selectedIntern = interns.find(
            (intern) => intern.id === data.assigned_to
         );
         const managerDepartmentId = user?.department_id;

         if (
            managerDepartmentId &&
            selectedIntern?.department_id !== managerDepartmentId
         ) {
            toast.error("Selected intern is not in your department");
            return;
         }

         const taskData = {
            ...data,
            deadline: format(data.deadline, "yyyy-MM-dd"),
         };

         await taskService.createTask(taskData);

         toast.success("Task assigned successfully!");
         navigate("/manager/tasks");
      } catch (error: any) {
         console.error("Task creation error:", error);

         if (error.response?.status === 422) {
            const errors = error.response.data?.errors;
            if (errors) {
               Object.entries(errors).forEach(([field, messages]) => {
                  toast.error(`${field}: ${(messages as string[])[0]}`);
               });
            }
         } else if (error.response?.status === 403) {
            toast.error(
               "You can only assign tasks to interns in your department"
            );
         } else {
            toast.error(
               error.response?.data?.message || "Failed to assign task"
            );
         }
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
               <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigate("/manager/tasks")}
               >
                  <ArrowLeft className="h-4 w-4" />
               </Button>
               <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                     Assign New Task
                  </h1>
                  <p className="text-muted-foreground">
                     Assign tasks to interns in your department
                  </p>
               </div>
            </div>
         </div>

         <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
               <CardHeader>
                  <CardTitle>Task Details</CardTitle>
                  <CardDescription>
                     Fill in the task details. Deadline cannot be in the past.
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <Form {...form}>
                     <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                     >
                        <FormField
                           control={form.control}
                           name="title"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Task Title *</FormLabel>
                                 <FormControl>
                                    <Input
                                       placeholder="Enter task title"
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <FormField
                           control={form.control}
                           name="description"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Description *</FormLabel>
                                 <FormControl>
                                    <Textarea
                                       placeholder="Describe the task in detail..."
                                       className="min-h-[150px]"
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <FormField
                              control={form.control}
                              name="assigned_to"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Assign To *</FormLabel>
                                    <Select
                                       onValueChange={field.onChange}
                                       defaultValue={field.value?.toString()}
                                       disabled={
                                          isLoadingInterns ||
                                          interns.length === 0
                                       }
                                    >
                                       <FormControl>
                                          <SelectTrigger>
                                             <SelectValue
                                                placeholder={
                                                   isLoadingInterns
                                                      ? "Loading interns..."
                                                      : interns.length === 0
                                                      ? "No interns in your department"
                                                      : "Select an intern"
                                                }
                                             />
                                          </SelectTrigger>
                                       </FormControl>
                                       <SelectContent>
                                          {interns.map((intern) => (
                                             <SelectItem
                                                key={intern.id}
                                                value={intern.id.toString()}
                                             >
                                                <div className="flex flex-col">
                                                   <span>{intern.name}</span>
                                                   <span className="text-xs text-gray-500">
                                                      {intern.email}
                                                   </span>
                                                </div>
                                             </SelectItem>
                                          ))}
                                       </SelectContent>
                                    </Select>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <FormField
                              control={form.control}
                              name="priority"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Priority *</FormLabel>
                                    <Select
                                       onValueChange={field.onChange}
                                       defaultValue={field.value}
                                    >
                                       <FormControl>
                                          <SelectTrigger>
                                             <SelectValue placeholder="Select priority" />
                                          </SelectTrigger>
                                       </FormControl>
                                       <SelectContent>
                                          <SelectItem value="low">
                                             Low Priority
                                          </SelectItem>
                                          <SelectItem value="medium">
                                             Medium Priority
                                          </SelectItem>
                                          <SelectItem value="high">
                                             High Priority
                                          </SelectItem>
                                          <SelectItem value="urgent">
                                             Urgent Priority
                                          </SelectItem>
                                       </SelectContent>
                                    </Select>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>

                        <FormField
                           control={form.control}
                           name="deadline"
                           render={({ field }) => (
                              <FormItem className="flex flex-col">
                                 <FormLabel>Deadline *</FormLabel>
                                 <Popover>
                                    <PopoverTrigger asChild>
                                       <FormControl>
                                          <Button
                                             variant="outline"
                                             className={cn(
                                                "w-full pl-3 text-left font-normal",
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
                                          disabled={(date) =>
                                             date <
                                             new Date(
                                                new Date().setHours(0, 0, 0, 0)
                                             )
                                          }
                                          initialFocus
                                       />
                                    </PopoverContent>
                                 </Popover>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <div className="flex justify-end space-x-3 pt-4">
                           <Button
                              type="button"
                              variant="outline"
                              onClick={() => navigate("/manager/tasks")}
                              disabled={isLoading}
                           >
                              Cancel
                           </Button>
                           <Button
                              type="submit"
                              disabled={
                                 isLoading ||
                                 isLoadingInterns ||
                                 interns.length === 0
                              }
                           >
                              {isLoading ? (
                                 <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Assigning Task...
                                 </>
                              ) : (
                                 <>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Assign Task
                                 </>
                              )}
                           </Button>
                        </div>
                     </form>
                  </Form>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>Validation Rules</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="space-y-4">
                     <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-900 mb-2">
                           Department Restriction
                        </h4>
                        <p className="text-sm text-blue-800">
                           You can only assign tasks to interns in your
                           department.
                        </p>
                     </div>

                     <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-900 mb-2">
                           Deadline Validation
                        </h4>
                        <p className="text-sm text-green-800">
                           Deadline cannot be in the past.
                        </p>
                     </div>

                     <div className="flex justify-between text-sm p-2">
                        <span className="text-gray-600">Interns Available</span>
                        <span
                           className={`font-semibold ${
                              interns.length > 0
                                 ? "text-green-600"
                                 : "text-red-600"
                           }`}
                        >
                           {interns.length}
                        </span>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
