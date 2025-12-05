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