import { Outlet } from "react-router-dom";
import InternSidebar from "@/components/layout/InternSidebar";
import Header from "@/components/layout/Header";

export default function InternLayout() {
   return (
      <div className="min-h-screen bg-gray-50">
         <Header />
         <div className="flex">
            <InternSidebar />
            <main className="flex-1 p-6">
               <Outlet />
            </main>
         </div>
      </div>
   );
}