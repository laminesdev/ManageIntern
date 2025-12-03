<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Attendance;
use App\Models\Evaluation;
use App\Models\Reclamation;
use App\Models\NotificationRecipient;
use App\Models\User;
use App\Models\Report;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Get dashboard data based on user role
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        
        switch ($user->role) {
            case 'admin':
                return $this->adminDashboard($user);
            case 'manager':
                return $this->managerDashboard($user);
            case 'intern':
                return $this->internDashboard($user);
            default:
                return response()->json(['message' => 'Invalid role'], 400);
        }
    }
    
    /**
     * Admin dashboard data
     */
    private function adminDashboard(User $user): JsonResponse
    {
        // User statistics
        $userStats = [
            'total' => User::count(),
            'admins' => User::where('role', 'admin')->count(),
            'managers' => User::where('role', 'manager')->count(),
            'interns' => User::where('role', 'intern')->count(),
            'unassigned_interns' => User::where('role', 'intern')
                ->whereNull('department_id')
                ->whereNull('manager_id')
                ->count(),
        ];
        
        // Department statistics
        $departmentStats = DB::table('departments')
            ->selectRaw('
                COUNT(*) as total_departments,
                SUM(CASE WHEN manager_id IS NOT NULL THEN 1 ELSE 0 END) as departments_with_manager
            ')
            ->first();
        
        // Recent reports
        $recentReports = Report::with(['department', 'generatedBy'])
            ->where('sent_to_admin', true)
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();
        
        // Recent users
        $recentUsers = User::with(['department', 'manager'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();
        
        return response()->json([
            'user_stats' => $userStats,
            'department_stats' => $departmentStats,
            'recent_reports' => $recentReports,
            'recent_users' => $recentUsers,
            'summary' => [
                'total_reports_received' => Report::where('sent_to_admin', true)->count(),
                'departments_without_manager' => DB::table('departments')
                    ->whereNull('manager_id')
                    ->count(),
            ]
        ]);
    }
    
    /**
     * Manager dashboard data
     */
    private function managerDashboard(User $user): JsonResponse
    {
        // Get intern count
        $internCount = $user->interns()->count();
        
        // Task statistics
        $taskStats = DB::table('tasks')
            ->selectRaw('
                COUNT(*) as total,
                SUM(CASE WHEN status = "pending" THEN 1 ELSE 0 END) as pending,
                SUM(CASE WHEN status = "in_progress" THEN 1 ELSE 0 END) as in_progress,
                SUM(CASE WHEN status = "completed" THEN 1 ELSE 0 END) as completed,
                SUM(CASE WHEN deadline < NOW() AND status NOT IN ("completed", "cancelled") THEN 1 ELSE 0 END) as overdue
            ')
            ->where('assigned_by', $user->id)
            ->first();
        
        // Attendance statistics (last 7 days)
        $attendanceStats = DB::table('attendances')
            ->join('users', 'attendances.intern_id', '=', 'users.id')
            ->selectRaw('
                COUNT(*) as total_records,
                SUM(CASE WHEN status = "present" THEN 1 ELSE 0 END) as present,
                SUM(CASE WHEN status = "absent" THEN 1 ELSE 0 END) as absent,
                SUM(CASE WHEN status = "late" THEN 1 ELSE 0 END) as late,
                SUM(CASE WHEN status = "excused" THEN 1 ELSE 0 END) as excused
            ')
            ->where('users.manager_id', $user->id)
            ->whereDate('attendances.attendance_date', '>=', now()->subDays(7))
            ->first();
        
        // Reclamation statistics
        $reclamationStats = DB::table('reclamations')
            ->selectRaw('
                COUNT(*) as total,
                SUM(CASE WHEN status = "pending" THEN 1 ELSE 0 END) as pending
            ')
            ->where('manager_id', $user->id)
            ->first();
        
        // Evaluation statistics
        $evaluationStats = DB::table('evaluations')
            ->selectRaw('
                COUNT(*) as total,
                AVG(score) as average_score
            ')
            ->where('manager_id', $user->id)
            ->first();
        
        // Recent tasks
        $recentTasks = Task::with(['assignedTo'])
            ->where('assigned_by', $user->id)
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();
        
        // Recent reclamations
        $recentReclamations = Reclamation::with(['intern'])
            ->where('manager_id', $user->id)
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();
        
        // Top performing interns (by average evaluation score)
        $topInterns = DB::table('evaluations')
            ->join('users', 'evaluations.intern_id', '=', 'users.id')
            ->selectRaw('
                users.id,
                users.name,
                users.email,
                AVG(evaluations.score) as average_score,
                COUNT(evaluations.id) as evaluation_count
            ')
            ->where('evaluations.manager_id', $user->id)
            ->groupBy('users.id', 'users.name', 'users.email')
            ->orderBy('average_score', 'desc')
            ->limit(5)
            ->get();
        
        return response()->json([
            'overview' => [
                'interns_count' => $internCount,
                'pending_tasks' => $taskStats->pending ?? 0,
                'pending_reclamations' => $reclamationStats->pending ?? 0,
                'attendance_today' => $this->getTodayAttendanceCount($user),
            ],
            'statistics' => [
                'tasks' => $taskStats,
                'attendance' => $attendanceStats,
                'reclamations' => $reclamationStats,
                'evaluations' => $evaluationStats,
            ],
            'recent_activity' => [
                'tasks' => $recentTasks,
                'reclamations' => $recentReclamations,
            ],
            'top_performers' => $topInterns,
        ]);
    }
    
    /**
     * Intern dashboard data
     */
    private function internDashboard(User $user): JsonResponse
    {
        // Task statistics
        $taskStats = DB::table('tasks')
            ->selectRaw('
                COUNT(*) as total,
                SUM(CASE WHEN status = "pending" THEN 1 ELSE 0 END) as pending,
                SUM(CASE WHEN status = "in_progress" THEN 1 ELSE 0 END) as in_progress,
                SUM(CASE WHEN status = "completed" THEN 1 ELSE 0 END) as completed,
                SUM(CASE WHEN deadline < NOW() AND status NOT IN ("completed", "cancelled") THEN 1 ELSE 0 END) as overdue
            ')
            ->where('assigned_to', $user->id)
            ->first();
        
        // Attendance statistics (last 30 days)
        $attendanceStats = DB::table('attendances')
            ->selectRaw('
                COUNT(*) as total,
                SUM(CASE WHEN status = "present" THEN 1 ELSE 0 END) as present,
                SUM(CASE WHEN status = "absent" THEN 1 ELSE 0 END) as absent,
                SUM(CASE WHEN status = "late" THEN 1 ELSE 0 END) as late,
                SUM(CASE WHEN status = "excused" THEN 1 ELSE 0 END) as excused
            ')
            ->where('intern_id', $user->id)
            ->whereDate('attendance_date', '>=', now()->subDays(30))
            ->first();
        
        // Evaluation statistics
        $evaluationStats = DB::table('evaluations')
            ->selectRaw('
                COUNT(*) as total,
                AVG(score) as average_score,
                MAX(score) as highest_score,
                MIN(score) as lowest_score
            ')
            ->where('intern_id', $user->id)
            ->first();
        
        // Notification statistics
        $notificationStats = DB::table('notification_recipients')
            ->selectRaw('
                COUNT(*) as total,
                SUM(CASE WHEN is_read = false THEN 1 ELSE 0 END) as unread
            ')
            ->where('recipient_id', $user->id)
            ->where('is_archived', false)
            ->first();
        
        // Reclamation statistics
        $reclamationStats = DB::table('reclamations')
            ->selectRaw('
                COUNT(*) as total,
                SUM(CASE WHEN status = "pending" THEN 1 ELSE 0 END) as pending
            ')
            ->where('intern_id', $user->id)
            ->first();
        
        // Recent tasks
        $recentTasks = Task::with(['assignedBy'])
            ->where('assigned_to', $user->id)
            ->orderBy('deadline', 'asc')
            ->limit(5)
            ->get();
        
        // Recent evaluations
        $recentEvaluations = DB::table('evaluations')
            ->join('users', 'evaluations.manager_id', '=', 'users.id')
            ->select('evaluations.*', 'users.name as manager_name')
            ->where('evaluations.intern_id', $user->id)
            ->orderBy('evaluations.evaluated_at', 'desc')
            ->limit(5)
            ->get();
        
        // Recent notifications
        $recentNotifications = DB::table('notification_recipients')
            ->join('notifications', 'notification_recipients.notification_id', '=', 'notifications.id')
            ->join('users', 'notifications.sender_id', '=', 'users.id')
            ->select(
                'notification_recipients.*',
                'notifications.title',
                'notifications.message',
                'notifications.created_at',
                'users.name as sender_name'
            )
            ->where('notification_recipients.recipient_id', $user->id)
            ->where('notification_recipients.is_archived', false)
            ->orderBy('notification_recipients.created_at', 'desc')
            ->limit(5)
            ->get();
        
        return response()->json([
            'overview' => [
                'pending_tasks' => $taskStats->pending ?? 0,
                'overdue_tasks' => $taskStats->overdue ?? 0,
                'unread_notifications' => $notificationStats->unread ?? 0,
                'attendance_rate' => $attendanceStats->total > 0 
                    ? round((($attendanceStats->present + $attendanceStats->excused) / $attendanceStats->total) * 100, 2)
                    : 0,
            ],
            'statistics' => [
                'tasks' => $taskStats,
                'attendance' => $attendanceStats,
                'evaluations' => $evaluationStats,
                'notifications' => $notificationStats,
                'reclamations' => $reclamationStats,
            ],
            'recent_activity' => [
                'tasks' => $recentTasks,
                'evaluations' => $recentEvaluations,
                'notifications' => $recentNotifications,
            ],
            'manager_info' => $user->manager ? [
                'name' => $user->manager->name,
                'email' => $user->manager->email,
            ] : null,
        ]);
    }
    
    /**
     * Get today's attendance count for manager's interns
     */
    private function getTodayAttendanceCount(User $manager): int
    {
        return DB::table('attendances')
            ->join('users', 'attendances.intern_id', '=', 'users.id')
            ->where('users.manager_id', $manager->id)
            ->whereDate('attendances.attendance_date', today())
            ->count();
    }
}