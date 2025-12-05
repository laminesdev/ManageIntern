
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
