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
} from "lucide-react";
import { userService } from "@/services/userService";

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
         console.log("Loading users...");
         const response = await userService.getUsers();
         console.log("Users response:", response);

         // Handle different response structures
         const usersData = response.data || response;
         setUsers(Array.isArray(usersData) ? usersData : []);

         console.log("Loaded users:", usersData);
      } catch (error) {
         console.error("Failed to load users:", error);
         toast.error("Failed to load users");
      }
   };

   const loadDepartments = async () => {
      try {
         console.log("Loading departments...");

         // First try to get departments from the users list
         // This is a fallback if there's no departments endpoint
         const response = await userService.getUsers();
         const usersData = response.data || response;

         // Extract unique departments from users
         const deptMap = new Map<number, Department>();
         usersData.forEach((user: User) => {
            if (user.department && user.department.id) {
               deptMap.set(user.department.id, {
                  id: user.department.id,
                  name: user.department.name,
               });
            }
         });

         const extractedDepts = Array.from(deptMap.values());
         console.log("Extracted departments from users:", extractedDepts);

         if (extractedDepts.length > 0) {
            setDepartments(extractedDepts);
         } else {
            // Fallback to mock data only if no departments found
            console.log("No departments found, using fallback");
            setDepartments([
               { id: 1, name: "Engineering" },
               { id: 2, name: "Marketing" },
               { id: 3, name: "Sales" },
               { id: 4, name: "Human Resources" },
               { id: 5, name: "Finance" },
            ]);
         }
      } catch (error) {
         console.error("Failed to load departments:", error);
         // Use fallback departments
         setDepartments([
            { id: 1, name: "Engineering" },
            { id: 2, name: "Marketing" },
            { id: 3, name: "Sales" },
            { id: 4, name: "Human Resources" },
            { id: 5, name: "Finance" },
         ]);
      }
   };

   const loadManagers = async () => {
      try {
         console.log("Loading managers...");
         const response = await userService.getManagers();
         console.log("Managers response:", response);

         // Handle different response structures
         const managersData = response.data || response;
         setManagers(Array.isArray(managersData) ? managersData : []);

         console.log("Loaded managers:", managersData);
      } catch (error) {
         console.error("Failed to load managers:", error);
         toast.error("Failed to load managers");
      }
   };

   const handleAddUser = async (data: UserFormData) => {
      try {
         setIsLoading(true);

         // Convert form data to API format
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

         console.log("Submitting user data:", cleanData);

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
      } catch (error: any) {
         console.error("Create user error:", error);
         if (error.response?.status === 422) {
            const errors = error.response.data?.errors;
            if (errors) {
               Object.entries(errors).forEach(([field, messages]) => {
                  toast.error(`${field}: ${(messages as string[])[0]}`);
               });
            }
         } else {
            toast.error(
               error.response?.data?.message || "Failed to create user"
            );
         }
      } finally {
         setIsLoading(false);
      }
   };

   const handleEditUser = async (data: EditUserFormData) => {
      if (!selectedUser) return;

      try {
         setIsLoading(true);

         // Convert form data to API format
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

         // Only include password if it's not empty
         if (data.password && data.password.trim() !== "") {
            cleanData.password = data.password;
         }

         console.log("Updating user data:", cleanData);

         await userService.updateUser(selectedUser.id, cleanData);
         toast.success("User updated successfully!");
         setIsEditDialogOpen(false);
         setSelectedUser(null);
         await loadUsers();
      } catch (error: any) {
         console.error("Update user error:", error);
         if (error.response?.status === 422) {
            const errors = error.response.data?.errors;
            if (errors) {
               Object.entries(errors).forEach(([field, messages]) => {
                  toast.error(`${field}: ${(messages as string[])[0]}`);
               });
            }
         } else {
            toast.error(
               error.response?.data?.message || "Failed to update user"
            );
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
      console.log("Opening edit dialog for user:", user);
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

   const filteredUsers = users.filter(
      (user) =>
         user.name?.toLowerCase().includes(search.toLowerCase()) ||
         user.email?.toLowerCase().includes(search.toLowerCase()) ||
         user.role?.toLowerCase().includes(search.toLowerCase())
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
                           Create a new user account with their details and
                           role.
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
                                       <Input
                                          placeholder="John Doe"
                                          {...field}
                                       />
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
                                             type={
                                                showPassword
                                                   ? "text"
                                                   : "password"
                                             }
                                             placeholder="••••••••"
                                             {...field}
                                          />
                                       </FormControl>
                                       <Button
                                          type="button"
                                          variant="ghost"
                                          size="icon"
                                          className="absolute right-0 top-0 h-full"
                                          onClick={() =>
                                             setShowPassword(!showPassword)
                                          }
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
                                       onValueChange={field.onChange}
                                       defaultValue={field.value}
                                    >
                                       <FormControl>
                                          <SelectTrigger>
                                             <SelectValue placeholder="Select role" />
                                          </SelectTrigger>
                                       </FormControl>
                                       <SelectContent>
                                          <SelectItem value="admin">
                                             Administrator
                                          </SelectItem>
                                          <SelectItem value="manager">
                                             Manager
                                          </SelectItem>
                                          <SelectItem value="intern">
                                             Intern
                                          </SelectItem>
                                       </SelectContent>
                                    </Select>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <FormField
                              control={addForm.control}
                              name="department_id"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Department</FormLabel>
                                    <Select
                                       onValueChange={field.onChange}
                                       value={field.value}
                                    >
                                       <FormControl>
                                          <SelectTrigger>
                                             <SelectValue placeholder="Select department (optional)" />
                                          </SelectTrigger>
                                       </FormControl>
                                       <SelectContent>
                                          <SelectItem value="none">
                                             None
                                          </SelectItem>
                                          {departments.map((dept) => (
                                             <SelectItem
                                                key={dept.id}
                                                value={dept.id.toString()}
                                             >
                                                {dept.name}
                                             </SelectItem>
                                          ))}
                                       </SelectContent>
                                    </Select>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

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
                                          <SelectItem value="none">
                                             None
                                          </SelectItem>
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
                                 <TableCell className="font-medium">
                                    {user.name}
                                 </TableCell>
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
                                       {user.role.charAt(0).toUpperCase() +
                                          user.role.slice(1)}
                                    </span>
                                 </TableCell>
                                 <TableCell>
                                    {user.department ? (
                                       <span className="text-sm">
                                          {user.department.name}
                                       </span>
                                    ) : (
                                       <span className="text-sm text-muted-foreground">
                                          -
                                       </span>
                                    )}
                                 </TableCell>
                                 <TableCell>
                                    {user.manager ? (
                                       <span className="text-sm">
                                          {user.manager.name}
                                       </span>
                                    ) : (
                                       <span className="text-sm text-muted-foreground">
                                          -
                                       </span>
                                    )}
                                 </TableCell>
                                 <TableCell className="text-right">
                                    <div className="flex items-center justify-end space-x-2">
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
                                          onClick={() =>
                                             handleDeleteUser(user.id)
                                          }
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
                              <FormLabel>
                                 New Password (leave blank to keep current)
                              </FormLabel>
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
                                    onClick={() =>
                                       setShowPassword(!showPassword)
                                    }
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
                              <Select
                                 onValueChange={field.onChange}
                                 value={field.value}
                              >
                                 <FormControl>
                                    <SelectTrigger>
                                       <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    <SelectItem value="admin">
                                       Administrator
                                    </SelectItem>
                                    <SelectItem value="manager">
                                       Manager
                                    </SelectItem>
                                    <SelectItem value="intern">
                                       Intern
                                    </SelectItem>
                                 </SelectContent>
                              </Select>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={editForm.control}
                        name="department_id"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Department</FormLabel>
                              <Select
                                 onValueChange={field.onChange}
                                 value={field.value}
                              >
                                 <FormControl>
                                    <SelectTrigger>
                                       <SelectValue placeholder="Select department (optional)" />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    <SelectItem value="none">None</SelectItem>
                                    {departments.map((dept) => (
                                       <SelectItem
                                          key={dept.id}
                                          value={dept.id.toString()}
                                       >
                                          {dept.name}
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={editForm.control}
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
                              "Update User"
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
