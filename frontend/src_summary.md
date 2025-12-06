# Project: src

## File: App.css
```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}
```

## File: App.tsx
```tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./stores/authStore";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoginPage from "./pages/auth/LoginPage";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import AdminReports from "./pages/admin/Reports";
import AssignInterns from "./pages/admin/AssignInterns";
import ViewAttendanceReports from "./pages/admin/reports/ViewAttendanceReports";
import ViewPerformanceReports from "./pages/admin/reports/ViewPerformanceReports";

// Manager Pages
import ManagerDashboard from "./pages/manager/Dashboard";
import TasksPage from "./pages/manager/TasksPage";
import AttendancePage from "./pages/manager/AttendancePage";
import EvaluationsPage from "./pages/manager/EvaluationsPage";
import NotificationsPage from "./pages/manager/NotificationsPage";
import ReclamationsPage from "./pages/manager/ReclamationsPage";
import ManagerReports from "./pages/manager/Reports";
import SendNotificationPage from "./pages/manager/SendNotificationPage";
import NewTaskPage from "./pages/manager/NewTaskPage";

// Intern Pages
import InternDashboard from "./pages/intern/Dashboard";
import MyTasksPage from "./pages/intern/MyTasksPage";
import MyEvaluationsPage from "./pages/intern/MyEvaluationsPage";
import MyNotificationsPage from "./pages/intern/MyNotificationsPage";
import MyReclamationsPage from "./pages/intern/MyReclamationsPage";
import NewReclamationPage from "./pages/intern/NewReclamationPage";

// Common
import NotFound from "./pages/common/NotFound";
import Unauthorized from "./pages/common/Unauthorized";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import ManagerLayout from "./layouts/ManagerLayout";
import InternLayout from "./layouts/InternLayout";

export default function App() {
   const { initializeAuth } = useAuthStore();

   useEffect(() => {
      initializeAuth();
   }, [initializeAuth]);

   return (
      <Routes>
         {/* Public Routes */}
         <Route path="/login" element={<LoginPage />} />
         <Route path="/unauthorized" element={<Unauthorized />} />

         {/* Admin Routes */}
         <Route
            path="/admin/*"
            element={
               <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminLayout />
               </ProtectedRoute>
            }
         >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="assign-interns" element={<AssignInterns />} />
            <Route path="reports" element={<AdminReports />} />
            <Route
               path="reports/attendance"
               element={<ViewAttendanceReports />}
            />
            <Route
               path="reports/performance"
               element={<ViewPerformanceReports />}
            />
         </Route>

         {/* Manager Routes */}
         <Route
            path="/manager/*"
            element={
               <ProtectedRoute allowedRoles={["manager"]}>
                  <ManagerLayout />
               </ProtectedRoute>
            }
         >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<ManagerDashboard />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="tasks/new" element={<NewTaskPage />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="evaluations" element={<EvaluationsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route
               path="notifications/send"
               element={<SendNotificationPage />}
            />
            <Route path="reclamations" element={<ReclamationsPage />} />
            <Route path="reports" element={<ManagerReports />} />
         </Route>

         {/* Intern Routes */}
         <Route
            path="/intern/*"
            element={
               <ProtectedRoute allowedRoles={["intern"]}>
                  <InternLayout />
               </ProtectedRoute>
            }
         >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<InternDashboard />} />
            <Route path="tasks" element={<MyTasksPage />} />
            <Route path="evaluations" element={<MyEvaluationsPage />} />
            <Route path="notifications" element={<MyNotificationsPage />} />
            <Route path="reclamations" element={<MyReclamationsPage />} />
            <Route path="reclamations/new" element={<NewReclamationPage />} />
         </Route>

         {/* Root redirect */}
         <Route path="/" element={<Navigate to="/login" replace />} />

         {/* Role redirects */}
         <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
         />
         <Route
            path="/manager"
            element={<Navigate to="/manager/dashboard" replace />}
         />
         <Route
            path="/intern"
            element={<Navigate to="/intern/dashboard" replace />}
         />

         {/* 404 */}
         <Route path="*" element={<NotFound />} />
      </Routes>
   );
}

```

## File: assets/react.svg
```svg
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>
```

## File: components/auth/ProtectedRoute.tsx
```tsx
// src/components/auth/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
   children: React.ReactNode;
   allowedRoles?: string[];
}

export default function ProtectedRoute({
   children,
   allowedRoles,
}: ProtectedRouteProps) {
   const location = useLocation();
   const { isAuthenticated, user, isLoading } = useAuthStore();

   // Show loading state
   if (isLoading) {
      return (
         <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
               <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
               <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
         </div>
      );
   }

   // If not authenticated, redirect to login with return URL
   if (!isAuthenticated || !user) {
      return (
         <Navigate to="/login" state={{ from: location.pathname }} replace />
      );
   }

   // Check role permissions
   if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" replace />;
   }

   return <>{children}</>;
}

```

## File: components/layout/AdminSidebar.tsx
```tsx
import { NavLink } from 'react-router-dom';
import {
  Home,
  Users,
  FileText,
  BarChart3,
  Shield,
  Briefcase,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    path: '/admin/dashboard',
    label: 'Dashboard',
    icon: Home,
  },
  {
    path: '/admin/users',
    label: 'User Management',
    icon: Users,
  },
  {
    path: '/admin/assign-interns',
    label: 'Assign Interns',
    icon: Briefcase,
  },
  {
    path: '/admin/reports',
    label: 'Reports',
    icon: FileText,
  },
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 border-r bg-white min-h-[calc(100vh-70px)] hidden md:block">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Shield className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Administrator</h2>
            <p className="text-xs text-gray-500">Full system access</p>
          </div>
        </div>
      </div>
      
      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-purple-50 text-purple-600 border-l-4 border-purple-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      {/* Quick Stats */}
      <div className="p-4 mt-8">
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">System Status</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Active Users</span>
              <span className="font-semibold">24</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Departments</span>
              <span className="font-semibold">5</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Today's Logins</span>
              <span className="font-semibold">18</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
```

## File: components/layout/Header.tsx
```tsx
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/authService';
import { toast } from 'sonner';
import {
  LogOut,
  User,
  ChevronDown,
  Shield,
  Briefcase,
  GraduationCap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const roleIcons = {
  admin: Shield,
  manager: Briefcase,
  intern: GraduationCap,
};

const roleColors = {
  admin: 'bg-purple-100 text-purple-800',
  manager: 'bg-blue-100 text-blue-800',
  intern: 'bg-green-100 text-green-800',
};

export default function Header() {
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();

  const handleLogout = async () => {
    try {
      await authService.logout();
      clearAuth();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const RoleIcon = roleIcons[user?.role as keyof typeof roleIcons] || User;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="px-6 py-3 flex items-center justify-between">
        {/* Left side - Logo & Breadcrumb */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={cn('p-2 rounded-lg', roleColors[user?.role as keyof typeof roleColors])}>
              <RoleIcon className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                {user?.role === 'admin' && 'Admin Dashboard'}
                {user?.role === 'manager' && 'Manager Portal'}
                {user?.role === 'intern' && 'Intern Portal'}
              </h1>
            </div>
          </div>
        </div>

        {/* Right side - User Menu */}
        <div className="flex items-center space-x-4">
          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 hover:bg-gray-100"
              >
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {user?.role}
                  </p>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
```

## File: components/layout/InternSidebar.tsx
```tsx
import { NavLink } from "react-router-dom";
import {
   Home,
   CheckSquare,
   Star,
   Bell,
   AlertCircle,
   User,
   Target,
   GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
   {
      path: "/intern/dashboard",
      label: "Dashboard",
      icon: Home,
   },
   {
      path: "/intern/tasks",
      label: "My Tasks",
      icon: CheckSquare,
   },
   {
      path: "/intern/evaluations",
      label: "Evaluations",
      icon: Star,
   },
   {
      path: "/intern/notifications",
      label: "Notifications",
      icon: Bell,
   },
   {
      path: "/intern/reclamations",
      label: "Reclamations",
      icon: AlertCircle,
   },
];

export default function InternSidebar() {
   return (
      <aside className="w-64 border-r bg-white min-h-[calc(100vh-70px)] hidden md:block">
         <div className="p-6 border-b">
            <div className="flex items-center space-x-3">
               <div className="p-2 bg-green-100 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-green-600" />
               </div>
               <div>
                  <h2 className="font-semibold text-gray-900">Intern Portal</h2>
                  <p className="text-xs text-gray-500">
                     Learning & Development
                  </p>
               </div>
            </div>
         </div>

         <nav className="p-4 space-y-1">
            {navItems.map((item) => (
               <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                     cn(
                        "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                        isActive
                           ? "bg-green-50 text-green-600 border-l-4 border-green-600"
                           : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                     )
                  }
               >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
               </NavLink>
            ))}
         </nav>

         {/* Performance Stats */}
         <div className="p-4 mt-8">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
               <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  This Week
               </h3>
               <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                     <span className="text-gray-600">Tasks Completed</span>
                     <span className="font-semibold">8/12</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span className="text-gray-600">Avg. Score</span>
                     <span className="font-semibold">88%</span>
                  </div>
               </div>
            </div>
         </div>
      </aside>
   );
}
```

## File: components/layout/ManagerSidebar.tsx
```tsx
import { NavLink } from 'react-router-dom';
import {
  Home,
  CheckSquare,
  Calendar,
  Star,
  Bell,
  FileText,
  AlertCircle,
  Briefcase,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    path: '/manager/dashboard',
    label: 'Dashboard',
    icon: Home,
  },
  {
    path: '/manager/tasks',
    label: 'Tasks',
    icon: CheckSquare,
  },
  {
    path: '/manager/attendance',
    label: 'Attendance',
    icon: Calendar,
  },
  {
    path: '/manager/evaluations',
    label: 'Evaluations',
    icon: Star,
  },
  {
    path: '/manager/notifications',
    label: 'Notifications',
    icon: Bell,
  },
  {
    path: '/manager/reclamations',
    label: 'Reclamations',
    icon: AlertCircle,
  },
  {
    path: '/manager/reports',
    label: 'Reports',
    icon: FileText,
  },
];

export default function ManagerSidebar() {
  return (
    <aside className="w-64 border-r bg-white min-h-[calc(100vh-70px)] hidden md:block">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Briefcase className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Manager Portal</h2>
            <p className="text-xs text-gray-500">Department management</p>
          </div>
        </div>
      </div>
      
      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      {/* Quick Actions */}
      <div className="p-4 mt-8">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <NavLink
            to="/manager/tasks/new"
            className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="text-sm font-medium">New Task</span>
            <CheckSquare className="h-4 w-4 text-gray-400" />
          </NavLink>
          <NavLink
            to="/manager/attendance"
            className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="text-sm font-medium">Mark Attendance</span>
            <Calendar className="h-4 w-4 text-gray-400" />
          </NavLink>
        </div>
      </div>
    </aside>
  );
}
```

## File: components/ui/avatar.tsx
```tsx
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }

```

## File: components/ui/badge.tsx
```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

```

## File: components/ui/button.tsx
```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

```

## File: components/ui/calendar.tsx
```tsx
import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-4 md:flex-row",
          defaultClassNames.months
        ),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-[--cell-size] w-full items-center justify-center px-[--cell-size]",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-[--cell-size] w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "bg-popover absolute inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label"
            ? "text-sm"
            : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal",
          defaultClassNames.weekday
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "w-[--cell-size] select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-muted-foreground select-none text-[0.8rem]",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
          defaultClassNames.day
        ),
        range_start: cn(
          "bg-accent rounded-l-md",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("bg-accent rounded-r-md", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-[--cell-size] items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }

```

## File: components/ui/card.tsx
```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

```

## File: components/ui/checkbox.tsx
```tsx
import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("grid place-content-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

```

## File: components/ui/command.tsx
```tsx
import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    )}
    {...props}
  />
))

CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}

```

## File: components/ui/dialog.tsx
```tsx
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}

```

## File: components/ui/dropdown-menu.tsx
```tsx
"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}

```

## File: components/ui/form.tsx
```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  if (!itemContext) {
    throw new Error("useFormField should be used within <FormItem>")
  }

  const fieldState = getFieldState(fieldContext.name, formState)

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue | null>(null)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}

```

## File: components/ui/input.tsx
```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

```

## File: components/ui/label.tsx
```tsx
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }

```

## File: components/ui/popover.tsx
```tsx
"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin]",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }

```

## File: components/ui/progress.tsx
```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100))
    
    return (
      <div
        ref={ref}
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full bg-gray-100",
          className
        )}
        {...props}
      >
        <div
          className="h-full w-full flex-1 bg-blue-600 transition-all duration-300 ease-in-out"
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </div>
    )
  }
)
Progress.displayName = "Progress"

export { Progress }
```

## File: components/ui/select.tsx
```tsx
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}

```

## File: components/ui/separator.tsx
```tsx
import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }

```

## File: components/ui/skeleton.tsx
```tsx
import { cn } from "@/lib/utils";

function Skeleton({
   className,
   ...props
}: React.HTMLAttributes<HTMLDivElement>) {
   return (
      <div
         className={cn("animate-pulse rounded-md bg-gray-200", className)}
         {...props}
      />
   );
}

export { Skeleton };

```

## File: components/ui/table.tsx
```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}

```

## File: components/ui/tabs.tsx
```tsx
"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }

```

## File: components/ui/textarea.tsx
```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }

```

## File: components/ui/toast.tsx
```tsx
import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold [&+div]:text-xs", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}

```

## File: components/ui/toaster.tsx
```tsx
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}

```

## File: config/env.ts
```ts
// src/config/env.ts
export const config = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Intern Management System',
  TOKEN_KEY: 'ims_token',
  USER_KEY: 'ims_user',
} as const;
```

## File: hooks/use-toast.ts
```ts
"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }

```

## File: hooks/useReclamationFilters.ts
```ts
import { useAuthStore } from '@/stores/authStore';
import { useReclamationStore } from '@/stores/reclamationStore';

export const useReclamationFilters = () => {
  const { user } = useAuthStore();
  const { getReclamationsByUserId } = useReclamationStore();
  
  const getMyReclamations = () => {
    if (!user) return [];
    return getReclamationsByUserId(user.id, user.role);
  };
  
  return {
    getMyReclamations,
  };
};
```

## File: hooks/useStore.ts
```ts
import { useAuthStore, useAuthComputed } from '@/stores/authStore';
import { useTaskStore } from '@/stores/taskStore';
import { useAttendanceStore } from '@/stores/attendanceStore';
import { useEvaluationStore } from '@/stores/evaluationStore';
import { useReclamationStore } from '@/stores/reclamationStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { useDashboardStore } from '@/stores/dashboardStore';

export const useStore = () => {
  const auth = useAuthStore();
  const authComputed = useAuthComputed();
  const tasks = useTaskStore();
  const attendance = useAttendanceStore();
  const evaluations = useEvaluationStore();
  const reclamations = useReclamationStore();
  const notifications = useNotificationStore();
  const dashboard = useDashboardStore();

  return {
    auth,
    authComputed,
    tasks,
    attendance,
    evaluations,
    reclamations,
    notifications,
    dashboard,
  };
};
```

## File: index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 210 40% 98%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 200 98% 39%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 200 98% 39%;
    --radius: 0.5rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    background: linear-gradient(135deg, hsl(210, 40%, 98%) 0%, white 100%);
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

@layer components {
  .glass-card {
    @apply bg-white/80 backdrop-blur-sm border border-white/50 shadow-soft;
  }
  
  .shadow-soft {
    box-shadow: 0 2px 15px -3px rgba(0, 0, 0, 0.07), 
                0 10px 20px -2px rgba(0, 0, 0, 0.04);
  }
  
  .btn-primary {
    @apply bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium px-4 py-2 rounded-lg 
           hover:from-blue-600 hover:to-blue-700 transition-all duration-200 
           active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed;
  }
  
  .btn-secondary {
    @apply bg-white text-blue-600 border border-blue-200 font-medium px-4 py-2 rounded-lg
           hover:bg-blue-50 transition-all duration-200 active:scale-[0.98];
  }
}

```

## File: layouts/AdminLayout.tsx
```tsx
import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/layout/AdminSidebar";
import Header from "@/components/layout/Header";

export default function AdminLayout() {
   return (
      <div className="min-h-screen bg-gray-50">
         <Header />
         <div className="flex">
            <AdminSidebar />
            <main className="flex-1 p-6">
               <Outlet />
            </main>
         </div>
      </div>
   );
}

```

## File: layouts/InternLayout.tsx
```tsx
import { Outlet } from "react-router-dom";
import InternSidebar from "@/components/layout/InternSidebar";
import Header from "@/components/layout/Header";

export default function InternLayout() {
   return (
      <div className="min-h-screen bg-gray-50">
         <Header />
         <div className="flex">
            <InternSidebar />
            <main className="flex-1 p-6">
               <Outlet />
            </main>
         </div>
      </div>
   );
}

```

## File: layouts/ManagerLayout.tsx
```tsx
import { Outlet } from "react-router-dom";
import ManagerSidebar from "@/components/layout/ManagerSidebar";
import Header from "@/components/layout/Header";

export default function ManagerLayout() {
   return (
      <div className="min-h-screen bg-gray-50">
         <Header />
         <div className="flex">
            <ManagerSidebar />
            <main className="flex-1 p-6">
               <Outlet />
            </main>
         </div>
      </div>
   );
}

```

## File: lib/utils.ts
```ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## File: main.tsx
```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <BrowserRouter>
         <App />
         <Toaster
            position="top-right"
            richColors
            closeButton
            expand={true}
            duration={4000}
         />
      </BrowserRouter>
   </React.StrictMode>
);

```

## File: pages/admin/Analytics.tsx
```tsx
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  BarChart3, Users, TrendingUp, Download, PieChart as PieChartIcon
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend
} from 'recharts';
import { format } from 'date-fns';
import { reportService } from '@/services/reportService';
import { userService } from '@/services/userService';

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState('month');
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [userStats, setUserStats] = useState({
    total: 0,
    admins: 0,
    managers: 0,
    interns: 0,
    active: 0
  });
  const [reportStats, setReportStats] = useState({
    total: 0,
    attendance: 0,
    performance: 0,
    sentToAdmin: 0
  });

  useEffect(() => {
    loadAnalyticsData();
  }, [timeRange]);

  const loadAnalyticsData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch ONLY admin-accessible data
      const [usersResponse, reportsResponse] = await Promise.all([
        userService.getUsers({ per_page: 1000 }),
        reportService.getReports()
      ]);

      const users = usersResponse.data || [];
      const reports = reportsResponse.data || [];

      // Calculate user statistics
      const userStats = {
        total: users.length,
        admins: users.filter(u => u.role === 'admin').length,
        managers: users.filter(u => u.role === 'manager').length,
        interns: users.filter(u => u.role === 'intern').length,
        active: users.filter(u => !u.deleted_at).length
      };

      // Calculate report statistics
      const reportStats = {
        total: reports.length,
        attendance: reports.filter(r => r.type === 'attendance').length,
        performance: reports.filter(r => r.type === 'performance').length,
        sentToAdmin: reports.filter(r => r.sent_to_admin).length
      };

      setUserStats(userStats);
      setReportStats(reportStats);

    } catch (error: any) {
      console.error('Analytics error:', error);
      toast.error('Failed to load analytics data');
    } finally {
      setIsLoading(false);
    }
  };

  const exportAnalyticsData = () => {
    try {
      const analyticsData = {
        timestamp: new Date().toISOString(),
        timeRange,
        userStats,
        reportStats,
      };

      const dataStr = JSON.stringify(analyticsData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `analytics-${format(new Date(), 'yyyy-MM-dd')}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('Analytics data exported successfully');
    } catch (error) {
      toast.error('Failed to export analytics data');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground">System-wide analytics and insights</p>
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const userDistributionData = [
    { name: 'Admins', value: userStats.admins, color: '#8b5cf6' },
    { name: 'Managers', value: userStats.managers, color: '#3b82f6' },
    { name: 'Interns', value: userStats.interns, color: '#10b981' }
  ];

  const reportDistributionData = [
    { name: 'Attendance', value: reportStats.attendance, color: '#3b82f6' },
    { name: 'Performance', value: reportStats.performance, color: '#10b981' }
  ];

  const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            System-wide analytics and insights
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={exportAnalyticsData} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.total}</div>
            <p className="text-xs text-muted-foreground">
              {userStats.active} active users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Managers</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.managers}</div>
            <p className="text-xs text-muted-foreground">
              Department managers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interns</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.interns}</div>
            <p className="text-xs text-muted-foreground">
              Active interns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports</CardTitle>
            <BarChart3 className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportStats.total}</div>
            <p className="text-xs text-muted-foreground">
              {reportStats.sentToAdmin} sent to admin
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* User Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>Breakdown of users by role</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${entry.value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {userDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Report Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Report Distribution</CardTitle>
                <CardDescription>Breakdown of reports by type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={reportDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${entry.value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {reportDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Statistics</CardTitle>
              <CardDescription>Detailed user analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{userStats.admins}</div>
                    <div className="text-sm text-gray-600">Admins</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{userStats.managers}</div>
                    <div className="text-sm text-gray-600">Managers</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{userStats.interns}</div>
                    <div className="text-sm text-gray-600">Interns</div>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-lg">
                    <div className="text-2xl font-bold text-amber-600">{userStats.active}</div>
                    <div className="text-sm text-gray-600">Active Users</div>
                  </div>
                </div>

                {/* User Table */}
                <div className="space-y-2">
                  <h3 className="font-semibold">User Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Total Users</span>
                      <Badge variant="outline">{userStats.total}</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium text-purple-700">Administrators</span>
                      <Badge className="bg-purple-100 text-purple-800">{userStats.admins}</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-blue-700">Managers</span>
                      <Badge className="bg-blue-100 text-blue-800">{userStats.managers}</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium text-green-700">Interns</span>
                      <Badge className="bg-green-100 text-green-800">{userStats.interns}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Analytics</CardTitle>
              <CardDescription>Report generation and distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold">{reportStats.total}</div>
                    <div className="text-sm text-gray-600">Total Reports</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{reportStats.attendance}</div>
                    <div className="text-sm text-gray-600">Attendance</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{reportStats.performance}</div>
                    <div className="text-sm text-gray-600">Performance</div>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-lg">
                    <div className="text-2xl font-bold text-amber-600">{reportStats.sentToAdmin}</div>
                    <div className="text-sm text-gray-600">Sent to Admin</div>
                  </div>
                </div>

                {/* Report Stats */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Report Statistics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Reports Sent to Admin</span>
                      <Badge variant="outline">{reportStats.sentToAdmin} / {reportStats.total}</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-blue-700">Attendance Reports</span>
                      <Badge className="bg-blue-100 text-blue-800">{reportStats.attendance}</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium text-green-700">Performance Reports</span>
                      <Badge className="bg-green-100 text-green-800">{reportStats.performance}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

## File: pages/admin/AssignInterns.tsx
```tsx
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
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
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
import { Loader2, Users, CheckCircle, XCircle } from "lucide-react";
import { userService } from "@/services/userService";

const assignSchema = z.object({
   intern_id: z.coerce.number().min(1, "Please select an intern"),
   department_id: z.coerce.number().min(1, "Please select a department"),
   manager_id: z.coerce.number().min(1, "Please select a manager"),
});

type AssignFormData = z.infer<typeof assignSchema>;

export default function AssignInterns() {
   const [isLoading, setIsLoading] = useState(false);
   const [interns, setInterns] = useState<any[]>([]);
   const [departments, setDepartments] = useState<any[]>([]);
   const [managers, setManagers] = useState<any[]>([]);
   const [assignedInterns, setAssignedInterns] = useState<any[]>([]);

   const form = useForm<AssignFormData>({
      resolver: zodResolver(assignSchema),
      defaultValues: {
         intern_id: undefined,
         department_id: undefined,
         manager_id: undefined,
      },
   });

   useEffect(() => {
      loadData();
   }, []);

   const loadData = async () => {
      try {
         const [internsData, managersData] = await Promise.all([
            userService.getUnassignedInterns(),
            userService.getManagers(),
         ]);

         setInterns(internsData);
         setManagers(managersData);

         // Mock departments (should come from API)
         setDepartments([
            { id: 1, name: "Engineering" },
            { id: 2, name: "Marketing" },
            { id: 3, name: "Sales" },
            { id: 4, name: "Human Resources" },
            { id: 5, name: "Finance" },
         ]);

         // Load assigned interns
         const assignedResponse = await userService.getInterns({
            unassigned: false,
         });
         setAssignedInterns(assignedResponse);
      } catch (error) {
         toast.error("Failed to load data");
      }
   };

   const onSubmit = async (data: AssignFormData) => {
      try {
         setIsLoading(true);

         // Check if intern is already assigned
         const isAlreadyAssigned = assignedInterns.some(
            (intern) => intern.id === data.intern_id
         );
         if (isAlreadyAssigned) {
            toast.error("This intern is already assigned to a department");
            return;
         }

         await userService.assignIntern(data.intern_id, {
            department_id: data.department_id,
            manager_id: data.manager_id,
         });

         toast.success("Intern assigned successfully!");
         form.reset();
         loadData(); // Refresh data
      } catch (error: any) {
         if (error.response?.status === 422) {
            toast.error("Validation error. Please check your inputs.");
         } else {
            toast.error(
               error.response?.data?.message || "Failed to assign intern"
            );
         }
      } finally {
         setIsLoading(false);
      }
   };

   const departmentId = form.watch("department_id");

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-3xl font-bold tracking-tight">
                  Assign Interns
               </h1>
               <p className="text-muted-foreground">
                  Assign interns to departments and managers
               </p>
            </div>
         </div>

         <div className="grid gap-6 lg:grid-cols-2">
            {/* Assignment Form */}
            <Card>
               <CardHeader>
                  <CardTitle>Assign New Intern</CardTitle>
                  <CardDescription>
                     Select an unassigned intern and assign them to a department
                     and manager
                  </CardDescription>
               </CardHeader>
               <CardContent>
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
                                 <FormLabel>Select Intern *</FormLabel>
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
                                                   ? "No unassigned interns available"
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
                           name="department_id"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Select Department *</FormLabel>
                                 <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value?.toString()}
                                 >
                                    <FormControl>
                                       <SelectTrigger>
                                          <SelectValue placeholder="Select a department" />
                                       </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
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
                           control={form.control}
                           name="manager_id"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Select Manager *</FormLabel>
                                 <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value?.toString()}
                                    disabled={!departmentId}
                                 >
                                    <FormControl>
                                       <SelectTrigger>
                                          <SelectValue
                                             placeholder={
                                                departmentId
                                                   ? "Select a manager"
                                                   : "Select department first"
                                             }
                                          />
                                       </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                       {managers
                                          .filter(
                                             (manager) =>
                                                manager.department_id ===
                                                departmentId
                                          )
                                          .map((manager) => (
                                             <SelectItem
                                                key={manager.id}
                                                value={manager.id.toString()}
                                             >
                                                {manager.name} - {manager.email}
                                             </SelectItem>
                                          ))}
                                    </SelectContent>
                                 </Select>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <Button
                           type="submit"
                           className="w-full"
                           disabled={isLoading}
                        >
                           {isLoading ? (
                              <>
                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                 Assigning...
                              </>
                           ) : (
                              "Assign Intern"
                           )}
                        </Button>
                     </form>
                  </Form>
               </CardContent>
            </Card>

            {/* Assigned Interns List */}
            <Card>
               <CardHeader>
                  <CardTitle>Assigned Interns</CardTitle>
                  <CardDescription>
                     Interns currently assigned to departments
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  {assignedInterns.length === 0 ? (
                     <div className="text-center py-8 text-muted-foreground">
                        No interns assigned yet
                     </div>
                  ) : (
                     <div className="space-y-3">
                        {assignedInterns.slice(0, 5).map((intern) => (
                           <div
                              key={intern.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                           >
                              <div>
                                 <p className="font-medium">{intern.name}</p>
                                 <div className="text-sm text-gray-500">
                                    {intern.department?.name || "No department"}{" "}
                                    • {intern.manager?.name || "No manager"}
                                 </div>
                              </div>
                              <CheckCircle className="h-5 w-5 text-green-500" />
                           </div>
                        ))}
                        {assignedInterns.length > 5 && (
                           <p className="text-center text-sm text-gray-500">
                              +{assignedInterns.length - 5} more interns
                           </p>
                        )}
                     </div>
                  )}
               </CardContent>
            </Card>
         </div>

         {/* Unassigned Interns Table */}
         <Card>
            <CardHeader>
               <CardTitle>Unassigned Interns</CardTitle>
               <CardDescription>
                  Interns waiting to be assigned to departments
               </CardDescription>
            </CardHeader>
            <CardContent>
               {interns.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                     All interns have been assigned
                  </div>
               ) : (
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Name</TableHead>
                           <TableHead>Email</TableHead>
                           <TableHead>Status</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {interns.map((intern) => (
                           <TableRow key={intern.id}>
                              <TableCell className="font-medium">
                                 {intern.name}
                              </TableCell>
                              <TableCell>{intern.email}</TableCell>
                              <TableCell>
                                 <div className="flex items-center">
                                    <XCircle className="h-4 w-4 text-amber-500 mr-2" />
                                    <span className="text-amber-600">
                                       Unassigned
                                    </span>
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

```

## File: pages/admin/Dashboard.tsx
```tsx
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, CheckSquare, BarChart3, Plus, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { dashboardService } from "@/services/dashboardService";
import { userService } from "@/services/userService";
import { reportService } from "@/services/reportService";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    admins: 0,
    managers: 0,
    interns: 0,
    reportsCount: 0,
    recentActivity: []
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch ONLY admin-accessible data
      const [dashboardData, usersResponse, reportsResponse] = await Promise.all([
        dashboardService.getDashboard(),
        userService.getUsers({ per_page: 100 }),
        reportService.getReports()
      ]);

      const users = usersResponse.data || [];
      const reports = reportsResponse.data || [];

      // Calculate statistics from user data only (admin can access all users)
      const userStats = {
        totalUsers: users.length,
        admins: users.filter(user => user.role === 'admin').length,
        managers: users.filter(user => user.role === 'manager').length,
        interns: users.filter(user => user.role === 'intern').length,
        reportsCount: reports.length,
        recentActivity: dashboardData.recent_activity || []
      };

      setStats(userStats);

    } catch (error) {
      console.error("Failed to load dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers.toString(),
      icon: Users,
      color: "bg-purple-500",
      description: `${stats.admins} admins, ${stats.managers} managers, ${stats.interns} interns`,
    },
    {
      title: "Managers",
      value: stats.managers.toString(),
      icon: Briefcase,
      color: "bg-blue-500",
      description: "Department managers",
    },
    {
      title: "Interns",
      value: stats.interns.toString(),
      icon: Users,
      color: "bg-green-500",
      description: "Active interns",
    },
    {
      title: "Reports",
      value: stats.reportsCount.toString(),
      icon: BarChart3,
      color: "bg-amber-500",
      description: "Generated reports",
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-10 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-32" />
              </CardContent>
            </Card>
          ))}
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
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            System overview and user management
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => navigate("/admin/users")}>
            <Plus className="mr-2 h-4 w-4" />
            Manage Users
          </Button>
          <Button onClick={() => navigate("/admin/analytics")}>
            View Analytics
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
                <div className={`p-2 rounded-full ${stat.color} text-white`}>
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.recentActivity.length > 0 ? (
            <div className="space-y-4">
              {stats.recentActivity.slice(0, 5).map((activity: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {activity.type === 'user' && <Users className="h-4 w-4 text-gray-600" />}
                      {activity.type === 'report' && <BarChart3 className="h-4 w-4 text-gray-600" />}
                      {activity.type === 'system' && <Shield className="h-4 w-4 text-gray-600" />}
                    </div>
                    <div>
                      <p className="font-medium">{activity.user_name || 'System'}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.action}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No recent activity
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              className="w-full justify-start"
              variant="outline"
              onClick={() => navigate("/admin/users")}
            >
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Button>
            <Button
              className="w-full justify-start"
              variant="outline"
              onClick={() => navigate("/admin/assign-interns")}
            >
              <Briefcase className="mr-2 h-4 w-4" />
              Assign Interns
            </Button>
            <Button
              className="w-full justify-start"
              variant="outline"
              onClick={() => navigate("/admin/reports")}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              View Reports
            </Button>
            <Button
              className="w-full justify-start"
              variant="outline"
              onClick={() => navigate("/admin/analytics")}
            >
              <Shield className="mr-2 h-4 w-4" />
              System Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

## File: pages/admin/Reports.tsx
```tsx
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Download, Filter, Calendar, BarChart3, TrendingUp, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { reportService } from '@/services/reportService';
import { useNavigate } from 'react-router-dom';

export default function AdminReports() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<any[]>([]);
  const [filteredReports, setFilteredReports] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadReports();
  }, []);

  useEffect(() => {
    filterReports();
  }, [reports, typeFilter, statusFilter]);

  const loadReports = async () => {
    try {
      setIsLoading(true);
      const response = await reportService.getReports();
      setReports(response.data || []);
      setFilteredReports(response.data || []);
    } catch (error) {
      toast.error('Failed to load reports');
    } finally {
      setIsLoading(false);
    }
  };

  const filterReports = () => {
    let filtered = [...reports];

    if (typeFilter !== 'all') {
      filtered = filtered.filter(report => report.type === typeFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(report => {
        if (statusFilter === 'sent') return report.sent_to_admin === true;
        if (statusFilter === 'pending') return report.sent_to_admin === false;
        return true;
      });
    }

    setFilteredReports(filtered);
  };

  const getReportTypeBadge = (type: string) => {
    switch (type) {
      case 'attendance':
        return <Badge className="bg-blue-100 text-blue-800">Attendance</Badge>;
      case 'performance':
        return <Badge className="bg-green-100 text-green-800">Performance</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getStatusBadge = (sent: boolean) => {
    return sent ? (
      <Badge className="bg-green-100 text-green-800">Sent to Admin</Badge>
    ) : (
      <Badge variant="outline">Pending</Badge>
    );
  };

  const handleViewReport = (report: any) => {
    if (report.type === 'attendance') {
      navigate('/admin/reports/attendance');
    } else if (report.type === 'performance') {
      navigate('/admin/reports/performance');
    }
  };

  const handleExportReport = async (report: any) => {
    try {
      const response = await reportService.exportReport(report.id);
      
      // Create download link
      const blob = new Blob([response.data], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `report-${report.type}-${report.id}-${format(new Date(), 'yyyy-MM-dd')}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('Report exported successfully');
    } catch (error) {
      toast.error('Failed to export report');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports Dashboard</h1>
            <p className="text-muted-foreground">View system reports</p>
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
          <h1 className="text-3xl font-bold tracking-tight">Reports Dashboard</h1>
          <p className="text-muted-foreground">
            View and manage system reports
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Reports</p>
                <p className="text-2xl font-bold">{reports.length}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Attendance</p>
                <p className="text-2xl font-bold">
                  {reports.filter(r => r.type === 'attendance').length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Performance</p>
                <p className="text-2xl font-bold">
                  {reports.filter(r => r.type === 'performance').length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Sent to Admin</p>
                <p className="text-2xl font-bold">
                  {reports.filter(r => r.sent_to_admin).length}
                </p>
              </div>
              <Filter className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="attendance">Attendance</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="sent">Sent to Admin</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Reports</CardTitle>
          <CardDescription>
            Reports generated by managers
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredReports.length === 0 ? (
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Reports Found</h3>
              <p className="text-gray-500">
                {typeFilter !== 'all' || statusFilter !== 'all'
                  ? 'No reports match your filter criteria'
                  : 'No reports have been generated yet'}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Generated By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{getReportTypeBadge(report.type)}</TableCell>
                    <TableCell>
                      {format(new Date(report.period_start), 'MMM dd')} - {format(new Date(report.period_end), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>
                      {report.department?.name || 'All Departments'}
                    </TableCell>
                    <TableCell className="font-medium">
                      {report.generated_by_user?.name || 'Unknown'}
                    </TableCell>
                    <TableCell>
                      {format(new Date(report.created_at), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(report.sent_to_admin)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewReport(report)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleExportReport(report)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Export
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
```

## File: pages/admin/UserManagement.tsx
```tsx
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2, Plus, Edit, Trash2, Users, Search, Eye, EyeOff } from 'lucide-react';
import { userService } from '@/services/userService';

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['admin', 'manager', 'intern']),
  department_id: z.coerce.number().optional(),
  manager_id: z.coerce.number().optional(),
});

const editUserSchema = userSchema.omit({ password: true }).extend({
  password: z.string().optional(),
});

type UserFormData = z.infer<typeof userSchema>;
type EditUserFormData = z.infer<typeof editUserSchema>;

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [departments, setDepartments] = useState<any[]>([]);
  const [managers, setManagers] = useState<any[]>([]);

  const addForm = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'intern',
    },
  });

  const editForm = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
  });

  useEffect(() => {
    loadUsers();
    loadDepartments();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await userService.getUsers();
      setUsers(response.data);
    } catch (error) {
      toast.error('Failed to load users');
    }
  };

  const loadDepartments = async () => {
    // Mock departments (should come from API)
    setDepartments([
      { id: 1, name: 'Engineering' },
      { id: 2, name: 'Marketing' },
      { id: 3, name: 'Sales' },
      { id: 4, name: 'Human Resources' },
      { id: 5, name: 'Finance' },
    ]);
    
    // Load managers
    const managersData = await userService.getManagers();
    setManagers(managersData);
  };

  const handleAddUser = async (data: UserFormData) => {
    try {
      setIsLoading(true);
      await userService.createUser(data);
      toast.success('User created successfully!');
      setIsAddDialogOpen(false);
      addForm.reset();
      loadUsers();
    } catch (error: any) {
      if (error.response?.status === 422) {
        const errors = error.response.data?.errors;
        if (errors) {
          Object.entries(errors).forEach(([field, messages]) => {
            toast.error(`${field}: ${(messages as string[])[0]}`);
          });
        }
      } else {
        toast.error(error.response?.data?.message || 'Failed to create user');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditUser = async (data: EditUserFormData) => {
    try {
      setIsLoading(true);
      await userService.updateUser(selectedUser.id, data);
      toast.success('User updated successfully!');
      setIsEditDialogOpen(false);
      loadUsers();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update user');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      await userService.deleteUser(id);
      toast.success('User deleted successfully!');
      loadUsers();
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const openEditDialog = (user: any) => {
    setSelectedUser(user);
    editForm.reset({
      name: user.name,
      email: user.email,
      role: user.role,
      department_id: user.department_id,
      manager_id: user.manager_id,
    });
    setIsEditDialogOpen(true);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage system users - Admin, Managers, and Interns
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <Form {...addForm}>
              <form onSubmit={addForm.handleSubmit(handleAddUser)} className="space-y-4">
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
                        <Input type="email" placeholder="john@example.com" {...field} />
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
                            type={showPassword ? 'text' : 'password'}
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
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
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

                <FormField
                  control={addForm.control}
                  name="department_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department (optional)" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
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

                <FormField
                  control={addForm.control}
                  name="manager_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manager</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select manager (optional)" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {managers.map((manager) => (
                            <SelectItem key={manager.id} value={manager.id.toString()}>
                              {manager.name} - {manager.email}
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
                      'Create User'
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
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
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>{user.department?.name || '-'}</TableCell>
                  <TableCell>{user.manager?.name || '-'}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
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
                        disabled={user.role === 'admin'}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(handleEditUser)} className="space-y-4">
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
                      <Input type="email" placeholder="john@example.com" {...field} />
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
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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

              <FormField
                control={editForm.control}
                name="department_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department (optional)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
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

              <FormField
                control={editForm.control}
                name="manager_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manager</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select manager (optional)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {managers.map((manager) => (
                          <SelectItem key={manager.id} value={manager.id.toString()}>
                            {manager.name} - {manager.email}
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
                      Updating...
                    </>
                  ) : (
                    'Update User'
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
```

## File: pages/admin/reports/ViewAttendanceReports.tsx
```tsx
import { useState, useEffect } from "react";
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
   Download,
   Search,
   Calendar,
   CheckCircle,
   XCircle,
   Clock as ClockIcon,
} from "lucide-react";
import { format } from "date-fns";
import { reportService } from "@/services/reportService";
import { attendanceService } from "@/services/attendanceService";

export default function ViewAttendanceReports() {
   const [reports, setReports] = useState<any[]>([]);
   const [filteredReports, setFilteredReports] = useState<any[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [searchTerm, setSearchTerm] = useState("");
   const [dateRange, setDateRange] = useState("month");

   useEffect(() => {
      loadReports();
   }, [dateRange]);

   useEffect(() => {
      filterReports();
   }, [reports, searchTerm]);

   const loadReports = async () => {
      try {
         setIsLoading(true);
         const response = await reportService.getReports({
            type: "attendance",
         });
         const reportsData = response.data || [];

         setReports(reportsData);
         setFilteredReports(reportsData);
      } catch (error: any) {
         toast.error("Failed to load attendance reports");
         console.error("Reports error:", error);
      } finally {
         setIsLoading(false);
      }
   };

   const filterReports = () => {
      let filtered = [...reports];

      if (searchTerm) {
         const term = searchTerm.toLowerCase();
         filtered = filtered.filter(
            (report) =>
               report.department?.name?.toLowerCase().includes(term) ||
               report.generated_by_user?.name?.toLowerCase().includes(term)
         );
      }

      setFilteredReports(filtered);
   };

   const exportReport = async (report: any) => {
      try {
         const reportData = {
            title: `Attendance Report - ${report.period_start} to ${report.period_end}`,
            generated_by: report.generated_by_user?.name || "Unknown",
            generated_at: format(new Date(report.created_at), "PPP"),
            department: report.department?.name || "All Departments",
            data: report.data,
         };

         const dataStr = JSON.stringify(reportData, null, 2);
         const dataBlob = new Blob([dataStr], { type: "application/json" });
         const url = URL.createObjectURL(dataBlob);
         const link = document.createElement("a");
         link.href = url;
         link.download = `attendance-report-${report.id}-${format(
            new Date(),
            "yyyy-MM-dd"
         )}.json`;
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
         URL.revokeObjectURL(url);

         toast.success("Report exported successfully");
      } catch (error) {
         toast.error("Failed to export report");
      }
   };

   const getStatusBadge = (status: string) => {
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

   if (isLoading) {
      return (
         <div className="space-y-6">
            <div className="flex items-center justify-between">
               <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                     Attendance Reports
                  </h1>
                  <p className="text-muted-foreground">
                     View and analyze attendance reports
                  </p>
               </div>
               <Skeleton className="h-10 w-32" />
            </div>

            <div className="space-y-4">
               {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-24 w-full" />
               ))}
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
                  Attendance Reports
               </h1>
               <p className="text-muted-foreground">
                  View and analyze attendance reports from managers
               </p>
            </div>
            <Select value={dateRange} onValueChange={setDateRange}>
               <SelectTrigger className="w-32">
                  <SelectValue placeholder="Time Range" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
               </SelectContent>
            </Select>
         </div>

         {/* Filters */}
         <Card>
            <CardContent className="pt-6">
               <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                     <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                           placeholder="Search reports by department or manager..."
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="pl-10"
                        />
                     </div>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Reports List */}
         {filteredReports.length === 0 ? (
            <Card>
               <CardContent className="py-12 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                     No Reports Found
                  </h3>
                  <p className="text-gray-500">
                     {searchTerm
                        ? "No reports match your search criteria"
                        : "No attendance reports have been generated yet"}
                  </p>
               </CardContent>
            </Card>
         ) : (
            <div className="space-y-4">
               {filteredReports.map((report) => (
                  <Card key={report.id}>
                     <CardHeader>
                        <div className="flex items-center justify-between">
                           <div>
                              <CardTitle className="flex items-center gap-2">
                                 Attendance Report
                                 {report.sent_to_admin && (
                                    <Badge className="bg-blue-100 text-blue-800">
                                       Sent to Admin
                                    </Badge>
                                 )}
                              </CardTitle>
                              <CardDescription>
                                 Period: {report.period_start} -{" "}
                                 {report.period_end}
                                 {report.department &&
                                    ` • Department: ${report.department.name}`}
                              </CardDescription>
                           </div>
                           <div className="flex items-center gap-2">
                              <Button
                                 variant="outline"
                                 size="sm"
                                 onClick={() => exportReport(report)}
                              >
                                 <Download className="mr-2 h-4 w-4" />
                                 Export
                              </Button>
                           </div>
                        </div>
                     </CardHeader>
                     <CardContent>
                        {report.data && (
                           <>
                              {/* Statistics */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                 <div className="text-center">
                                    <div className="text-2xl font-bold">
                                       {report.data.total || 0}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                       Total Records
                                    </div>
                                 </div>
                                 <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">
                                       {report.data.present || 0}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                       Present
                                    </div>
                                 </div>
                                 <div className="text-center">
                                    <div className="text-2xl font-bold text-red-600">
                                       {report.data.absent || 0}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                       Absent
                                    </div>
                                 </div>
                                 <div className="text-center">
                                    <div className="text-2xl font-bold">
                                       {report.data.attendance_rate
                                          ? `${report.data.attendance_rate.toFixed(
                                               1
                                            )}%`
                                          : "0%"}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                       Attendance Rate
                                    </div>
                                 </div>
                              </div>

                              {/* Summary */}
                              {report.data.summary && (
                                 <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <h4 className="font-semibold text-blue-900 mb-2">
                                       Summary
                                    </h4>
                                    <p className="text-sm text-blue-800">
                                       {report.data.summary}
                                    </p>
                                 </div>
                              )}
                           </>
                        )}

                        <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
                           <div>
                              Generated by:{" "}
                              <span className="font-medium">
                                 {report.generated_by_user?.name || "Unknown"}
                              </span>
                           </div>
                           <div>
                              Generated on:{" "}
                              {format(new Date(report.created_at), "PPpp")}
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               ))}
            </div>
         )}
      </div>
   );
}

```

## File: pages/admin/reports/ViewPerformanceReports.tsx
```tsx
import { useState, useEffect } from "react";
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
   Download,
   Filter,
   Search,
   BarChart3,
   TrendingUp,
   Target,
   Award,
   Star,
   Users,
   Eye,
} from "lucide-react";
import { format } from "date-fns";
import {
   BarChart,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
   ResponsiveContainer,
   LineChart,
   Line,
} from "recharts";
import { reportService } from "@/services/reportService";
import { evaluationService } from "@/services/evaluationService";
import { userService } from "@/services/userService";
import { formatDate, formatPercentage } from "@/utils/format/dataFormatters";

export default function ViewPerformanceReports() {
   const [reports, setReports] = useState<any[]>([]);
   const [filteredReports, setFilteredReports] = useState<any[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [searchTerm, setSearchTerm] = useState("");
   const [departmentFilter, setDepartmentFilter] = useState("all");
   const [activeTab, setActiveTab] = useState("reports");
   const [departmentStats, setDepartmentStats] = useState<any[]>([]);
   const [topPerformers, setTopPerformers] = useState<any[]>([]);

   useEffect(() => {
      loadReports();
   }, []);

   useEffect(() => {
      filterReports();
   }, [reports, searchTerm, departmentFilter]);

   const loadReports = async () => {
      try {
         setIsLoading(true);

         // Load performance reports
         const reportsResponse = await reportService.getReports({
            type: "performance",
         });
         const reportsData = reportsResponse.data || [];

         // Load evaluations for analysis
         const evaluationsResponse = await evaluationService.getEvaluations({});
         const evaluations = evaluationsResponse.data || [];

         // Load users for analysis
         const usersResponse = await userService.getUsers({ role: "intern" });
         const interns = usersResponse.data || [];

         // Process department statistics
         const stats = processDepartmentStats(interns, evaluations);
         setDepartmentStats(stats);

         // Process top performers
         const performers = processTopPerformers(interns, evaluations);
         setTopPerformers(performers);

         // Add analysis to reports
         const reportsWithAnalysis = reportsData.map((report: any) => ({
            ...report,
            analysis: analyzeReportData(report, evaluations, interns),
         }));

         setReports(reportsWithAnalysis);
      } catch (error: any) {
         toast.error("Failed to load performance reports");
         console.error("Reports error:", error);
      } finally {
         setIsLoading(false);
      }
   };

   const processDepartmentStats = (interns: any[], evaluations: any[]) => {
      const deptMap = new Map();

      interns.forEach((intern) => {
         const deptId = intern.department_id || "unassigned";
         const deptName = intern.department?.name || "Unassigned";

         if (!deptMap.has(deptId)) {
            deptMap.set(deptId, {
               id: deptId,
               name: deptName,
               internCount: 0,
               totalScore: 0,
               evaluationCount: 0,
            });
         }

         deptMap.get(deptId).internCount++;
      });

      evaluations.forEach((evaluation) => {
         const intern = interns.find((i) => i.id === evaluation.intern_id);
         if (intern) {
            const deptId = intern.department_id || "unassigned";
            const dept = deptMap.get(deptId);
            if (dept) {
               dept.totalScore += evaluation.score;
               dept.evaluationCount++;
            }
         }
      });

      return Array.from(deptMap.values()).map((dept) => ({
         ...dept,
         avgScore:
            dept.evaluationCount > 0
               ? dept.totalScore / dept.evaluationCount
               : 0,
      }));
   };

   const processTopPerformers = (interns: any[], evaluations: any[]) => {
      const internScores = new Map();

      evaluations.forEach((evaluation) => {
         const internId = evaluation.intern_id;
         if (!internScores.has(internId)) {
            internScores.set(internId, {
               totalScore: 0,
               count: 0,
               lastEvaluation: evaluation.evaluated_at,
            });
         }

         const data = internScores.get(internId);
         data.totalScore += evaluation.score;
         data.count++;
         if (
            new Date(evaluation.evaluated_at) > new Date(data.lastEvaluation)
         ) {
            data.lastEvaluation = evaluation.evaluated_at;
         }
      });

      return Array.from(internScores.entries())
         .map(([internId, scores]) => {
            const intern = interns.find((i) => i.id === internId);
            return {
               intern,
               avgScore: scores.totalScore / scores.count,
               evaluationCount: scores.count,
               lastEvaluation: scores.lastEvaluation,
            };
         })
         .filter((item) => item.intern)
         .sort((a, b) => b.avgScore - a.avgScore)
         .slice(0, 10);
   };

   const analyzeReportData = (
      report: any,
      evaluations: any[],
      interns: any[]
   ) => {
      const reportEvaluations = evaluations.filter(
         (evalItem) =>
            new Date(evalItem.evaluated_at) >= new Date(report.period_start) &&
            new Date(evalItem.evaluated_at) <= new Date(report.period_end)
      );

      if (report.department_id) {
         const deptInterns = interns.filter(
            (intern) => intern.department_id === report.department_id
         );
         const deptEvaluations = reportEvaluations.filter((evalItem) =>
            deptInterns.some((intern) => intern.id === evalItem.intern_id)
         );
         return calculateStats(deptEvaluations);
      }

      return calculateStats(reportEvaluations);
   };

   const calculateStats = (evaluations: any[]) => {
      if (evaluations.length === 0) {
         return {
            total: 0,
            avgScore: 0,
            minScore: 0,
            maxScore: 0,
            byType: {},
         };
      }

      const scores = evaluations.map((e) => e.score);
      const byType = evaluations.reduce((acc, evalItem) => {
         const type = evalItem.evaluation_type;
         if (!acc[type]) acc[type] = 0;
         acc[type]++;
         return acc;
      }, {});

      return {
         total: evaluations.length,
         avgScore: scores.reduce((a, b) => a + b, 0) / scores.length,
         minScore: Math.min(...scores),
         maxScore: Math.max(...scores),
         byType,
      };
   };

   const filterReports = () => {
      let filtered = [...reports];

      if (searchTerm) {
         const term = searchTerm.toLowerCase();
         filtered = filtered.filter(
            (report) =>
               report.department?.name?.toLowerCase().includes(term) ||
               report.generated_by_user?.name?.toLowerCase().includes(term)
         );
      }

      if (departmentFilter !== "all") {
         filtered = filtered.filter(
            (report) => report.department_id?.toString() === departmentFilter
         );
      }

      setFilteredReports(filtered);
   };

   const exportReport = async (reportId: number) => {
      try {
         const report = reports.find((r) => r.id === reportId);
         if (!report) return;

         const reportData = {
            title: `Performance Report - ${report.period_start} to ${report.period_end}`,
            department: report.department?.name || "All Departments",
            period: `${report.period_start} to ${report.period_end}`,
            generated_by: report.generated_by_user?.name || "Unknown",
            generated_at: format(new Date(report.created_at), "PPP"),
            analysis: report.analysis,
            summary: generateSummary(report.analysis),
         };

         const dataStr = JSON.stringify(reportData, null, 2);
         const dataBlob = new Blob([dataStr], { type: "application/json" });
         const url = URL.createObjectURL(dataBlob);
         const link = document.createElement("a");
         link.href = url;
         link.download = `performance-report-${reportId}-${format(
            new Date(),
            "yyyy-MM-dd"
         )}.json`;
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
         URL.revokeObjectURL(url);

         toast.success("Report exported successfully");
      } catch (error) {
         toast.error("Failed to export report");
      }
   };

   const generateSummary = (analysis: any) => {
      if (analysis.total === 0)
         return "No performance data available for this period.";

      const trends = [];
      if (analysis.avgScore >= 90) trends.push("Excellent overall performance");
      else if (analysis.avgScore >= 80) trends.push("Good overall performance");
      else if (analysis.avgScore >= 70) trends.push("Average performance");
      else trends.push("Performance needs improvement");

      if (analysis.maxScore - analysis.minScore > 20) {
         trends.push("Significant variation in performance scores");
      }

      const topType = Object.entries(analysis.byType).sort(
         ([, a]: any, [, b]: any) => b - a
      )[0];

      if (topType) {
         trends.push(`Most common evaluation type: ${topType[0]}`);
      }

      return trends.join(". ") + ".";
   };

   const getScoreColor = (score: number) => {
      if (score >= 90) return "text-green-600";
      if (score >= 80) return "text-blue-600";
      if (score >= 70) return "text-yellow-600";
      return "text-red-600";
   };

   if (isLoading) {
      return (
         <div className="space-y-6">
            <div className="flex items-center justify-between">
               <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                     Performance Reports
                  </h1>
                  <p className="text-muted-foreground">
                     View and analyze performance reports
                  </p>
               </div>
               <Skeleton className="h-10 w-32" />
            </div>

            <div className="space-y-4">
               {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-24 w-full" />
               ))}
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
                  Performance Reports
               </h1>
               <p className="text-muted-foreground">
                  View and analyze intern performance reports
               </p>
            </div>
         </div>

         {/* Tabs */}
         <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
               <TabsTrigger value="reports">Reports</TabsTrigger>
               <TabsTrigger value="analytics">Analytics</TabsTrigger>
               <TabsTrigger value="performers">Top Performers</TabsTrigger>
            </TabsList>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
               {/* Filters */}
               <Card>
                  <CardContent className="pt-6">
                     <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                           <div className="relative">
                              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                 placeholder="Search reports by department or manager..."
                                 value={searchTerm}
                                 onChange={(e) => setSearchTerm(e.target.value)}
                                 className="pl-10"
                              />
                           </div>
                        </div>
                        <Select
                           value={departmentFilter}
                           onValueChange={setDepartmentFilter}
                        >
                           <SelectTrigger className="w-40">
                              <SelectValue placeholder="Filter by department" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="all">
                                 All Departments
                              </SelectItem>
                              {departmentStats.map((dept) => (
                                 <SelectItem
                                    key={dept.id}
                                    value={dept.id.toString()}
                                 >
                                    {dept.name}
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     </div>
                  </CardContent>
               </Card>

               {/* Reports List */}
               {filteredReports.length === 0 ? (
                  <Card>
                     <CardContent className="py-12 text-center">
                        <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                           No Reports Found
                        </h3>
                        <p className="text-gray-500">
                           {searchTerm || departmentFilter !== "all"
                              ? "No reports match your search criteria"
                              : "No performance reports have been generated yet"}
                        </p>
                     </CardContent>
                  </Card>
               ) : (
                  <div className="space-y-4">
                     {filteredReports.map((report) => (
                        <Card key={report.id}>
                           <CardHeader>
                              <div className="flex items-center justify-between">
                                 <div>
                                    <CardTitle className="flex items-center gap-2">
                                       Performance Report
                                       {report.sent_to_admin && (
                                          <Badge className="bg-blue-100 text-blue-800">
                                             Sent to Admin
                                          </Badge>
                                       )}
                                    </CardTitle>
                                    <CardDescription>
                                       Period: {formatDate(report.period_start)}{" "}
                                       - {formatDate(report.period_end)}
                                       {report.department &&
                                          ` • Department: ${report.department.name}`}
                                    </CardDescription>
                                 </div>
                                 <div className="flex items-center gap-2">
                                    <Button
                                       variant="outline"
                                       size="sm"
                                       onClick={() => exportReport(report.id)}
                                    >
                                       <Download className="mr-2 h-4 w-4" />
                                       Export
                                    </Button>
                                 </div>
                              </div>
                           </CardHeader>
                           <CardContent>
                              {/* Analysis Summary */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                 <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div
                                       className={`text-2xl font-bold ${getScoreColor(
                                          report.analysis.avgScore
                                       )}`}
                                    >
                                       {formatPercentage(
                                          report.analysis.avgScore
                                       )}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                       Average Score
                                    </div>
                                 </div>
                                 <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div className="text-2xl font-bold">
                                       {report.analysis.total}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                       Total Evaluations
                                    </div>
                                 </div>
                                 <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div
                                       className={`text-2xl font-bold ${getScoreColor(
                                          report.analysis.maxScore
                                       )}`}
                                    >
                                       {formatPercentage(
                                          report.analysis.maxScore
                                       )}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                       Highest Score
                                    </div>
                                 </div>
                                 <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div
                                       className={`text-2xl font-bold ${getScoreColor(
                                          report.analysis.minScore
                                       )}`}
                                    >
                                       {formatPercentage(
                                          report.analysis.minScore
                                       )}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                       Lowest Score
                                    </div>
                                 </div>
                              </div>

                              {/* Evaluation Types */}
                              {Object.keys(report.analysis.byType).length >
                                 0 && (
                                 <div className="mt-6">
                                    <h4 className="font-semibold mb-3">
                                       Evaluation Types
                                    </h4>
                                    <div className="space-y-2">
                                       {Object.entries(
                                          report.analysis.byType
                                       ).map(([type, count]: [string, any]) => (
                                          <div
                                             key={type}
                                             className="flex items-center justify-between"
                                          >
                                             <span className="text-sm capitalize">
                                                {type.replace("_", " ")}
                                             </span>
                                             <div className="flex items-center gap-2">
                                                <Progress
                                                   value={
                                                      (count /
                                                         report.analysis
                                                            .total) *
                                                      100
                                                   }
                                                   className="w-32"
                                                />
                                                <span className="text-sm font-medium">
                                                   {count}
                                                </span>
                                             </div>
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                              )}

                              {/* Summary */}
                              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                 <h4 className="font-semibold text-blue-900 mb-2">
                                    Summary
                                 </h4>
                                 <p className="text-sm text-blue-800">
                                    {generateSummary(report.analysis)}
                                 </p>
                              </div>

                              <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
                                 <div>
                                    Generated by:{" "}
                                    <span className="font-medium">
                                       {report.generated_by_user?.name ||
                                          "Unknown"}
                                    </span>
                                 </div>
                                 <div>
                                    Generated on:{" "}
                                    {format(
                                       new Date(report.created_at),
                                       "PPpp"
                                    )}
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                     ))}
                  </div>
               )}
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
               <Card>
                  <CardHeader>
                     <CardTitle>Department Performance</CardTitle>
                     <CardDescription>
                        Average scores by department
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                           <BarChart data={departmentStats}>
                              <CartesianGrid
                                 strokeDasharray="3 3"
                                 stroke="#f0f0f0"
                              />
                              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                              <YAxis
                                 tick={{ fontSize: 12 }}
                                 domain={[0, 100]}
                                 label={{
                                    value: "Score (%)",
                                    angle: -90,
                                    position: "insideLeft",
                                 }}
                              />
                              <Tooltip
                                 formatter={(value: number) => [
                                    `${value.toFixed(1)}%`,
                                    "Average Score",
                                 ]}
                              />
                              <Bar
                                 dataKey="avgScore"
                                 fill="#3b82f6"
                                 radius={[4, 4, 0, 0]}
                                 name="Average Score"
                              />
                           </BarChart>
                        </ResponsiveContainer>
                     </div>
                  </CardContent>
               </Card>

               <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                     <CardHeader>
                        <CardTitle>Department Details</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-4">
                           {departmentStats.map((dept) => (
                              <div
                                 key={dept.id}
                                 className="flex items-center justify-between p-3 border rounded-lg"
                              >
                                 <div>
                                    <div className="font-medium">
                                       {dept.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                       {dept.internCount} interns
                                    </div>
                                 </div>
                                 <div className="text-right">
                                    <div
                                       className={`text-xl font-bold ${getScoreColor(
                                          dept.avgScore
                                       )}`}
                                    >
                                       {formatPercentage(dept.avgScore)}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                       Avg. Score
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardHeader>
                        <CardTitle>Performance Trends</CardTitle>
                        <CardDescription>
                           Recent evaluation trends
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-4">
                           <div className="text-center p-6 bg-gray-50 rounded-lg">
                              <div className="text-3xl font-bold text-gray-900">
                                 {reports.length}
                              </div>
                              <div className="text-gray-500">Total Reports</div>
                           </div>
                           <div className="text-center p-6 bg-gray-50 rounded-lg">
                              <div className="text-3xl font-bold text-blue-600">
                                 {departmentStats.length}
                              </div>
                              <div className="text-gray-500">
                                 Departments Tracked
                              </div>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </TabsContent>

            {/* Top Performers Tab */}
            <TabsContent value="performers" className="space-y-6">
               <Card>
                  <CardHeader>
                     <CardTitle>Top Performers</CardTitle>
                     <CardDescription>
                        Interns with highest average scores
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     {topPerformers.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                           No performance data available
                        </div>
                     ) : (
                        <Table>
                           <TableHeader>
                              <TableRow>
                                 <TableHead>Rank</TableHead>
                                 <TableHead>Intern</TableHead>
                                 <TableHead>Department</TableHead>
                                 <TableHead>Average Score</TableHead>
                                 <TableHead>Evaluations</TableHead>
                                 <TableHead>Last Evaluation</TableHead>
                              </TableRow>
                           </TableHeader>
                           <TableBody>
                              {topPerformers.map((performer, index) => (
                                 <TableRow key={performer.intern.id}>
                                    <TableCell>
                                       <div
                                          className={`flex items-center justify-center w-8 h-8 rounded-full ${
                                             index === 0
                                                ? "bg-yellow-100 text-yellow-800"
                                                : index === 1
                                                ? "bg-gray-100 text-gray-800"
                                                : index === 2
                                                ? "bg-amber-100 text-amber-800"
                                                : "bg-blue-50 text-blue-800"
                                          }`}
                                       >
                                          {index + 1}
                                       </div>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                       {performer.intern.name}
                                    </TableCell>
                                    <TableCell>
                                       {performer.intern.department?.name ||
                                          "Unassigned"}
                                    </TableCell>
                                    <TableCell>
                                       <div
                                          className={`font-bold ${getScoreColor(
                                             performer.avgScore
                                          )}`}
                                       >
                                          {formatPercentage(performer.avgScore)}
                                       </div>
                                    </TableCell>
                                    <TableCell>
                                       <Badge variant="outline">
                                          {performer.evaluationCount}
                                       </Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-500">
                                       {format(
                                          new Date(performer.lastEvaluation),
                                          "MMM dd, yyyy"
                                       )}
                                    </TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     )}
                  </CardContent>
               </Card>
            </TabsContent>
         </Tabs>
      </div>
   );
}

```

## File: pages/auth/LoginPage.tsx
```tsx
// src/pages/auth/LoginPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/authService';
import { toast } from 'sonner';
import { Loader2, Building, Lock, Mail } from 'lucide-react';
import { config } from '@/config/env';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      
      const response = await authService.login(data);
      
      setAuth(response.user, response.token);
      toast.success('Login successful!');
      
      // Redirect based on role
      navigate(response.redirect_to);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role: 'admin' | 'manager' | 'intern') => {
    const credentials = {
      admin: { email: 'admin@manageintern.com', password: 'password123' },
      manager: { email: 'manager1@test.com', password: 'password123' },
      intern: { email: 'intern1@test.com', password: 'password123' },
    }[role];

    try {
      setIsLoading(true);
      
      const response = await authService.login(credentials);
      
      setAuth(response.user, response.token);
      toast.success(`Logged in as ${role}`);
      
      navigate(response.redirect_to);
    } catch (error) {
      toast.error('Demo login failed. Please try manually.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8">
        {/* Left side - Branding */}
        <div className="hidden md:flex flex-col justify-center space-y-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-600 rounded-lg">
              <Building className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{config.APP_NAME}</h1>
              <p className="text-gray-600">Streamline your internship management process</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Admin Dashboard</h3>
                <p className="text-sm text-gray-600">Full system control and user management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Manager Tools</h3>
                <p className="text-sm text-gray-600">Task assignment, attendance tracking, evaluations</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Intern Portal</h3>
                <p className="text-sm text-gray-600">View tasks, evaluations, and submit reclamations</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Login Form */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md shadow-xl border-0">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
              <CardDescription className="text-center">
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      {...register('email')}
                      className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      {...register('password')}
                      className={`pl-10 ${errors.password ? 'border-red-500' : ''}`}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
              
              {/* Demo Login Buttons */}
              <div className="mt-8 pt-6 border-t">
                <p className="text-sm text-muted-foreground mb-4 text-center">
                  Try demo accounts:
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin('admin')}
                    disabled={isLoading}
                    className="text-xs"
                  >
                    Admin
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin('manager')}
                    disabled={isLoading}
                    className="text-xs"
                  >
                    Manager
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin('intern')}
                    disabled={isLoading}
                    className="text-xs"
                  >
                    Intern
                  </Button>
                </div>
              </div>
              
              {/* Test Credentials */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-xs text-muted-foreground mb-2">Test Credentials:</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="font-medium">Admin:</span>
                    <code className="bg-gray-100 px-2 py-1 rounded">admin@manageintern.com</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Password:</span>
                    <code className="bg-gray-100 px-2 py-1 rounded">password123</code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
```

## File: pages/common/NotFound.tsx
```tsx
// src/pages/common/NotFound.tsx
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
   const navigate = useNavigate();

   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
         <div className="text-center">
            <h1 className="text-9xl font-bold text-gray-300">404</h1>
            <h2 className="text-3xl font-semibold text-gray-800 mt-4">
               Page Not Found
            </h2>
            <p className="text-gray-600 mt-2">
               The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
               <Button onClick={() => navigate(-1)} variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
               </Button>
               <Button onClick={() => navigate("/")}>
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
               </Button>
            </div>
         </div>
      </div>
   );
}

```

## File: pages/common/Unauthorized.tsx
```tsx
import { Button } from '@/components/ui/button';
import { Shield, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
          <Shield className="h-10 w-10 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Access Denied</h1>
        <p className="text-gray-600 mt-2 max-w-md">
          You don't have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        <div className="mt-8">
          <Button onClick={() => navigate('/')}>
            <Home className="mr-2 h-4 w-4" />
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
```

## File: pages/intern/Dashboard.tsx
```tsx
// src/pages/intern/Dashboard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  CheckSquare, 
  Star, 
  Bell, 
  Calendar,
  TrendingUp,
  Clock,
  AlertCircle,
  Target,
  Award
} from 'lucide-react';
import { useDashboardStore } from '@/stores/dashboardStore';
import { useEffect } from 'react';
import { dashboardService } from '@/services/dashboardService.ts';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

const statCards = [
  {
    title: 'My Tasks',
    value: '8',
    icon: CheckSquare,
    color: 'bg-blue-500',
    change: '+2',
    description: 'Assigned to you',
  },
  {
    title: 'Average Score',
    value: '88%',
    icon: Star,
    color: 'bg-green-500',
    change: '+5%',
    description: 'This month',
  },
  {
    title: 'Notifications',
    value: '3',
    icon: Bell,
    color: 'bg-amber-500',
    change: 'New',
    description: 'Unread messages',
  },
  {
    title: 'Attendance Rate',
    value: '100%',
    icon: Calendar,
    color: 'bg-purple-500',
    change: 'Perfect',
    description: 'This month',
  },
];

export default function InternDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { stats, isLoading, setStats } = useDashboardStore();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const data = await dashboardService.getInternDashboard();
      setStats(data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const pendingTasks = [
    { id: 1, title: 'Complete API Documentation', priority: 'High', due: 'Tomorrow' },
    { id: 2, title: 'Learn React Query', priority: 'Medium', due: 'In 3 days' },
  ];

  const recentEvaluations = [
    { id: 1, type: 'Monthly', score: 92, date: '1 week ago' },
    { id: 2, type: 'Weekly', score: 88, date: '3 days ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.name}!</h1>
          <p className="text-muted-foreground">
            Track your progress and upcoming tasks
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => navigate('/intern/reclamations/new')}>
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
                <div className={`p-2 rounded-full ${stat.color} text-white`}>
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-green-500 font-medium">{stat.change}</span>
                  <span className="ml-1">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tasks & Evaluations */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckSquare className="mr-2 h-5 w-5 text-blue-500" />
              Pending Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100"
                >
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        task.priority === 'High' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {task.priority}
                      </span>
                      <span className="text-xs text-gray-500">
                        Due: {task.due}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => navigate(`/intern/tasks/${task.id}`)}
                  >
                    View
                  </Button>
                </div>
              ))}
              {pendingTasks.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No pending tasks
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Evaluations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="mr-2 h-5 w-5 text-purple-500" />
              Recent Evaluations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentEvaluations.map((evaluation) => (
                <div
                  key={evaluation.id}
                  className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-100"
                >
                  <div>
                    <p className="font-medium">{evaluation.type} Evaluation</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-bold">{evaluation.score}%</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {evaluation.date}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/intern/evaluations/${evaluation.id}`)}
                  >
                    Details
                  </Button>
                </div>
              ))}
              {recentEvaluations.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No evaluations yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="mr-2 h-5 w-5 text-green-500" />
            Performance Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">92%</div>
                <p className="text-sm text-gray-500">Task Completion</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">100%</div>
                <p className="text-sm text-gray-500">Attendance</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">88%</div>
                <p className="text-sm text-gray-500">Avg. Score</p>
              </div>
            </div>
            
            <div className="pt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Weekly Goals</span>
                <span>4/5 completed</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            
            <div className="pt-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Skill Development</span>
                <span>3/4 milestones</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5 text-amber-500" />
            Upcoming Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { task: 'Complete React Project', deadline: 'Tomorrow', priority: 'High' },
              { task: 'Submit Weekly Report', deadline: 'In 2 days', priority: 'Medium' },
              { task: 'Team Presentation', deadline: 'Friday', priority: 'High' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`h-2 w-2 rounded-full ${
                    item.priority === 'High' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}></div>
                  <div>
                    <p className="font-medium">{item.task}</p>
                    <p className="text-sm text-gray-500">Due: {item.deadline}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.priority === 'High' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.priority}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

## File: pages/intern/MyAttendancePage.tsx
```tsx
export default function MyAttendancePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Attendance</h1>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">
          My Attendance page is under development. Full functionality coming soon!
        </p>
      </div>
    </div>
  );
}
```

## File: pages/intern/MyEvaluationsPage.tsx
```tsx
export default function MyEvaluationsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Evaluations</h1>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">
          My Evaluations page is under development. Full functionality coming soon!
        </p>
      </div>
    </div>
  );
}
```

## File: pages/intern/MyNotificationsPage.tsx
```tsx
export default function MyNotificationsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Notifications</h1>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">
          My Notifications page is under development. Full functionality coming soon!
        </p>
      </div>
    </div>
  );
}
```

## File: pages/intern/MyReclamationsPage.tsx
```tsx
export default function MyReclamationsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Reclamations</h1>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">
          My Reclamations page is under development. Full functionality coming soon!
        </p>
      </div>
    </div>
  );
}
```

## File: pages/intern/MyTasksPage.tsx
```tsx
export default function MyTasksPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">
          My Tasks page is under development. Full functionality coming soon!
        </p>
      </div>
    </div>
  );
}
```

## File: pages/intern/NewReclamationPage.tsx
```tsx
import { useState } from "react";
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
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Loader2, ArrowLeft, AlertCircle } from "lucide-react";
import { reclamationService } from "@/services/reclamationService";

const reclamationSchema = z.object({
   subject: z.string().min(1, "Subject is required"),
   description: z.string().min(1, "Description is required"),
});

type ReclamationFormData = z.infer<typeof reclamationSchema>;

export default function NewReclamationPage() {
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false);

   const form = useForm<ReclamationFormData>({
      resolver: zodResolver(reclamationSchema),
      defaultValues: {
         subject: "",
         description: "",
      },
   });

   const onSubmit = async (data: ReclamationFormData) => {
      try {
         setIsLoading(true);

         await reclamationService.createReclamation(data);

         toast.success("Reclamation submitted successfully!");
         navigate("/intern/reclamations");
      } catch (error: any) {
         if (error.response?.status === 422) {
            const errors = error.response.data?.errors;
            if (errors) {
               Object.entries(errors).forEach(([field, messages]) => {
                  toast.error(`${field}: ${(messages as string[])[0]}`);
               });
            }
         } else {
            toast.error(
               error.response?.data?.message || "Failed to submit reclamation"
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
                  onClick={() => navigate("/intern/reclamations")}
               >
                  <ArrowLeft className="h-4 w-4" />
               </Button>
               <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                     Submit Reclamation
                  </h1>
                  <p className="text-muted-foreground">
                     Submit a reclamation to your manager
                  </p>
               </div>
            </div>
         </div>

         <Card>
            <CardHeader>
               <CardTitle>Reclamation Details</CardTitle>
               <CardDescription>
                  Describe your issue or concern. Your manager will review it.
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
                        name="subject"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Subject *</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="Brief subject of your reclamation"
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
                                    placeholder="Describe your issue in detail..."
                                    className="min-h-[200px]"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <div className="flex items-center p-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-amber-600 mr-3" />
                        <p className="text-sm text-amber-800">
                           Your reclamation will be sent to your manager for
                           review. Please provide clear details.
                        </p>
                     </div>

                     <div className="flex justify-end space-x-3 pt-4">
                        <Button
                           type="button"
                           variant="outline"
                           onClick={() => navigate("/intern/reclamations")}
                           disabled={isLoading}
                        >
                           Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                           {isLoading ? (
                              <>
                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                 Submitting...
                              </>
                           ) : (
                              "Submit Reclamation"
                           )}
                        </Button>
                     </div>
                  </form>
               </Form>
            </CardContent>
         </Card>
      </div>
   );
}

```

## File: pages/manager/AssignInterns.tsx
```tsx
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2, Users, CheckCircle, XCircle } from 'lucide-react';
import { userService } from '@/services/userService';

const assignSchema = z.object({
  intern_id: z.coerce.number().min(1, 'Please select an intern'),
  department_id: z.coerce.number().min(1, 'Please select a department'),
  manager_id: z.coerce.number().min(1, 'Please select a manager'),
});

type AssignFormData = z.infer<typeof assignSchema>;

export default function AssignInterns() {
  const [isLoading, setIsLoading] = useState(false);
  const [interns, setInterns] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [managers, setManagers] = useState<any[]>([]);
  const [assignedInterns, setAssignedInterns] = useState<any[]>([]);

  const form = useForm<AssignFormData>({
    resolver: zodResolver(assignSchema),
    defaultValues: {
      intern_id: undefined,
      department_id: undefined,
      manager_id: undefined,
    },
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [internsData, managersData] = await Promise.all([
        userService.getUnassignedInterns(),
        userService.getManagers(),
      ]);
      
      setInterns(internsData);
      setManagers(managersData);
      
      // Mock departments (should come from API)
      setDepartments([
        { id: 1, name: 'Engineering' },
        { id: 2, name: 'Marketing' },
        { id: 3, name: 'Sales' },
        { id: 4, name: 'Human Resources' },
        { id: 5, name: 'Finance' },
      ]);
      
      // Load assigned interns
      const assignedResponse = await userService.getInterns({ unassigned: false });
      setAssignedInterns(assignedResponse);
    } catch (error) {
      toast.error('Failed to load data');
    }
  };

  const onSubmit = async (data: AssignFormData) => {
    try {
      setIsLoading(true);
      
      // Check if intern is already assigned
      const isAlreadyAssigned = assignedInterns.some(intern => intern.id === data.intern_id);
      if (isAlreadyAssigned) {
        toast.error('This intern is already assigned to a department');
        return;
      }

      await userService.assignIntern(data.intern_id, {
        department_id: data.department_id,
        manager_id: data.manager_id,
      });
      
      toast.success('Intern assigned successfully!');
      form.reset();
      loadData(); // Refresh data
    } catch (error: any) {
      if (error.response?.status === 422) {
        toast.error('Validation error. Please check your inputs.');
      } else {
        toast.error(error.response?.data?.message || 'Failed to assign intern');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const departmentId = form.watch('department_id');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assign Interns</h1>
          <p className="text-muted-foreground">
            Assign interns to departments and managers
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Assignment Form */}
        <Card>
          <CardHeader>
            <CardTitle>Assign New Intern</CardTitle>
            <CardDescription>
              Select an unassigned intern and assign them to a department and manager
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="intern_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Intern *</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value?.toString()}
                        disabled={interns.length === 0}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={
                              interns.length === 0 
                                ? "No unassigned interns available" 
                                : "Select an intern"
                            } />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {interns.map((intern) => (
                            <SelectItem key={intern.id} value={intern.id.toString()}>
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
                  name="department_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Department *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
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

                <FormField
                  control={form.control}
                  name="manager_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Manager *</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value?.toString()}
                        disabled={!departmentId}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={
                              departmentId 
                                ? "Select a manager" 
                                : "Select department first"
                            } />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {managers
                            .filter(manager => manager.department_id === departmentId)
                            .map((manager) => (
                              <SelectItem key={manager.id} value={manager.id.toString()}>
                                {manager.name} - {manager.email}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Assigning...
                    </>
                  ) : (
                    'Assign Intern'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Assigned Interns List */}
        <Card>
          <CardHeader>
            <CardTitle>Assigned Interns</CardTitle>
            <CardDescription>
              Interns currently assigned to departments
            </CardDescription>
          </CardHeader>
          <CardContent>
            {assignedInterns.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No interns assigned yet
              </div>
            ) : (
              <div className="space-y-3">
                {assignedInterns.slice(0, 5).map((intern) => (
                  <div key={intern.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{intern.name}</p>
                      <div className="text-sm text-gray-500">
                        {intern.department?.name || 'No department'} • {intern.manager?.name || 'No manager'}
                      </div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                ))}
                {assignedInterns.length > 5 && (
                  <p className="text-center text-sm text-gray-500">
                    +{assignedInterns.length - 5} more interns
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Unassigned Interns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Unassigned Interns</CardTitle>
          <CardDescription>
            Interns waiting to be assigned to departments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {interns.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              All interns have been assigned
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {interns.map((intern) => (
                  <TableRow key={intern.id}>
                    <TableCell className="font-medium">{intern.name}</TableCell>
                    <TableCell>{intern.email}</TuableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <XCircle className="h-4 w-4 text-amber-500 mr-2" />
                        <span className="text-amber-600">Unassigned</span>
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
```

## File: pages/manager/AttendancePage.tsx
```tsx
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

```

## File: pages/manager/Dashboard.tsx
```tsx
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
import { dashboardService } from "@/services/dashboardService";
import { attendanceService } from "@/services/attendanceService";

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
   const [stats, setStats] = useState<DashboardStats | null>(null);

   useEffect(() => {
      loadDashboardData();
   }, []);

   const loadDashboardData = async () => {
      try {
         setIsLoading(true);

         // Fetch dashboard data from API
         const response = await dashboardService.getManagerDashboard();

         // Handle different response structures from API
         let dashboardData: DashboardStats;

         if (response?.data) {
            // If API returns { data: {...} }
            dashboardData = response.data as DashboardStats;
         } else if (response) {
            // If API returns data directly
            dashboardData = response as any;
         } else {
            throw new Error("No data received from server");
         }

         // Ensure all required fields exist with defaults
         setStats({
            total_interns: dashboardData.total_interns ?? 0,
            pending_tasks: dashboardData.pending_tasks ?? 0,
            todays_attendance: dashboardData.todays_attendance ?? "0/0",
            average_score: dashboardData.average_score ?? 0,
            pending_reclamations: dashboardData.pending_reclamations ?? 0,
            recent_activity: dashboardData.recent_activity ?? [],
         });
      } catch (error: any) {
         console.error("Failed to load dashboard data:", error);

         // Show user-friendly error message
         const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to load dashboard data";

         toast.error(errorMessage, {
            description: "Please try refreshing the page",
         });

         // Set empty stats to prevent crashes
         setStats({
            total_interns: 0,
            pending_tasks: 0,
            todays_attendance: "0/0",
            average_score: 0,
            pending_reclamations: 0,
            recent_activity: [],
         });
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
      // For attendance, check if there are interns first
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

   // Loading State
   if (isLoading) {
      return (
         <div className="space-y-6">
            {/* Loading Header */}
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

            {/* Loading Stats Grid */}
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

            {/* Loading Message */}
            <div className="flex items-center justify-center py-12">
               <div className="text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                     Loading Dashboard
                  </h3>
                  <p className="text-gray-500">Fetching your team data...</p>
               </div>
            </div>
         </div>
      );
   }

   // Error State
   if (!stats) {
      return (
         <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
               <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
               <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Failed to Load Dashboard
               </h3>
               <p className="text-gray-500 mb-4">
                  Unable to retrieve dashboard data
               </p>
               <Button onClick={handleRefresh} disabled={isRefreshing}>
                  {isRefreshing ? (
                     <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Refreshing...
                     </>
                  ) : (
                     <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Try Again
                     </>
                  )}
               </Button>
            </div>
         </div>
      );
   }

   // Stat Cards Configuration
   const statCards = [
      {
         title: "My Interns",
         value: stats.total_interns.toString(),
         icon: Users,
         color: "bg-blue-500",
         description: "In your department",
         trend: "+2 this month",
         trendUp: true,
      },
      {
         title: "Pending Tasks",
         value: stats.pending_tasks.toString(),
         icon: CheckSquare,
         color: "bg-amber-500",
         description: "Require attention",
         trend: "5 overdue",
         trendUp: false,
      },
      {
         title: "Today's Attendance",
         value: stats.todays_attendance,
         icon: Calendar,
         color: "bg-green-500",
         description: "Present today",
         trend: "95% rate",
         trendUp: true,
      },
      {
         title: "Average Score",
         value: `${stats.average_score}%`,
         icon: Star,
         color: "bg-purple-500",
         description: "Team average",
         trend: "+3% vs last month",
         trendUp: true,
      },
   ];

   // Quick Actions Configuration
   const quickActions = [
      {
         title: "Assign New Task",
         description: "Create and assign a task to intern",
         icon: Plus,
         path: "/manager/tasks/new",
         color: "bg-blue-100 text-blue-600",
         enabled: true,
      },
      {
         title: "Mark Attendance",
         description: "Record today's attendance",
         icon: Calendar,
         path: "/manager/attendance",
         color: "bg-green-100 text-green-600",
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
         color: "bg-purple-100 text-purple-600",
         enabled: true,
      },
   ];

   return (
      <div className="space-y-6">
         {/* Header */}
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

         {/* Stats Grid */}
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
                                 stat.trendUp
                                    ? "text-green-500"
                                    : "text-red-500"
                              }`}
                           />
                           <span
                              className={`text-xs ${
                                 stat.trendUp
                                    ? "text-green-600"
                                    : "text-red-600"
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

         {/* Quick Actions */}
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
                              : "hover:border-blue-300 hover:shadow-sm"
                        }`}
                        disabled={isDisabled}
                     >
                        <div className="flex items-start justify-between mb-3">
                           <div className={`p-2 rounded-lg ${action.color}`}>
                              <Icon className="h-5 w-5" />
                           </div>
                           {!isDisabled && (
                              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
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

         {/* Alerts & Activity Section */}
         <div className="grid gap-6 lg:grid-cols-2">
            {/* Pending Reclamations Card */}
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

            {/* Recent Activity Card */}
            <Card>
               <CardHeader>
                  <CardTitle className="flex items-center">
                     <Clock className="mr-2 h-5 w-5 text-purple-500" />
                     Recent Activity
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  {stats.recent_activity && stats.recent_activity.length > 0 ? (
                     <div className="space-y-3">
                        {stats.recent_activity
                           .slice(0, 4)
                           .map((activity, index) => {
                              // Determine icon based on activity type
                              let ActivityIcon = CheckSquare;
                              let iconColor = "text-blue-600";
                              let bgColor = "bg-blue-100";

                              if (activity.type === "reclamation") {
                                 ActivityIcon = AlertCircle;
                                 iconColor = "text-amber-600";
                                 bgColor = "bg-amber-100";
                              } else if (activity.type === "attendance") {
                                 ActivityIcon = Calendar;
                                 iconColor = "text-green-600";
                                 bgColor = "bg-green-100";
                              } else if (activity.type === "evaluation") {
                                 ActivityIcon = Star;
                                 iconColor = "text-purple-600";
                                 bgColor = "bg-purple-100";
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
                        {stats.recent_activity.length > 4 && (
                           <Button
                              variant="ghost"
                              className="w-full text-sm"
                              onClick={() => {
                                 toast.info("Activity log feature coming soon");
                              }}
                           >
                              View All Activity
                           </Button>
                        )}
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

         {/* Team Overview Card */}
         <Card>
            <CardHeader>
               <CardTitle>Team Overview</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div
                     className="text-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
                     onClick={() => navigate("/manager/tasks")}
                  >
                     <div className="text-2xl font-bold text-blue-600">
                        {stats.total_interns}
                     </div>
                     <div className="text-sm text-gray-600 mt-1">
                        Total Interns
                     </div>
                     <div className="text-xs text-blue-500 mt-1">
                        View All →
                     </div>
                  </div>
                  <div
                     className="text-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer"
                     onClick={() => navigate("/manager/attendance")}
                  >
                     <div className="text-2xl font-bold text-green-600">
                        {stats.todays_attendance.split("/")[0]}/
                        {stats.todays_attendance.split("/")[1]}
                     </div>
                     <div className="text-sm text-gray-600 mt-1">
                        Present Today
                     </div>
                     <div className="text-xs text-green-500 mt-1">
                        Mark Attendance →
                     </div>
                  </div>
                  <div
                     className="text-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer"
                     onClick={() => navigate("/manager/evaluations")}
                  >
                     <div className="text-2xl font-bold text-purple-600">
                        {stats.average_score}%
                     </div>
                     <div className="text-sm text-gray-600 mt-1">
                        Average Score
                     </div>
                     <div className="text-xs text-purple-500 mt-1">
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

         {/* Additional Quick Links */}
         <Card>
            <CardHeader>
               <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                     variant="outline"
                     className="h-auto py-4 justify-start"
                     onClick={() => toast.info("Documentation coming soon")}
                  >
                     <div className="text-left">
                        <p className="font-medium">View Documentation</p>
                        <p className="text-xs text-gray-500">
                           Learn how to use the system
                        </p>
                     </div>
                  </Button>
                  <Button
                     variant="outline"
                     className="h-auto py-4 justify-start"
                     onClick={() => navigate("/manager/reports")}
                  >
                     <div className="text-left">
                        <p className="font-medium">Generate Report</p>
                        <p className="text-xs text-gray-500">
                           Create attendance or performance report
                        </p>
                     </div>
                  </Button>
                  <Button
                     variant="outline"
                     className="h-auto py-4 justify-start"
                     onClick={() => toast.info("Support feature coming soon")}
                  >
                     <div className="text-left">
                        <p className="font-medium">Contact Support</p>
                        <p className="text-xs text-gray-500">
                           Get help with any issues
                        </p>
                     </div>
                  </Button>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}

```

## File: pages/manager/EvaluationsPage.tsx
```tsx
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
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
   Plus,
   Search,
   Filter,
   Star,
   Edit,
   Trash2,
   CheckCircle,
   XCircle,
   TrendingUp,
   Award,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { evaluationService } from "@/services/evaluationService";
import { userService } from "@/services/userService";

// FIXED: Using correct Zod syntax - remove invalid options from z.number()
const evaluationSchema = z.object({
   intern_id: z.number().min(1, "Please select an intern"),
   score: z.number()
      .min(0, "Score must be at least 0")
      .max(100, "Score cannot exceed 100"),
   feedback: z.string().min(1, "Feedback is required"),
   evaluation_type: z.enum(["weekly", "monthly", "quarterly", "final"]),
   strengths: z.string().optional(),
   areas_for_improvement: z.string().optional(),
});

type EvaluationFormData = z.infer<typeof evaluationSchema>;

export default function EvaluationsPage() {
   const [evaluations, setEvaluations] = useState<any[]>([]);
   const [filteredEvaluations, setFilteredEvaluations] = useState<any[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [interns, setInterns] = useState<any[]>([]);
   const [typeFilter, setTypeFilter] = useState("all");
   const [searchTerm, setSearchTerm] = useState("");

   const form = useForm<EvaluationFormData>({
      resolver: zodResolver(evaluationSchema),
      defaultValues: {
         intern_id: 0,
         score: 0,
         feedback: "",
         evaluation_type: "weekly",
         strengths: "",
         areas_for_improvement: "",
      },
   });

   useEffect(() => {
      loadData();
   }, []);

   useEffect(() => {
      filterEvaluations();
   }, [evaluations, typeFilter, searchTerm]);

   const loadData = async () => {
      try {
         setIsLoading(true);
         
         // Use userService to get interns
         const internsResponse = await userService.getInterns();
         setInterns(internsResponse || []);
         
         // Load evaluations
         const evaluationsResponse = await evaluationService.getEvaluations();
         setEvaluations(evaluationsResponse.data || []);
      } catch (error) {
         toast.error("Failed to load data");
         console.error("Load data error:", error);
      } finally {
         setIsLoading(false);
      }
   };

   const filterEvaluations = () => {
      let filtered = [...evaluations];

      if (typeFilter !== "all") {
         filtered = filtered.filter(
            (evaluation) => evaluation.evaluation_type === typeFilter
         );
      }

      if (searchTerm) {
         const term = searchTerm.toLowerCase();
         filtered = filtered.filter(
            (evaluation) =>
               evaluation.intern?.name?.toLowerCase().includes(term) ||
               evaluation.feedback?.toLowerCase().includes(term)
         );
      }

      setFilteredEvaluations(filtered);
   };

   const onSubmit = async (data: EvaluationFormData) => {
      try {
         await evaluationService.createEvaluation(data);
         toast.success("Evaluation created successfully!");
         setIsDialogOpen(false);
         form.reset({
            intern_id: 0,
            score: 0,
            feedback: "",
            evaluation_type: "weekly",
            strengths: "",
            areas_for_improvement: "",
         });
         loadData();
      } catch (error: any) {
         if (error.response?.status === 422) {
            const errors = error.response.data?.errors;
            if (errors) {
               Object.entries(errors).forEach(([field, messages]) => {
                  toast.error(`${field}: ${(messages as string[])[0]}`);
               });
            }
         } else {
            toast.error(error.response?.data?.message || "Failed to create evaluation");
         }
      }
   };

   const getScoreColor = (score: number) => {
      if (score >= 90) return "text-green-600";
      if (score >= 80) return "text-blue-600";
      if (score >= 70) return "text-yellow-600";
      return "text-red-600";
   };

   const getScoreBadge = (score: number) => {
      if (score >= 90) return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
      if (score >= 80) return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
      if (score >= 70) return <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>;
      return <Badge className="bg-red-100 text-red-800">Needs Improvement</Badge>;
   };

   const handleDeleteEvaluation = async (id: number) => {
      if (!confirm("Are you sure you want to delete this evaluation?")) return;
      
      try {
         await evaluationService.deleteEvaluation(id);
         toast.success("Evaluation deleted successfully!");
         loadData();
      } catch (error) {
         toast.error("Failed to delete evaluation");
      }
   };

   if (isLoading) {
      return (
         <div className="space-y-6">
            <div className="flex items-center justify-between">
               <div>
                  <h1 className="text-3xl font-bold tracking-tight">Evaluations</h1>
                  <p className="text-muted-foreground">Evaluate intern performance</p>
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
               <h1 className="text-3xl font-bold tracking-tight">Evaluations</h1>
               <p className="text-muted-foreground">
                  Evaluate and track intern performance in your department
               </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
               <DialogTrigger asChild>
                  <Button>
                     <Plus className="mr-2 h-4 w-4" />
                     New Evaluation
                  </Button>
               </DialogTrigger>
               <DialogContent className="max-w-2xl">
                  <DialogHeader>
                     <DialogTitle>Create New Evaluation</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                           control={form.control}
                           name="intern_id"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Intern *</FormLabel>
                                 <Select
                                    onValueChange={(value) => field.onChange(parseInt(value))}
                                    value={field.value?.toString() || ""}
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
                           name="evaluation_type"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Evaluation Type *</FormLabel>
                                 <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                       <SelectTrigger>
                                          <SelectValue placeholder="Select type" />
                                       </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                       <SelectItem value="weekly">Weekly</SelectItem>
                                       <SelectItem value="monthly">Monthly</SelectItem>
                                       <SelectItem value="quarterly">Quarterly</SelectItem>
                                       <SelectItem value="final">Final</SelectItem>
                                    </SelectContent>
                                 </Select>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <FormField
                           control={form.control}
                           name="score"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Score (0-100) *</FormLabel>
                                 <FormControl>
                                    <Input
                                       type="number"
                                       min="0"
                                       max="100"
                                       {...field}
                                       onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                       value={field.value}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                           <FormField
                              control={form.control}
                              name="strengths"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Strengths</FormLabel>
                                    <FormControl>
                                       <Textarea
                                          placeholder="Key strengths demonstrated..."
                                          className="min-h-[100px]"
                                          {...field}
                                          value={field.value || ""}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <FormField
                              control={form.control}
                              name="areas_for_improvement"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Areas for Improvement</FormLabel>
                                    <FormControl>
                                       <Textarea
                                          placeholder="Areas that need development..."
                                          className="min-h-[100px]"
                                          {...field}
                                          value={field.value || ""}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>

                        <FormField
                           control={form.control}
                           name="feedback"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Overall Feedback *</FormLabel>
                                 <FormControl>
                                    <Textarea
                                       placeholder="Provide detailed feedback..."
                                       className="min-h-[120px]"
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <DialogFooter>
                           <Button type="submit">Create Evaluation</Button>
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
                        <p className="text-sm text-gray-500">Total Evaluations</p>
                        <p className="text-2xl font-bold">{evaluations.length}</p>
                     </div>
                     <TrendingUp className="h-8 w-8 text-blue-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Average Score</p>
                        <p className="text-2xl font-bold">
                           {evaluations.length > 0
                              ? `${(
                                   evaluations.reduce((sum, evalItem) => sum + evalItem.score, 0) /
                                   evaluations.length
                                ).toFixed(1)}%`
                              : "0%"}
                        </p>
                     </div>
                     <Award className="h-8 w-8 text-green-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Interns Evaluated</p>
                        <p className="text-2xl font-bold">
                           {new Set(evaluations.map((e) => e.intern_id)).size}
                        </p>
                     </div>
                     <Star className="h-8 w-8 text-purple-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">This Month</p>
                        <p className="text-2xl font-bold">
                           {
                              evaluations.filter(
                                 (e) =>
                                    new Date(e.created_at).getMonth() ===
                                    new Date().getMonth()
                              ).length
                           }
                        </p>
                     </div>
                     <Filter className="h-8 w-8 text-amber-500" />
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Filters */}
         <Card>
            <CardContent className="pt-6">
               <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                     <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                           placeholder="Search evaluations by intern name or feedback..."
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="pl-10"
                        />
                     </div>
                  </div>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                     <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by type" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="final">Final</SelectItem>
                     </SelectContent>
                  </Select>
               </div>
            </CardContent>
         </Card>

         {/* Evaluations Table */}
         <Card>
            <CardHeader>
               <CardTitle>Recent Evaluations</CardTitle>
               <CardDescription>
                  {filteredEvaluations.length} evaluations found
               </CardDescription>
            </CardHeader>
            <CardContent>
               {filteredEvaluations.length === 0 ? (
                  <div className="text-center py-12">
                     <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                     <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No Evaluations Found
                     </h3>
                     <p className="text-gray-500">
                        {searchTerm || typeFilter !== "all"
                           ? "No evaluations match your search criteria"
                           : "No evaluations have been created yet"}
                     </p>
                  </div>
               ) : (
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Intern</TableHead>
                           <TableHead>Type</TableHead>
                           <TableHead>Score</TableHead>
                           <TableHead>Status</TableHead>
                           <TableHead>Date</TableHead>
                           <TableHead>Actions</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {filteredEvaluations.map((evaluation) => (
                           <TableRow key={evaluation.id}>
                              <TableCell className="font-medium">
                                 {evaluation.intern?.name || "Unknown"}
                              </TableCell>
                              <TableCell>
                                 <Badge variant="outline" className="capitalize">
                                    {evaluation.evaluation_type}
                                 </Badge>
                              </TableCell>
                              <TableCell>
                                 <div className={`font-bold ${getScoreColor(evaluation.score)}`}>
                                    {evaluation.score}%
                                 </div>
                                 <Progress value={evaluation.score} className="mt-1 w-24" />
                              </TableCell>
                              <TableCell>{getScoreBadge(evaluation.score)}</TableCell>
                              <TableCell>
                                 {format(new Date(evaluation.created_at), "MMM dd, yyyy")}
                              </TableCell>
                              <TableCell>
                                 <div className="flex items-center space-x-2">
                                    <Button variant="ghost" size="sm">
                                       <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                       variant="ghost"
                                       size="sm"
                                       onClick={() => handleDeleteEvaluation(evaluation.id)}
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
```

## File: pages/manager/NewTaskPage.tsx
```tsx
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

```

## File: pages/manager/NotificationsPage.tsx
```tsx
import { useState, useEffect } from "react";
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Bell, CheckCircle, Clock, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { notificationService } from "@/services/notificationService";

export default function NotificationsPage() {
   const [notifications, setNotifications] = useState<any[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      loadNotifications();
   }, []);

   const loadNotifications = async () => {
      try {
         setIsLoading(true);
         const response = await notificationService.getNotifications();
         setNotifications(response?.data || []);
      } catch (error) {
         console.error("Failed to load notifications:", error);
         toast.error("Failed to load notifications");
      } finally {
         setIsLoading(false);
      }
   };

   const handleMarkAsRead = async (id: number) => {
      try {
         await notificationService.markAsRead(id);
         toast.success("Notification marked as read");
         loadNotifications();
      } catch (error) {
         toast.error("Failed to mark as read");
      }
   };

   const handleMarkAllAsRead = async () => {
      try {
         await notificationService.markAllAsRead();
         toast.success("All notifications marked as read");
         loadNotifications();
      } catch (error) {
         toast.error("Failed to mark all as read");
      }
   };

   if (isLoading) {
      return (
         <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
         </div>
      );
   }

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-3xl font-bold tracking-tight">
                  Notifications
               </h1>
               <p className="text-muted-foreground">
                  View and manage your notifications
               </p>
            </div>
            {notifications.length > 0 && (
               <Button variant="outline" onClick={handleMarkAllAsRead}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark All as Read
               </Button>
            )}
         </div>

         <Card>
            <CardHeader>
               <CardTitle>All Notifications</CardTitle>
               <CardDescription>
                  {notifications.length} notification(s)
               </CardDescription>
            </CardHeader>
            <CardContent>
               {notifications.length === 0 ? (
                  <div className="text-center py-12">
                     <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                     <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No Notifications
                     </h3>
                     <p className="text-gray-500">
                        You don't have any notifications yet
                     </p>
                  </div>
               ) : (
                  <div className="space-y-4">
                     {notifications.map((notification) => (
                        <div
                           key={notification.id}
                           className={`p-4 rounded-lg border ${
                              notification.read_by?.length > 0
                                 ? "bg-gray-50 border-gray-200"
                                 : "bg-blue-50 border-blue-200"
                           }`}
                        >
                           <div className="flex items-start justify-between">
                              <div className="flex-1">
                                 <div className="flex items-center gap-2 mb-2">
                                    <h4 className="font-semibold">
                                       {notification.title}
                                    </h4>
                                    {notification.read_by?.length === 0 && (
                                       <Badge className="bg-blue-100 text-blue-800">
                                          New
                                       </Badge>
                                    )}
                                 </div>
                                 <p className="text-gray-600">
                                    {notification.message}
                                 </p>
                                 <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                                    <span>
                                       From:{" "}
                                       {notification.sender?.name || "System"}
                                    </span>
                                    <span>
                                       {format(
                                          new Date(notification.created_at),
                                          "MMM dd, yyyy hh:mm a"
                                       )}
                                    </span>
                                 </div>
                              </div>
                              {notification.read_by?.length === 0 && (
                                 <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() =>
                                       handleMarkAsRead(notification.id)
                                    }
                                 >
                                    <CheckCircle className="h-4 w-4" />
                                 </Button>
                              )}
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

```

## File: pages/manager/ReclamationsPage.tsx
```tsx
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { AlertCircle, Filter, Eye, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { reclamationService } from '@/services/reclamationService';

const statusSchema = z.object({
  status: z.enum(['pending', 'in_review', 'resolved', 'archived']),
  resolution_notes: z.string().optional(),
});

type StatusFormData = z.infer<typeof statusSchema>;

export default function ReclamationsPage() {
  const [reclamations, setReclamations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReclamation, setSelectedReclamation] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<StatusFormData>({
    resolver: zodResolver(statusSchema),
    defaultValues: {
      status: 'pending',
      resolution_notes: '',
    },
  });

  useEffect(() => {
    loadReclamations();
  }, [statusFilter]);

  const loadReclamations = async () => {
    try {
      setIsLoading(true);
      const response = await reclamationService.getDepartmentReclamations();
      let data = response?.data || [];
      
      if (statusFilter !== 'all') {
        data = data.filter((r: any) => r.status === statusFilter);
      }
      
      setReclamations(data);
    } catch (error) {
      console.error('Failed to load reclamations:', error);
      toast.error('Failed to load reclamations');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'in_review':
        return <Badge className="bg-blue-100 text-blue-800">In Review</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
      case 'archived':
        return <Badge className="bg-gray-100 text-gray-800">Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleUpdateStatus = async (data: StatusFormData) => {
    try {
      if (!selectedReclamation) return;
      
      await reclamationService.updateReclamation(selectedReclamation.id, data);
      toast.success('Reclamation status updated');
      setIsDialogOpen(false);
      form.reset();
      loadReclamations();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const openStatusDialog = (reclamation: any) => {
    setSelectedReclamation(reclamation);
    form.reset({
      status: reclamation.status,
      resolution_notes: '',
    });
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reclamations</h1>
          <p className="text-muted-foreground">
            Review and manage intern reclamations
          </p>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_review">In Review</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Reclamations</CardTitle>
          <CardDescription>
            {reclamations.length} reclamation(s) found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reclamations.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Reclamations</h3>
              <p className="text-gray-500">No reclamations found for your department</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Intern</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reclamations.map((reclamation) => (
                  <TableRow key={reclamation.id}>
                    <TableCell className="font-medium">
                      {reclamation.intern?.name || 'Unknown'}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{reclamation.subject}</p>
                        <p className="text-sm text-gray-500 truncate max-w-xs">
                          {reclamation.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(reclamation.status)}</TableCell>
                    <TableCell>
                      {format(new Date(reclamation.created_at), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openStatusDialog(reclamation)}
                      >
                        Update Status
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Reclamation Status</DialogTitle>
          </DialogHeader>
          {selectedReclamation && (
            <div className="mb-4">
              <p className="font-medium">{selectedReclamation.subject}</p>
              <p className="text-sm text-gray-500 mt-1">
                From: {selectedReclamation.intern?.name}
              </p>
              <p className="text-sm text-gray-500">
                Submitted: {format(new Date(selectedReclamation.created_at), 'PPpp')}
              </p>
            </div>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateStatus)} className="space-y-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Status *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pending">
                          <div className="flex items-center">
                            <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                            Pending
                          </div>
                        </SelectItem>
                        <SelectItem value="in_review">
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 text-blue-500 mr-2" />
                            In Review
                          </div>
                        </SelectItem>
                        <SelectItem value="resolved">
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            Resolved
                          </div>
                        </SelectItem>
                        <SelectItem value="archived">
                          <div className="flex items-center">
                            <XCircle className="h-4 w-4 text-gray-500 mr-2" />
                            Archived
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
                name="resolution_notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resolution Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add notes about the resolution..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">Update Status</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```

## File: pages/manager/Reports.tsx
```tsx
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { CalendarIcon, BarChart3, FileText, Send, Download, Eye, Filter, Loader2, Plus } from 'lucide-react';
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';
import { cn } from '@/lib/utils';
import { reportService } from '@/services/reportService';
import { attendanceService } from '@/services/attendanceService';
import { evaluationService } from '@/services/evaluationService';

const reportSchema = z.object({
  report_type: z.enum(['attendance', 'performance']),
  period_start: z.date(),
  period_end: z.date(),
  department_id: z.coerce.number().optional(),
});

type ReportFormData = z.infer<typeof reportSchema>;

interface GeneratedReport {
  id: number;
  type: string;
  period_start: string;
  period_end: string;
  generated_at: string;
  sent_to_admin: boolean;
  data: any;
}

export default function ManagerReports() {
  const [reports, setReports] = useState<GeneratedReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<GeneratedReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const form = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      report_type: 'attendance',
      period_start: startOfMonth(new Date()),
      period_end: endOfMonth(new Date()),
    },
  });

  useEffect(() => {
    loadReports();
  }, []);

  useEffect(() => {
    filterReports();
  }, [reports, typeFilter, statusFilter]);

  const loadReports = async () => {
    try {
      setIsLoading(true);
      const response = await reportService.getManagerReports();
      setReports(response?.data || []);
      setFilteredReports(response?.data || []);
    } catch (error) {
      console.error('Failed to load reports:', error);
      toast.error('Failed to load reports');
    } finally {
      setIsLoading(false);
    }
  };

  const filterReports = () => {
    let filtered = [...reports];

    if (typeFilter !== 'all') {
      filtered = filtered.filter(report => report.type === typeFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(report => {
        if (statusFilter === 'sent') return report.sent_to_admin === true;
        if (statusFilter === 'pending') return report.sent_to_admin === false;
        return true;
      });
    }

    setFilteredReports(filtered);
  };

  const onSubmit = async (data: ReportFormData) => {
    try {
      setIsGenerating(true);
      
      const reportData = {
        ...data,
        period_start: format(data.period_start, 'yyyy-MM-dd'),
        period_end: format(data.period_end, 'yyyy-MM-dd'),
      };

      let generatedReport;
      
      if (data.report_type === 'attendance') {
        // Generate attendance report
        const attendanceData = await attendanceService.getAttendanceSummary(
          reportData.period_start,
          reportData.period_end
        );
        
        generatedReport = await reportService.generateReport({
          type: 'attendance',
          period_start: reportData.period_start,
          period_end: reportData.period_end,
          data: attendanceData.data,
        });
      } else {
        // Generate performance report
        const evaluationsData = await evaluationService.getEvaluations({
          start_date: reportData.period_start,
          end_date: reportData.period_end,
        });
        
        generatedReport = await reportService.generateReport({
          type: 'performance',
          period_start: reportData.period_start,
          period_end: reportData.period_end,
          data: evaluationsData.data,
        });
      }

      toast.success(`${data.report_type} report generated successfully!`);
      setIsDialogOpen(false);
      form.reset();
      loadReports(); // Refresh list
    } catch (error: any) {
      console.error('Report generation error:', error);
      toast.error(error.response?.data?.message || 'Failed to generate report');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendToAdmin = async (reportId: number) => {
    try {
      await reportService.sendToAdmin(reportId);
      toast.success('Report sent to admin successfully!');
      loadReports(); // Refresh list
    } catch (error) {
      toast.error('Failed to send report to admin');
    }
  };

  const handleExportReport = async (report: GeneratedReport) => {
    try {
      const response = await reportService.exportReport(report.id);
      
      // Create download link
      const blob = new Blob([JSON.stringify(response.data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `report-${report.type}-${format(new Date(report.generated_at), 'yyyy-MM-dd')}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('Report exported successfully');
    } catch (error) {
      toast.error('Failed to export report');
    }
  };

  const getReportTypeBadge = (type: string) => {
    switch (type) {
      case 'attendance':
        return <Badge className="bg-blue-100 text-blue-800">Attendance</Badge>;
      case 'performance':
        return <Badge className="bg-green-100 text-green-800">Performance</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getStatusBadge = (sent: boolean) => {
    return sent ? (
      <Badge className="bg-green-100 text-green-800">Sent to Admin</Badge>
    ) : (
      <Badge variant="outline">Pending</Badge>
    );
  };

  const getReportStats = (report: GeneratedReport) => {
    if (!report.data) return { total: 0, description: 'No data' };
    
    if (report.type === 'attendance') {
      return {
        total: report.data.total_records || 0,
        description: `${report.data.present || 0} present, ${report.data.absent || 0} absent`
      };
    } else {
      return {
        total: report.data.total_evaluations || 0,
        description: `Avg score: ${report.data.average_score || 0}%`
      };
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Generate and manage reports for your department
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Generate New Report</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="report_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Report Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select report type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="attendance">Attendance Report</SelectItem>
                          <SelectItem value="performance">Performance Report</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="period_start"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Date *</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
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
                          <PopoverContent className="w-auto p-0" align="start">
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
                    name="period_end"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>End Date *</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
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
                          <PopoverContent className="w-auto p-0" align="start">
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
                </div>

                <DialogFooter>
                  <Button type="submit" disabled={isGenerating}>
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      'Generate Report'
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Reports</p>
                <p className="text-2xl font-bold">{reports.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Attendance Reports</p>
                <p className="text-2xl font-bold">
                  {reports.filter(r => r.type === 'attendance').length}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Sent to Admin</p>
                <p className="text-2xl font-bold">
                  {reports.filter(r => r.sent_to_admin).length}
                </p>
              </div>
              <Send className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="attendance">Attendance</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="sent">Sent to Admin</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Generated Reports</CardTitle>
          <CardDescription>
            Reports you have generated for your department
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredReports.length === 0 ? (
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Reports Found</h3>
              <p className="text-gray-500">
                {typeFilter !== 'all' || statusFilter !== 'all'
                  ? 'No reports match your filter criteria'
                  : 'No reports have been generated yet. Generate your first report!'}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Statistics</TableHead>
                  <TableHead>Generated</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => {
                  const stats = getReportStats(report);
                  return (
                    <TableRow key={report.id}>
                      <TableCell>{getReportTypeBadge(report.type)}</TableCell>
                      <TableCell>
                        {format(new Date(report.period_start), 'MMM dd')} - {format(new Date(report.period_end), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{stats.total} records</p>
                          <p className="text-sm text-gray-500">{stats.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {format(new Date(report.generated_at), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(report.sent_to_admin)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleExportReport(report)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Export
                          </Button>
                          {!report.sent_to_admin && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSendToAdmin(report.id)}
                            >
                              <Send className="h-4 w-4 mr-1" />
                              Send to Admin
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Quick Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Report Templates</CardTitle>
          <CardDescription>
            Generate common reports with one click
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-auto py-4 justify-start"
              onClick={() => {
                form.setValue('report_type', 'attendance');
                form.setValue('period_start', startOfMonth(new Date()));
                form.setValue('period_end', endOfMonth(new Date()));
                setIsDialogOpen(true);
              }}
            >
              <div className="text-left">
                <p className="font-medium">Monthly Attendance Report</p>
                <p className="text-sm text-gray-500">Current month's attendance summary</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 justify-start"
              onClick={() => {
                form.setValue('report_type', 'performance');
                form.setValue('period_start', startOfMonth(new Date()));
                form.setValue('period_end', endOfMonth(new Date()));
                setIsDialogOpen(true);
              }}
            >
              <div className="text-left">
                <p className="font-medium">Monthly Performance Report</p>
                <p className="text-sm text-gray-500">Current month's performance evaluation</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 justify-start"
              onClick={() => {
                form.setValue('report_type', 'attendance');
                form.setValue('period_start', subDays(new Date(), 7));
                form.setValue('period_end', new Date());
                setIsDialogOpen(true);
              }}
            >
              <div className="text-left">
                <p className="font-medium">Weekly Attendance Report</p>
                <p className="text-sm text-gray-500">Last 7 days attendance</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 justify-start"
              onClick={() => {
                form.setValue('report_type', 'performance');
                form.setValue('period_start', subDays(new Date(), 30));
                form.setValue('period_end', new Date());
                setIsDialogOpen(true);
              }}
            >
              <div className="text-left">
                <p className="font-medium">Last 30 Days Performance</p>
                <p className="text-sm text-gray-500">Performance over last month</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

## File: pages/manager/SendNotificationPage.tsx
```tsx
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
import { Checkbox } from "@/components/ui/checkbox";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { notificationService } from "@/services/notificationService";

const notificationSchema = z.object({
   title: z.string().min(1, "Title is required"),
   message: z.string().min(1, "Message is required"),
   recipients: z.array(z.number()).min(1, "Select at least one recipient"),
});

type NotificationFormData = z.infer<typeof notificationSchema>;

export default function SendNotificationPage() {
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false);
   const [interns, setInterns] = useState<
      Array<{ id: number; name: string; email: string }>
   >([]);

   const form = useForm<NotificationFormData>({
      resolver: zodResolver(notificationSchema),
      defaultValues: {
         title: "",
         message: "",
         recipients: [],
      },
   });

   useEffect(() => {
      loadInterns();
   }, []);

   const loadInterns = async () => {
      try {
         const response = await notificationService.getDepartmentInterns();
         setInterns(response?.data || []);
      } catch (error) {
         console.error("Failed to load interns:", error);
         toast.error("Failed to load interns");
      }
   };

   const onSubmit = async (data: NotificationFormData) => {
      try {
         setIsLoading(true);
         await notificationService.sendNotification(data);
         toast.success("Notification sent successfully!");
         navigate("/manager/notifications");
      } catch (error: any) {
         toast.error(
            error.response?.data?.message || "Failed to send notification"
         );
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
                  onClick={() => navigate("/manager/notifications")}
               >
                  <ArrowLeft className="h-4 w-4" />
               </Button>
               <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                     Send Notification
                  </h1>
                  <p className="text-muted-foreground">
                     Send notifications to interns in your department
                  </p>
               </div>
            </div>
         </div>

         <div className="grid gap-6 lg:grid-cols-2">
            <Card className="lg:col-span-2">
               <CardHeader>
                  <CardTitle>Notification Details</CardTitle>
                  <CardDescription>
                     Write your message and select recipients
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
                                 <FormLabel>Title *</FormLabel>
                                 <FormControl>
                                    <Input
                                       placeholder="Enter notification title"
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <FormField
                           control={form.control}
                           name="message"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Message *</FormLabel>
                                 <FormControl>
                                    <Textarea
                                       placeholder="Write your notification message..."
                                       className="min-h-[150px]"
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <FormField
                           control={form.control}
                           name="recipients"
                           render={() => (
                              <FormItem>
                                 <FormLabel>Recipients *</FormLabel>
                                 <div className="space-y-2">
                                    {interns.map((intern) => (
                                       <FormField
                                          key={intern.id}
                                          control={form.control}
                                          name="recipients"
                                          render={({ field }) => {
                                             return (
                                                <FormItem
                                                   key={intern.id}
                                                   className="flex flex-row items-start space-x-3 space-y-0"
                                                >
                                                   <FormControl>
                                                      <Checkbox
                                                         checked={field.value?.includes(
                                                            intern.id
                                                         )}
                                                         onCheckedChange={(
                                                            checked
                                                         ) => {
                                                            return checked
                                                               ? field.onChange(
                                                                    [
                                                                       ...field.value,
                                                                       intern.id,
                                                                    ]
                                                                 )
                                                               : field.onChange(
                                                                    field.value?.filter(
                                                                       (
                                                                          value
                                                                       ) =>
                                                                          value !==
                                                                          intern.id
                                                                    )
                                                                 );
                                                         }}
                                                      />
                                                   </FormControl>
                                                   <FormLabel className="font-normal">
                                                      <div>
                                                         <p className="font-medium">
                                                            {intern.name}
                                                         </p>
                                                         <p className="text-sm text-gray-500">
                                                            {intern.email}
                                                         </p>
                                                      </div>
                                                   </FormLabel>
                                                </FormItem>
                                             );
                                          }}
                                       />
                                    ))}
                                 </div>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <div className="flex justify-end space-x-3 pt-4">
                           <Button
                              type="button"
                              variant="outline"
                              onClick={() => navigate("/manager/notifications")}
                              disabled={isLoading}
                           >
                              Cancel
                           </Button>
                           <Button
                              type="submit"
                              disabled={isLoading || interns.length === 0}
                           >
                              {isLoading ? (
                                 <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending...
                                 </>
                              ) : (
                                 <>
                                    <Send className="mr-2 h-4 w-4" />
                                    Send Notification
                                 </>
                              )}
                           </Button>
                        </div>
                     </form>
                  </Form>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}

```

## File: pages/manager/TasksPage.tsx
```tsx
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
               <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
            );
         case "completed":
            return (
               <Badge className="bg-green-100 text-green-800">Completed</Badge>
            );
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
            return (
               <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
            );
         case "high":
            return (
               <Badge className="bg-orange-100 text-orange-800">High</Badge>
            );
         case "urgent":
            return <Badge className="bg-red-100 text-red-800">Urgent</Badge>;
         default:
            return <Badge variant="outline">{priority}</Badge>;
      }
   };

   const getStatusIcon = (status: Task["status"]) => {
      switch (status) {
         case "completed":
            return <CheckCircle className="h-4 w-4 text-green-500" />;
         case "overdue":
            return <AlertCircle className="h-4 w-4 text-red-500" />;
         default:
            return <Clock className="h-4 w-4 text-blue-500" />;
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
                     <Filter className="h-8 w-8 text-blue-500" />
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
                     <Clock className="h-8 w-8 text-yellow-500" />
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
                     <CheckCircle className="h-8 w-8 text-green-500" />
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

```

## File: services/api.ts
```ts
// src/services/api.ts
import axios from "axios";
import { config } from "@/config/env";

const API_BASE_URL = config.API_URL;

const api = axios.create({
   baseURL: API_BASE_URL,
   headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
   },
   timeout: 30000,
});

// Request interceptor
api.interceptors.request.use((requestConfig) => {
   const token = localStorage.getItem(config.TOKEN_KEY);  // Use imported config
   console.log('API Request - Token exists:', !!token);
   
   if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
   }
   
   return requestConfig;
});

// Response interceptor
api.interceptors.response.use(
   (response) => {
      console.log('API Response:', response.status, response.config.url);
      return response;
   },
   (error) => {
      console.error('API Error:', error.response?.status, error.config?.url);
      
      if (error.response?.status === 401) {
         // Clear auth data
         localStorage.removeItem(config.TOKEN_KEY);
         localStorage.removeItem(config.USER_KEY);
         
         // Only redirect if not already on login page
         if (!window.location.pathname.includes('/login')) {
            window.location.href = "/login";
         }
      }
      
      return Promise.reject(error);
   }
);

export default api;
```

## File: services/attendanceService.ts
```ts
import api from "./api";

export interface Attendance {
   id: number;
   intern_id: number;
   recorded_by: number;
   attendance_date: string;
   status: "present" | "absent" | "late" | "excused";
   notes?: string;
   recorded_at: string;
   created_at: string;
   updated_at: string;
   intern?: {
      id: number;
      name: string;
      email: string;
   };
   recorded_by_user?: {
      id: number;
      name: string;
      email: string;
   };
}

export interface AttendanceStatistics {
   total: number;
   present: number;
   absent: number;
   late: number;
   excused: number;
   attendance_rate: number;
}

export interface CreateAttendanceData {
   intern_id: number;
   date: string;
   status: "present" | "absent" | "late" | "excused";
   notes?: string;
}

export const attendanceService = {
   // Manager: Get attendance records
   getAttendance: async (
      params: {
         start_date?: string;
         end_date?: string;
         status?: string;
         intern_id?: number;
      } = {}
   ): Promise<{ data: Attendance[] }> => {
      const response = await api.get("/attendances", { params });
      return response.data;
   },

   // Manager: Mark/Create attendance
   markAttendance: async (
      data: CreateAttendanceData
   ): Promise<{ attendance: Attendance }> => {
      const response = await api.post("/attendances", data);
      return response.data;
   },

   // Manager: Update attendance
   updateAttendance: async (
      id: number,
      data: { status: Attendance["status"]; notes?: string }
   ): Promise<{ attendance: Attendance }> => {
      const response = await api.put(`/attendances/${id}`, data);
      return response.data;
   },

   // Manager: Delete attendance
   deleteAttendance: async (id: number): Promise<{ message: string }> => {
      const response = await api.delete(`/attendances/${id}`);
      return response.data;
   },

   // Manager: Get attendance statistics
   getAttendanceStatistics: async (): Promise<{
      statistics: AttendanceStatistics;
   }> => {
      const response = await api.get("/attendance/statistics");
      return response.data;
   },

   // Manager: Get interns for attendance (department interns)
   getDepartmentInterns: async (): Promise<{
      data: Array<{ id: number; name: string; email: string }>;
   }> => {
      const response = await api.get("/interns-for-attendance");
      return response.data;
   },

   // Manager: Get attendance summary for reports
   getAttendanceSummary: async (
      startDate: string,
      endDate: string
   ): Promise<any> => {
      const response = await api.get("/attendance/statistics", {
         params: {
            start_date: startDate,
            end_date: endDate,
         },
      });
      return response.data;
   },

   // Intern: Get my attendance
   getMyAttendance: async (
      params: {
         start_date?: string;
         end_date?: string;
         status?: string;
      } = {}
   ): Promise<{ data: Attendance[] }> => {
      const response = await api.get("/my-attendance", { params });
      return response.data;
   },

   // Intern: Get my attendance statistics
   getMyAttendanceStatistics: async (): Promise<{
      statistics: AttendanceStatistics;
   }> => {
      const response = await api.get("/my-attendance/statistics");
      return response.data;
   },

   // Intern: Get specific attendance record
   getMyAttendanceById: async (
      id: number
   ): Promise<{ attendance: Attendance }> => {
      const response = await api.get(`/my-attendance/${id}`);
      return response.data;
   },
};

```

## File: services/authService.ts
```ts
// src/services/authService.ts
import api from "./api";
import type {
  LoginRequest,
  LoginResponse,
  User,
  ChangePasswordRequest
} from "@/types/auth.types";
import type { ApiResponse } from "@/types/api.types";
import { config } from "@/config/env";

class AuthService {
   async login(data: LoginRequest): Promise<LoginResponse> {
      const response = await api.post<LoginResponse>("/login", data);
      
      // Save token and user data
      const { user, token } = response.data;
      localStorage.setItem(config.TOKEN_KEY, token);
      localStorage.setItem(config.USER_KEY, JSON.stringify(user));
      
      return response.data;
   }

   async logout(): Promise<void> {
      try {
         await api.post("/logout");
      } finally {
         // Always clear local storage
         localStorage.removeItem(config.TOKEN_KEY);
         localStorage.removeItem(config.USER_KEY);
      }
   }

   async getCurrentUser(): Promise<User> {
      const response = await api.get<User>("/user");
      return response.data;
   }

   async updateProfile(data: Partial<User>): Promise<User> {
      const response = await api.put<User>("/profile", data);
      
      // Update stored user data
      const updatedUser = response.data;
      localStorage.setItem(config.USER_KEY, JSON.stringify(updatedUser));
      
      return updatedUser;
   }

   async changePassword(data: ChangePasswordRequest): Promise<ApiResponse> {
      const response = await api.put<ApiResponse>("/change-password", data);
      return response.data;
   }

   async getDashboardData(): Promise<any> {
      const response = await api.get("/dashboard");
      return response.data;
   }
}

export const authService = new AuthService();
```

## File: services/dashboardService.ts
```ts
import api from "./api";

export interface DashboardData {
   // Manager Dashboard
   total_interns?: number;
   pending_tasks?: number;
   todays_attendance?: string;
   average_score?: number;
   pending_reclamations?: number;
   recent_activity?: Array<{
      user_name: string;
      action: string;
      time: string;
      type: string;
   }>;

   // Admin Dashboard
   total_users?: number;
   total_managers?: number;
   active_interns?: number;
   total_departments?: number;

   // Intern Dashboard
   my_tasks?: number;
   my_evaluations?: number;
   unread_notifications?: number;
   attendance_rate?: number;
}

export const dashboardService = {
   // Get role-specific dashboard data
   getDashboard: async (): Promise<{ data: DashboardData }> => {
      try {
         const response = await api.get("/dashboard");
         return response.data;
      } catch (error) {
         console.error("Dashboard error:", error);
         throw error;
      }
   },

   // Manager Dashboard
   getManagerDashboard: async (): Promise<{ data: DashboardData }> => {
      try {
         const response = await api.get("/dashboard");
         // API returns role-specific data automatically
         return response.data;
      } catch (error) {
         console.error("Manager dashboard error:", error);
         throw error;
      }
   },

   // Admin Dashboard
   getAdminDashboard: async (): Promise<{ data: DashboardData }> => {
      try {
         const response = await api.get("/dashboard");
         return response.data;
      } catch (error) {
         console.error("Admin dashboard error:", error);
         throw error;
      }
   },

   // Intern Dashboard
   getInternDashboard: async (): Promise<{ data: DashboardData }> => {
      try {
         const response = await api.get("/dashboard");
         return response.data;
      } catch (error) {
         console.error("Intern dashboard error:", error);
         throw error;
      }
   },
};

```

## File: services/evaluationService.ts
```ts
import api from "./api";

export interface Evaluation {
   id: number;
   intern_id: number;
   manager_id: number;
   score: number;
   comments?: string;
   feedback?: string;
   evaluation_type:
      | "mid_term"
      | "final"
      | "monthly"
      | "weekly"
      | "quarterly"
      | "project";
   strengths?: string;
   areas_for_improvement?: string;
   evaluated_at: string;
   created_at: string;
   updated_at: string;
   deleted_at?: string;
   intern?: {
      id: number;
      name: string;
      email: string;
   };
   manager?: {
      id: number;
      name: string;
      email: string;
   };
}

export interface CreateEvaluationData {
   intern_id: number;
   score: number;
   feedback: string;
   evaluation_type: "weekly" | "monthly" | "quarterly" | "final";
   strengths?: string;
   areas_for_improvement?: string;
}

export const evaluationService = {
   // Manager: Get evaluations
   getEvaluations: async (
      params: {
         evaluation_type?: string;
         start_date?: string;
         end_date?: string;
         intern_id?: number;
      } = {}
   ): Promise<{ data: Evaluation[] }> => {
      const response = await api.get("/evaluations", { params });
      return response.data;
   },

   // Manager: Create evaluation
   createEvaluation: async (
      data: CreateEvaluationData
   ): Promise<{ evaluation: Evaluation }> => {
      const response = await api.post("/evaluations", data);
      return response.data;
   },

   // Manager: Get evaluation details
   getEvaluationById: async (
      id: number
   ): Promise<{ evaluation: Evaluation }> => {
      const response = await api.get(`/evaluations/${id}`);
      return response.data;
   },

   // Manager: Update evaluation
   updateEvaluation: async (
      id: number,
      data: Partial<CreateEvaluationData>
   ): Promise<{ evaluation: Evaluation }> => {
      const response = await api.put(`/evaluations/${id}`, data);
      return response.data;
   },

   // Manager: Delete evaluation
   deleteEvaluation: async (id: number): Promise<{ message: string }> => {
      const response = await api.delete(`/evaluations/${id}`);
      return response.data;
   },

   // Manager: Get evaluation statistics
   getEvaluationStatistics: async (): Promise<{
      statistics: {
         total: number;
         average_score: number;
         by_type: Record<string, number>;
      };
   }> => {
      const response = await api.get("/evaluations/statistics");
      return response.data;
   },

   // Manager: Get interns for evaluation (department interns)
   getInternsForEvaluation: async (): Promise<{
      data: Array<{ id: number; name: string; email: string }>;
   }> => {
      const response = await api.get("/interns-for-evaluation");
      return response.data;
   },

   // Intern: Get my evaluations
   getMyEvaluations: async (
      params: {
         evaluation_type?: string;
         start_date?: string;
         end_date?: string;
      } = {}
   ): Promise<{ data: Evaluation[] }> => {
      const response = await api.get("/my-evaluations", { params });
      return response.data;
   },

   // Intern: Get my evaluation details
   getMyEvaluationById: async (
      id: number
   ): Promise<{ evaluation: Evaluation }> => {
      const response = await api.get(`/my-evaluations/${id}`);
      return response.data;
   },

   // Intern: Get my evaluation statistics
   getMyEvaluationStatistics: async (): Promise<{
      statistics: {
         total: number;
         average_score: number;
         by_type: Record<string, number>;
      };
   }> => {
      const response = await api.get("/my-evaluations/statistics");
      return response.data;
   },
};

```

## File: services/notificationService.ts
```ts
import api from "./api";

export interface Notification {
   id: number;
   sender_id: number;
   title: string;
   message: string;
   created_at: string;
   updated_at: string;
   sender?: {
      id: number;
      name: string;
      email: string;
   };
   recipients?: any[];
   is_read?: boolean;
   is_archived?: boolean;
   read_at?: string | null;
   read_by?: any[];
}

export interface SendNotificationData {
   title: string;
   message: string;
   recipient_ids: number[];
}

export const notificationService = {
   // Manager: Send notification
   sendNotification: async (
      data: SendNotificationData
   ): Promise<{ notification: Notification }> => {
      const response = await api.post("/notifications/send", data);
      return response.data;
   },

   // Manager: Get sent notifications
   getNotifications: async (
      params: {
         search?: string;
         is_archived?: boolean;
      } = {}
   ): Promise<{ data: Notification[] }> => {
      const response = await api.get("/notifications", { params });
      return response.data;
   },

   // Manager: Get notification details
   getNotificationById: async (
      id: number
   ): Promise<{ notification: Notification }> => {
      const response = await api.get(`/notifications/${id}`);
      return response.data;
   },

   // Manager: Delete notification
   deleteNotification: async (id: number): Promise<{ message: string }> => {
      const response = await api.delete(`/notifications/${id}`);
      return response.data;
   },

   // Manager: Get interns for notifications (department interns)
   getDepartmentInterns: async (): Promise<{
      data: Array<{ id: number; name: string; email: string }>;
   }> => {
      const response = await api.get("/notifications/interns");
      return response.data;
   },

   // Manager: Get interns for notifications (alias)
   getInternsForNotifications: async (): Promise<{
      data: Array<{ id: number; name: string; email: string }>;
   }> => {
      const response = await api.get("/notifications/interns");
      return response.data;
   },

   // Intern: Get my notifications
   getMyNotifications: async (
      params: {
         is_read?: boolean;
         is_archived?: boolean;
         search?: string;
      } = {}
   ): Promise<{ data: Notification[] }> => {
      const response = await api.get("/my-notifications", { params });
      return response.data;
   },

   // Intern: Get my notification details
   getMyNotificationById: async (
      id: number
   ): Promise<{ notification: Notification }> => {
      const response = await api.get(`/my-notifications/${id}`);
      return response.data;
   },

   // Intern: Update notification (mark as read/archived)
   updateMyNotification: async (
      id: number,
      data: {
         is_read?: boolean;
         is_archived?: boolean;
      }
   ): Promise<{ notification: Notification }> => {
      const response = await api.put(`/my-notifications/${id}`, data);
      return response.data;
   },

   // Intern: Mark notification as read
   markNotificationAsRead: async (
      id: number,
      isRead: boolean = true
   ): Promise<{ notification: Notification }> => {
      const response = await api.put(`/my-notifications/${id}`, {
         is_read: isRead,
      });
      return response.data;
   },

   // Intern: Mark as read (alias)
   markAsRead: async (id: number): Promise<{ notification: Notification }> => {
      const response = await api.put(`/my-notifications/${id}`, {
         is_read: true,
      });
      return response.data;
   },

   // Intern: Mark all as read
   markAllAsRead: async (): Promise<{ message: string }> => {
      const response = await api.post("/my-notifications/mark-all-read");
      return response.data;
   },

   // Intern: Delete my notification
   deleteMyNotification: async (id: number): Promise<{ message: string }> => {
      const response = await api.delete(`/my-notifications/${id}`);
      return response.data;
   },
};

```

## File: services/reclamationService.ts
```ts
import api from "./api";

export interface Reclamation {
   id: number;
   intern_id: number;
   manager_id: number;
   subject: string;
   description: string;
   status: "pending" | "in_review" | "solved" | "archived";
   response?: string;
   resolved_at?: string;
   responded_at?: string;
   created_at: string;
   updated_at: string;
   deleted_at?: string;
   intern?: {
      id: number;
      name: string;
      email: string;
   };
   manager?: {
      id: number;
      name: string;
      email: string;
   };
}

export interface CreateReclamationData {
   subject: string;
   description: string;
}

export interface RespondToReclamationData {
   response: string;
   status: "pending" | "in_review" | "solved" | "archived";
}

export const reclamationService = {
   // Manager: Get reclamations (department reclamations)
   getReclamations: async (
      params: {
         status?: string;
         search?: string;
         start_date?: string;
         end_date?: string;
      } = {}
   ): Promise<{ data: Reclamation[] }> => {
      const response = await api.get("/reclamations", { params });
      return response.data;
   },

   // Manager: Get department reclamations (same as getReclamations but semantic)
   getDepartmentReclamations: async (): Promise<{ data: Reclamation[] }> => {
      const response = await api.get("/reclamations");
      return response.data;
   },

   // Manager: Get reclamation details
   getReclamationById: async (
      id: number
   ): Promise<{ reclamation: Reclamation }> => {
      const response = await api.get(`/reclamations/${id}`);
      return response.data;
   },

   // Manager: Respond to reclamation
   respondToReclamation: async (
      id: number,
      data: RespondToReclamationData
   ): Promise<{ reclamation: Reclamation }> => {
      const response = await api.put(`/reclamations/${id}/respond`, data);
      return response.data;
   },

   // Manager: Update reclamation (for status updates)
   updateReclamation: async (
      id: number,
      data: { status?: string; resolution_notes?: string }
   ): Promise<{ reclamation: Reclamation }> => {
      const response = await api.put(`/reclamations/${id}/respond`, data);
      return response.data;
   },

   // Manager: Update reclamation status only
   updateReclamationStatus: async (
      id: number,
      status: string
   ): Promise<{ reclamation: Reclamation }> => {
      const response = await api.put(`/reclamations/${id}/status`, { status });
      return response.data;
   },

   // Manager: Delete reclamation
   deleteReclamation: async (id: number): Promise<{ message: string }> => {
      const response = await api.delete(`/reclamations/${id}`);
      return response.data;
   },

   // Manager: Get reclamation statistics
   getReclamationStatistics: async (): Promise<{
      statistics: {
         total: number;
         pending: number;
         in_review: number;
         solved: number;
         archived: number;
      };
   }> => {
      const response = await api.get("/reclamations/statistics");
      return response.data;
   },

   // Intern: Create reclamation
   createReclamation: async (
      data: CreateReclamationData
   ): Promise<{ reclamation: Reclamation }> => {
      const response = await api.post("/reclamations", data);
      return response.data;
   },

   // Intern: Get my reclamations
   getMyReclamations: async (
      params: {
         status?: string;
      } = {}
   ): Promise<{ data: Reclamation[] }> => {
      const response = await api.get("/my-reclamations", { params });
      return response.data;
   },

   // Intern: Get my reclamation details
   getMyReclamationById: async (
      id: number
   ): Promise<{ reclamation: Reclamation }> => {
      const response = await api.get(`/my-reclamations/${id}`);
      return response.data;
   },

   // Intern: Delete my reclamation
   deleteMyReclamation: async (id: number): Promise<{ message: string }> => {
      const response = await api.delete(`/my-reclamations/${id}`);
      return response.data;
   },
};

```

## File: services/reportService.ts
```ts
import api from "./api";

export interface Report {
   id: number;
   type: "attendance" | "performance";
   period_start: string;
   period_end: string;
   department_id: number;
   data: any;
   generated_by: number;
   sent_to_admin: boolean;
   created_at: string;
   updated_at: string;
   department?: {
      id: number;
      name: string;
   };
   generated_by_user?: {
      id: number;
      name: string;
      email: string;
   };
}

export interface GenerateReportData {
   type: "attendance" | "performance";
   period_start: string;
   period_end: string;
   data?: any;
}

export const reportService = {
   // Admin & Manager: Get reports
   getReports: async (
      params: {
         type?: "attendance" | "performance";
         period_start?: string;
         period_end?: string;
         department_id?: number;
      } = {}
   ): Promise<{ data: Report[] }> => {
      const response = await api.get("/reports", { params });
      return response.data;
   },

   // Manager: Get manager's reports (same as getReports but semantic naming)
   getManagerReports: async (): Promise<{ data: Report[] }> => {
      const response = await api.get("/reports");
      return response.data;
   },

   // Manager: Generate report
   generateReport: async (
      data: GenerateReportData
   ): Promise<{ report: Report }> => {
      const response = await api.post("/reports/generate", data);
      return response.data;
   },

   // Manager: Send report to admin
   sendToAdmin: async (reportId: number): Promise<{ message: string }> => {
      const response = await api.post(`/reports/${reportId}/send-to-admin`);
      return response.data;
   },

   // Admin & Manager: Get report statistics
   getReportStatistics: async (): Promise<{
      statistics: {
         total: number;
         attendance_reports: number;
         performance_reports: number;
         sent_to_admin: number;
      };
   }> => {
      const response = await api.get("/reports/statistics");
      return response.data;
   },

   // Admin & Manager: Get report by ID
   getReportById: async (id: number): Promise<{ report: Report }> => {
      const response = await api.get(`/reports/${id}`);
      return response.data;
   },

   // Manager: Delete report
   deleteReport: async (id: number): Promise<{ message: string }> => {
      const response = await api.delete(`/reports/${id}`);
      return response.data;
   },

   // Export report (for downloading)
   exportReport: async (reportId: number): Promise<{ data: any }> => {
      const response = await api.get(`/reports/${reportId}`);
      return response;
   },
};

```

## File: services/taskService.ts
```ts
import api from "./api";

export interface TaskData {
   title: string;
   description: string;
   assigned_to: number;
   priority: "low" | "medium" | "high" | "urgent";
   deadline: string;
}

export interface Task extends TaskData {
   id: number;
   status: "pending" | "in_progress" | "completed" | "overdue";
   created_at: string;
   updated_at: string;
   assigned_to_user?: {
      id: number;
      name: string;
      email: string;
   };
}

export const taskService = {
   async getTasks(params?: {
      status?: string;
      assigned_to?: number;
      page?: number;
      per_page?: number;
   }) {
      const response = await api.get("/tasks", { params });
      return response.data;
   },

   async createTask(data: TaskData) {
      const response = await api.post("/tasks", data);
      return response.data;
   },

   async updateTask(id: number, data: Partial<TaskData>) {
      const response = await api.put(`/tasks/${id}`, data);
      return response.data;
   },

   async deleteTask(id: number) {
      const response = await api.delete(`/tasks/${id}`);
      return response.data;
   },

   async getInternsForTasks() {
      // Use the correct endpoint from documentation
      try {
         const response = await api.get("/interns-for-tasks");
         return response.data;
      } catch (error) {
         console.error("Error getting interns for tasks:", error);
         throw error;
      }
   },

   async updateTaskStatus(id: number, status: Task["status"]) {
      const response = await api.put(`/tasks/${id}/status`, { status });
      return response.data;
   },

   async getTaskStatistics() {
      const response = await api.get("/tasks/statistics");
      return response.data;
   },

   async getMyTasks(params?: {
      status?: string;
      priority?: string;
      overdue?: boolean;
      page?: number;
      per_page?: number;
   }) {
      const response = await api.get("/my-tasks", { params });
      return response.data;
   },

   async getMyTask(id: number) {
      const response = await api.get(`/my-tasks/${id}`);
      return response.data;
   },

   async updateMyTaskStatus(id: number, status: Task["status"]) {
      const response = await api.put(`/my-tasks/${id}/status`, { status });
      return response.data;
   },
};
```

## File: services/userService.ts
```ts
import api from './api';

export const userService = {
  // Get all users (Admin only)
  getUsers: async (params: any = {}): Promise<any> => {
    const response = await api.get('/users', { params });
    return response.data;
  },

  // Create user (Admin only)
  createUser: async (data: any): Promise<any> => {
    const response = await api.post('/users', data);
    return response.data;
  },

  // Get user details (Admin only)
  getUser: async (id: number): Promise<any> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Update user (Admin only)
  updateUser: async (id: number, data: any): Promise<any> => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  // Delete user (Admin only)
  deleteUser: async (id: number): Promise<any> => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  // Soft delete user (Admin only)
  softDeleteUser: async (id: number): Promise<any> => {
    const response = await api.delete(`/users/${id}/soft-delete`);
    return response.data;
  },

  // Restore user (Admin only)
  restoreUser: async (id: number): Promise<any> => {
    const response = await api.post(`/users/${id}/restore`);
    return response.data;
  },

  // Get managers list
  getManagers: async (): Promise<any> => {
    const response = await api.get('/managers');
    return response.data;
  },

  // Get interns list
  getInterns: async (params: any = {}): Promise<any> => {
    const response = await api.get('/interns', { params });
    return response.data;
  },

  // Get unassigned interns
  getUnassignedInterns: async (): Promise<any> => {
    const response = await api.get('/unassigned-interns');
    return response.data;
  },

  // Assign intern (Admin only)
  assignIntern: async (id: number, data: any): Promise<any> => {
    const response = await api.post(`/users/${id}/assign`, data);
    return response.data;
  }
};
```

## File: stores/attendanceStore.ts
```ts
import { create } from "zustand";
import type { Attendance, AttendanceStatistics } from "@/types";

interface AttendanceState {
   // State
   attendances: Attendance[];
   selectedAttendance: Attendance | null;
   statistics: AttendanceStatistics | null;
   isLoading: boolean;
   error: string | null;
   filters: {
      start_date?: string;
      end_date?: string;
      status?: string;
      intern_id?: number;
   };

   // Actions
   setAttendances: (attendances: Attendance[]) => void;
   setSelectedAttendance: (attendance: Attendance | null) => void;
   setStatistics: (stats: AttendanceStatistics) => void;
   setLoading: (loading: boolean) => void;
   setError: (error: string | null) => void;
   setFilters: (filters: Partial<AttendanceState["filters"]>) => void;
   resetFilters: () => void;

   // Attendance operations
   addAttendance: (attendance: Attendance) => void;
   updateAttendance: (id: number, updates: Partial<Attendance>) => void;
   deleteAttendance: (id: number) => void;

   // Computed properties
   todayAttendances: Attendance[];
   recentAttendances: Attendance[];
}

export const useAttendanceStore = create<AttendanceState>((set, get) => ({
   // Initial state
   attendances: [],
   selectedAttendance: null,
   statistics: null,
   isLoading: false,
   error: null,
   filters: {},

   // Actions
   setAttendances: (attendances) => set({ attendances }),

   setSelectedAttendance: (attendance) =>
      set({ selectedAttendance: attendance }),

   setStatistics: (statistics) => set({ statistics }),

   setLoading: (loading) => set({ isLoading: loading }),

   setError: (error) => set({ error }),

   setFilters: (filters) =>
      set((state) => ({
         filters: { ...state.filters, ...filters },
      })),

   resetFilters: () => set({ filters: {} }),

   // Attendance operations
   addAttendance: (attendance) =>
      set((state) => ({
         attendances: [attendance, ...state.attendances],
         statistics: state.statistics
            ? {
                 ...state.statistics,
                 total: state.statistics.total + 1,
                 [attendance.status]:
                    (state.statistics[
                       attendance.status as keyof AttendanceStatistics
                    ] as number) + 1,
                 attendance_rate: Math.round(
                    ((state.statistics.present +
                       (attendance.status === "present" ? 1 : 0)) /
                       (state.statistics.total + 1)) *
                       100
                 ),
              }
            : null,
      })),

   updateAttendance: (id, updates) =>
      set((state) => {
         const updatedAttendances = state.attendances.map((attendance) =>
            attendance.id === id ? { ...attendance, ...updates } : attendance
         );

         // Update statistics if status changed
         let newStats = state.statistics;
         if (updates.status && state.statistics) {
            const oldAttendance = state.attendances.find((a) => a.id === id);
            if (oldAttendance) {
               newStats = { ...state.statistics };

               // Decrement old status
               const oldStatus =
                  oldAttendance.status as keyof AttendanceStatistics;
               if (oldStatus in newStats) {
                  (newStats[oldStatus] as number)--;
               }

               // Increment new status
               const newStatus = updates.status as keyof AttendanceStatistics;
               if (newStatus in newStats) {
                  (newStats[newStatus] as number)++;
               }

               // Recalculate attendance rate
               newStats.attendance_rate = Math.round(
                  (newStats.present / newStats.total) * 100
               );
            }
         }

         return {
            attendances: updatedAttendances,
            selectedAttendance:
               state.selectedAttendance?.id === id
                  ? { ...state.selectedAttendance, ...updates }
                  : state.selectedAttendance,
            statistics: newStats,
         };
      }),

   deleteAttendance: (id) =>
      set((state) => {
         const attendanceToDelete = state.attendances.find((a) => a.id === id);
         const updatedAttendances = state.attendances.filter(
            (a) => a.id !== id
         );

         // Update statistics
         let newStats = state.statistics;
         if (attendanceToDelete && state.statistics) {
            newStats = {
               ...state.statistics,
               total: state.statistics.total - 1,
            };

            const status =
               attendanceToDelete.status as keyof AttendanceStatistics;
            if (status in newStats) {
               (newStats[status] as number)--;
            }

            newStats.attendance_rate = Math.round(
               (newStats.present / newStats.total) * 100
            );
         }

         return {
            attendances: updatedAttendances,
            selectedAttendance:
               state.selectedAttendance?.id === id
                  ? null
                  : state.selectedAttendance,
            statistics: newStats,
         };
      }),

   // Computed properties
   get todayAttendances() {
      const today = new Date().toISOString().split("T")[0];
      return get().attendances.filter(
         (attendance) => attendance.attendance_date === today
      );
   },

   get recentAttendances() {
      return get().attendances.slice(0, 10); // Last 10 attendances
   },
}));

```

## File: stores/authStore.ts
```ts
// src/stores/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, AuthState } from "@/types";
import { config } from "@/config/env";

interface AuthStoreActions {
   setAuth: (user: User, token: string) => void;
   clearAuth: () => void;
   updateUser: (user: Partial<User>) => void;
   setLoading: (loading: boolean) => void;
   setError: (error: string | null) => void;
   initializeAuth: () => void; // Add this
}

export const useAuthStore = create<AuthState & AuthStoreActions>()(
   persist(
      (set) => ({
         user: null,
         token: null,
         isAuthenticated: false,
         isLoading: false,
         error: null,

         // Initialize auth from localStorage
         initializeAuth: () => {
            const token = localStorage.getItem(config.TOKEN_KEY);
            const userStr = localStorage.getItem(config.USER_KEY);

            if (token && userStr) {
               try {
                  const user = JSON.parse(userStr);
                  set({
                     user,
                     token,
                     isAuthenticated: true,
                     isLoading: false,
                  });
               } catch (error) {
                  // Clear invalid storage
                  localStorage.removeItem(config.TOKEN_KEY);
                  localStorage.removeItem(config.USER_KEY);
                  set({
                     user: null,
                     token: null,
                     isAuthenticated: false,
                     isLoading: false,
                  });
               }
            } else {
               set({ isLoading: false });
            }
         },

         setAuth: (user, token) => {
            localStorage.setItem(config.TOKEN_KEY, token);
            localStorage.setItem(config.USER_KEY, JSON.stringify(user));
            set({ user, token, isAuthenticated: true, error: null });
         },

         clearAuth: () => {
            localStorage.removeItem(config.TOKEN_KEY);
            localStorage.removeItem(config.USER_KEY);
            set({
               user: null,
               token: null,
               isAuthenticated: false,
               error: null,
            });
         },

         updateUser: (updatedUser) =>
            set((state) => ({
               user: state.user ? { ...state.user, ...updatedUser } : null,
            })),

         setLoading: (loading) => set({ isLoading: loading }),

         setError: (error) => set({ error }),
      }),
      {
         name: "auth-storage",
         partialize: (state) => ({
            user: state.user,
            token: state.token,
            isAuthenticated: state.isAuthenticated,
         }),
      }
   )
);

// Create a separate hook for computed properties
export const useAuthComputed = () => {
   const { user } = useAuthStore();

   return {
      isAdmin: user?.role === "admin",
      isManager: user?.role === "manager",
      isIntern: user?.role === "intern",
      user,
   };
};

```

## File: stores/dashboardStore.ts
```ts
import { create } from "zustand";
import type {
   DashboardStats,
   FormattedStat,
   DashboardStoreState,
} from "@/types";
import { formatPercentage } from "@/utils/format/dataFormatters";

interface DashboardStoreActions {
   // Actions
   setStats: (stats: Partial<DashboardStats>) => void;
   setLoading: (loading: boolean) => void;
   setError: (error: string | null) => void;
   addActivity: (activity: DashboardActivity) => void;
   clearActivities: () => void;

   // Helper methods
   getFormattedStats: (
      userRole?: "admin" | "manager" | "intern"
   ) => Record<string, FormattedStat>;
}

type DashboardActivity = {
   action: string;
   user: string;
   time: string;
   icon?: string;
};

export const useDashboardStore = create<
   DashboardStoreState & DashboardStoreActions
>((set, get) => ({
   // Initial state
   stats: {
      recentActivity: [],
   },
   isLoading: false,
   error: null,

   // Actions
   setStats: (newStats) =>
      set((state) => ({
         stats: { ...state.stats, ...newStats },
      })),

   setLoading: (loading) => set({ isLoading: loading }),

   setError: (error) => set({ error }),

   addActivity: (activity) =>
      set((state) => ({
         stats: {
            ...state.stats,
            recentActivity: [
               activity,
               ...state.stats.recentActivity.slice(0, 9),
            ], // Keep last 10
         },
      })),

   clearActivities: () =>
      set((state) => ({
         stats: { ...state.stats, recentActivity: [] },
      })),

   // Helper method for formatted stats
   getFormattedStats: (userRole?: "admin" | "manager" | "intern") => {
      const { stats } = get();

      // Default values for all stats
      const safeStats = {
         totalUsers: stats.totalUsers || 0,
         activeInterns: stats.activeInterns || 0,
         pendingTasks: stats.pendingTasks || 0,
         reportsGenerated: stats.reportsGenerated || 0,
         myInterns: stats.myInterns || 0,
         managerPendingTasks: stats.managerPendingTasks || 0,
         attendanceToday: stats.attendanceToday || "0/0",
         averageScore: stats.averageScore || 0,
         pendingReclamations: stats.pendingReclamations || 0,
         myTasks: stats.myTasks || 0,
         internAverageScore: stats.internAverageScore || 0,
         unreadNotifications: stats.unreadNotifications || 0,
         attendanceRate: stats.attendanceRate || 0,
      };

      if (userRole === "admin") {
         return {
            totalUsers: {
               value: safeStats.totalUsers,
               label: "Total Users",
               icon: "👥",
               color: "blue",
            },
            activeInterns: {
               value: safeStats.activeInterns,
               label: "Active Interns",
               icon: "🎓",
               color: "green",
            },
            pendingTasks: {
               value: safeStats.pendingTasks,
               label: "Pending Tasks",
               icon: "📝",
               color: "orange",
            },
            reportsGenerated: {
               value: safeStats.reportsGenerated,
               label: "Reports",
               icon: "📊",
               color: "purple",
            },
         } as Record<string, FormattedStat>;
      }

      if (userRole === "manager") {
         return {
            myInterns: {
               value: safeStats.myInterns,
               label: "My Interns",
               icon: "👥",
               color: "blue",
            },
            pendingTasks: {
               value: safeStats.managerPendingTasks,
               label: "Pending Tasks",
               icon: "📝",
               color: "orange",
            },
            attendanceToday: {
               value: safeStats.attendanceToday,
               label: "Attendance Today",
               icon: "📅",
               color: "green",
            },
            averageScore: {
               value: formatPercentage(safeStats.averageScore),
               label: "Avg Score",
               icon: "⭐",
               color: "purple",
            },
            pendingReclamations: {
               value: safeStats.pendingReclamations,
               label: "Pending Reclamations",
               icon: "📝",
               color: "red",
            },
         } as Record<string, FormattedStat>;
      }

      // Intern stats (default)
      return {
         myTasks: {
            value: safeStats.myTasks,
            label: "My Tasks",
            icon: "📝",
            color: "blue",
         },
         averageScore: {
            value: formatPercentage(safeStats.internAverageScore),
            label: "Avg Score",
            icon: "⭐",
            color: "green",
         },
         unreadNotifications: {
            value: safeStats.unreadNotifications,
            label: "Notifications",
            icon: "🔔",
            color: "orange",
         },
         attendanceRate: {
            value: formatPercentage(safeStats.attendanceRate),
            label: "Attendance",
            icon: "📅",
            color: "purple",
         },
      } as Record<string, FormattedStat>;
   },
}));

```

## File: stores/evaluationStore.ts
```ts
import { create } from "zustand";
import type {
   Evaluation,
   EvaluationStatistics,
   EvaluationStoreState,
} from "@/types";

interface EvaluationStoreActions {
   // Actions
   setEvaluations: (evaluations: Evaluation[]) => void;
   setSelectedEvaluation: (evaluation: Evaluation | null) => void;
   setStatistics: (stats: EvaluationStatistics) => void;
   setLoading: (loading: boolean) => void;
   setError: (error: string | null) => void;
   setFilters: (filters: Partial<EvaluationStoreState["filters"]>) => void;
   resetFilters: () => void;

   // Evaluation operations
   addEvaluation: (evaluation: Evaluation) => void;
   updateEvaluation: (id: number, updates: Partial<Evaluation>) => void;
   deleteEvaluation: (id: number) => void;
}

export const useEvaluationStore = create<
   EvaluationStoreState & EvaluationStoreActions
>((set, get) => ({
   // Initial state
   evaluations: [],
   selectedEvaluation: null,
   statistics: null,
   isLoading: false,
   error: null,
   filters: {},

   // Actions
   setEvaluations: (evaluations) => set({ evaluations }),

   setSelectedEvaluation: (evaluation) =>
      set({ selectedEvaluation: evaluation }),

   setStatistics: (statistics) => set({ statistics }),

   setLoading: (loading) => set({ isLoading: loading }),

   setError: (error) => set({ error }),

   setFilters: (filters) =>
      set((state) => ({
         filters: { ...state.filters, ...filters },
      })),

   resetFilters: () => set({ filters: {} }),

   // Evaluation operations
   addEvaluation: (evaluation) =>
      set((state) => {
         const updatedEvaluations = [evaluation, ...state.evaluations];

         // Update statistics
         let newStats = state.statistics;
         if (state.statistics) {
            newStats = {
               total: state.statistics.total + 1,
               average_score: Math.round(
                  (state.statistics.average_score * state.statistics.total +
                     evaluation.score) /
                     (state.statistics.total + 1)
               ),
               by_type: {
                  ...state.statistics.by_type,
                  [evaluation.evaluation_type]:
                     (state.statistics.by_type[evaluation.evaluation_type] ||
                        0) + 1,
               },
            };
         }

         return {
            evaluations: updatedEvaluations,
            statistics: newStats,
         };
      }),

   updateEvaluation: (id, updates) =>
      set((state) => {
         const updatedEvaluations = state.evaluations.map((evaluation) =>
            evaluation.id === id ? { ...evaluation, ...updates } : evaluation
         );

         // Update statistics if score changed
         let newStats = state.statistics;
         if (updates.score !== undefined && state.statistics) {
            const oldEvaluation = state.evaluations.find((e) => e.id === id);
            if (oldEvaluation) {
               const totalScore =
                  state.statistics.average_score * state.statistics.total;
               const newTotalScore =
                  totalScore - oldEvaluation.score + updates.score;
               newStats = {
                  ...state.statistics,
                  average_score: Math.round(
                     newTotalScore / state.statistics.total
                  ),
               };
            }
         }

         return {
            evaluations: updatedEvaluations,
            selectedEvaluation:
               state.selectedEvaluation?.id === id
                  ? { ...state.selectedEvaluation, ...updates }
                  : state.selectedEvaluation,
            statistics: newStats,
         };
      }),

   deleteEvaluation: (id) =>
      set((state) => {
         const evaluationToDelete = state.evaluations.find((e) => e.id === id);
         const updatedEvaluations = state.evaluations.filter(
            (e) => e.id !== id
         );

         // Update statistics
         let newStats = state.statistics;
         if (
            evaluationToDelete &&
            state.statistics &&
            state.statistics.total > 1
         ) {
            const totalScore =
               state.statistics.average_score * state.statistics.total;
            const newTotalScore = totalScore - evaluationToDelete.score;
            newStats = {
               total: state.statistics.total - 1,
               average_score: Math.round(
                  newTotalScore / (state.statistics.total - 1)
               ),
               by_type: {
                  ...state.statistics.by_type,
                  [evaluationToDelete.evaluation_type]: Math.max(
                     0,
                     (state.statistics.by_type[
                        evaluationToDelete.evaluation_type
                     ] || 0) - 1
                  ),
               },
            };
         } else if (state.statistics?.total === 1) {
            newStats = { total: 0, average_score: 0, by_type: {} };
         }

         return {
            evaluations: updatedEvaluations,
            selectedEvaluation:
               state.selectedEvaluation?.id === id
                  ? null
                  : state.selectedEvaluation,
            statistics: newStats,
         };
      }),

   // Computed properties
   get recentEvaluations() {
      return get().evaluations.slice(0, 10); // Last 10 evaluations
   },

   get averageScore() {
      const evaluations = get().evaluations;
      if (evaluations.length === 0) return 0;

      const total = evaluations.reduce(
         (sum, evalItem) => sum + evalItem.score,
         0
      );
      return Math.round(total / evaluations.length);
   },
}));

```

## File: stores/index.ts
```ts
export { useAuthStore, useAuthComputed } from './authStore';
export { useTaskStore } from './taskStore';
export { useAttendanceStore } from './attendanceStore';
export { useEvaluationStore } from './evaluationStore';
export { useReclamationStore } from './reclamationStore';
export { useNotificationStore } from './notificationStore';
export { useDashboardStore } from './dashboardStore';
```

## File: stores/notificationStore.ts
```ts
import { create } from "zustand";
import type { Notification, NotificationStoreState } from "@/types";

interface NotificationStoreActions {
   // Actions
   setNotifications: (notifications: Notification[]) => void;
   setSelectedNotification: (notification: Notification | null) => void;
   setLoading: (loading: boolean) => void;
   setError: (error: string | null) => void;
   setFilters: (filters: Partial<NotificationStoreState["filters"]>) => void;
   resetFilters: () => void;

   // Notification operations
   addNotification: (notification: Notification) => void;
   updateNotification: (id: number, updates: Partial<Notification>) => void;
   deleteNotification: (id: number) => void;
   markAllAsRead: () => void;

   // Helper methods
   getUnreadCount: () => number;
   getUnreadNotifications: () => Notification[];
   getRecentNotifications: (limit?: number) => Notification[];
}

export const useNotificationStore = create<
   NotificationStoreState & NotificationStoreActions
>((set, get) => ({
   // Initial state
   notifications: [],
   selectedNotification: null,
   isLoading: false,
   error: null,
   filters: {},

   // Actions
   setNotifications: (notifications) => set({ notifications }),

   setSelectedNotification: (notification) =>
      set({ selectedNotification: notification }),

   setLoading: (loading) => set({ isLoading: loading }),

   setError: (error) => set({ error }),

   setFilters: (filters) =>
      set((state) => ({
         filters: { ...state.filters, ...filters },
      })),

   resetFilters: () => set({ filters: {} }),

   // Notification operations
   addNotification: (notification) =>
      set((state) => ({
         notifications: [notification, ...state.notifications],
      })),

   updateNotification: (id, updates) =>
      set((state) => {
         const updatedNotifications = state.notifications.map((notification) =>
            notification.id === id
               ? { ...notification, ...updates }
               : notification
         );

         return {
            notifications: updatedNotifications,
            selectedNotification:
               state.selectedNotification?.id === id
                  ? { ...state.selectedNotification, ...updates }
                  : state.selectedNotification,
         };
      }),

   deleteNotification: (id) =>
      set((state) => ({
         notifications: state.notifications.filter(
            (notification) => notification.id !== id
         ),
         selectedNotification:
            state.selectedNotification?.id === id
               ? null
               : state.selectedNotification,
      })),

   markAllAsRead: () =>
      set((state) => ({
         notifications: state.notifications.map((notification) => ({
            ...notification,
            is_read: true,
         })),
      })),

   // Helper methods instead of computed properties
   getUnreadCount: () => {
      return get().notifications.filter((notification) => !notification.is_read)
         .length;
   },

   getUnreadNotifications: () => {
      return get().notifications.filter(
         (notification) => !notification.is_read
      );
   },

   getRecentNotifications: (limit = 10) => {
      return get().notifications.slice(0, limit);
   },
}));

```

## File: stores/reclamationStore.ts
```ts
import { create } from "zustand";
import type {
   Reclamation,
   ReclamationStatistics,
   ReclamationStoreState,
} from "@/types";
import { getRoleDisplayName } from "@/utils/auth/userHelpers";

interface ReclamationStoreActions {
   // Actions
   setReclamations: (reclamations: Reclamation[]) => void;
   setSelectedReclamation: (reclamation: Reclamation | null) => void;
   setStatistics: (stats: ReclamationStatistics) => void;
   setLoading: (loading: boolean) => void;
   setError: (error: string | null) => void;
   setFilters: (filters: Partial<ReclamationStoreState["filters"]>) => void;
   resetFilters: () => void;

   // Reclamation operations
   addReclamation: (reclamation: Reclamation) => void;
   updateReclamation: (id: number, updates: Partial<Reclamation>) => void;
   deleteReclamation: (id: number) => void;

   // Helper methods
   getReclamationsByUserId: (
      userId: number,
      userRole: "admin" | "manager" | "intern"
   ) => Reclamation[];
   getPendingReclamations: () => Reclamation[];
   getReclamationStatusDisplay: (status: string) => string;
}

export const useReclamationStore = create<
   ReclamationStoreState & ReclamationStoreActions
>((set, get) => ({
   // Initial state
   reclamations: [],
   selectedReclamation: null,
   statistics: null,
   isLoading: false,
   error: null,
   filters: {},

   // Actions
   setReclamations: (reclamations) => set({ reclamations }),

   setSelectedReclamation: (reclamation) =>
      set({ selectedReclamation: reclamation }),

   setStatistics: (statistics) => set({ statistics }),

   setLoading: (loading) => set({ isLoading: loading }),

   setError: (error) => set({ error }),

   setFilters: (filters) =>
      set((state) => ({
         filters: { ...state.filters, ...filters },
      })),

   resetFilters: () => set({ filters: {} }),

   // Reclamation operations
   addReclamation: (reclamation) =>
      set((state) => ({
         reclamations: [reclamation, ...state.reclamations],
         statistics: state.statistics
            ? {
                 ...state.statistics,
                 total: state.statistics.total + 1,
                 pending: state.statistics.pending + 1,
              }
            : null,
      })),

   updateReclamation: (id, updates) =>
      set((state) => {
         const updatedReclamations = state.reclamations.map((reclamation) =>
            reclamation.id === id ? { ...reclamation, ...updates } : reclamation
         );

         // Update statistics if status changed
         let newStats = state.statistics;
         if (updates.status && state.statistics) {
            const oldReclamation = state.reclamations.find((r) => r.id === id);
            if (oldReclamation) {
               newStats = { ...state.statistics };

               // Decrement old status
               if (oldReclamation.status === "pending") newStats.pending--;
               if (oldReclamation.status === "in_review") newStats.in_review--;
               if (oldReclamation.status === "solved") newStats.solved--;
               if (oldReclamation.status === "archived") newStats.archived--;

               // Increment new status
               if (updates.status === "pending") newStats.pending++;
               if (updates.status === "in_review") newStats.in_review++;
               if (updates.status === "solved") newStats.solved++;
               if (updates.status === "archived") newStats.archived++;
            }
         }

         return {
            reclamations: updatedReclamations,
            selectedReclamation:
               state.selectedReclamation?.id === id
                  ? { ...state.selectedReclamation, ...updates }
                  : state.selectedReclamation,
            statistics: newStats,
         };
      }),

   deleteReclamation: (id) =>
      set((state) => {
         const reclamationToDelete = state.reclamations.find(
            (r) => r.id === id
         );
         const updatedReclamations = state.reclamations.filter(
            (r) => r.id !== id
         );

         // Update statistics
         let newStats = state.statistics;
         if (reclamationToDelete && state.statistics) {
            newStats = {
               ...state.statistics,
               total: state.statistics.total - 1,
            };

            if (reclamationToDelete.status === "pending") newStats.pending--;
            if (reclamationToDelete.status === "in_review")
               newStats.in_review--;
            if (reclamationToDelete.status === "solved") newStats.solved--;
            if (reclamationToDelete.status === "archived") newStats.archived--;
         }

         return {
            reclamations: updatedReclamations,
            selectedReclamation:
               state.selectedReclamation?.id === id
                  ? null
                  : state.selectedReclamation,
            statistics: newStats,
         };
      }),

   // Helper methods
   getReclamationsByUserId: (
      userId: number,
      userRole: "admin" | "manager" | "intern"
   ) => {
      const reclamations = get().reclamations;

      if (userRole === "intern") {
         return reclamations.filter(
            (reclamation) => reclamation.intern_id === userId
         );
      }

      // For managers, show reclamations assigned to them
      if (userRole === "manager") {
         return reclamations.filter(
            (reclamation) => reclamation.manager_id === userId
         );
      }

      // Admin can see all
      return reclamations;
   },

   getPendingReclamations: () => {
      return get().reclamations.filter(
         (reclamation) => reclamation.status === "pending"
      );
   },

   getReclamationStatusDisplay: (status: string): string => {
      switch (status) {
         case "pending":
            return "Pending";
         case "in_review":
            return "In Review";
         case "solved":
            return "Solved";
         case "archived":
            return "Archived";
         default:
            return status;
      }
   },
}));

```

## File: stores/taskStore.ts
```ts
import { create } from "zustand";
import type { Task, TaskStatistics, TaskStoreState } from "@/types";
import { isPastDate } from "@/utils/date/formatters";

interface TaskStoreActions {
   // Actions
   setTasks: (tasks: Task[]) => void;
   setSelectedTask: (task: Task | null) => void;
   setStatistics: (stats: TaskStatistics) => void;
   setLoading: (loading: boolean) => void;
   setError: (error: string | null) => void;
   setPagination: (pagination: Partial<TaskStoreState["pagination"]>) => void;
   setFilters: (filters: Partial<TaskStoreState["filters"]>) => void;
   setSort: (sort: Partial<TaskStoreState["sort"]>) => void;
   resetFilters: () => void;

   // Task operations
   addTask: (task: Task) => void;
   updateTask: (id: number, updates: Partial<Task>) => void;
   deleteTask: (id: number) => void;

   // Helper methods
   getPendingTasks: () => Task[];
   getInProgressTasks: () => Task[];
   getCompletedTasks: () => Task[];
   getOverdueTasks: () => Task[];
}

export const useTaskStore = create<TaskStoreState & TaskStoreActions>(
   (set, get) => ({
      // Initial state
      tasks: [],
      selectedTask: null,
      statistics: null,
      isLoading: false,
      error: null,
      pagination: {
         currentPage: 1,
         totalPages: 1,
         totalItems: 0,
         perPage: 15,
      },
      filters: {},
      sort: {
         field: "created_at",
         order: "desc",
      },

      // Actions
      setTasks: (tasks) => set({ tasks }),

      setSelectedTask: (task) => set({ selectedTask: task }),

      setStatistics: (statistics) => set({ statistics }),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      setPagination: (pagination) =>
         set((state) => ({
            pagination: { ...state.pagination, ...pagination },
         })),

      setFilters: (filters) =>
         set((state) => ({
            filters: { ...state.filters, ...filters },
            pagination: { ...state.pagination, currentPage: 1 },
         })),

      setSort: (sort) =>
         set((state) => ({
            sort: { ...state.sort, ...sort },
         })),

      resetFilters: () =>
         set({
            filters: {},
            sort: { field: "created_at", order: "desc" },
            pagination: {
               currentPage: 1,
               totalPages: 1,
               totalItems: 0,
               perPage: 15,
            },
         }),

      // Task operations
      addTask: (task) =>
         set((state) => ({
            tasks: [task, ...state.tasks],
            statistics: state.statistics
               ? {
                    ...state.statistics,
                    total: state.statistics.total + 1,
                    pending: state.statistics.pending + 1,
                 }
               : null,
         })),

      updateTask: (id, updates) =>
         set((state) => {
            const updatedTasks = state.tasks.map((task) =>
               task.id === id ? { ...task, ...updates } : task
            );

            // Update statistics if status changed
            let newStats = state.statistics;
            if (updates.status && state.statistics) {
               const oldTask = state.tasks.find((t) => t.id === id);
               if (oldTask) {
                  newStats = { ...state.statistics };

                  // Decrement old status
                  if (oldTask.status === "pending") newStats.pending--;
                  if (oldTask.status === "in_progress") newStats.in_progress--;
                  if (oldTask.status === "completed") newStats.completed--;
                  if (oldTask.status === "cancelled") newStats.cancelled--;

                  // Increment new status
                  if (updates.status === "pending") newStats.pending++;
                  if (updates.status === "in_progress") newStats.in_progress++;
                  if (updates.status === "completed") newStats.completed++;
                  if (updates.status === "cancelled") newStats.cancelled++;
               }
            }

            return {
               tasks: updatedTasks,
               selectedTask:
                  state.selectedTask?.id === id
                     ? { ...state.selectedTask, ...updates }
                     : state.selectedTask,
               statistics: newStats,
            };
         }),

      deleteTask: (id) =>
         set((state) => {
            const taskToDelete = state.tasks.find((task) => task.id === id);
            const updatedTasks = state.tasks.filter((task) => task.id !== id);

            // Update statistics
            let newStats = state.statistics;
            if (taskToDelete && state.statistics) {
               newStats = {
                  ...state.statistics,
                  total: state.statistics.total - 1,
               };

               if (taskToDelete.status === "pending") newStats.pending--;
               if (taskToDelete.status === "in_progress")
                  newStats.in_progress--;
               if (taskToDelete.status === "completed") newStats.completed--;
               if (taskToDelete.status === "cancelled") newStats.cancelled--;
            }

            return {
               tasks: updatedTasks,
               selectedTask:
                  state.selectedTask?.id === id ? null : state.selectedTask,
               statistics: newStats,
            };
         }),

      // Helper methods instead of computed properties
      getPendingTasks: () => {
         return get().tasks.filter((task) => task.status === "pending");
      },

      getInProgressTasks: () => {
         return get().tasks.filter((task) => task.status === "in_progress");
      },

      getCompletedTasks: () => {
         return get().tasks.filter((task) => task.status === "completed");
      },

      getOverdueTasks: () => {
         const now = new Date();
         return get().tasks.filter(
            (task) => task.status !== "completed" && isPastDate(task.deadline)
         );
      },
   })
);

```

## File: types/api.types.ts
```ts
export interface ApiResponse<T = any> {
   message?: string;
   data?: T;
   errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
   data: T[];
   links: {
      first: string;
      last: string;
      prev: string | null;
      next: string | null;
   };
   meta: {
      current_page: number;
      from: number;
      last_page: number;
      links: Array<{ url: string | null; label: string; active: boolean }>;
      path: string;
      per_page: number;
      to: number;
      total: number;
   };
}

```

## File: types/attendance.types.ts
```ts
export interface Attendance {
   id: number;
   intern_id: number;
   recorded_by: number;
   attendance_date: string;
   status: "present" | "absent" | "late" | "excused";
   recorded_at: string;
   created_at: string;
   updated_at: string;
   intern?: any;
   recorded_by_user?: any;
}

export interface CreateAttendanceRequest {
   intern_id: number;
   attendance_date: string;
   status: "present" | "absent" | "late" | "excused";
}

export interface UpdateAttendanceRequest {
   status: "present" | "absent" | "late" | "excused";
}

export interface AttendanceStatistics {
   total: number;
   present: number;
   absent: number;
   late: number;
   excused: number;
   attendance_rate: number;
}

```

## File: types/auth.types.ts
```ts
export interface LoginRequest {
   email: string;
   password: string;
}

export interface LoginResponse {
   user: User;
   token: string;
   redirect_to: string;
   abilities: string[];
}

export interface User {
   id: number;
   name: string;
   email: string;
   role: "admin" | "manager" | "intern";
   department_id?: number;
   manager_id?: number;
   email_verified_at?: string;
   created_at: string;
   updated_at: string;
   deleted_at?: string;
   department?: any;
   manager?: User;
   interns?: User[];
   tasks_assigned?: any[];
   tasks_received?: any[];
   attendances?: any[];
   evaluations_received?: any[];
   evaluations_given?: any[];
   reclamations_sent?: any[];
   reclamations_received?: any[];
   notifications_sent?: any[];
   notification_recipients?: any[];
   reports_generated?: any[];
}

export interface ChangePasswordRequest {
   current_password: string;
   new_password: string;
   new_password_confirmation: string;
}

```

## File: types/dashboard.types.ts
```ts
export interface DashboardActivity {
   action: string;
   user: string;
   time: string;
   icon?: string;
}

export interface DashboardStats {
   // Admin stats
   totalUsers?: number;
   activeInterns?: number;
   pendingTasks?: number;
   reportsGenerated?: number;

   // Manager stats
   myInterns?: number;
   managerPendingTasks?: number;
   attendanceToday?: string;
   averageScore?: number;
   pendingReclamations?: number;

   // Intern stats
   myTasks?: number;
   internAverageScore?: number;
   unreadNotifications?: number;
   attendanceRate?: number;

   // Activity logs
   recentActivity: DashboardActivity[];
}

export interface FormattedStat {
   value: string | number;
   label: string;
   icon: string;
   color: "blue" | "green" | "orange" | "purple" | "red";
}

```

## File: types/evaluation.types.ts
```ts
export interface Evaluation {
   id: number;
   intern_id: number;
   manager_id: number;
   score: number;
   comments: string;
   evaluation_type:
      | "mid_term"
      | "final"
      | "monthly"
      | "weekly"
      | "quarterly"
      | "project";
   evaluated_at: string;
   created_at: string;
   updated_at: string;
   deleted_at?: string;
   intern?: any;
   manager?: any;
}

export interface CreateEvaluationRequest {
   intern_id: number;
   score: number;
   comments: string;
   evaluation_type:
      | "mid_term"
      | "final"
      | "monthly"
      | "weekly"
      | "quarterly"
      | "project";
}

export interface UpdateEvaluationRequest
   extends Partial<CreateEvaluationRequest> {}

export interface EvaluationStatistics {
   total: number;
   average_score: number;
   by_type: Record<string, number>;
}

```

## File: types/index.ts
```ts
// Export everything from all type files
export * from './auth.types';
export * from './user.types';
export * from './task.types';
export * from './attendance.types';
export * from './evaluation.types';
export * from './reclamation.types';
export * from './notification.types';
export * from './report.types';
export * from './api.types';
export * from './dashboard.types';
export * from './store.types';
```

## File: types/notification.types.ts
```ts
export interface Notification {
   id: number;
   sender_id: number;
   title: string;
   message: string;
   created_at: string;
   updated_at: string;
   sender?: any;
   recipients?: any[];
   is_read?: boolean;
   is_archived?: boolean;
   read_at?: string | null;
}

export interface NotificationRecipient {
   id: number;
   notification_id: number;
   recipient_id: number;
   is_read: boolean;
   read_at: string | null;
   is_archived: boolean;
   created_at: string;
   updated_at: string;
   notification?: Notification;
   recipient?: any;
}

export interface SendNotificationRequest {
   title: string;
   message: string;
   recipient_ids: number[];
}

export interface UpdateNotificationRequest {
   is_read?: boolean;
   is_archived?: boolean;
}

export interface NotificationStatistics {
   total: number;
   unread: number;
   archived: number;
}

```

## File: types/reclamation.types.ts
```ts
export interface Reclamation {
   id: number;
   intern_id: number;
   manager_id: number;
   subject: string;
   description: string;
   status: "pending" | "in_review" | "solved" | "archived";
   response?: string;
   resolved_at?: string;
   responded_at?: string;
   created_at: string;
   updated_at: string;
   deleted_at?: string;
   intern?: any;
   manager?: any;
}

export interface CreateReclamationRequest {
   subject: string;
   description: string;
}

export interface RespondToReclamationRequest {
   response: string;
   status: "pending" | "in_review" | "solved" | "archived";
}

export interface UpdateReclamationStatusRequest {
   status: "pending" | "in_review" | "solved" | "archived";
}

export interface ReclamationStatistics {
   total: number;
   pending: number;
   in_review: number;
   solved: number;
   archived: number;
}

```

## File: types/report.types.ts
```ts
export interface Report {
   id: number;
   type: "attendance" | "performance";
   period_start: string;
   period_end: string;
   department_id: number;
   data: any;
   generated_by: number;
   sent_to_admin: boolean;
   created_at: string;
   updated_at: string;
   department?: any;
   generated_by_user?: any;
}

export interface GenerateReportRequest {
   type: "attendance" | "performance";
   period_start: string;
   period_end: string;
}

export interface ReportStatistics {
   total: number;
   attendance_reports: number;
   performance_reports: number;
   sent_to_admin: number;
}

```

## File: types/store.types.ts
```ts
import type {
   User,
   Task,
   TaskStatistics,
   Attendance,
   AttendanceStatistics,
   Evaluation,
   EvaluationStatistics,
   Reclamation,
   ReclamationStatistics,
   Notification,
   DashboardStats,
   FormattedStat,
} from "./index";

// Auth Store
export interface AuthState {
   user: User | null;
   token: string | null;
   isAuthenticated: boolean;
   isLoading: boolean;
   error: string | null;
}

// Task Store
export interface TaskStoreState {
   tasks: Task[];
   selectedTask: Task | null;
   statistics: TaskStatistics | null;
   isLoading: boolean;
   error: string | null;
   pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      perPage: number;
   };
   filters: {
      status?: string;
      priority?: string;
      assigned_to?: number;
      search?: string;
      overdue?: boolean;
   };
   sort: {
      field: string;
      order: "asc" | "desc";
   };
}

// Attendance Store
export interface AttendanceStoreState {
   attendances: Attendance[];
   selectedAttendance: Attendance | null;
   statistics: AttendanceStatistics | null;
   isLoading: boolean;
   error: string | null;
   filters: {
      start_date?: string;
      end_date?: string;
      status?: string;
      intern_id?: number;
   };
}

// Evaluation Store
export interface EvaluationStoreState {
   evaluations: Evaluation[];
   selectedEvaluation: Evaluation | null;
   statistics: EvaluationStatistics | null;
   isLoading: boolean;
   error: string | null;
   filters: {
      evaluation_type?: string;
      start_date?: string;
      end_date?: string;
      intern_id?: number;
   };
}

// Reclamation Store
export interface ReclamationStoreState {
   reclamations: Reclamation[];
   selectedReclamation: Reclamation | null;
   statistics: ReclamationStatistics | null;
   isLoading: boolean;
   error: string | null;
   filters: {
      status?: string;
      search?: string;
   };
}

// Notification Store
export interface NotificationStoreState {
   notifications: Notification[];
   selectedNotification: Notification | null;
   isLoading: boolean;
   error: string | null;
   filters: {
      is_read?: boolean;
      is_archived?: boolean;
      search?: string;
   };
}

// Dashboard Store
export interface DashboardStoreState {
   stats: DashboardStats;
   isLoading: boolean;
   error: string | null;
}

```

## File: types/task.types.ts
```ts
export interface Task {
   id: number;
   title: string;
   description: string;
   status: "pending" | "in_progress" | "completed" | "cancelled";
   priority: "low" | "medium" | "high" | "urgent";
   assigned_by: number;
   assigned_to: number;
   deadline: string;
   created_at: string;
   updated_at: string;
   deleted_at?: string;
   assigned_by_user?: any;
   assigned_to_user?: any;
}

export interface CreateTaskRequest {
   title: string;
   description: string;
   assigned_to: number;
   priority: "low" | "medium" | "high" | "urgent";
   deadline: string;
}

export interface UpdateTaskRequest extends Partial<CreateTaskRequest> {}

export interface UpdateTaskStatusRequest {
   status: "pending" | "in_progress" | "completed" | "cancelled";
}

export interface TaskStatistics {
   total: number;
   pending: number;
   in_progress: number;
   completed: number;
   cancelled: number;
   overdue: number;
}

```

## File: types/types.ts
```ts
// ==================== AUTH TYPES ====================
export interface LoginRequest {
   email: string;
   password: string;
}

export interface LoginResponse {
   user: User;
   token: string;
   redirect_to: string;
   abilities: string[];
}

export interface User {
   id: number;
   name: string;
   email: string;
   role: "admin" | "manager" | "intern";
   department_id?: number;
   manager_id?: number;
   email_verified_at?: string;
   created_at: string;
   updated_at: string;
   deleted_at?: string;
   department?: any;
   manager?: User;
   interns?: User[];
   tasks_assigned?: any[];
   tasks_received?: any[];
   attendances?: any[];
   evaluations_received?: any[];
   evaluations_given?: any[];
   reclamations_sent?: any[];
   reclamations_received?: any[];
   notifications_sent?: any[];
   notification_recipients?: any[];
   reports_generated?: any[];
}

export interface ChangePasswordRequest {
   current_password: string;
   new_password: string;
   new_password_confirmation: string;
}

// ==================== USER MANAGEMENT TYPES ====================
export interface CreateUserRequest {
   name: string;
   email: string;
   password: string;
   role: "admin" | "manager" | "intern";
   department_id?: number;
   manager_id?: number;
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {}

export interface AssignInternRequest {
   department_id: number;
   manager_id: number;
}

// ==================== TASK TYPES ====================
export interface Task {
   id: number;
   title: string;
   description: string;
   status: "pending" | "in_progress" | "completed" | "cancelled";
   priority: "low" | "medium" | "high" | "urgent";
   assigned_by: number;
   assigned_to: number;
   deadline: string;
   created_at: string;
   updated_at: string;
   deleted_at?: string;
   assigned_by_user?: any;
   assigned_to_user?: any;
}

export interface CreateTaskRequest {
   title: string;
   description: string;
   assigned_to: number;
   priority: "low" | "medium" | "high" | "urgent";
   deadline: string;
}

export interface UpdateTaskRequest extends Partial<CreateTaskRequest> {}

export interface UpdateTaskStatusRequest {
   status: "pending" | "in_progress" | "completed" | "cancelled";
}

export interface TaskStatistics {
   total: number;
   pending: number;
   in_progress: number;
   completed: number;
   cancelled: number;
   overdue: number;
}

// ==================== ATTENDANCE TYPES ====================
export interface Attendance {
   id: number;
   intern_id: number;
   recorded_by: number;
   attendance_date: string;
   status: "present" | "absent" | "late" | "excused";
   recorded_at: string;
   created_at: string;
   updated_at: string;
   intern?: any;
   recorded_by_user?: any;
}

export interface CreateAttendanceRequest {
   intern_id: number;
   attendance_date: string;
   status: "present" | "absent" | "late" | "excused";
}

export interface UpdateAttendanceRequest {
   status: "present" | "absent" | "late" | "excused";
}

export interface AttendanceStatistics {
   total: number;
   present: number;
   absent: number;
   late: number;
   excused: number;
   attendance_rate: number;
}

// ==================== EVALUATION TYPES ====================
export interface Evaluation {
   id: number;
   intern_id: number;
   manager_id: number;
   score: number;
   comments: string;
   evaluation_type:
      | "mid_term"
      | "final"
      | "monthly"
      | "weekly"
      | "quarterly"
      | "project";
   evaluated_at: string;
   created_at: string;
   updated_at: string;
   deleted_at?: string;
   intern?: any;
   manager?: any;
}

export interface CreateEvaluationRequest {
   intern_id: number;
   score: number;
   comments: string;
   evaluation_type:
      | "mid_term"
      | "final"
      | "monthly"
      | "weekly"
      | "quarterly"
      | "project";
}

export interface UpdateEvaluationRequest
   extends Partial<CreateEvaluationRequest> {}

export interface EvaluationStatistics {
   total: number;
   average_score: number;
   by_type: Record<string, number>;
}

// ==================== RECLAMATION TYPES ====================
export interface Reclamation {
   id: number;
   intern_id: number;
   manager_id: number;
   subject: string;
   description: string;
   status: "pending" | "in_review" | "solved" | "archived";
   response?: string;
   resolved_at?: string;
   responded_at?: string;
   created_at: string;
   updated_at: string;
   deleted_at?: string;
   intern?: any;
   manager?: any;
}

export interface CreateReclamationRequest {
   subject: string;
   description: string;
}

export interface RespondToReclamationRequest {
   response: string;
   status: "pending" | "in_review" | "solved" | "archived";
}

export interface UpdateReclamationStatusRequest {
   status: "pending" | "in_review" | "solved" | "archived";
}

export interface ReclamationStatistics {
   total: number;
   pending: number;
   in_review: number;
   solved: number;
   archived: number;
}

// ==================== NOTIFICATION TYPES ====================
export interface Notification {
   id: number;
   sender_id: number;
   title: string;
   message: string;
   created_at: string;
   updated_at: string;
   sender?: any;
   recipients?: any[];
   // For frontend use (might come from API or client-side)
   is_read?: boolean;
   is_archived?: boolean;
   read_at?: string | null;
}

export interface NotificationRecipient {
   id: number;
   notification_id: number;
   recipient_id: number;
   is_read: boolean;
   read_at: string | null;
   is_archived: boolean;
   created_at: string;
   updated_at: string;
   notification?: Notification;
   recipient?: any;
}

export interface SendNotificationRequest {
   title: string;
   message: string;
   recipient_ids: number[];
}

export interface UpdateNotificationRequest {
   is_read?: boolean;
   is_archived?: boolean;
}

export interface NotificationStatistics {
   total: number;
   unread: number;
   archived: number;
}

// ==================== REPORT TYPES ====================
export interface Report {
   id: number;
   type: "attendance" | "performance";
   period_start: string;
   period_end: string;
   department_id: number;
   data: any;
   generated_by: number;
   sent_to_admin: boolean;
   created_at: string;
   updated_at: string;
   department?: any;
   generated_by_user?: any;
}

export interface GenerateReportRequest {
   type: "attendance" | "performance";
   period_start: string;
   period_end: string;
}

export interface ReportStatistics {
   total: number;
   attendance_reports: number;
   performance_reports: number;
   sent_to_admin: number;
}

// ==================== API RESPONSE TYPES ====================
export interface ApiResponse<T = any> {
   message?: string;
   data?: T;
   errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
   data: T[];
   links: {
      first: string;
      last: string;
      prev: string | null;
      next: string | null;
   };
   meta: {
      current_page: number;
      from: number;
      last_page: number;
      links: Array<{ url: string | null; label: string; active: boolean }>;
      path: string;
      per_page: number;
      to: number;
      total: number;
   };
}

// ==================== DASHBOARD TYPES ====================
export interface DashboardActivity {
   action: string;
   user: string;
   time: string;
   icon?: string;
}

export interface DashboardStats {
   // Admin stats
   totalUsers?: number;
   activeInterns?: number;
   pendingTasks?: number;
   reportsGenerated?: number;

   // Manager stats
   myInterns?: number;
   managerPendingTasks?: number;
   attendanceToday?: string;
   averageScore?: number;
   pendingReclamations?: number;

   // Intern stats
   myTasks?: number;
   internAverageScore?: number;
   unreadNotifications?: number;
   attendanceRate?: number;

   // Activity logs
   recentActivity: DashboardActivity[];
}

export interface FormattedStat {
   value: string | number;
   label: string;
   icon: string;
   color: "blue" | "green" | "orange" | "purple" | "red";
}

// ==================== STORE STATE TYPES ====================
// Auth Store
export interface AuthState {
   user: User | null;
   token: string | null;
   isAuthenticated: boolean;
   isLoading: boolean;
   error: string | null;
}

// Task Store
export interface TaskStoreState {
   tasks: Task[];
   selectedTask: Task | null;
   statistics: TaskStatistics | null;
   isLoading: boolean;
   error: string | null;
   pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      perPage: number;
   };
   filters: {
      status?: string;
      priority?: string;
      assigned_to?: number;
      search?: string;
      overdue?: boolean;
   };
   sort: {
      field: string;
      order: "asc" | "desc";
   };
}

// Attendance Store
export interface AttendanceStoreState {
   attendances: Attendance[];
   selectedAttendance: Attendance | null;
   statistics: AttendanceStatistics | null;
   isLoading: boolean;
   error: string | null;
   filters: {
      start_date?: string;
      end_date?: string;
      status?: string;
      intern_id?: number;
   };
}

// Evaluation Store
export interface EvaluationStoreState {
   evaluations: Evaluation[];
   selectedEvaluation: Evaluation | null;
   statistics: EvaluationStatistics | null;
   isLoading: boolean;
   error: string | null;
   filters: {
      evaluation_type?: string;
      start_date?: string;
      end_date?: string;
      intern_id?: number;
   };
}

// Reclamation Store
export interface ReclamationStoreState {
   reclamations: Reclamation[];
   selectedReclamation: Reclamation | null;
   statistics: ReclamationStatistics | null;
   isLoading: boolean;
   error: string | null;
   filters: {
      status?: string;
      search?: string;
   };
}

// Notification Store
export interface NotificationStoreState {
   notifications: Notification[];
   selectedNotification: Notification | null;
   isLoading: boolean;
   error: string | null;
   filters: {
      is_read?: boolean;
      is_archived?: boolean;
      search?: string;
   };
}

// Dashboard Store
export interface DashboardStoreState {
   stats: DashboardStats;
   isLoading: boolean;
   error: string | null;
}

```

## File: types/user.types.ts
```ts
export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: "admin" | "manager" | "intern";
  department_id?: number;
  manager_id?: number;
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {}

export interface AssignInternRequest {
  department_id: number;
  manager_id: number;
}
```

## File: utils/api/errorHandlers.ts
```ts
export const handleApiError = (error: any): string => {
   if (error.response) {
      // Server responded with error
      switch (error.response.status) {
         case 401:
            return "Unauthorized. Please login again.";
         case 403:
            return "You do not have permission to perform this action.";
         case 404:
            return "Resource not found.";
         case 422:
            return "Validation error. Please check your input.";
         case 500:
            return "Server error. Please try again later.";
         default:
            return error.response.data?.message || "An error occurred.";
      }
   } else if (error.request) {
      // Request made but no response
      return "Network error. Please check your connection.";
   } else {
      // Error setting up request
      return "Request error. Please try again.";
   }
};

```

## File: utils/api/index.ts
```ts
export * from './errorHandlers.ts';
export * from './responseParsers.ts';
```

## File: utils/api/responseParsers.ts
```ts
import type { PaginatedResponse } from "@/types";

export const parsePaginatedResponse = <T>(response: PaginatedResponse<T>) => {
   return {
      data: response.data,
      pagination: {
         currentPage: response.meta.current_page,
         totalPages: response.meta.last_page,
         totalItems: response.meta.total,
         perPage: response.meta.per_page,
         hasNextPage: !!response.links.next,
         hasPrevPage: !!response.links.prev,
      },
   };
};

export const extractErrorMessage = (error: any): string => {
   if (error?.response?.data?.message) {
      return error.response.data.message;
   }
   if (error?.message) {
      return error.message;
   }
   return "An unknown error occurred";
};

```

## File: utils/auth/index.ts
```ts
export * from './roleHelpers.ts';
export * from './userHelpers.ts';
```

## File: utils/auth/roleHelpers.ts
```ts
import type { User } from "@/types";

export const getRedirectPath = (role: string): string => {
   switch (role) {
      case "admin":
         return "/admin/dashboard";
      case "manager":
         return "/manager/dashboard";
      case "intern":
         return "/intern/dashboard";
      default:
         return "/login";
   }
};

export const hasRole = (user: User | null, role: string): boolean => {
   return user?.role === role;
};

export const hasAnyRole = (user: User | null, roles: string[]): boolean => {
   return roles.includes(user?.role || "");
};

```

## File: utils/auth/userHelpers.ts
```ts
import type { User } from '@/types';

export const getUserInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const formatUserName = (user: User): string => {
  return `${user.name} (${user.role.charAt(0).toUpperCase() + user.role.slice(1)})`;
};

export const getUserDisplayName = (user: User | null): string => {
  if (!user) return 'Unknown User';
  return `${user.name} - ${user.role.toUpperCase()}`;
};

export const getRoleDisplayName = (role: string): string => {
  switch (role) {
    case 'admin': return 'Administrator';
    case 'manager': return 'Manager';
    case 'intern': return 'Intern';
    default: return role.charAt(0).toUpperCase() + role.slice(1);
  }
};
```

## File: utils/date/formatters.ts
```ts
export const formatDate = (dateString: string): string => {
   const date = new Date(dateString);
   return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
   });
};

export const formatDateTime = (dateString: string): string => {
   const date = new Date(dateString);
   return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
   });
};

export const formatTime = (dateString: string): string => {
   const date = new Date(dateString);
   return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
   });
};

export const getTodayDateString = (): string => {
   return new Date().toISOString().split("T")[0];
};

export const isToday = (dateString: string): boolean => {
   const date = new Date(dateString);
   const today = new Date();
   return date.toDateString() === today.toDateString();
};

export const isPastDate = (dateString: string): boolean => {
   const date = new Date(dateString);
   const now = new Date();
   return date < now;
};
```

## File: utils/date/index.ts
```ts
export * from './formatters';
export * from './validators';
```

## File: utils/date/validators.ts
```ts
export const isPastDate = (dateString: string): boolean => {
   const date = new Date(dateString);
   const now = new Date();
   return date < now;
};

export const isFutureDate = (dateString: string): boolean => {
   const date = new Date(dateString);
   const now = new Date();
   return date > now;
};

export const isValidDate = (dateString: string): boolean => {
   const date = new Date(dateString);
   return date instanceof Date && !isNaN(date.getTime());
};

```

## File: utils/format/dataFormatters.ts
```ts
export const formatFileSize = (bytes: number): string => {
   if (bytes === 0) return "0 Bytes";
   const k = 1024;
   const sizes = ["Bytes", "KB", "MB", "GB"];
   const i = Math.floor(Math.log(bytes) / Math.log(k));
   return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const formatNumber = (num: number): string => {
   return new Intl.NumberFormat().format(num);
};

export const formatPercentage = (value: number): string => {
   return `${value.toFixed(1)}%`;
};

export const formatAttendanceRate = (
   present: number,
   total: number
): string => {
   if (total === 0) return "0%";
   const rate = (present / total) * 100;
   return formatPercentage(rate);
};

export const formatAverageScore = (score: number): string => {
   return formatPercentage(score);
};

export const formatDate = (dateString: string): string => {
   const date = new Date(dateString);
   return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
   });
};

export const formatDateTime = (dateString: string): string => {
   const date = new Date(dateString);
   return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
   });
};

export const formatDateForDisplay = (dateString: string): string => {
   const date = new Date(dateString);
   return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
   });
};

export const formatTimeForDisplay = (dateString: string): string => {
   const date = new Date(dateString);
   return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
   });
};


```

## File: utils/format/index.ts
```ts
export * from './dataFormatters';
export * from './stringFormatters.ts';
```

## File: utils/format/stringFormatters.ts
```ts
export const truncateText = (text: string, maxLength: number): string => {
   if (text.length <= maxLength) return text;
   return text.substring(0, maxLength) + "...";
};

export const capitalize = (text: string): string => {
   return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const snakeToTitleCase = (text: string): string => {
   return text
      .split("_")
      .map((word) => capitalize(word))
      .join(" ");
};

```

## File: utils/index.ts
```ts

```

## File: utils/validation/apiValidators.ts
```ts
export const isApiError = (response: any): response is { 
  message: string; 
  errors?: Record<string, string[]> 
} => {
  return response && response.message && response.errors !== undefined;
};

export const getValidationErrors = (error: any): Record<string, string> => {
  if (error?.response?.data?.errors) {
    const errors: Record<string, string> = {};
    Object.entries(error.response.data.errors).forEach(([field, messages]) => {
      errors[field] = (messages as string[])[0];
    });
    return errors;
  }
  return {};
};
```

## File: utils/validation/formValidators.ts
```ts
export const validateEmail = (email: string): boolean => {
   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return re.test(email);
};

export const validatePassword = (password: string): boolean => {
   return password.length >= 8;
};

export const validateRequired = (value: string): boolean => {
   return value.trim().length > 0;
};

export const validateDeadline = (deadline: string): boolean => {
   const date = new Date(deadline);
   const today = new Date();
   today.setHours(0, 0, 0, 0);
   return date >= today;
};

```

## File: utils/validation/index.ts
```ts
export * from './formValidators.ts';
export * from './apiValidators.ts';
```

## File: vite-env.d.ts
```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_DEBUG: string;
  // Add other environment variables you use
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

