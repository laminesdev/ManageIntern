import { NavLink } from "react-router-dom";
import { Home, Users, FileText, Shield, Building } from "lucide-react";
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
      path: "/admin/departments",
      label: "Departments",
      icon: Building,
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
               <div className="p-2 bg-red-100 rounded-lg">
                  <Shield className="h-6 w-6 text-red-600" />
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
      </aside>
   );
}
