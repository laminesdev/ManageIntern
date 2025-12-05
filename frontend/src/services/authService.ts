import api from "./api";
import type {
  LoginRequest,
  LoginResponse,
  User,
  ChangePasswordRequest
} from "@/types/auth.types";
import type { ApiResponse } from "@/types/api.types";

class AuthService {
   async login(data: LoginRequest): Promise<LoginResponse> {
      const response = await api.post<LoginResponse>("/login", data);
      return response.data;
   }

   async logout(): Promise<void> {
      await api.post("/logout");
   }

   async getCurrentUser(): Promise<User> {
      const response = await api.get<User>("/user");
      return response.data;
   }

   async updateProfile(data: Partial<User>): Promise<User> {
      const response = await api.put<User>("/profile", data);
      return response.data;
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