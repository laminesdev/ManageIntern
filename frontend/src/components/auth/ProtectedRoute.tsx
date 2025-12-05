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
