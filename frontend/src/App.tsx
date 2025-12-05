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
      <Route path="/manager/attendance" element={
        <ProtectedRoute allowedRoles={['manager']}>
          <ManagerLayout>
            <AttendancePage />
          </ManagerLayout>
        </ProtectedRoute>
      } />
      <Route path="/manager/evaluations" element={
        <ProtectedRoute allowedRoles={['manager']}>
          <ManagerLayout>
            <EvaluationsPage />
          </ManagerLayout>
        </ProtectedRoute>
      } />
      <Route path="/manager/notifications" element={
        <ProtectedRoute allowedRoles={['manager']}>
          <ManagerLayout>
            <NotificationsPage />
          </ManagerLayout>
        </ProtectedRoute>
      } />
      <Route path="/manager/reclamations" element={
        <ProtectedRoute allowedRoles={['manager']}>
          <ManagerLayout>
            <ReclamationsPage />
          </ManagerLayout>
        </ProtectedRoute>
      } />
      <Route path="/manager/reports" element={
        <ProtectedRoute allowedRoles={['manager']}>
          <ManagerLayout>
            <ManagerReports />
          </ManagerLayout>
        </ProtectedRoute>
      } />
      
      {/* Intern Routes */}
      <Route path="/intern/dashboard" element={
        <ProtectedRoute allowedRoles={['intern']}>
          <InternLayout>
            <InternDashboard />
          </InternLayout>
        </ProtectedRoute>
      } />
      <Route path="/intern/tasks" element={
        <ProtectedRoute allowedRoles={['intern']}>
          <InternLayout>
            <MyTasksPage />
          </InternLayout>
        </ProtectedRoute>
      } />
      <Route path="/intern/evaluations" element={
        <ProtectedRoute allowedRoles={['intern']}>
          <InternLayout>
            <MyEvaluationsPage />
          </InternLayout>
        </ProtectedRoute>
      } />
      <Route path="/intern/notifications" element={
        <ProtectedRoute allowedRoles={['intern']}>
          <InternLayout>
            <MyNotificationsPage />
          </InternLayout>
        </ProtectedRoute>
      } />
      <Route path="/intern/reclamations" element={
        <ProtectedRoute allowedRoles={['intern']}>
          <InternLayout>
            <MyReclamationsPage />
          </InternLayout>
        </ProtectedRoute>
      } />
      <Route path="/intern/attendance" element={
        <ProtectedRoute allowedRoles={['intern']}>
          <InternLayout>
            <MyAttendancePage />
          </InternLayout>
        </ProtectedRoute>
      } />
      
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