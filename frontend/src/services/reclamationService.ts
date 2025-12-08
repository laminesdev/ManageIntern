import api from "./api";

export interface Reclamation {
   id: number;
   intern_id: number;
   manager_id: number;
   subject: string;
   description: string;
   status: "pending" | "in_review" | "resolved" | "archived";
   response?: string;
   resolved_at?: string;
   responded_at?: string;
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

export interface CreateReclamationData {
   subject: string;
   description: string;
}

export interface RespondToReclamationData {
   response: string;
   status: "pending" | "solved" | "archived";
}

export const reclamationService = {
   // Manager: Get reclamations (department reclamations)
   getReclamations: async (
      params: {
         status?: string;
         search?: string;
         start_date?: string;
         end_date?: string;
      } = {}
   ): Promise<{ data: Reclamation[] }> => {
      const response = await api.get("/reclamations", { params });
      return response.data;
   },

   // Manager: Get department reclamations (same as getReclamations but semantic)
   getDepartmentReclamations: async (): Promise<{ data: Reclamation[] }> => {
      const response = await api.get("/reclamations");
      return response.data;
   },

   // Manager: Get reclamation details
   getReclamationById: async (
      id: number
   ): Promise<{ reclamation: Reclamation }> => {
      const response = await api.get(`/reclamations/${id}`);
      // Handle both { reclamation: ... } and direct object response
      if (response.data?.reclamation) {
         return response.data;
      }
      return { reclamation: response.data };
   },

   // Manager: Respond to reclamation
   respondToReclamation: async (
      id: number,
      data: RespondToReclamationData
   ): Promise<{ reclamation: Reclamation }> => {
      const response = await api.put(`/reclamations/${id}/respond`, data);
      return response.data;
   },

   // Manager: Update reclamation (for status updates)
   updateReclamation: async (
      id: number,
      data: { status?: string; resolution_notes?: string }
   ): Promise<{ reclamation: Reclamation }> => {
      const response = await api.put(`/reclamations/${id}/respond`, data);
      return response.data;
   },

   // Manager: Update reclamation status only
   updateReclamationStatus: async (
      id: number,
      status: string
   ): Promise<{ reclamation: Reclamation }> => {
      const response = await api.put(`/reclamations/${id}/status`, { status });
      return response.data;
   },

   // Manager: Delete reclamation
   deleteReclamation: async (id: number): Promise<{ message: string }> => {
      const response = await api.delete(`/reclamations/${id}`);
      return response.data;
   },

   // Manager: Get reclamation statistics
   getReclamationStatistics: async (): Promise<{
      statistics: {
         total: number;
         pending: number;
         in_review: number;
         resolved: number;
         archived: number;
      };
   }> => {
      const response = await api.get("/reclamations/statistics");
      return response.data;
   },

   // Intern: Create reclamation
   createReclamation: async (
      data: CreateReclamationData
   ): Promise<{ reclamation: Reclamation }> => {
      const response = await api.post("/reclamations", data);
      return response.data;
   },

   // Intern: Get my reclamations
   getMyReclamations: async (
      params: {
         status?: string;
      } = {}
   ): Promise<{ data: Reclamation[] }> => {
      const response = await api.get("/my-reclamations", { params });
      return response.data;
   },

   // Intern: Get my reclamation details
   getMyReclamationById: async (
      id: number
   ): Promise<{ reclamation: Reclamation }> => {
      const response = await api.get(`/my-reclamations/${id}`);
      return response.data;
   },

   // Intern: Delete my reclamation
   deleteMyReclamation: async (id: number): Promise<{ message: string }> => {
      const response = await api.delete(`/my-reclamations/${id}`);
      return response.data;
   },
};
