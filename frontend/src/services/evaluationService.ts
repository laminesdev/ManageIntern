import api from "./api";

export interface Evaluation {
   id: number;
   intern_id: number;
   manager_id: number;
   score: number;
   comments?: string;
   feedback?: string;
   evaluation_type:
      | "mid_term"
      | "final"
      | "monthly"
      | "weekly"
      | "quarterly"
      | "project";
   strengths?: string;
   areas_for_improvement?: string;
   evaluated_at: string;
   created_at: string;
   updated_at: string;
   deleted_at?: string;
   intern?: {
      id: number;
      name: string;
      email: string;
   };
   manager?: {
      id: number;
      name: string;
      email: string;
   };
}

export interface CreateEvaluationData {
   intern_id: number;
   score: number;
   feedback: string;
   evaluation_type: "weekly" | "monthly" | "quarterly" | "final";
   strengths?: string;
   areas_for_improvement?: string;
}

export const evaluationService = {
   // Manager: Get evaluations
   getEvaluations: async (
      params: {
         evaluation_type?: string;
         start_date?: string;
         end_date?: string;
         intern_id?: number;
      } = {}
   ): Promise<{ data: Evaluation[] }> => {
      const response = await api.get("/evaluations", { params });
      return response.data;
   },

   // Manager: Create evaluation
   createEvaluation: async (
      data: CreateEvaluationData
   ): Promise<{ evaluation: Evaluation }> => {
      const response = await api.post("/evaluations", data);
      return response.data;
   },

   // Manager: Get evaluation details
   getEvaluationById: async (
      id: number
   ): Promise<{ evaluation: Evaluation }> => {
      const response = await api.get(`/evaluations/${id}`);
      return response.data;
   },

   // Manager: Update evaluation
   updateEvaluation: async (
      id: number,
      data: Partial<CreateEvaluationData>
   ): Promise<{ evaluation: Evaluation }> => {
      const response = await api.put(`/evaluations/${id}`, data);
      return response.data;
   },

   // Manager: Delete evaluation
   deleteEvaluation: async (id: number): Promise<{ message: string }> => {
      const response = await api.delete(`/evaluations/${id}`);
      return response.data;
   },

   // Manager: Get evaluation statistics
   getEvaluationStatistics: async (): Promise<{
      statistics: {
         total: number;
         average_score: number;
         by_type: Record<string, number>;
      };
   }> => {
      const response = await api.get("/evaluations/statistics");
      return response.data;
   },

   // Manager: Get interns for evaluation (department interns)
   getInternsForEvaluation: async (): Promise<{
      data: Array<{ id: number; name: string; email: string }>;
   }> => {
      const response = await api.get("/interns-for-evaluation");
      return response.data;
   },

   // Intern: Get my evaluations
   getMyEvaluations: async (
      params: {
         evaluation_type?: string;
         start_date?: string;
         end_date?: string;
      } = {}
   ): Promise<{ data: Evaluation[] }> => {
      const response = await api.get("/my-evaluations", { params });
      return response.data;
   },

   // Intern: Get my evaluation details
   getMyEvaluationById: async (
      id: number
   ): Promise<{ evaluation: Evaluation }> => {
      const response = await api.get(`/my-evaluations/${id}`);
      return response.data;
   },

   // Intern: Get my evaluation statistics
   getMyEvaluationStatistics: async (): Promise<{
      statistics: {
         total: number;
         average_score: number;
         by_type: Record<string, number>;
      };
   }> => {
      const response = await api.get("/my-evaluations/statistics");
      return response.data;
   },
};
