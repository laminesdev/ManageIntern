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
