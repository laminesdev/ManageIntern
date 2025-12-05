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