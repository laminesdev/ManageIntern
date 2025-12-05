import api, { ApiResponse, PaginatedResponse } from "./api";

export interface Evaluation {
   id: number;
   intern_id: number;
   manager_id: number;
   score: number;
   comments: string;
   evaluation_type:
      | "mid_term"
      | "final"
      | "monthly"
      | "weekly"
      | "quarterly"
      | "project";
   evaluated_at: string;
   created_at: string;
   updated_at: string;
   deleted_at?: string;
   intern?: any;
   manager?: any;
}

export interface CreateEvaluationRequest {
   intern_id: number;
   score: number;
   comments: string;
   evaluation_type:
      | "mid_term"
      | "final"
      | "monthly"
      | "weekly"
      | "quarterly"
      | "project";
}

export interface UpdateEvaluationRequest
   extends Partial<CreateEvaluationRequest> {}

export interface EvaluationStatistics {
   total: number;
   average_score: number;
   by_type: Record<string, number>;
}

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
