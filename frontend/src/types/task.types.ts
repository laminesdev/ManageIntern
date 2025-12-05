export interface Task {
   id: number;
   title: string;
   description: string;
   status: "pending" | "in_progress" | "completed" | "cancelled";
   priority: "low" | "medium" | "high" | "urgent";
   assigned_by: number;
   assigned_to: number;
   deadline: string;
   created_at: string;
   updated_at: string;
   deleted_at?: string;
   assigned_by_user?: any;
   assigned_to_user?: any;
}

export interface CreateTaskRequest {
   title: string;
   description: string;
   assigned_to: number;
   priority: "low" | "medium" | "high" | "urgent";
   deadline: string;
}

export interface UpdateTaskRequest extends Partial<CreateTaskRequest> {}

export interface UpdateTaskStatusRequest {
   status: "pending" | "in_progress" | "completed" | "cancelled";
}

export interface TaskStatistics {
   total: number;
   pending: number;
   in_progress: number;
   completed: number;
   cancelled: number;
   overdue: number;
}
