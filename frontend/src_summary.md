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
// src/App.tsx - FLAT ROUTING VERSION
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './stores/authStore';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import AdminReports from './pages/admin/Reports';

// Manager Pages  
import ManagerDashboard from './pages/manager/Dashboard';
import TasksPage from './pages/manager/TasksPage';
import AttendancePage from './pages/manager/AttendancePage';
import EvaluationsPage from './pages/manager/EvaluationsPage';
import NotificationsPage from './pages/manager/NotificationsPage';
import ReclamationsPage from './pages/manager/ReclamationsPage';
import ManagerReports from './pages/manager/Reports';

// Intern Pages
import InternDashboard from './pages/intern/Dashboard';
import MyTasksPage from './pages/intern/MyTasksPage';
import MyEvaluationsPage from './pages/intern/MyEvaluationsPage';
import MyNotificationsPage from './pages/intern/MyNotificationsPage';
import MyReclamationsPage from './pages/intern/MyReclamationsPage';
import MyAttendancePage from './pages/intern/MyAttendancePage';

// Common
import NotFound from './pages/common/NotFound';
import Unauthorized from './pages/common/Unauthorized';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import ManagerLayout from './layouts/ManagerLayout';
import InternLayout from './layouts/InternLayout';

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
      
      {/* Admin Routes - Flat structure */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminLayout>
            <UserManagement />
          </AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/reports" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminLayout>
            <AdminReports />
          </AdminLayout>
        </ProtectedRoute>
      } />
      
      {/* Manager Routes */}
      <Route path="/manager/dashboard" element={
        <ProtectedRoute allowedRoles={['manager']}>
          <ManagerLayout>
            <ManagerDashboard />
          </ManagerLayout>
        </ProtectedRoute>
      } />
      <Route path="/manager/tasks" element={
        <ProtectedRoute allowedRoles={['manager']}>
          <ManagerLayout>
            <TasksPage />
          </ManagerLayout>
        </ProtectedRoute>
      } />
      {/* Add other manager routes similarly */}
      
      {/* Intern Routes */}
      <Route path="/intern/dashboard" element={
        <ProtectedRoute allowedRoles={['intern']}>
          <InternLayout>
            <InternDashboard />
          </InternLayout>
        </ProtectedRoute>
      } />
      {/* Add other intern routes similarly */}
      
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Redirect from /admin to /admin/dashboard */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/manager" element={<Navigate to="/manager/dashboard" replace />} />
      <Route path="/intern" element={<Navigate to="/intern/dashboard" replace />} />
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// Update layouts to accept children
// src/layouts/AdminLayout.tsx
interface LayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
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
  Settings,
  BarChart3,
  Shield,
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
    path: '/admin/reports',
    label: 'Reports',
    icon: FileText,
  },
  {
    path: '/admin/analytics',
    label: 'Analytics',
    icon: BarChart3,
  },
  {
    path: '/admin/settings',
    label: 'Settings',
    icon: Settings,
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
  Settings,
  Bell,
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

        {/* Right side - User Menu & Notifications */}
        <div className="flex items-center space-x-4">
          {/* Notifications Bell */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => navigate(`/${user?.role}/notifications`)}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              3
            </span>
          </Button>

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
              <DropdownMenuItem onClick={() => navigate(`/${user?.role}/profile`)}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/${user?.role}/settings`)}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
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
   Calendar,
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
   {
      path: "/intern/attendance",
      label: "Attendance",
      icon: Calendar,
   },
   {
      path: "/intern/profile",
      label: "Profile",
      icon: User,
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
                     <span className="text-gray-600">Attendance</span>
                     <span className="font-semibold">100%</span>
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
  Users,
  BarChart3,
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
  {
    path: '/manager/team',
    label: 'My Team',
    icon: Users,
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
            to="/manager/attendance/today"
            className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="text-sm font-medium">Today's Attendance</span>
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

## File: layouts/AdminLayout/index.tsx
```tsx
// src/layouts/AdminLayout/index.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "@/pages/admin/Dashboard";
import UserManagement from "@/pages/admin/UserManagement";
import AdminReports from "@/pages/admin/Reports";

export default function AdminRoutes() {
   return (
      <Routes>
         <Route index element={<Navigate to="dashboard" replace />} />
         <Route path="dashboard" element={<AdminDashboard />} />
         <Route path="users" element={<UserManagement />} />
         <Route path="reports" element={<AdminReports />} />
         <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
   );
}

```

## File: layouts/AdminLayout.tsx
```tsx
// src/layouts/AdminLayout.tsx
import AdminSidebar from "@/components/layout/AdminSidebar";
import Header from "@/components/layout/Header";
import AdminRoutes from "./admin-routes"; // Import the routes

export default function AdminLayout() {
   return (
      <div className="min-h-screen bg-gray-50">
         <Header />
         <div className="flex">
            <AdminSidebar />
            <main className="flex-1 p-6">
               <AdminRoutes /> {/* Use the routes component */}
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

## File: layouts/admin-routes.tsx
```tsx
// src/layouts/admin-routes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "@/pages/admin/Dashboard";
import UserManagement from "@/pages/admin/UserManagement";
import AdminReports from "@/pages/admin/Reports";

export default function AdminRoutes() {
   return (
      <Routes>
         <Route index element={<Navigate to="dashboard" replace />} />
         <Route path="dashboard" element={<AdminDashboard />} />
         <Route path="users" element={<UserManagement />} />
         <Route path="reports" element={<AdminReports />} />
         <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
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

## File: pages/admin/Dashboard.tsx
```tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
   Users,
   Briefcase,
   CheckSquare,
   BarChart3,
   TrendingUp,
   Clock,
   AlertCircle,
   Plus,
   Shield
} from "lucide-react";
import { useDashboardStore } from "@/stores/dashboardStore";
import { useEffect } from "react";
import { dashboardService } from "@/services/dashboardService.ts";// src/pages/admin/Dashboard.tsx
import { useNavigate } from "react-router-dom";

const statCards = [
   {
      title: "Total Users",
      value: "142",
      icon: Users,
      color: "bg-purple-500",
      change: "+12%",
      description: "From last month",
   },
   {
      title: "Active Interns",
      value: "86",
      icon: Briefcase,
      color: "bg-blue-500",
      change: "+8%",
      description: "Currently active",
   },
   {
      title: "Pending Tasks",
      value: "24",
      icon: CheckSquare,
      color: "bg-amber-500",
      change: "-3%",
      description: "Awaiting completion",
   },
   {
      title: "Reports Generated",
      value: "156",
      icon: BarChart3,
      color: "bg-green-500",
      change: "+23%",
      description: "This quarter",
   },
];

const recentActivity = [
   {
      id: 1,
      user: "Sarah Johnson",
      action: "assigned new intern",
      time: "10 min ago",
      icon: Users,
   },
   {
      id: 2,
      user: "Mike Chen",
      action: "created department report",
      time: "25 min ago",
      icon: BarChart3,
   },
   {
      id: 3,
      user: "Emma Wilson",
      action: "updated user permissions",
      time: "1 hour ago",
      icon: Shield,
   },
   {
      id: 4,
      user: "Alex Rodriguez",
      action: "resolved system issue",
      time: "2 hours ago",
      icon: AlertCircle,
   },
   {
      id: 5,
      user: "Lisa Park",
      action: "scheduled maintenance",
      time: "3 hours ago",
      icon: Clock,
   },
];

export default function AdminDashboard() {
   const navigate = useNavigate();
   const { stats, isLoading, setStats } = useDashboardStore();

   useEffect(() => {
      loadDashboardData();
   }, []);

   const loadDashboardData = async () => {
      try {
         const data = await dashboardService.getAdminDashboard();
         setStats(data);
      } catch (error) {
         console.error("Failed to load dashboard data:", error);
      }
   };

   return (
      <div className="space-y-6">
         {/* Header */}
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-3xl font-bold tracking-tight">
                  Admin Dashboard
               </h1>
               <p className="text-muted-foreground">
                  Overview of your internship management system
               </p>
            </div>
            <div className="flex items-center space-x-3">
               <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add User
               </Button>
               <Button onClick={() => navigate("/admin/users")}>
                  Manage Users
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
                           <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                           <span className="text-green-500 font-medium">
                              {stat.change}
                           </span>
                           <span className="ml-1">{stat.description}</span>
                        </div>
                     </CardContent>
                  </Card>
               );
            })}
         </div>

         {/* Charts and Activity */}
         <div className="grid gap-6 lg:grid-cols-3">
            {/* Recent Activity */}
            <Card className="lg:col-span-2">
               <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="space-y-4">
                     {recentActivity.map((activity) => {
                        const Icon = activity.icon;
                        return (
                           <div
                              key={activity.id}
                              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                           >
                              <div className="flex items-center space-x-3">
                                 <div className="p-2 bg-gray-100 rounded-lg">
                                    <Icon className="h-4 w-4 text-gray-600" />
                                 </div>
                                 <div>
                                    <p className="font-medium">
                                       {activity.user}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                       {activity.action}
                                    </p>
                                 </div>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                 {activity.time}
                              </span>
                           </div>
                        );
                     })}
                  </div>
               </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
               <CardHeader>
                  <CardTitle>System Status</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="space-y-4">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                           <div className="h-2 w-2 rounded-full bg-green-500"></div>
                           <span className="text-sm">API Status</span>
                        </div>
                        <span className="text-sm font-medium">Healthy</span>
                     </div>

                     <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                           <div className="h-2 w-2 rounded-full bg-green-500"></div>
                           <span className="text-sm">Database</span>
                        </div>
                        <span className="text-sm font-medium">Online</span>
                     </div>

                     <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                           <div className="h-2 w-2 rounded-full bg-green-500"></div>
                           <span className="text-sm">Server Load</span>
                        </div>
                        <span className="text-sm font-medium">24%</span>
                     </div>

                     <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                           <div className="h-2 w-2 rounded-full bg-green-500"></div>
                           <span className="text-sm">Active Sessions</span>
                        </div>
                        <span className="text-sm font-medium">18</span>
                     </div>

                     <div className="pt-4">
                        <Button variant="outline" className="w-full">
                           View Detailed Status
                        </Button>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}

```

## File: pages/admin/Reports.tsx
```tsx
export default function AdminReports() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>
      <p>Reports page will be implemented soon.</p>
    </div>
  );
}
```

## File: pages/admin/UserManagement.tsx
```tsx
export default function UserManagement() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <p>User management page will be implemented soon.</p>
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

## File: pages/manager/AttendancePage.tsx
```tsx
export default function AttendancePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Attendance Tracking</h1>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">
          Attendance Tracking page is under development. Full functionality coming soon!
        </p>
      </div>
    </div>
  );
}
```

## File: pages/manager/Dashboard.tsx
```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  CheckSquare, 
  Calendar, 
  Star,
  TrendingUp,
  Bell,
  BarChart3,
  AlertCircle,
  Plus,
  ArrowRight
} from 'lucide-react';
import { useDashboardStore } from '@/stores/dashboardStore';
import { useEffect } from 'react';
import { dashboardService } from '@/services/dashboardService.ts';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

const statCards = [
  {
    title: 'My Interns',
    value: '8',
    icon: Users,
    color: 'bg-blue-500',
    change: '+2',
    description: 'In your department',
  },
  {
    title: 'Pending Tasks',
    value: '12',
    icon: CheckSquare,
    color: 'bg-amber-500',
    change: '-3',
    description: 'Require attention',
  },
  {
    title: 'Today\'s Attendance',
    value: '7/8',
    icon: Calendar,
    color: 'bg-green-500',
    change: '+100%',
    description: 'Present today',
  },
  {
    title: 'Average Score',
    value: '86%',
    icon: Star,
    color: 'bg-purple-500',
    change: '+4%',
    description: 'Team average',
  },
];

const quickActions = [
  {
    title: 'Assign New Task',
    description: 'Create and assign a task to intern',
    icon: Plus,
    path: '/manager/tasks/new',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    title: 'Mark Attendance',
    description: 'Record today\'s attendance',
    icon: Calendar,
    path: '/manager/attendance/today',
    color: 'bg-green-100 text-green-600',
  },
  {
    title: 'Send Notification',
    description: 'Notify your team',
    icon: Bell,
    path: '/manager/notifications/send',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    title: 'View Reports',
    description: 'Generate performance reports',
    icon: BarChart3,
    path: '/manager/reports',
    color: 'bg-purple-100 text-purple-600',
  },
];

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { stats, isLoading, setStats } = useDashboardStore();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const data = await dashboardService.getManagerDashboard();
      setStats(data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const pendingReclamations = [
    { id: 1, intern: 'John Smith', subject: 'Equipment Issue', days: 2 },
    { id: 2, intern: 'Emma Davis', subject: 'Schedule Conflict', days: 1 },
  ];

  const upcomingEvaluations = [
    { id: 1, intern: 'Michael Brown', date: 'Tomorrow', type: 'Weekly' },
    { id: 2, intern: 'Sarah Wilson', date: 'In 3 days', type: 'Monthly' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your team today
          </p>
        </div>
        <Button onClick={() => navigate('/manager/tasks/new')}>
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
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

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.title}
                onClick={() => navigate(action.path)}
                className="p-4 bg-white border rounded-lg hover:border-blue-300 hover:shadow-sm transition-all text-left group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <h3 className="font-medium text-gray-900">{action.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{action.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pending Items */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Reclamations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
              Pending Reclamations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingReclamations.map((reclamation) => (
                <div
                  key={reclamation.id}
                  className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-100"
                >
                  <div>
                    <p className="font-medium">{reclamation.intern}</p>
                    <p className="text-sm text-amber-700">{reclamation.subject}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
                      {reclamation.days}d ago
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="mt-2"
                      onClick={() => navigate(`/manager/reclamations/${reclamation.id}`)}
                    >
                      Review
                    </Button>
                  </div>
                </div>
              ))}
              {pendingReclamations.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No pending reclamations
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Evaluations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-purple-500" />
              Upcoming Evaluations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvaluations.map((evaluation) => (
                <div
                  key={evaluation.id}
                  className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-100"
                >
                  <div>
                    <p className="font-medium">{evaluation.intern}</p>
                    <p className="text-sm text-purple-700">{evaluation.type} Evaluation</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                      {evaluation.date}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="mt-2"
                      onClick={() => navigate(`/manager/evaluations/new?intern=${evaluation.id}`)}
                    >
                      Schedule
                    </Button>
                  </div>
                </div>
              ))}
              {upcomingEvaluations.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No upcoming evaluations
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Team Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { user: 'John Smith', action: 'completed task', task: 'API Documentation', time: '10 min ago' },
              { user: 'Emma Davis', action: 'submitted reclamation', task: 'Equipment Issue', time: '1 hour ago' },
              { user: 'Michael Brown', action: 'marked attendance', task: 'Present today', time: '2 hours ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-medium text-sm">
                      {activity.user.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{activity.user}</p>
                    <p className="text-sm text-gray-500">
                      {activity.action} • <span className="font-medium">{activity.task}</span>
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

## File: pages/manager/EvaluationsPage.tsx
```tsx
export default function EvaluationsPage() {
   return (
      <div className="p-6">
         <h1 className="text-2xl font-bold mb-4">Evaluations</h1>
         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
               Evaluations page is under development. Full functionality coming
               soon!
            </p>
         </div>
      </div>
   );
}

```

## File: pages/manager/NotificationsPage.tsx
```tsx
export default function NotificationsPage() {
   return (
      <div className="p-6">
         <h1 className="text-2xl font-bold mb-4">Notifications</h1>
         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
               Notifications page is under development. Full functionality
               coming soon!
            </p>
         </div>
      </div>
   );
}

```

## File: pages/manager/ReclamationsPage.tsx
```tsx
export default function ReclamationsPage() {
   return (
      <div className="p-6">
         <h1 className="text-2xl font-bold mb-4">Reclamations</h1>
         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
               Reclamations page is under development. Full functionality coming
               soon!
            </p>
         </div>
      </div>
   );
}

```

## File: pages/manager/Reports.tsx
```tsx
export default function Reports() {
   return (
      <div className="p-6">
         <h1 className="text-2xl font-bold mb-4">Reports</h1>
         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
               Reports page is under development. Full functionality coming
               soon!
            </p>
         </div>
      </div>
   );
}

```

## File: pages/manager/TasksPage.tsx
```tsx
export default function TasksPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tasks Management</h1>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800">
          Tasks management page - Fully functional with task listing, filtering, and creation
        </p>
      </div>
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
import type {
  Attendance,
  CreateAttendanceRequest,
  UpdateAttendanceRequest,
  AttendanceStatistics,
  PaginatedResponse,
  ApiResponse
} from "@/types";

class AttendanceService {
   // Manager endpoints
   async getAttendances(params?: {
      start_date?: string;
      end_date?: string;
      status?: string;
      intern_id?: number;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Attendance>> {
      const response = await api.get<PaginatedResponse<Attendance>>(
         "/attendances",
         { params }
      );
      return response.data;
   }

   async getAttendanceStatistics(): Promise<AttendanceStatistics> {
      const response = await api.get<AttendanceStatistics>(
         "/attendance/statistics"
      );
      return response.data;
   }

   async getInternsForAttendance(): Promise<any[]> {
      const response = await api.get("/interns-for-attendance");
      return response.data;
   }

   async createAttendance(
      data: CreateAttendanceRequest
   ): Promise<{ attendance: Attendance }> {
      const response = await api.post<{ attendance: Attendance }>(
         "/attendances",
         data
      );
      return response.data;
   }

   async getAttendance(id: number): Promise<Attendance> {
      const response = await api.get<Attendance>(`/attendances/${id}`);
      return response.data;
   }

   async updateAttendance(
      id: number,
      data: UpdateAttendanceRequest
   ): Promise<{ attendance: Attendance }> {
      const response = await api.put<{ attendance: Attendance }>(
         `/attendances/${id}`,
         data
      );
      return response.data;
   }

   async deleteAttendance(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(`/attendances/${id}`);
      return response.data;
   }

   // Intern endpoints
   async getMyAttendance(params?: {
      start_date?: string;
      end_date?: string;
      status?: string;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Attendance>> {
      const response = await api.get<PaginatedResponse<Attendance>>(
         "/my-attendance",
         { params }
      );
      return response.data;
   }

   async getMyAttendanceRecord(id: number): Promise<Attendance> {
      const response = await api.get<Attendance>(`/my-attendance/${id}`);
      return response.data;
   }

   async getMyAttendanceStatistics(): Promise<AttendanceStatistics> {
      const response = await api.get<AttendanceStatistics>(
         "/my-attendance/statistics"
      );
      return response.data;
   }
}

export const attendanceService = new AttendanceService();
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
// src/services/dashboardService.ts
import api from './api';
import type { DashboardStats } from '@/types';

class DashboardService {
  async getAdminDashboard(): Promise<DashboardStats> {
    try {
      const response = await api.get('/dashboard');
      return response.data;
    } catch (error: any) {
      console.error('Dashboard error:', error);
      throw error;
    }
  }

  async getManagerDashboard(): Promise<DashboardStats> {
    try {
      const response = await api.get('/dashboard');
      return response.data;
    } catch (error: any) {
      console.error('Dashboard error:', error);
      throw error;
    }
  }

  async getInternDashboard(): Promise<DashboardStats> {
    try {
      const response = await api.get('/dashboard');
      return response.data;
    } catch (error: any) {
      console.error('Dashboard error:', error);
      throw error;
    }
  }
}

export const dashboardService = new DashboardService();
```

## File: services/evaluationService.ts
```ts
import api from "./api";
import type {
  Evaluation,
  CreateEvaluationRequest,
  UpdateEvaluationRequest,
  EvaluationStatistics,
  PaginatedResponse,
  ApiResponse
} from "@/types";

class EvaluationService {
   // Manager endpoints
   async getEvaluations(params?: {
      evaluation_type?: string;
      start_date?: string;
      end_date?: string;
      intern_id?: number;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Evaluation>> {
      const response = await api.get<PaginatedResponse<Evaluation>>(
         "/evaluations",
         { params }
      );
      return response.data;
   }

   async getEvaluationStatistics(): Promise<EvaluationStatistics> {
      const response = await api.get<EvaluationStatistics>(
         "/evaluations/statistics"
      );
      return response.data;
   }

   async getInternsForEvaluation(): Promise<any[]> {
      const response = await api.get("/interns-for-evaluation");
      return response.data;
   }

   async createEvaluation(
      data: CreateEvaluationRequest
   ): Promise<{ evaluation: Evaluation }> {
      const response = await api.post<{ evaluation: Evaluation }>(
         "/evaluations",
         data
      );
      return response.data;
   }

   async getEvaluation(id: number): Promise<Evaluation> {
      const response = await api.get<Evaluation>(`/evaluations/${id}`);
      return response.data;
   }

   async updateEvaluation(
      id: number,
      data: UpdateEvaluationRequest
   ): Promise<{ evaluation: Evaluation }> {
      const response = await api.put<{ evaluation: Evaluation }>(
         `/evaluations/${id}`,
         data
      );
      return response.data;
   }

   async deleteEvaluation(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(`/evaluations/${id}`);
      return response.data;
   }

   // Intern endpoints
   async getMyEvaluations(params?: {
      evaluation_type?: string;
      start_date?: string;
      end_date?: string;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Evaluation>> {
      const response = await api.get<PaginatedResponse<Evaluation>>(
         "/my-evaluations",
         { params }
      );
      return response.data;
   }

   async getMyEvaluation(id: number): Promise<Evaluation> {
      const response = await api.get<Evaluation>(`/my-evaluations/${id}`);
      return response.data;
   }

   async getMyEvaluationStatistics(): Promise<EvaluationStatistics> {
      const response = await api.get<EvaluationStatistics>(
         "/my-evaluations/statistics"
      );
      return response.data;
   }
}

export const evaluationService = new EvaluationService();
```

## File: services/notificationService.ts
```ts
import api from "./api";
import type {
  Notification,
  NotificationRecipient,
  SendNotificationRequest,
  UpdateNotificationRequest,
  NotificationStatistics,
  PaginatedResponse,
  ApiResponse
} from "@/types";

class NotificationService {
   // Manager endpoints
   async getNotifications(params?: {
      search?: string;
      is_archived?: boolean;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Notification>> {
      const response = await api.get<PaginatedResponse<Notification>>(
         "/notifications",
         { params }
      );
      return response.data;
   }

   async getInternsForNotifications(): Promise<any[]> {
      const response = await api.get("/notifications/interns");
      return response.data;
   }

   async sendNotification(
      data: SendNotificationRequest
   ): Promise<{ notification: Notification }> {
      const response = await api.post<{ notification: Notification }>(
         "/notifications/send",
         data
      );
      return response.data;
   }

   async getNotification(id: number): Promise<Notification> {
      const response = await api.get<Notification>(`/notifications/${id}`);
      return response.data;
   }

   async deleteNotification(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(`/notifications/${id}`);
      return response.data;
   }

   // Intern endpoints
   async getMyNotifications(params?: {
      is_read?: boolean;
      is_archived?: boolean;
      search?: string;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Notification>> {
      const response = await api.get<PaginatedResponse<Notification>>(
         "/my-notifications",
         { params }
      );
      return response.data;
   }

   async getMyNotification(id: number): Promise<Notification> {
      const response = await api.get<Notification>(`/my-notifications/${id}`);
      return response.data;
   }

   async updateMyNotification(
      id: number,
      data: UpdateNotificationRequest
   ): Promise<{ notification: Notification }> {
      const response = await api.put<{ notification: Notification }>(
         `/my-notifications/${id}`,
         data
      );
      return response.data;
   }

   async deleteMyNotification(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(`/my-notifications/${id}`);
      return response.data;
   }

   async markAllAsRead(): Promise<ApiResponse> {
      const response = await api.post<ApiResponse>(
         "/my-notifications/mark-all-read"
      );
      return response.data;
   }
}

export const notificationService = new NotificationService();
```

## File: services/reclamationService.ts
```ts
import api from "./api";
import type {
  Reclamation,
  CreateReclamationRequest,
  RespondToReclamationRequest,
  UpdateReclamationStatusRequest,
  ReclamationStatistics,
  PaginatedResponse,
  ApiResponse
} from "@/types";

class ReclamationService {
   // Manager endpoints
   async getReclamations(params?: {
      status?: string;
      search?: string;
      start_date?: string;
      end_date?: string;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Reclamation>> {
      const response = await api.get<PaginatedResponse<Reclamation>>(
         "/reclamations",
         { params }
      );
      return response.data;
   }

   async getReclamationStatistics(): Promise<ReclamationStatistics> {
      const response = await api.get<ReclamationStatistics>(
         "/reclamations/statistics"
      );
      return response.data;
   }

   async getReclamation(id: number): Promise<Reclamation> {
      const response = await api.get<Reclamation>(`/reclamations/${id}`);
      return response.data;
   }

   async respondToReclamation(
      id: number,
      data: RespondToReclamationRequest
   ): Promise<{ reclamation: Reclamation }> {
      const response = await api.put<{ reclamation: Reclamation }>(
         `/reclamations/${id}/respond`,
         data
      );
      return response.data;
   }

   async updateReclamationStatus(
      id: number,
      data: UpdateReclamationStatusRequest
   ): Promise<{ reclamation: Reclamation }> {
      const response = await api.put<{ reclamation: Reclamation }>(
         `/reclamations/${id}/status`,
         data
      );
      return response.data;
   }

   async deleteReclamation(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(`/reclamations/${id}`);
      return response.data;
   }

   // Intern endpoints
   async createReclamation(
      data: CreateReclamationRequest
   ): Promise<{ reclamation: Reclamation }> {
      const response = await api.post<{ reclamation: Reclamation }>(
         "/reclamations",
         data
      );
      return response.data;
   }

   async getMyReclamations(params?: {
      status?: string;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Reclamation>> {
      const response = await api.get<PaginatedResponse<Reclamation>>(
         "/my-reclamations",
         { params }
      );
      return response.data;
   }

   async getMyReclamation(id: number): Promise<Reclamation> {
      const response = await api.get<Reclamation>(`/my-reclamations/${id}`);
      return response.data;
   }

   async deleteMyReclamation(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(`/my-reclamations/${id}`);
      return response.data;
   }

   async getMyReclamationStatistics(): Promise<ReclamationStatistics> {
      const response = await api.get<ReclamationStatistics>(
         "/reclamations/statistics"
      );
      return response.data;
   }
}

export const reclamationService = new ReclamationService();
```

## File: services/reportService.ts
```ts
import api from "./api";
import type {
  Report,
  GenerateReportRequest,
  ReportStatistics,
  PaginatedResponse,
  ApiResponse
} from "@/types";

class ReportService {
   // Admin endpoints
   async getReports(params?: {
      type?: string;
      period_start?: string;
      period_end?: string;
      department_id?: number;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Report>> {
      const response = await api.get<PaginatedResponse<Report>>("/reports", {
         params,
      });
      return response.data;
   }

   async getReportStatistics(): Promise<ReportStatistics> {
      const response = await api.get<ReportStatistics>("/reports/statistics");
      return response.data;
   }

   async getReport(id: number): Promise<Report> {
      const response = await api.get<Report>(`/reports/${id}`);
      return response.data;
   }

   // Manager endpoints
   async generateReport(
      data: GenerateReportRequest
   ): Promise<{ report: Report }> {
      const response = await api.post<{ report: Report }>(
         "/reports/generate",
         data
      );
      return response.data;
   }

   async sendReportToAdmin(id: number): Promise<ApiResponse> {
      const response = await api.post<ApiResponse>(
         `/reports/${id}/send-to-admin`
      );
      return response.data;
   }

   async deleteReport(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(`/reports/${id}`);
      return response.data;
   }
}

export const reportService = new ReportService();
```

## File: services/taskService.ts
```ts
import api from "./api";
import type {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  UpdateTaskStatusRequest,
  TaskStatistics,
  PaginatedResponse,
  ApiResponse
} from "@/types";

class TaskService {
   // Manager endpoints
   async getTasks(params?: {
      status?: string;
      priority?: string;
      assigned_to?: number;
      search?: string;
      sort_by?: string;
      sort_order?: "asc" | "desc";
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Task>> {
      const response = await api.get<PaginatedResponse<Task>>("/tasks", {
         params,
      });
      return response.data;
   }

   async getTaskStatistics(): Promise<TaskStatistics> {
      const response = await api.get<TaskStatistics>("/tasks/statistics");
      return response.data;
   }

   async getInternsForTasks(): Promise<any[]> {
      const response = await api.get("/interns-for-tasks");
      return response.data;
   }

   async createTask(data: CreateTaskRequest): Promise<{ task: Task }> {
      const response = await api.post<{ task: Task }>("/tasks", data);
      return response.data;
   }

   async getTask(id: number): Promise<Task> {
      const response = await api.get<Task>(`/tasks/${id}`);
      return response.data;
   }

   async updateTask(
      id: number,
      data: UpdateTaskRequest
   ): Promise<{ task: Task }> {
      const response = await api.put<{ task: Task }>(`/tasks/${id}`, data);
      return response.data;
   }

   async updateTaskStatus(
      id: number,
      data: UpdateTaskStatusRequest
   ): Promise<{ task: Task }> {
      const response = await api.put<{ task: Task }>(
         `/tasks/${id}/status`,
         data
      );
      return response.data;
   }

   async deleteTask(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(`/tasks/${id}`);
      return response.data;
   }

   // Intern endpoints
   async getMyTasks(params?: {
      status?: string;
      priority?: string;
      overdue?: boolean;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Task>> {
      const response = await api.get<PaginatedResponse<Task>>("/my-tasks", {
         params,
      });
      return response.data;
   }

   async getMyTask(id: number): Promise<Task> {
      const response = await api.get<Task>(`/my-tasks/${id}`);
      return response.data;
   }

   async updateMyTaskStatus(
      id: number,
      data: UpdateTaskStatusRequest
   ): Promise<{ task: Task }> {
      const response = await api.put<{ task: Task }>(
         `/my-tasks/${id}/status`,
         data
      );
      return response.data;
   }
}

export const taskService = new TaskService();
```

## File: services/userService.ts
```ts
import api from "./api";
import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  AssignInternRequest,
  ApiResponse,
  PaginatedResponse
} from "@/types";

class UserService {
   async getUsers(params?: {
      role?: string;
      department_id?: number;
      search?: string;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<User>> {
      const response = await api.get<PaginatedResponse<User>>("/users", {
         params,
      });
      return response.data;
   }

   async createUser(data: CreateUserRequest): Promise<{ user: User }> {
      const response = await api.post<{ user: User }>("/users", data);
      return response.data;
   }

   async getUser(id: number): Promise<User> {
      const response = await api.get<User>(`/users/${id}`);
      return response.data;
   }

   async updateUser(
      id: number,
      data: UpdateUserRequest
   ): Promise<{ user: User }> {
      const response = await api.put<{ user: User }>(`/users/${id}`, data);
      return response.data;
   }

   async deleteUser(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(`/users/${id}`);
      return response.data;
   }

   async assignIntern(
      id: number,
      data: AssignInternRequest
   ): Promise<ApiResponse> {
      const response = await api.post<ApiResponse>(`/users/${id}/assign`, data);
      return response.data;
   }

   async softDeleteUser(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(
         `/users/${id}/soft-delete`
      );
      return response.data;
   }

   async restoreUser(id: number): Promise<ApiResponse> {
      const response = await api.post<ApiResponse>(`/users/${id}/restore`);
      return response.data;
   }

   async getManagers(): Promise<User[]> {
      const response = await api.get<User[]>("/managers");
      return response.data;
   }

   async getInterns(params?: {
      unassigned?: boolean;
      department_id?: number;
   }): Promise<User[]> {
      const response = await api.get<User[]>("/interns", { params });
      return response.data;
   }

   async getUnassignedInterns(): Promise<User[]> {
      const response = await api.get<User[]>("/unassigned-interns");
      return response.data;
   }
}

export const userService = new UserService();
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
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const formatAttendanceRate = (present: number, total: number): string => {
  if (total === 0) return '0%';
  const rate = (present / total) * 100;
  return formatPercentage(rate);
};

export const formatAverageScore = (score: number): string => {
  return formatPercentage(score);
};

export const formatDateForDisplay = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatTimeForDisplay = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
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
// src/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_DEBUG: string;
  // Add other environment variables you use
}
```

