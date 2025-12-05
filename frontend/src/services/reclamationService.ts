import api from "./api";
import type {
  Reclamation,
  CreateReclamationRequest,
  RespondToReclamationRequest,
  UpdateReclamationStatusRequest,
  ReclamationStatistics,
  PaginatedResponse,
  ApiResponse
} from "@/types";

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