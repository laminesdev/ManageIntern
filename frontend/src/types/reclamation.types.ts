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
