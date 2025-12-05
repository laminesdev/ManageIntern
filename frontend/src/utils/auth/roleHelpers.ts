import type { User } from "@/types";

export const getRedirectPath = (role: string): string => {
   switch (role) {
      case "admin":
         return "/admin/dashboard";
      case "manager":
         return "/manager/dashboard";
      case "intern":
         return "/intern/dashboard";
      default:
         return "/login";
   }
};

export const hasRole = (user: User | null, role: string): boolean => {
   return user?.role === role;
};

export const hasAnyRole = (user: User | null, roles: string[]): boolean => {
   return roles.includes(user?.role || "");
};
