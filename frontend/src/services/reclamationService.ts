import api, { ApiResponse, PaginatedResponse } from "./api";

export interface Reclamation {
   id: number;
   intern_id: number;
   manager_id: number;
   subject: string;
   description: string;
   status: "pending" | "in_review" | "solved" | "archived";
   response?: string;
   resolved_at?: string;
   responded_at?: string;
   created_at: string;
   updated_at: string;
   deleted_at?: string;
   intern?: any;
   manager?: any;
}

export interface CreateReclamationRequest {
   subject: string;
   description: string;
}

export interface RespondToReclamationRequest {
   response: string;
   status: "pending" | "in_review" | "solved" | "archived";
}

export interface UpdateReclamationStatusRequest {
   status: "pending" | "in_review" | "solved" | "archived";
}

export interface ReclamationStatistics {
   total: number;
   pending: number;
   in_review: number;
   solved: number;
   archived: number;
}

class ReclamationService {
   // Manager endpoints
   async getReclamations(params?: {
      status?: string;
      search?: string;
      start_date?: string;
      end_date?: string;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Reclamation>> {
      const response = await api.get<PaginatedResponse<Reclamation>>(
         "/reclamations",
         { params }
      );
      return response.data;
   }

   async getReclamationStatistics(): Promise<ReclamationStatistics> {
      const response = await api.get<ReclamationStatistics>(
         "/reclamations/statistics"
      );
      return response.data;
   }

   async getReclamation(id: number): Promise<Reclamation> {
      const response = await api.get<Reclamation>(`/reclamations/${id}`);
      return response.data;
   }

   async respondToReclamation(
      id: number,
      data: RespondToReclamationRequest
   ): Promise<{ reclamation: Reclamation }> {
      const response = await api.put<{ reclamation: Reclamation }>(
         `/reclamations/${id}/respond`,
         data
      );
      return response.data;
   }

   async updateReclamationStatus(
      id: number,
      data: UpdateReclamationStatusRequest
   ): Promise<{ reclamation: Reclamation }> {
      const response = await api.put<{ reclamation: Reclamation }>(
         `/reclamations/${id}/status`,
         data
      );
      return response.data;
   }

   async deleteReclamation(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(`/reclamations/${id}`);
      return response.data;
   }

   // Intern endpoints
   async createReclamation(
      data: CreateReclamationRequest
   ): Promise<{ reclamation: Reclamation }> {
      const response = await api.post<{ reclamation: Reclamation }>(
         "/reclamations",
         data
      );
      return response.data;
   }

   async getMyReclamations(params?: {
      status?: string;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Reclamation>> {
      const response = await api.get<PaginatedResponse<Reclamation>>(
         "/my-reclamations",
         { params }
      );
      return response.data;
   }

   async getMyReclamation(id: number): Promise<Reclamation> {
      const response = await api.get<Reclamation>(`/my-reclamations/${id}`);
      return response.data;
   }

   async deleteMyReclamation(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(`/my-reclamations/${id}`);
      return response.data;
   }

   async getMyReclamationStatistics(): Promise<ReclamationStatistics> {
      const response = await api.get<ReclamationStatistics>(
         "/reclamations/statistics"
      );
      return response.data;
   }
}

export const reclamationService = new ReclamationService();
