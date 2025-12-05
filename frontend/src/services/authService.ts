// src/services/authService.ts
import api from "./api";
import type {
  LoginRequest,
  LoginResponse,
  User,
  ChangePasswordRequest
} from "@/types/auth.types";
import type { ApiResponse } from "@/types/api.types";
import { config } from "@/config/env";

class AuthService {
   async login(data: LoginRequest): Promise<LoginResponse> {
      const response = await api.post<LoginResponse>("/login", data);
      
      // Save token and user data
      const { user, token } = response.data;
      localStorage.setItem(config.TOKEN_KEY, token);
      localStorage.setItem(config.USER_KEY, JSON.stringify(user));
      
      return response.data;
   }

   async logout(): Promise<void> {
      try {
         await api.post("/logout");
      } finally {
         // Always clear local storage
         localStorage.removeItem(config.TOKEN_KEY);
         localStorage.removeItem(config.USER_KEY);
      }
   }

   async getCurrentUser(): Promise<User> {
      const response = await api.get<User>("/user");
      return response.data;
   }

   async updateProfile(data: Partial<User>): Promise<User> {
      const response = await api.put<User>("/profile", data);
      
      // Update stored user data
      const updatedUser = response.data;
      localStorage.setItem(config.USER_KEY, JSON.stringify(updatedUser));
      
      return updatedUser;
   }

   async changePassword(data: ChangePasswordRequest): Promise<ApiResponse> {
      const response = await api.put<ApiResponse>("/change-password", data);
      return response.data;
   }

   async getDashboardData(): Promise<any> {
      const response = await api.get("/dashboard");
      return response.data;
   }
}

export const authService = new AuthService();