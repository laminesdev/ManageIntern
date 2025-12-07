import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/authStore";
import { authService } from "@/services/authService";
import { toast } from "sonner";
import {
   LogOut,
   User,
   ChevronDown,
   Shield,
   Briefcase,
   GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const roleIcons = {
   admin: Shield,
   manager: Briefcase,
   intern: GraduationCap,
};

const roleColors = {
   admin: "bg-red-100 text-red-800",
   manager: "bg-red-100 text-red-800",
   intern: "bg-red-100 text-red-800",
};

export default function Header() {
   const navigate = useNavigate();
   const { user, clearAuth } = useAuthStore();

   const handleLogout = async () => {
      try {
         await authService.logout();
         clearAuth();
         toast.success("Logged out successfully");
         navigate("/login");
      } catch (error) {
         toast.error("Logout failed");
      }
   };

   const RoleIcon = roleIcons[user?.role as keyof typeof roleIcons] || User;

   return (
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
         <div className="px-6 py-3 flex items-center justify-between">
            {/* Left side - Logo & Breadcrumb */}
               <img src="https://upload.wikimedia.org/wikipedia/commons/b/b3/Marriott_hotels_logo14.svg" className="h-10 w-10 pl-2" />

            {/* Right side - User Menu */}
            <div className="flex items-center space-x-4">
               {/* User Dropdown */}
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button
                        variant="ghost"
                        className="flex items-center space-x-2 hover:bg-gray-100"
                     >
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                           <User className="h-4 w-4 text-red-600" />
                        </div>
                        <div className="hidden md:block text-left">
                           <p className="text-sm font-medium">{user?.name}</p>
                           <p className="text-xs text-muted-foreground capitalize">
                              {user?.role}
                           </p>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                     <DropdownMenuLabel>My Account</DropdownMenuLabel>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-red-600 focus:text-red-600"
                     >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         </div>
      </header>
   );
}
