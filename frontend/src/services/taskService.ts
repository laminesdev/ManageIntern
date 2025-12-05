import api, { ApiResponse, PaginatedResponse } from "./api";

export interface Task {
   id: number;
   title: string;
   description: string;
   status: "pending" | "in_progress" | "completed" | "cancelled";
   priority: "low" | "medium" | "high" | "urgent";
   assigned_by: number;
   assigned_to: number;
   deadline: string;
   created_at: string;
   updated_at: string;
   deleted_at?: string;
   assigned_by_user?: any;
   assigned_to_user?: any;
}

export interface CreateTaskRequest {
   title: string;
   description: string;
   assigned_to: number;
   priority: "low" | "medium" | "high" | "urgent";
   deadline: string;
}

export interface UpdateTaskRequest extends Partial<CreateTaskRequest> {}

export interface UpdateTaskStatusRequest {
   status: "pending" | "in_progress" | "completed" | "cancelled";
}

export interface TaskStatistics {
   total: number;
   pending: number;
   in_progress: number;
   completed: number;
   cancelled: number;
   overdue: number;
}

class TaskService {
   // Manager endpoints
   async getTasks(params?: {
      status?: string;
      priority?: string;
      assigned_to?: number;
      search?: string;
      sort_by?: string;
      sort_order?: "asc" | "desc";
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Task>> {
      const response = await api.get<PaginatedResponse<Task>>("/tasks", {
         params,
      });
      return response.data;
   }

   async getTaskStatistics(): Promise<TaskStatistics> {
      const response = await api.get<TaskStatistics>("/tasks/statistics");
      return response.data;
   }

   async getInternsForTasks(): Promise<any[]> {
      const response = await api.get("/interns-for-tasks");
      return response.data;
   }

   async createTask(data: CreateTaskRequest): Promise<{ task: Task }> {
      const response = await api.post<{ task: Task }>("/tasks", data);
      return response.data;
   }

   async getTask(id: number): Promise<Task> {
      const response = await api.get<Task>(`/tasks/${id}`);
      return response.data;
   }

   async updateTask(
      id: number,
      data: UpdateTaskRequest
   ): Promise<{ task: Task }> {
      const response = await api.put<{ task: Task }>(`/tasks/${id}`, data);
      return response.data;
   }

   async updateTaskStatus(
      id: number,
      data: UpdateTaskStatusRequest
   ): Promise<{ task: Task }> {
      const response = await api.put<{ task: Task }>(
         `/tasks/${id}/status`,
         data
      );
      return response.data;
   }

   async deleteTask(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(`/tasks/${id}`);
      return response.data;
   }

   // Intern endpoints
   async getMyTasks(params?: {
      status?: string;
      priority?: string;
      overdue?: boolean;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Task>> {
      const response = await api.get<PaginatedResponse<Task>>("/my-tasks", {
         params,
      });
      return response.data;
   }

   async getMyTask(id: number): Promise<Task> {
      const response = await api.get<Task>(`/my-tasks/${id}`);
      return response.data;
   }

   async updateMyTaskStatus(
      id: number,
      data: UpdateTaskStatusRequest
   ): Promise<{ task: Task }> {
      const response = await api.put<{ task: Task }>(
         `/my-tasks/${id}/status`,
         data
      );
      return response.data;
   }
}

export const taskService = new TaskService();
