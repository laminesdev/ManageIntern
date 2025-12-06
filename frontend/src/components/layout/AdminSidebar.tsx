import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
   Home,
   Users,
   FileText,
   BarChart3,
   Shield,
   Briefcase,
   RefreshCw,
   AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { dashboardService } from "@/services/dashboardService";
import { userService } from "@/services/userService";
import { reportService } from "@/services/reportService";

interface User {
   id: number;
   name: string;
   email: string;
   role: string;
   deleted_at?: string | null;
}

interface DashboardData {
   data: {
      recent_activity?: any[];
   };
}

interface UsersResponse {
   data: User[];
}

interface Report {
   id: number;
   // Add other report properties as needed
}

interface ReportsResponse {
   data: Report[];
}

const navItems = [
   {
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: Home,
   },
   {
      path: "/admin/users",
      label: "User Management",
      icon: Users,
   },
   {
      path: "/admin/assign-interns",
      label: "Assign Interns",
      icon: Briefcase,
   },
   {
      path: "/admin/reports",
      label: "Reports",
      icon: FileText,
   },
   {
      path: "/admin/analytics",
      label: "Analytics",
      icon: BarChart3,
   },
];

export default function AdminSidebar() {
   const [systemStats, setSystemStats] = useState({
      totalUsers: 0,
      activeUsers: 0,
      departments: 5,
      reportsCount: 0,
      recentActivity: 0,
   });
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

   const fetchSystemStats = async () => {
      try {
         setIsLoading(true);
         setError(null);

         // Fetch data from existing services in your codebase
         const [dashboardData, usersResponse, reportsResponse] =
            await Promise.all([
               dashboardService.getDashboard(),
               userService.getUsers({ per_page: 100 }),
               reportService.getReports(),
            ]);

         const users = (usersResponse as UsersResponse).data || [];
         const reports = (reportsResponse as ReportsResponse).data || [];
         const dashboardStats = (dashboardData as DashboardData).data || {};

         // Calculate stats with proper typing
         setSystemStats({
            totalUsers: users.length,
            activeUsers: users.filter((user: User) => !user.deleted_at).length,
            departments: 5, // Default value
            reportsCount: reports.length,
            recentActivity: dashboardStats.recent_activity?.length || 0,
         });

         setLastUpdated(new Date());
      } catch (error: any) {
         console.error("Failed to fetch system stats:", error);
         setError("Failed to load system statistics");
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      fetchSystemStats();

      // Refresh stats every 10 minutes (less frequent for sidebar)
      const intervalId = setInterval(fetchSystemStats, 10 * 60 * 1000);

      return () => clearInterval(intervalId);
   }, []);

   const handleRefreshStats = async () => {
      await fetchSystemStats();
      toast.success("System stats refreshed");
   };

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
                        "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                        isActive
                           ? "bg-purple-50 text-purple-600 border-l-4 border-purple-600"
                           : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                     )
                  }
               >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
               </NavLink>
            ))}
         </nav>

         {/* Real-time System Status */}
         <div className="p-4 mt-8">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-100">
               <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">
                     System Status
                  </h3>
                  <div className="flex items-center space-x-2">
                     {lastUpdated && !isLoading && !error && (
                        <span className="text-xs text-gray-500">
                           {new Date(lastUpdated).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                           })}
                        </span>
                     )}
                     <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={handleRefreshStats}
                        disabled={isLoading}
                     >
                        <RefreshCw
                           className={`h-3 w-3 ${
                              isLoading ? "animate-spin" : ""
                           }`}
                        />
                     </Button>
                  </div>
               </div>

               {error ? (
                  <div className="flex items-center space-x-2 p-2 bg-red-50 rounded-lg">
                     <AlertCircle className="h-4 w-4 text-red-500" />
                     <span className="text-xs text-red-600">
                        Stats unavailable
                     </span>
                  </div>
               ) : isLoading ? (
                  <div className="space-y-2">
                     {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex justify-between">
                           <Skeleton className="h-4 w-24" />
                           <Skeleton className="h-4 w-8" />
                        </div>
                     ))}
                  </div>
               ) : (
                  <>
                     <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                           <span className="text-gray-600">Total Users</span>
                           <span className="font-semibold text-purple-700">
                              {systemStats.totalUsers}
                           </span>
                        </div>
                        <div className="flex justify-between text-sm">
                           <span className="text-gray-600">Active Users</span>
                           <span className="font-semibold text-blue-700">
                              {systemStats.activeUsers}
                           </span>
                        </div>
                        <div className="flex justify-between text-sm">
                           <span className="text-gray-600">Departments</span>
                           <span className="font-semibold text-green-700">
                              {systemStats.departments}
                           </span>
                        </div>
                        <div className="flex justify-between text-sm">
                           <span className="text-gray-600">
                              Recent Activity
                           </span>
                           <span className="font-semibold text-amber-700">
                              {systemStats.recentActivity}
                           </span>
                        </div>
                     </div>

                     {/* Performance Indicator */}
                     <div className="mt-4 pt-3 border-t border-purple-100">
                        <div className="flex justify-between text-xs mb-1">
                           <span className="text-gray-500">System Load</span>
                           <span
                              className={`font-medium ${
                                 systemStats.totalUsers < 50
                                    ? "text-green-600"
                                    : systemStats.totalUsers < 100
                                    ? "text-yellow-600"
                                    : "text-red-600"
                              }`}
                           >
                              {systemStats.totalUsers < 50
                                 ? "Low"
                                 : systemStats.totalUsers < 100
                                 ? "Medium"
                                 : "High"}
                           </span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                           <div
                              className={`h-full rounded-full transition-all duration-300 ${
                                 systemStats.totalUsers < 50
                                    ? "bg-green-500"
                                    : systemStats.totalUsers < 100
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }`}
                              style={{
                                 width: `${Math.min(
                                    (systemStats.totalUsers / 200) * 100,
                                    100
                                 )}%`,
                              }}
                           />
                        </div>
                     </div>
                  </>
               )}

               {/* Last updated footer */}
               {lastUpdated && !isLoading && !error && (
                  <div className="mt-3 pt-3 border-t border-purple-100">
                     <p className="text-xs text-center text-gray-500">
                        Updated just now
                     </p>
                  </div>
               )}
            </div>
         </div>
      </aside>
   );
}
