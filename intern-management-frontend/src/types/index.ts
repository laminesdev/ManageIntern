export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'intern';
  department_id?: number;
  manager_id?: number;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  redirect_to: string;
  abilities: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

// Task types
export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigned_to: number;
  assigned_by: number;
  deadline: string;
  created_at: string;
  updated_at: string;
}

// Attendance types
export interface Attendance {
  id: number;
  intern_id: number;
  recorded_by: number;
  attendance_date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  recorded_at: string;
  created_at: string;
  updated_at: string;
}

// Evaluation types
export interface Evaluation {
  id: number;
  intern_id: number;
  manager_id: number;
  score: number;
  comments: string;
  evaluation_type: 'mid_term' | 'final' | 'monthly' | 'weekly' | 'quarterly' | 'project';
  evaluated_at: string;
  created_at: string;
  updated_at: string;
}

// Reclamation types
export interface Reclamation {
  id: number;
  intern_id: number;
  manager_id: number;
  subject: string;
  description: string;
  status: 'pending' | 'in_review' | 'solved' | 'archived';
  response?: string;
  resolved_at?: string;
  responded_at?: string;
  created_at: string;
  updated_at: string;
}

// Dashboard stats
export interface DashboardStats {
  total_tasks?: number;
  pending_tasks?: number;
  completed_tasks?: number;
  attendance_rate?: number;
  average_score?: number;
  pending_reclamations?: number;
  unread_notifications?: number;
}