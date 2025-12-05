export interface LoginRequest {
   email: string;
   password: string;
}

export interface LoginResponse {
   user: User;
   token: string;
   redirect_to: string;
   abilities: string[];
}

export interface User {
   id: number;
   name: string;
   email: string;
   role: "admin" | "manager" | "intern";
   department_id?: number;
   manager_id?: number;
   email_verified_at?: string;
   created_at: string;
   updated_at: string;
   deleted_at?: string;
   department?: any;
   manager?: User;
   interns?: User[];
   tasks_assigned?: any[];
   tasks_received?: any[];
   attendances?: any[];
   evaluations_received?: any[];
   evaluations_given?: any[];
   reclamations_sent?: any[];
   reclamations_received?: any[];
   notifications_sent?: any[];
   notification_recipients?: any[];
   reports_generated?: any[];
}

export interface ChangePasswordRequest {
   current_password: string;
   new_password: string;
   new_password_confirmation: string;
}
