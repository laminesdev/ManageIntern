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