import { NavLink } from "react-router-dom";
import {
   Home,
   CheckSquare,
   Star,
   Bell,
   AlertCircle,
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
];

export default function InternSidebar() {
   return (
      <aside className="w-64 border-r bg-white min-h-[calc(100vh-70px)] hidden md:block">
         <nav className="p-4 space-y-1">
            {navItems.map((item) => (
               <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                     cn(
                        "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                        isActive
                           ? "bg-red-50 text-red-600 border-l-4 border-red-600"
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
            <div className="bg-gradient-to-r from-red-50 to-emerald-50 rounded-xl p-4">
               <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  This Week
               </h3>
               <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                     <span className="text-gray-600">Tasks Completed</span>
                     <span className="font-semibold">8/12</span>
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
