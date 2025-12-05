import api, { ApiResponse } from "./api";

export interface LoginRequest {
   email: string;
   password: string;
}

export interface LoginResponse {
   user: User;
   token: string;
   redirect_to: string;
   abilities: string[];
}

export interface User {
   id: number;
   name: string;
   email: string;
   role: "admin" | "manager" | "intern";
   department_id?: number;
   manager_id?: number;
   email_verified_at?: string;
   created_at: string;
   updated_at: string;
   deleted_at?: string;
   department?: any;
   manager?: User;
   interns?: User[];
   tasks_assigned?: any[];
   tasks_received?: any[];
   attendances?: any[];
   evaluations_received?: any[];
   evaluations_given?: any[];
   reclamations_sent?: any[];
   reclamations_received?: any[];
   notifications_sent?: any[];
   notification_recipients?: any[];
   reports_generated?: any[];
}

export interface ChangePasswordRequest {
   current_password: string;
   new_password: string;
   new_password_confirmation: string;
}

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
