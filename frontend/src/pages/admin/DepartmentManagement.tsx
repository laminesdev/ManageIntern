// src/pages/admin/DepartmentManagement.tsx
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
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
   DialogTrigger,
   DialogFooter,
   DialogDescription,
} from "@/components/ui/dialog";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
   Loader2,
   Plus,
   Edit,
   Trash2,
   Search,
   RefreshCw,
} from "lucide-react";
import { departmentService } from "@/services/departmentService";
import { userService } from "@/services/userService";
import { Department } from "@/types/department.types";

// Schema definitions
const departmentSchema = z.object({
   name: z.string().min(1, "Department name is required"),
   description: z.string().optional(),
   manager_id: z.number().min(1, "Please select a manager"),
});

type DepartmentFormData = z.infer<typeof departmentSchema>;

interface Manager {
   id: number;
   name: string;
   email: string;
   department_id?: number;
}

export default function DepartmentManagement() {
   const [departments, setDepartments] = useState<Department[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   const [isLoadingData, setIsLoadingData] = useState(true);
   const [search, setSearch] = useState("");
   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
   const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
   const [managers, setManagers] = useState<Manager[]>([]);

   const addForm = useForm<DepartmentFormData>({
      resolver: zodResolver(departmentSchema),
      defaultValues: {
         name: "",
         description: "",
         manager_id: 0,
      },
   });

   const editForm = useForm<DepartmentFormData>({
      resolver: zodResolver(departmentSchema),
      defaultValues: {
         name: "",
         description: "",
         manager_id: 0,
      },
   });

   useEffect(() => {
      loadInitialData();
   }, []);

   const loadInitialData = async () => {
      setIsLoadingData(true);
      await Promise.all([loadDepartments(), loadManagers()]);
      setIsLoadingData(false);
   };

   const loadDepartments = async () => {
      try {
         const response = await departmentService.getDepartments();
         setDepartments(response);
      } catch (error) {
         console.error("Failed to load departments:", error);
         toast.error("Failed to load departments");
      }
   };

   const loadManagers = async () => {
      try {
         const response = await userService.getManagers();
         setManagers(response);
      } catch (error) {
         console.error("Failed to load managers:", error);
         toast.error("Failed to load managers");
      }
   };

   const handleAddDepartment = async (data: DepartmentFormData) => {
      try {
         setIsLoading(true);
         await departmentService.createDepartment(data);
         toast.success("Department created successfully!");
         setIsAddDialogOpen(false);
         addForm.reset({
            name: "",
            description: "",
            manager_id: 0,
         });
         await loadDepartments();
      } catch (error: any) {
         console.error("Create department error:", error);
         if (error.response?.status === 422) {
            const message = error.response.data?.message;
            if (message) {
               toast.error(message);
            } else {
               const errors = error.response.data?.errors;
               if (errors) {
                  Object.entries(errors).forEach(([field, messages]) => {
                     toast.error(`${field}: ${(messages as string[])[0]}`);
                  });
               }
            }
         } else {
            toast.error(
               error.response?.data?.message || "Failed to create department"
            );
         }
      } finally {
         setIsLoading(false);
      }
   };

   const handleEditDepartment = async (data: DepartmentFormData) => {
      if (!selectedDepartment) return;

      try {
         setIsLoading(true);
         await departmentService.updateDepartment(selectedDepartment.id, data);
         toast.success("Department updated successfully!");
         setIsEditDialogOpen(false);
         setSelectedDepartment(null);
         await loadDepartments();
      } catch (error: any) {
         console.error("Update department error:", error);
         if (error.response?.status === 422) {
            const message = error.response.data?.message;
            if (message) {
               toast.error(message);
            } else {
               const errors = error.response.data?.errors;
               if (errors) {
                  Object.entries(errors).forEach(([field, messages]) => {
                     toast.error(`${field}: ${(messages as string[])[0]}`);
                  });
               }
            }
         } else {
            toast.error(
               error.response?.data?.message || "Failed to update department"
            );
         }
      } finally {
         setIsLoading(false);
      }
   };

   const handleDeleteDepartment = async (id: number) => {
      if (!confirm("Are you sure you want to delete this department? This action cannot be undone.")) return;

      try {
         await departmentService.deleteDepartment(id);
         toast.success("Department deleted successfully!");
         await loadDepartments();
      } catch (error: any) {
         console.error("Delete department error:", error);
         toast.error(
            error.response?.data?.message || "Failed to delete department"
         );
      }
   };

   const openEditDialog = (department: Department) => {
      setSelectedDepartment(department);
      
      editForm.reset({
         name: department.name,
         description: department.description || "",
         manager_id: department.manager_id,
      });

      setIsEditDialogOpen(true);
   };

   const filteredDepartments = departments.filter(
      (department) =>
         department.name?.toLowerCase().includes(search.toLowerCase()) ||
         (department.description?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
         (department.manager?.name?.toLowerCase().includes(search.toLowerCase()) ?? false)
   );

   if (isLoadingData) {
      return (
         <div className="flex items-center justify-center h-96">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
         </div>
      );
   }

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-3xl font-bold tracking-tight">
                  Department Management
               </h1>
               <p className="text-muted-foreground">
                  Manage departments and assign managers
               </p>
            </div>
            <div className="flex gap-2">
               <Button variant="outline" size="sm" onClick={loadInitialData}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
               </Button>
               <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                     <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Department
                     </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                     <DialogHeader>
                        <DialogTitle>Add New Department</DialogTitle>
                        <DialogDescription>
                           Create a new department and assign a manager.
                        </DialogDescription>
                     </DialogHeader>
                     <Form {...addForm}>
                        <form
                           onSubmit={addForm.handleSubmit(handleAddDepartment)}
                           className="space-y-4"
                        >
                           <FormField
                              control={addForm.control}
                              name="name"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Department Name *</FormLabel>
                                    <FormControl>
                                       <Input
                                          placeholder="Engineering, Marketing, etc."
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <FormField
                              control={addForm.control}
                              name="description"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                       <Input
                                          placeholder="Brief description of the department"
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <FormField
                              control={addForm.control}
                              name="manager_id"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Manager *</FormLabel>
                                    <Select
                                       onValueChange={(value) => field.onChange(Number(value))}
                                       value={field.value?.toString()}
                                    >
                                       <FormControl>
                                          <SelectTrigger>
                                             <SelectValue placeholder="Select manager" />
                                          </SelectTrigger>
                                       </FormControl>
                                       <SelectContent>
                                          {managers.map((manager) => (
                                             <SelectItem
                                                key={manager.id}
                                                value={manager.id.toString()}
                                             >
                                                {manager.name} ({manager.email})
                                             </SelectItem>
                                          ))}
                                       </SelectContent>
                                    </Select>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <DialogFooter>
                              <Button type="submit" disabled={isLoading}>
                                 {isLoading ? (
                                    <>
                                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                       Creating...
                                    </>
                                 ) : (
                                    "Create Department"
                                 )}
                              </Button>
                           </DialogFooter>
                        </form>
                     </Form>
                  </DialogContent>
               </Dialog>
            </div>
         </div>

         {/* Search */}
         <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
               placeholder="Search departments by name, description, or manager..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="max-w-sm"
            />
         </div>

         {/* Departments Table */}
         <Card>
            <CardHeader>
               <CardTitle>Departments List ({departments.length} total)</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
               <div className="overflow-x-auto">
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Name</TableHead>
                           <TableHead>Description</TableHead>
                           <TableHead>Manager</TableHead>
                           <TableHead>Interns</TableHead>
                           <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {filteredDepartments.length === 0 ? (
                           <TableRow>
                              <TableCell
                                 colSpan={5}
                                 className="text-center py-8 text-muted-foreground"
                              >
                                 No departments found
                              </TableCell>
                           </TableRow>
                        ) : (
                           filteredDepartments.map((department) => (
                              <TableRow key={department.id}>
                                 <TableCell className="font-medium">
                                    {department.name}
                                 </TableCell>
                                 <TableCell>
                                    {department.description || (
                                       <span className="text-muted-foreground">-</span>
                                    )}
                                 </TableCell>
                                 <TableCell>
                                    {department.manager ? (
                                       <span className="text-sm">
                                          {department.manager.name}
                                       </span>
                                    ) : (
                                       <span className="text-sm text-muted-foreground">
                                          -
                                       </span>
                                    )}
                                 </TableCell>
                                 <TableCell>
                                    <span className="text-sm">
                                       {department.interns_count ?? department.interns?.length ?? 0} interns
                                    </span>
                                 </TableCell>
                                 <TableCell className="text-right">
                                    <div className="flex items-center justify-end space-x-2">
                                       <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => openEditDialog(department)}
                                       >
                                          <Edit className="h-4 w-4" />
                                       </Button>
                                       <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() =>
                                             handleDeleteDepartment(department.id)
                                          }
                                       >
                                          <Trash2 className="h-4 w-4 text-red-500" />
                                       </Button>
                                    </div>
                                 </TableCell>
                              </TableRow>
                           ))
                        )}
                     </TableBody>
                  </Table>
               </div>
            </CardContent>
         </Card>

         {/* Edit Department Dialog */}
         <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
               <DialogHeader>
                  <DialogTitle>Edit Department</DialogTitle>
                  <DialogDescription>
                     Update department information and manager.
                  </DialogDescription>
               </DialogHeader>
               <Form {...editForm}>
                  <form
                     onSubmit={editForm.handleSubmit(handleEditDepartment)}
                     className="space-y-4"
                  >
                     <FormField
                        control={editForm.control}
                        name="name"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Department Name *</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="Engineering, Marketing, etc."
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={editForm.control}
                        name="description"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="Brief description of the department"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={editForm.control}
                        name="manager_id"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Manager *</FormLabel>
                              <Select
                                 onValueChange={(value) => field.onChange(Number(value))}
                                 value={field.value?.toString()}
                              >
                                 <FormControl>
                                    <SelectTrigger>
                                       <SelectValue placeholder="Select manager" />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    {managers.map((manager) => (
                                       <SelectItem
                                          key={manager.id}
                                          value={manager.id.toString()}
                                       >
                                          {manager.name} ({manager.email})
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <DialogFooter>
                        <Button
                           type="button"
                           variant="outline"
                           onClick={() => setIsEditDialogOpen(false)}
                        >
                           Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                           {isLoading ? (
                              <>
                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                 Updating...
                              </>
                           ) : (
                              "Update Department"
                           )}
                        </Button>
                     </DialogFooter>
                  </form>
               </Form>
            </DialogContent>
         </Dialog>
      </div>
   );
}
