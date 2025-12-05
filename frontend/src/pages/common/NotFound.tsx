// src/pages/common/NotFound.tsx
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
   const navigate = useNavigate();

   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
         <div className="text-center">
            <h1 className="text-9xl font-bold text-gray-300">404</h1>
            <h2 className="text-3xl font-semibold text-gray-800 mt-4">
               Page Not Found
            </h2>
            <p className="text-gray-600 mt-2">
               The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
               <Button onClick={() => navigate(-1)} variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
               </Button>
               <Button onClick={() => navigate("/")}>
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
               </Button>
            </div>
         </div>
      </div>
   );
}
