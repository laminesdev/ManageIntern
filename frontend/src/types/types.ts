// Re-export all types for easy import
export type { User, LoginRequest, LoginResponse, ChangePasswordRequest } from '../services/authService';
export type { CreateUserRequest, UpdateUserRequest, AssignInternRequest } from '../services/userService';
export type { Task, CreateTaskRequest, UpdateTaskRequest, UpdateTaskStatusRequest, TaskStatistics } from '../services/taskService';
export type { Attendance, CreateAttendanceRequest, UpdateAttendanceRequest, AttendanceStatistics } from '../services/attendanceService';
export type { Evaluation, CreateEvaluationRequest, UpdateEvaluationRequest, EvaluationStatistics } from '../services/evaluationService';
export type { Reclamation, CreateReclamationRequest, RespondToReclamationRequest, UpdateReclamationStatusRequest, ReclamationStatistics } from '../services/reclamationService';
export type { Notification, NotificationRecipient, SendNotificationRequest, UpdateNotificationRequest } from '../services/notificationService';
export type { Report, GenerateReportRequest, ReportStatistics } from '../services/reportService';