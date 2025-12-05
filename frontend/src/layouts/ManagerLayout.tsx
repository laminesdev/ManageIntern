import { Outlet } from "react-router-dom";
import ManagerSidebar from "@/components/layout/ManagerSidebar";
import Header from "@/components/layout/Header";

export default function ManagerLayout() {
   return (
      <div className="min-h-screen bg-gray-50">
         <Header />
         <div className="flex">
            <ManagerSidebar />
            <main className="flex-1 p-6">
               <Outlet />
            </main>
         </div>
      </div>
   );
}