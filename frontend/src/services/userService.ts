import api from "./api";
import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  AssignInternRequest,
  ApiResponse,
  PaginatedResponse
} from "@/types";

class UserService {
   async getUsers(params?: {
      role?: string;
      department_id?: number;
      search?: string;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<User>> {
      const response = await api.get<PaginatedResponse<User>>("/users", {
         params,
      });
      return response.data;
   }

   async createUser(data: CreateUserRequest): Promise<{ user: User }> {
      const response = await api.post<{ user: User }>("/users", data);
      return response.data;
   }

   async getUser(id: number): Promise<User> {
      const response = await api.get<User>(`/users/${id}`);
      return response.data;
   }

   async updateUser(
      id: number,
      data: UpdateUserRequest
   ): Promise<{ user: User }> {
      const response = await api.put<{ user: User }>(`/users/${id}`, data);
      return response.data;
   }

   async deleteUser(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(`/users/${id}`);
      return response.data;
   }

   async assignIntern(
      id: number,
      data: AssignInternRequest
   ): Promise<ApiResponse> {
      const response = await api.post<ApiResponse>(`/users/${id}/assign`, data);
      return response.data;
   }

   async softDeleteUser(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(
         `/users/${id}/soft-delete`
      );
      return response.data;
   }

   async restoreUser(id: number): Promise<ApiResponse> {
      const response = await api.post<ApiResponse>(`/users/${id}/restore`);
      return response.data;
   }

   async getManagers(): Promise<User[]> {
      const response = await api.get<User[]>("/managers");
      return response.data;
   }

   async getInterns(params?: {
      unassigned?: boolean;
      department_id?: number;
   }): Promise<User[]> {
      const response = await api.get<User[]>("/interns", { params });
      return response.data;
   }

   async getUnassignedInterns(): Promise<User[]> {
      const response = await api.get<User[]>("/unassigned-interns");
      return response.data;
   }
}

export const userService = new UserService();