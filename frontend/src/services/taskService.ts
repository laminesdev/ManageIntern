import api from "./api";

export interface TaskData {
   title: string;
   description: string;
   assigned_to: number;
   priority: "low" | "medium" | "high" | "urgent";
   deadline: string;
}

export interface Task extends TaskData {
   id: number;
   status: "pending" | "in_progress" | "completed" | "overdue";
   created_at: string;
   updated_at: string;
   assigned_to_user?: {
      id: number;
      name: string;
      email: string;
   };
}

export const taskService = {
   async getTasks(params?: {
      status?: string;
      assigned_to?: number;
      page?: number;
      per_page?: number;
   }) {
      const response = await api.get("/tasks", { params });
      return response.data;
   },

   async createTask(data: TaskData) {
      const response = await api.post("/tasks", data);
      return response.data;
   },

   async updateTask(id: number, data: Partial<TaskData>) {
      const response = await api.put(`/tasks/${id}`, data);
      return response.data;
   },

   async deleteTask(id: number) {
      const response = await api.delete(`/tasks/${id}`);
      return response.data;
   },

   async getInternsForTasks() {
      // Use the correct endpoint from documentation
      try {
         const response = await api.get("/interns-for-tasks");
         return response.data;
      } catch (error) {
         console.error("Error getting interns for tasks:", error);
         throw error;
      }
   },

   async updateTaskStatus(id: number, status: Task["status"]) {
      const response = await api.put(`/tasks/${id}/status`, { status });
      return response.data;
   },

   async getTaskStatistics() {
      const response = await api.get("/tasks/statistics");
      return response.data;
   },

   async getMyTasks(params?: {
      status?: string;
      priority?: string;
      overdue?: boolean;
      page?: number;
      per_page?: number;
   }) {
      const response = await api.get("/my-tasks", { params });
      return response.data;
   },

   async getMyTask(id: number) {
      const response = await api.get(`/my-tasks/${id}`);
      return response.data;
   },

   async updateMyTaskStatus(id: number, status: Task["status"]) {
      const response = await api.put(`/my-tasks/${id}/status`, { status });
      return response.data;
   },
};