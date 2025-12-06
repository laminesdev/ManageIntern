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
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
   CalendarIcon,
   CheckCircle,
   XCircle,
   Clock,
   Search,
   Filter,
   Plus,
   Edit,
   Trash2,
   UserCheck,
} from "lucide-react";
import { format, startOfDay, isSameDay } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { attendanceService, Attendance } from "@/services/attendanceService";
import { useAuthStore } from "@/stores/authStore";

const attendanceSchema = z.object({
   intern_id: z.coerce.number().min(1, "Please select an intern"),
   date: z.date(),
   status: z.enum(["present", "absent", "late", "excused"]),
   notes: z.string().optional(),
});

type AttendanceFormData = z.infer<typeof attendanceSchema>;

export default function AttendancePage() {
   const { user } = useAuthStore();
   const [attendance, setAttendance] = useState<Attendance[]>([]);
   const [filteredAttendance, setFilteredAttendance] = useState<Attendance[]>(
      []
   );
   const [isLoading, setIsLoading] = useState(true);
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
   const [statusFilter, setStatusFilter] = useState("all");
   const [internFilter, setInternFilter] = useState("all");
   const [interns, setInterns] = useState<
      Array<{ id: number; name: string; email: string }>
   >([]);

   const form = useForm<AttendanceFormData>({
      resolver: zodResolver(attendanceSchema),
      defaultValues: {
         date: new Date(),
         status: "present",
         notes: "",
      },
   });

   useEffect(() => {
      loadAttendance();
      loadInterns();
   }, [selectedDate]);

   useEffect(() => {
      filterAttendance();
   }, [attendance, statusFilter, internFilter]);

   const loadAttendance = async () => {
      try {
         setIsLoading(true);
         const response = await attendanceService.getAttendance({
            start_date: format(startOfDay(selectedDate), "yyyy-MM-dd"),
            end_date: format(startOfDay(selectedDate), "yyyy-MM-dd"),
         });
         setAttendance(response.data || []);
         setFilteredAttendance(response.data || []);
      } catch (error) {
         console.error("Failed to load attendance:", error);
         toast.error("Failed to load attendance records");
      } finally {
         setIsLoading(false);
      }
   };

   const loadInterns = async () => {
      try {
         const response = await attendanceService.getDepartmentInterns();
         setInterns(response.data || []);
      } catch (error) {
         console.error("Failed to load interns:", error);
      }
   };

   const filterAttendance = () => {
      let filtered = [...attendance];

      if (statusFilter !== "all") {
         filtered = filtered.filter((record) => record.status === statusFilter);
      }

      if (internFilter !== "all") {
         filtered = filtered.filter(
            (record) => record.intern_id.toString() === internFilter
         );
      }

      setFilteredAttendance(filtered);
   };

   const getStatusBadge = (status: Attendance["status"]) => {
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

   const getStatusIcon = (status: Attendance["status"]) => {
      switch (status) {
         case "present":
            return <CheckCircle className="h-4 w-4 text-green-500" />;
         case "absent":
            return <XCircle className="h-4 w-4 text-red-500" />;
         case "late":
            return <Clock className="h-4 w-4 text-yellow-500" />;
         case "excused":
            return <CheckCircle className="h-4 w-4 text-blue-500" />;
      }
   };

   const onSubmit = async (data: AttendanceFormData) => {
      try {
         // Check for duplicate attendance record for same day
         const existingRecord = attendance.find(
            (record) =>
               record.intern_id === data.intern_id &&
               isSameDay(new Date(record.date), data.date)
         );

         if (existingRecord) {
            toast.error("Attendance already marked for this intern today");
            return;
         }

         const attendanceData = {
            ...data,
            date: format(data.date, "yyyy-MM-dd"),
         };

         await attendanceService.markAttendance(attendanceData);

         toast.success("Attendance marked successfully!");
         setIsDialogOpen(false);
         form.reset({
            date: new Date(),
            status: "present",
            notes: "",
         });
         loadAttendance(); // Refresh list
      } catch (error: any) {
         console.error("Attendance marking error:", error);

         if (error.response?.status === 422) {
            const errors = error.response.data?.errors;
            if (errors) {
               Object.entries(errors).forEach(([field, messages]) => {
                  toast.error(`${field}: ${(messages as string[])[0]}`);
               });
            }
         } else if (error.response?.status === 409) {
            toast.error("Attendance already recorded for this intern today");
         } else {
            toast.error(
               error.response?.data?.message || "Failed to mark attendance"
            );
         }
      }
   };

   const handleDeleteAttendance = async (id: number) => {
      if (!confirm("Are you sure you want to delete this attendance record?"))
         return;

      try {
         await attendanceService.deleteAttendance(id);
         toast.success("Attendance record deleted");
         loadAttendance(); // Refresh list
      } catch (error) {
         toast.error("Failed to delete attendance record");
      }
   };

   const handleUpdateAttendance = async (
      id: number,
      status: Attendance["status"]
   ) => {
      try {
         await attendanceService.updateAttendance(id, { status });
         toast.success("Attendance updated");
         loadAttendance(); // Refresh list
      } catch (error) {
         toast.error("Failed to update attendance");
      }
   };

   const today = new Date();
   const todayAttendance = attendance.filter((record) =>
      isSameDay(new Date(record.date), today)
   );

   if (isLoading) {
      return (
         <div className="space-y-6">
            <div className="flex items-center justify-between">
               <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                     Attendance Tracking
                  </h1>
                  <p className="text-muted-foreground">
                     Track intern attendance
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
                  Attendance Tracking
               </h1>
               <p className="text-muted-foreground">
                  Mark and manage attendance for interns in your department
               </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
               <DialogTrigger asChild>
                  <Button>
                     <Plus className="mr-2 h-4 w-4" />
                     Mark Attendance
                  </Button>
               </DialogTrigger>
               <DialogContent className="max-w-md">
                  <DialogHeader>
                     <DialogTitle>Mark Attendance</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                     <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                     >
                        <FormField
                           control={form.control}
                           name="intern_id"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Intern *</FormLabel>
                                 <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value?.toString()}
                                    disabled={interns.length === 0}
                                 >
                                    <FormControl>
                                       <SelectTrigger>
                                          <SelectValue
                                             placeholder={
                                                interns.length === 0
                                                   ? "No interns available"
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
                                             {intern.name} - {intern.email}
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
                           name="date"
                           render={({ field }) => (
                              <FormItem className="flex flex-col">
                                 <FormLabel>Date *</FormLabel>
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
                           name="status"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Status *</FormLabel>
                                 <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                 >
                                    <FormControl>
                                       <SelectTrigger>
                                          <SelectValue placeholder="Select status" />
                                       </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                       <SelectItem value="present">
                                          <div className="flex items-center">
                                             <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                             Present
                                          </div>
                                       </SelectItem>
                                       <SelectItem value="absent">
                                          <div className="flex items-center">
                                             <XCircle className="h-4 w-4 text-red-500 mr-2" />
                                             Absent
                                          </div>
                                       </SelectItem>
                                       <SelectItem value="late">
                                          <div className="flex items-center">
                                             <Clock className="h-4 w-4 text-yellow-500 mr-2" />
                                             Late
                                          </div>
                                       </SelectItem>
                                       <SelectItem value="excused">
                                          <div className="flex items-center">
                                             <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                                             Excused
                                          </div>
                                       </SelectItem>
                                    </SelectContent>
                                 </Select>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <FormField
                           control={form.control}
                           name="notes"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Notes (Optional)</FormLabel>
                                 <FormControl>
                                    <Textarea
                                       placeholder="Add any notes or comments..."
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <DialogFooter>
                           <Button type="submit">Mark Attendance</Button>
                        </DialogFooter>
                     </form>
                  </Form>
               </DialogContent>
            </Dialog>
         </div>

         {/* Stats */}
         <div className="grid gap-6 md:grid-cols-4">
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">
                           Today's Attendance
                        </p>
                        <p className="text-2xl font-bold">
                           {todayAttendance.length}/{interns.length}
                        </p>
                     </div>
                     <UserCheck className="h-8 w-8 text-blue-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Present Today</p>
                        <p className="text-2xl font-bold text-green-600">
                           {
                              todayAttendance.filter(
                                 (a) => a.status === "present"
                              ).length
                           }
                        </p>
                     </div>
                     <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Absent Today</p>
                        <p className="text-2xl font-bold text-red-600">
                           {
                              todayAttendance.filter(
                                 (a) => a.status === "absent"
                              ).length
                           }
                        </p>
                     </div>
                     <XCircle className="h-8 w-8 text-red-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Attendance Rate</p>
                        <p className="text-2xl font-bold">
                           {interns.length > 0
                              ? `${Math.round(
                                   (todayAttendance.filter(
                                      (a) => a.status === "present"
                                   ).length /
                                      interns.length) *
                                      100
                                )}%`
                              : "0%"}
                        </p>
                     </div>
                     <Filter className="h-8 w-8 text-purple-500" />
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Date Selection & Filters */}
         <Card>
            <CardContent className="pt-6">
               <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                     <div className="flex items-center gap-4">
                        <Popover>
                           <PopoverTrigger asChild>
                              <Button
                                 variant="outline"
                                 className="w-full md:w-auto"
                              >
                                 <CalendarIcon className="mr-2 h-4 w-4" />
                                 {format(selectedDate, "PPP")}
                              </Button>
                           </PopoverTrigger>
                           <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                 mode="single"
                                 selected={selectedDate}
                                 onSelect={(date) =>
                                    date && setSelectedDate(date)
                                 }
                                 initialFocus
                              />
                           </PopoverContent>
                        </Popover>

                        <Select
                           value={statusFilter}
                           onValueChange={setStatusFilter}
                        >
                           <SelectTrigger className="w-32">
                              <SelectValue placeholder="Status" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="all">All Status</SelectItem>
                              <SelectItem value="present">Present</SelectItem>
                              <SelectItem value="absent">Absent</SelectItem>
                              <SelectItem value="late">Late</SelectItem>
                              <SelectItem value="excused">Excused</SelectItem>
                           </SelectContent>
                        </Select>

                        <Select
                           value={internFilter}
                           onValueChange={setInternFilter}
                        >
                           <SelectTrigger className="w-40">
                              <SelectValue placeholder="Filter by intern" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="all">All Interns</SelectItem>
                              {interns.map((intern) => (
                                 <SelectItem
                                    key={intern.id}
                                    value={intern.id.toString()}
                                 >
                                    {intern.name}
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     </div>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Attendance Table */}
         <Card>
            <CardHeader>
               <CardTitle>
                  Attendance Records for {format(selectedDate, "PPP")}
               </CardTitle>
               <CardDescription>
                  {filteredAttendance.length} records found
               </CardDescription>
            </CardHeader>
            <CardContent>
               {filteredAttendance.length === 0 ? (
                  <div className="text-center py-12">
                     <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                     <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No Attendance Records
                     </h3>
                     <p className="text-gray-500">
                        No attendance records found for{" "}
                        {format(selectedDate, "PPP")}
                     </p>
                     <Button
                        className="mt-4"
                        onClick={() => setIsDialogOpen(true)}
                        disabled={interns.length === 0}
                     >
                        <Plus className="mr-2 h-4 w-4" />
                        Mark First Attendance
                     </Button>
                  </div>
               ) : (
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Intern</TableHead>
                           <TableHead>Date</TableHead>
                           <TableHead>Status</TableHead>
                           <TableHead>Notes</TableHead>
                           <TableHead>Marked At</TableHead>
                           <TableHead>Actions</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {filteredAttendance.map((record) => (
                           <TableRow key={record.id}>
                              <TableCell className="font-medium">
                                 {record.intern?.name || "Unknown"}
                              </TableCell>
                              <TableCell>
                                 {format(new Date(record.date), "MMM dd, yyyy")}
                              </TableCell>
                              <TableCell>
                                 <div className="flex items-center gap-2">
                                    {getStatusIcon(record.status)}
                                    {getStatusBadge(record.status)}
                                 </div>
                              </TableCell>
                              <TableCell>
                                 <p className="text-sm text-gray-500 max-w-xs truncate">
                                    {record.notes || "No notes"}
                                 </p>
                              </TableCell>
                              <TableCell>
                                 {format(
                                    new Date(record.created_at),
                                    "hh:mm a"
                                 )}
                              </TableCell>
                              <TableCell>
                                 <div className="flex items-center gap-2">
                                    <Select
                                       value={record.status}
                                       onValueChange={(
                                          value: Attendance["status"]
                                       ) =>
                                          handleUpdateAttendance(
                                             record.id,
                                             value
                                          )
                                       }
                                    >
                                       <SelectTrigger className="w-28">
                                          <SelectValue />
                                       </SelectTrigger>
                                       <SelectContent>
                                          <SelectItem value="present">
                                             Present
                                          </SelectItem>
                                          <SelectItem value="absent">
                                             Absent
                                          </SelectItem>
                                          <SelectItem value="late">
                                             Late
                                          </SelectItem>
                                          <SelectItem value="excused">
                                             Excused
                                          </SelectItem>
                                       </SelectContent>
                                    </Select>
                                    <Button
                                       variant="ghost"
                                       size="icon"
                                       onClick={() =>
                                          handleDeleteAttendance(record.id)
                                       }
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
