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
   Eye,
   EyeOff,
   RefreshCw,
   UserPlus,
} from "lucide-react";
import { userService } from "@/services/userService";
import { departmentService } from "@/services/departmentService";

// Schema definitions
const userSchema = z.object({
   name: z.string().min(1, "Name is required"),
   email: z.string().email("Invalid email address"),
   password: z.string().min(8, "Password must be at least 8 characters"),
   role: z.enum(["admin", "manager", "intern"]),
   department_id: z.string().optional(),
   manager_id: z.string().optional(),
});

const editUserSchema = z.object({
   name: z.string().min(1, "Name is required"),
   email: z.string().email("Invalid email address"),
   password: z.string().optional(),
   role: z.enum(["admin", "manager", "intern"]),
   department_id: z.string().optional(),
   manager_id: z.string().optional(),
});

const assignInternSchema = z.object({
   department_id: z.number().min(1, "Please select a department"),
});

type UserFormData = z.infer<typeof userSchema>;
type EditUserFormData = z.infer<typeof editUserSchema>;

interface User {
   id: number;
   name: string;
   email: string;
   role: "admin" | "manager" | "intern";
   department_id?: number;
   manager_id?: number;
   department?: {
      id: number;
      name: string;
   };
   manager?: {
      id: number;
      name: string;
      email: string;
   };
}

interface Department {
   id: number;
   name: string;
   description?: string;
   manager_id?: number;
}

interface Manager {
   id: number;
   name: string;
   email: string;
   department_id?: number;
   department?: {
      id: number;
      name: string;
   };
}

export default function UserManagement() {
   const [users, setUsers] = useState<User[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   const [isLoadingData, setIsLoadingData] = useState(true);
   const [search, setSearch] = useState("");
   const [showPassword, setShowPassword] = useState(false);
   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
   const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
   const [selectedUser, setSelectedUser] = useState<User | null>(null);
   const [departments, setDepartments] = useState<Department[]>([]);
   const [managers, setManagers] = useState<Manager[]>([]);

   const addForm = useForm<UserFormData>({
      resolver: zodResolver(userSchema),
      defaultValues: {
         name: "",
         email: "",
         password: "",
         role: "intern",
         department_id: "none",
         manager_id: "none",
      },
   });

   const editForm = useForm<EditUserFormData>({
      resolver: zodResolver(editUserSchema),
      defaultValues: {
         name: "",
         email: "",
         role: "intern",
         password: "",
         department_id: "none",
         manager_id: "none",
      },
   });

   const assignForm = useForm<z.infer<typeof assignInternSchema>>({
      resolver: zodResolver(assignInternSchema),
      defaultValues: {
         department_id: 0,
      },
   });

   // Watch form values for conditional rendering
   const watchAddRole = addForm.watch("role");
   const watchAddDepartment = addForm.watch("department_id");
   const watchEditRole = editForm.watch("role");
   const watchEditDepartment = editForm.watch("department_id");

   useEffect(() => {
      loadInitialData();
   }, []);

   const loadInitialData = async () => {
      setIsLoadingData(true);
      await Promise.all([loadUsers(), loadDepartments(), loadManagers()]);
      setIsLoadingData(false);
   };

   const loadUsers = async () => {
      try {
         const response = await userService.getUsers();
         const usersData = response.data || response;
         setUsers(Array.isArray(usersData) ? usersData : []);
      } catch (error) {
         console.error("Failed to load users:", error);
         toast.error("Failed to load users");
      }
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
         const managersData = response.data || response;
         setManagers(Array.isArray(managersData) ? managersData : []);
      } catch (error) {
         console.error("Failed to load managers:", error);
         toast.error("Failed to load managers");
      }
   };

   const handleAddUser = async (data: UserFormData) => {
      try {
         setIsLoading(true);

         const cleanData = {
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
            department_id:
               data.department_id === "none"
                  ? undefined
                  : Number(data.department_id),
            manager_id:
               data.manager_id === "none" ? undefined : Number(data.manager_id),
         };

         await userService.createUser(cleanData);
         toast.success("User created successfully!");
         setIsAddDialogOpen(false);
         addForm.reset({
            name: "",
            email: "",
            password: "",
            role: "intern",
            department_id: "none",
            manager_id: "none",
         });
         await loadUsers();
         await loadManagers();
         await loadDepartments();
      } catch (error: any) {
         console.error("Create user error:", error);
         const message = error.response?.data?.message;
         if (message) {
            toast.error(message);
         } else if (error.response?.status === 422) {
            const errors = error.response.data?.errors;
            if (errors) {
               Object.entries(errors).forEach(([field, messages]) => {
                  toast.error(`${field}: ${(messages as string[])[0]}`);
               });
            }
         } else {
            toast.error("Failed to create user");
         }
      } finally {
         setIsLoading(false);
      }
   };

   const handleEditUser = async (data: EditUserFormData) => {
      if (!selectedUser) return;

      try {
         setIsLoading(true);

         const cleanData: any = {
            name: data.name,
            email: data.email,
            role: data.role,
            department_id:
               data.department_id === "none"
                  ? undefined
                  : Number(data.department_id),
            manager_id:
               data.manager_id === "none" ? undefined : Number(data.manager_id),
         };

         if (data.password && data.password.trim() !== "") {
            cleanData.password = data.password;
         }

         await userService.updateUser(selectedUser.id, cleanData);
         toast.success("User updated successfully!");
         setIsEditDialogOpen(false);
         setSelectedUser(null);
         await loadUsers();
         await loadManagers();
         await loadDepartments();
      } catch (error: any) {
         console.error("Update user error:", error);
         const message = error.response?.data?.message;
         if (message) {
            toast.error(message);
         } else if (error.response?.status === 422) {
            const errors = error.response.data?.errors;
            if (errors) {
               Object.entries(errors).forEach(([field, messages]) => {
                  toast.error(`${field}: ${(messages as string[])[0]}`);
               });
            }
         } else {
            toast.error("Failed to update user");
         }
      } finally {
         setIsLoading(false);
      }
   };

   const handleDeleteUser = async (id: number) => {
      if (!confirm("Are you sure you want to delete this user?")) return;

      try {
         await userService.deleteUser(id);
         toast.success("User deleted successfully!");
         await loadUsers();
      } catch (error) {
         console.error("Delete user error:", error);
         toast.error("Failed to delete user");
      }
   };

   const openEditDialog = (user: User) => {
      setSelectedUser(user);

      editForm.reset({
         name: user.name,
         email: user.email,
         role: user.role,
         department_id: user.department_id
            ? user.department_id.toString()
            : "none",
         manager_id: user.manager_id ? user.manager_id.toString() : "none",
         password: "",
      });

      setIsEditDialogOpen(true);
   };

   const openAssignDialog = (user: User) => {
      setSelectedUser(user);
      assignForm.reset({
         department_id: 0,
      });
      setIsAssignDialogOpen(true);
   };

   const handleAssignIntern = async (data: z.infer<typeof assignInternSchema>) => {
      if (!selectedUser) return;

      try {
         setIsLoading(true);
         await userService.assignIntern(selectedUser.id, { department_id: data.department_id });
         toast.success("Intern assigned successfully!");
         setIsAssignDialogOpen(false);
         setSelectedUser(null);
         await loadUsers();
      } catch (error: any) {
         console.error("Assign intern error:", error);
         const message = error.response?.data?.message;
         if (message) {
            toast.error(message);
         } else {
            toast.error("Failed to assign intern");
         }
      } finally {
         setIsLoading(false);
      }
   };

   const filteredUsers = users.filter(
      (user) =>
         user.name?.toLowerCase().includes(search.toLowerCase()) ||
         user.email?.toLowerCase().includes(search.toLowerCase()) ||
         user.role?.toLowerCase().includes(search.toLowerCase())
   );

   // Check if manager field should be shown
   const shouldShowManagerFieldAdd = watchAddRole === "admin";
   const shouldShowManagerFieldEdit = watchEditRole === "admin";

   // Get departments that don't have a manager yet (for manager role)
   const availableDepartmentsForManager = departments.filter(dept => !dept.manager_id);

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
                  User Management
               </h1>
               <p className="text-muted-foreground">
                  Manage system users - Admin, Managers, and Interns
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
                        Add User
                     </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                     <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>
                           Create a new user account with their details and role.
                        </DialogDescription>
                     </DialogHeader>
                     <Form {...addForm}>
                        <form
                           onSubmit={addForm.handleSubmit(handleAddUser)}
                           className="space-y-4"
                        >
                           <FormField
                              control={addForm.control}
                              name="name"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Full Name *</FormLabel>
                                    <FormControl>
                                       <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <FormField
                              control={addForm.control}
                              name="email"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Email *</FormLabel>
                                    <FormControl>
                                       <Input
                                          type="email"
                                          placeholder="john@example.com"
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <FormField
                              control={addForm.control}
                              name="password"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Password *</FormLabel>
                                    <div className="relative">
                                       <FormControl>
                                          <Input
                                             type={showPassword ? "text" : "password"}
                                             placeholder="••••••••"
                                             {...field}
                                          />
                                       </FormControl>
                                       <Button
                                          type="button"
                                          variant="ghost"
                                          size="icon"
                                          className="absolute right-0 top-0 h-full"
                                          onClick={() => setShowPassword(!showPassword)}
                                       >
                                          {showPassword ? (
                                             <EyeOff className="h-4 w-4" />
                                          ) : (
                                             <Eye className="h-4 w-4" />
                                          )}
                                       </Button>
                                    </div>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <FormField
                              control={addForm.control}
                              name="role"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Role *</FormLabel>
                                    <Select
                                       onValueChange={(value) => {
                                          field.onChange(value);
                                          addForm.setValue("department_id", "none");
                                          addForm.setValue("manager_id", "none");
                                       }}
                                       defaultValue={field.value}
                                    >
                                       <FormControl>
                                          <SelectTrigger>
                                             <SelectValue placeholder="Select role" />
                                          </SelectTrigger>
                                       </FormControl>
                                       <SelectContent>
                                          <SelectItem value="admin">Administrator</SelectItem>
                                          <SelectItem value="manager">Manager</SelectItem>
                                          <SelectItem value="intern">Intern</SelectItem>
                                       </SelectContent>
                                    </Select>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           {/* Department field - shown for managers and interns */}
                           {(watchAddRole === "manager" || watchAddRole === "intern") && (
                              <FormField
                                 control={addForm.control}
                                 name="department_id"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel>
                                          Department {watchAddRole === "intern" ? "(will auto-assign manager)" : "(optional)"}
                                       </FormLabel>
                                       <Select
                                          onValueChange={field.onChange}
                                          value={field.value}
                                       >
                                          <FormControl>
                                             <SelectTrigger>
                                                <SelectValue placeholder="Select department" />
                                             </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                             <SelectItem value="none">None</SelectItem>
                                             {(watchAddRole === "manager" ? availableDepartmentsForManager : departments).map((dept) => (
                                                <SelectItem key={dept.id} value={dept.id.toString()}>
                                                   {dept.name}
                                                </SelectItem>
                                             ))}
                                          </SelectContent>
                                       </Select>
                                       <FormMessage />
                                       {watchAddRole === "intern" && watchAddDepartment !== "none" && (
                                          <p className="text-sm text-muted-foreground">
                                             Manager will be automatically assigned based on department
                                          </p>
                                       )}
                                    </FormItem>
                                 )}
                              />
                           )}

                           {/* Manager field - only shown for admin role */}
                           {shouldShowManagerFieldAdd && (
                              <FormField
                                 control={addForm.control}
                                 name="manager_id"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel>Manager</FormLabel>
                                       <Select
                                          onValueChange={field.onChange}
                                          value={field.value}
                                       >
                                          <FormControl>
                                             <SelectTrigger>
                                                <SelectValue placeholder="Select manager (optional)" />
                                             </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                             <SelectItem value="none">None</SelectItem>
                                             {managers.map((manager) => (
                                                <SelectItem key={manager.id} value={manager.id.toString()}>
                                                   {manager.name} ({manager.email})
                                                </SelectItem>
                                             ))}
                                          </SelectContent>
                                       </Select>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           )}

                           <DialogFooter>
                              <Button type="submit" disabled={isLoading}>
                                 {isLoading ? (
                                    <>
                                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                       Creating...
                                    </>
                                 ) : (
                                    "Create User"
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
               placeholder="Search users by name, email, or role..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="max-w-sm"
            />
         </div>

         {/* Users Table */}
         <Card>
            <CardHeader>
               <CardTitle>Users List ({users.length} total)</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
               <div className="overflow-x-auto">
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Name</TableHead>
                           <TableHead>Email</TableHead>
                           <TableHead>Role</TableHead>
                           <TableHead>Department</TableHead>
                           <TableHead>Manager</TableHead>
                           <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {filteredUsers.length === 0 ? (
                           <TableRow>
                              <TableCell
                                 colSpan={6}
                                 className="text-center py-8 text-muted-foreground"
                              >
                                 No users found
                              </TableCell>
                           </TableRow>
                        ) : (
                           filteredUsers.map((user) => (
                              <TableRow key={user.id}>
                                 <TableCell className="font-medium">{user.name}</TableCell>
                                 <TableCell>{user.email}</TableCell>
                                 <TableCell>
                                    <span
                                       className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                          user.role === "admin"
                                             ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                                             : user.role === "manager"
                                             ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                             : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                       }`}
                                    >
                                       {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                    </span>
                                 </TableCell>
                                 <TableCell>
                                    {user.department ? (
                                       <span className="text-sm">{user.department.name}</span>
                                    ) : (
                                       <span className="text-sm text-muted-foreground">-</span>
                                    )}
                                 </TableCell>
                                 <TableCell>
                                    {user.manager ? (
                                       <span className="text-sm">{user.manager.name}</span>
                                    ) : (
                                       <span className="text-sm text-muted-foreground">-</span>
                                    )}
                                 </TableCell>
                                 <TableCell className="text-right">
                                    <div className="flex items-center justify-end space-x-2">
                                       {user.role === "intern" && !user.department_id && (
                                          <Button
                                             variant="ghost"
                                             size="sm"
                                             onClick={() => openAssignDialog(user)}
                                          >
                                             <UserPlus className="h-4 w-4 text-blue-500" />
                                          </Button>
                                       )}
                                       <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => openEditDialog(user)}
                                       >
                                          <Edit className="h-4 w-4" />
                                       </Button>
                                       <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => handleDeleteUser(user.id)}
                                          disabled={user.role === "admin"}
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

         {/* Edit User Dialog */}
         <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
               <DialogHeader>
                  <DialogTitle>Edit User</DialogTitle>
                  <DialogDescription>
                     Update user information and role assignments.
                  </DialogDescription>
               </DialogHeader>
               <Form {...editForm}>
                  <form
                     onSubmit={editForm.handleSubmit(handleEditUser)}
                     className="space-y-4"
                  >
                     <FormField
                        control={editForm.control}
                        name="name"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                 <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={editForm.control}
                        name="email"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Email *</FormLabel>
                              <FormControl>
                                 <Input
                                    type="email"
                                    placeholder="john@example.com"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={editForm.control}
                        name="password"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>New Password (leave blank to keep current)</FormLabel>
                              <div className="relative">
                                 <FormControl>
                                    <Input
                                       type={showPassword ? "text" : "password"}
                                       placeholder="••••••••"
                                       {...field}
                                       value={field.value || ""}
                                    />
                                 </FormControl>
                                 <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full"
                                    onClick={() => setShowPassword(!showPassword)}
                                 >
                                    {showPassword ? (
                                       <EyeOff className="h-4 w-4" />
                                    ) : (
                                       <Eye className="h-4 w-4" />
                                    )}
                                 </Button>
                              </div>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={editForm.control}
                        name="role"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Role *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                 <FormControl>
                                    <SelectTrigger>
                                       <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    <SelectItem value="admin">Administrator</SelectItem>
                                    <SelectItem value="manager">Manager</SelectItem>
                                    <SelectItem value="intern">Intern</SelectItem>
                                 </SelectContent>
                              </Select>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     {/* Department field - shown for managers and interns */}
                     {(watchEditRole === "manager" || watchEditRole === "intern") && (
                        <FormField
                           control={editForm.control}
                           name="department_id"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Department</FormLabel>
                                 <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                       <SelectTrigger>
                                          <SelectValue placeholder="Select department" />
                                       </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                       <SelectItem value="none">None</SelectItem>
                                       {departments.map((dept) => (
                                          <SelectItem key={dept.id} value={dept.id.toString()}>
                                             {dept.name}
                                          </SelectItem>
                                       ))}
                                    </SelectContent>
                                 </Select>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     )}

                     {/* Manager field - only shown for admin role */}
                     {shouldShowManagerFieldEdit && (
                        <FormField
                           control={editForm.control}
                           name="manager_id"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Manager</FormLabel>
                                 <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                       <SelectTrigger>
                                          <SelectValue placeholder="Select manager (optional)" />
                                       </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                       <SelectItem value="none">None</SelectItem>
                                       {managers.map((manager) => (
                                          <SelectItem key={manager.id} value={manager.id.toString()}>
                                             {manager.name} ({manager.email})
                                          </SelectItem>
                                       ))}
                                    </SelectContent>
                                 </Select>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     )}

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
                              "Update User"
                           )}
                        </Button>
                     </DialogFooter>
                  </form>
               </Form>
            </DialogContent>
         </Dialog>

         {/* Assign Intern Dialog */}
         <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
               <DialogHeader>
                  <DialogTitle>Assign Intern to Department</DialogTitle>
                  <DialogDescription>
                     Select a department to assign {selectedUser?.name} to. The intern will be automatically assigned to the department's manager.
                  </DialogDescription>
               </DialogHeader>
               <Form {...assignForm}>
                  <form
                     onSubmit={assignForm.handleSubmit(handleAssignIntern)}
                     className="space-y-4"
                  >
                     <FormField
                        control={assignForm.control}
                        name="department_id"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Department *</FormLabel>
                              <Select
                                 onValueChange={(value) => field.onChange(Number(value))}
                                 value={field.value?.toString()}
                              >
                                 <FormControl>
                                    <SelectTrigger>
                                       <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    {departments.filter(d => d.manager_id).map((dept) => (
                                       <SelectItem key={dept.id} value={dept.id.toString()}>
                                          {dept.name}
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
                           onClick={() => setIsAssignDialogOpen(false)}
                        >
                           Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                           {isLoading ? (
                              <>
                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                 Assigning...
                              </>
                           ) : (
                              "Assign Intern"
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
