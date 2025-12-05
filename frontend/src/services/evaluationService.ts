import api from "./api";
import type {
  Evaluation,
  CreateEvaluationRequest,
  UpdateEvaluationRequest,
  EvaluationStatistics,
  PaginatedResponse,
  ApiResponse
} from "@/types";

class EvaluationService {
   // Manager endpoints
   async getEvaluations(params?: {
      evaluation_type?: string;
      start_date?: string;
      end_date?: string;
      intern_id?: number;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Evaluation>> {
      const response = await api.get<PaginatedResponse<Evaluation>>(
         "/evaluations",
         { params }
      );
      return response.data;
   }

   async getEvaluationStatistics(): Promise<EvaluationStatistics> {
      const response = await api.get<EvaluationStatistics>(
         "/evaluations/statistics"
      );
      return response.data;
   }

   async getInternsForEvaluation(): Promise<any[]> {
      const response = await api.get("/interns-for-evaluation");
      return response.data;
   }

   async createEvaluation(
      data: CreateEvaluationRequest
   ): Promise<{ evaluation: Evaluation }> {
      const response = await api.post<{ evaluation: Evaluation }>(
         "/evaluations",
         data
      );
      return response.data;
   }

   async getEvaluation(id: number): Promise<Evaluation> {
      const response = await api.get<Evaluation>(`/evaluations/${id}`);
      return response.data;
   }

   async updateEvaluation(
      id: number,
      data: UpdateEvaluationRequest
   ): Promise<{ evaluation: Evaluation }> {
      const response = await api.put<{ evaluation: Evaluation }>(
         `/evaluations/${id}`,
         data
      );
      return response.data;
   }

   async deleteEvaluation(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(`/evaluations/${id}`);
      return response.data;
   }

   // Intern endpoints
   async getMyEvaluations(params?: {
      evaluation_type?: string;
      start_date?: string;
      end_date?: string;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Evaluation>> {
      const response = await api.get<PaginatedResponse<Evaluation>>(
         "/my-evaluations",
         { params }
      );
      return response.data;
   }

   async getMyEvaluation(id: number): Promise<Evaluation> {
      const response = await api.get<Evaluation>(`/my-evaluations/${id}`);
      return response.data;
   }

   async getMyEvaluationStatistics(): Promise<EvaluationStatistics> {
      const response = await api.get<EvaluationStatistics>(
         "/my-evaluations/statistics"
      );
      return response.data;
   }
}

export const evaluationService = new EvaluationService();