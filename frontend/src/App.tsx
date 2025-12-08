import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./stores/authStore";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoginPage from "./pages/auth/LoginPage";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import DepartmentManagement from "./pages/admin/DepartmentManagement";
import AdminReports from "./pages/admin/Reports";
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
import EditTaskPage from "./pages/manager/EditTaskPage";
import ReclamationDetailsPage from "./pages/manager/ReclamationDetailsPage";

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
            <Route path="departments" element={<DepartmentManagement />} />
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
            <Route path="tasks/edit/:id" element={<EditTaskPage />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="evaluations" element={<EvaluationsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route
               path="notifications/send"
               element={<SendNotificationPage />}
            />
            <Route path="reclamations" element={<ReclamationsPage />} />
            <Route path="reports" element={<ManagerReports />} />
            <Route
               path="reclamations/:id"
               element={<ReclamationDetailsPage />}
            />
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
