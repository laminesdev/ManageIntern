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