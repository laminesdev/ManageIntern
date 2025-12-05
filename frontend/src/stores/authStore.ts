// src/stores/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, AuthState } from "@/types";
import { config } from "@/config/env";

interface AuthStoreActions {
   setAuth: (user: User, token: string) => void;
   clearAuth: () => void;
   updateUser: (user: Partial<User>) => void;
   setLoading: (loading: boolean) => void;
   setError: (error: string | null) => void;
   initializeAuth: () => void; // Add this
}

export const useAuthStore = create<AuthState & AuthStoreActions>()(
   persist(
      (set) => ({
         user: null,
         token: null,
         isAuthenticated: false,
         isLoading: false,
         error: null,

         // Initialize auth from localStorage
         initializeAuth: () => {
            const token = localStorage.getItem(config.TOKEN_KEY);
            const userStr = localStorage.getItem(config.USER_KEY);

            if (token && userStr) {
               try {
                  const user = JSON.parse(userStr);
                  set({
                     user,
                     token,
                     isAuthenticated: true,
                     isLoading: false,
                  });
               } catch (error) {
                  // Clear invalid storage
                  localStorage.removeItem(config.TOKEN_KEY);
                  localStorage.removeItem(config.USER_KEY);
                  set({
                     user: null,
                     token: null,
                     isAuthenticated: false,
                     isLoading: false,
                  });
               }
            } else {
               set({ isLoading: false });
            }
         },

         setAuth: (user, token) => {
            localStorage.setItem(config.TOKEN_KEY, token);
            localStorage.setItem(config.USER_KEY, JSON.stringify(user));
            set({ user, token, isAuthenticated: true, error: null });
         },

         clearAuth: () => {
            localStorage.removeItem(config.TOKEN_KEY);
            localStorage.removeItem(config.USER_KEY);
            set({
               user: null,
               token: null,
               isAuthenticated: false,
               error: null,
            });
         },

         updateUser: (updatedUser) =>
            set((state) => ({
               user: state.user ? { ...state.user, ...updatedUser } : null,
            })),

         setLoading: (loading) => set({ isLoading: loading }),

         setError: (error) => set({ error }),
      }),
      {
         name: "auth-storage",
         partialize: (state) => ({
            user: state.user,
            token: state.token,
            isAuthenticated: state.isAuthenticated,
         }),
      }
   )
);

// Create a separate hook for computed properties
export const useAuthComputed = () => {
   const { user } = useAuthStore();

   return {
      isAdmin: user?.role === "admin",
      isManager: user?.role === "manager",
      isIntern: user?.role === "intern",
      user,
   };
};
