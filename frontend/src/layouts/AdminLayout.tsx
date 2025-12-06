import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/layout/AdminSidebar";
import Header from "@/components/layout/Header";

export default function AdminLayout() {
   return (
      <div className="min-h-screen bg-gray-50">
         <Header />
         <div className="flex">
            <AdminSidebar />
            <main className="flex-1 p-6">
               <Outlet />
            </main>
         </div>
      </div>
   );
}
