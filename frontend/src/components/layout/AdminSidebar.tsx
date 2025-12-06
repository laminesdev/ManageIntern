import { NavLink } from "react-router-dom";
import { Home, Users, FileText, Shield, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

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
];

export default function AdminSidebar() {
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

         {/* Quick Stats - KEEPING THIS */}
         <div className="p-4 mt-8">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4">
               <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  System Status
               </h3>
               <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                     <span className="text-gray-600">Active Users</span>
                     <span className="font-semibold">24</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span className="text-gray-600">Departments</span>
                     <span className="font-semibold">5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span className="text-gray-600">Today's Logins</span>
                     <span className="font-semibold">18</span>
                  </div>
               </div>
            </div>
         </div>
      </aside>
   );
}
