# Project: app

## File: Http/Controllers/AttendanceController.php
```php
<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAttendanceRequest;
use App\Http\Requests\UpdateAttendanceRequest;
use App\Models\Attendance;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AttendanceController extends Controller
{
    /**
     * Display a listing of attendance records
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->isManager()) {
            // Manager views attendance of their interns
            $query = Attendance::with(['intern', 'recordedBy'])
                ->whereHas('intern', function ($q) use ($user) {
                    $q->where('manager_id', $user->id);
                });
        } else {
            // Intern views their own attendance
            $query = Attendance::with(['intern', 'recordedBy'])
                ->where('intern_id', $user->id);
        }

        // Filter by date range
        if ($request->has('start_date')) {
            $query->whereDate('attendance_date', '>=', $request->start_date);
        }

        if ($request->has('end_date')) {
            $query->whereDate('attendance_date', '<=', $request->end_date);
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Sort by date (most recent first)
        $query->orderBy('attendance_date', 'desc');

        $attendance = $query->paginate(30);

        return response()->json($attendance);
    }

    /**
     * Store a newly created attendance record
     */
    public function store(StoreAttendanceRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $validated['recorded_by'] = $request->user()->id;
        $validated['recorded_at'] = now();

        $attendance = Attendance::create($validated);

        return response()->json([
            'message' => 'Attendance recorded successfully',
            'attendance' => $attendance->load(['intern', 'recordedBy'])
        ], 201);
    }

    /**
     * Display the specified attendance record
     */
    public function show(Attendance $attendance): JsonResponse
    {
        $user = request()->user();

        // Authorization check
        if ($user->isIntern() && $attendance->intern_id !== $user->id) {
            return response()->json([
                'message' => 'You can only view your own attendance records'
            ], 403);
        }

        if ($user->isManager()) {
            $intern = $attendance->intern;
            // Check if the manager is either:
            // 1. The intern's manager, OR
            // 2. The one who recorded the attendance
            if ($intern->manager_id !== $user->id && $attendance->recorded_by !== $user->id) {
                return response()->json([
                    'message' => 'You can only view attendance records of your interns or records you created'
                ], 403);
            }
        }

        $attendance->load(['intern', 'recordedBy']);

        return response()->json($attendance);
    }

    /**
     * Update the specified attendance record
     */
    public function update(UpdateAttendanceRequest $request, Attendance $attendance): JsonResponse
    {
        $user = $request->user();

        // Only the manager who recorded it can update
        if ($attendance->recorded_by !== $user->id) {
            return response()->json([
                'message' => 'Only the manager who recorded this attendance can update it'
            ], 403);
        }

        $validated = $request->validated();
        $attendance->update($validated);

        return response()->json([
            'message' => 'Attendance updated successfully',
            'attendance' => $attendance->fresh()->load(['intern', 'recordedBy'])
        ]);
    }

    /**
     * Remove the specified attendance record
     */
    public function destroy(Attendance $attendance): JsonResponse
    {
        $user = request()->user();

        // Only the manager who recorded it can delete
        if ($attendance->recorded_by !== $user->id) {
            return response()->json([
                'message' => 'Only the manager who recorded this attendance can delete it'
            ], 403);
        }

        $attendance->delete();

        return response()->json([
            'message' => 'Attendance record deleted successfully'
        ]);
    }

    /**
     * Get attendance statistics for dashboard
     */
    public function getStatistics(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->isManager()) {
            $internIds = $user->interns()->pluck('id');

            $stats = Attendance::selectRaw('
                COUNT(*) as total_records,
                SUM(CASE WHEN status = "present" THEN 1 ELSE 0 END) as present,
                SUM(CASE WHEN status = "absent" THEN 1 ELSE 0 END) as absent,
                SUM(CASE WHEN status = "late" THEN 1 ELSE 0 END) as late,
                SUM(CASE WHEN status = "excused" THEN 1 ELSE 0 END) as excused,
                DATE(attendance_date) as date
            ')
                ->whereIn('intern_id', $internIds)
                ->whereDate('attendance_date', '>=', now()->subDays(30))
                ->groupBy('date')
                ->orderBy('date', 'desc')
                ->get();

            // Get attendance by intern
            $byIntern = Attendance::selectRaw('
                intern_id,
                COUNT(*) as total,
                SUM(CASE WHEN status = "present" THEN 1 ELSE 0 END) as present_count
            ')
                ->whereIn('intern_id', $internIds)
                ->whereDate('attendance_date', '>=', now()->subDays(30))
                ->groupBy('intern_id')
                ->with('intern')
                ->get();

            return response()->json([
                'overall_stats' => $stats,
                'by_intern' => $byIntern
            ]);
        } elseif ($user->isIntern()) {
            $stats = Attendance::selectRaw('
                COUNT(*) as total,
                SUM(CASE WHEN status = "present" THEN 1 ELSE 0 END) as present,
                SUM(CASE WHEN status = "absent" THEN 1 ELSE 0 END) as absent,
                SUM(CASE WHEN status = "late" THEN 1 ELSE 0 END) as late,
                SUM(CASE WHEN status = "excused" THEN 1 ELSE 0 END) as excused
            ')
                ->where('intern_id', $user->id)
                ->whereDate('attendance_date', '>=', now()->subDays(30))
                ->first();

            return response()->json($stats);
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    /**
     * Get interns for attendance tracking
     */
    public function getInternsForAttendance(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user->isManager()) {
            return response()->json([
                'message' => 'Only managers can track attendance'
            ], 403);
        }

        $interns = User::where('role', 'intern')
            ->where('manager_id', $user->id)
            ->with('department')
            ->get(['id', 'name', 'email', 'department_id']);

        return response()->json($interns);
    }
}
```

## File: Http/Controllers/AuthController.php
```php
<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Requests\ChangePasswordRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Login user and create token
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();
        
        $user = User::where('email', $credentials['email'])->first();
        
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }
        
        // Revoke existing tokens (single session)
        $user->tokens()->delete();
        
        // Create new token with role-based abilities
        $abilities = $this->getAbilitiesForRole($user->role);
        $token = $user->createToken('auth_token', $abilities)->plainTextToken;
        
        return response()->json([
            'user' => $user->load('department'),
            'token' => $token,
            'redirect_to' => $this->getDashboardRoute($user->role),
            'abilities' => $abilities
        ]);
    }
    
    /**
     * Logout user (revoke token)
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();
        
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
    
    /**
     * Get authenticated user data
     */
    public function getCurrentUser(Request $request): JsonResponse
    {
        $user = $request->user()->load(['department', 'manager']);
        
        // Add role-specific data
        $additionalData = [];
        if ($user->isManager()) {
            $additionalData['interns_count'] = $user->interns()->count();
            $additionalData['pending_tasks'] = $user->tasksAssigned()->where('status', 'pending')->count();
            $additionalData['pending_reclamations'] = $user->reclamationsReceived()->where('status', 'pending')->count();
        } elseif ($user->isIntern()) {
            $additionalData['pending_tasks'] = $user->tasksReceived()->where('status', 'pending')->count();
            $additionalData['unread_notifications'] = $user->notificationRecipients()->where('is_read', false)->count();
        }
        
        return response()->json(array_merge($user->toArray(), $additionalData));
    }
    
    /**
     * Update user profile
     */
    public function updateProfile(UpdateProfileRequest $request): JsonResponse
    {
        $user = $request->user();
        $validated = $request->validated();
        
        $user->update($validated);
        
        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user->fresh()->load('department')
        ]);
    }
    
    /**
     * Change password
     */
    public function changePassword(ChangePasswordRequest $request): JsonResponse
    {
        $user = $request->user();
        $validated = $request->validated();
        
        $user->update([
            'password' => Hash::make($validated['new_password'])
        ]);
        
        return response()->json([
            'message' => 'Password changed successfully'
        ]);
    }
    
    /**
     * Get token abilities based on user role
     */
    private function getAbilitiesForRole(string $role): array
    {
        return match($role) {
            'admin' => ['user:manage', 'report:view', 'intern:assign'],
            'manager' => ['task:create', 'attendance:track', 'evaluation:create', 'notification:send', 'report:generate', 'reclamation:handle'],
            'intern' => ['task:view', 'evaluation:view', 'notification:view', 'reclamation:create'],
            default => [],
        };
    }
    
    /**
     * Get dashboard route based on user role
     */
    private function getDashboardRoute(string $role): string
    {
        return match($role) {
            'admin' => '/admin/dashboard',
            'manager' => '/manager/dashboard', 
            'intern' => '/intern/dashboard',
            default => '/',
        };
    }
}
```

## File: Http/Controllers/Controller.php
```php
<?php

namespace App\Http\Controllers;

abstract class Controller
{
    //
}

```

## File: Http/Controllers/DashboardController.php
```php
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
```

## File: Http/Controllers/EvaluationController.php
```php
<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEvaluationRequest;
use App\Models\Evaluation;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EvaluationController extends Controller
{
    /**
     * Display a listing of evaluations
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if ($user->isManager()) {
            // Manager views evaluations they've given
            $query = Evaluation::with(['intern', 'manager'])
                ->where('manager_id', $user->id);
        } else {
            // Intern views their own evaluations
            $query = Evaluation::with(['intern', 'manager'])
                ->where('intern_id', $user->id);
        }
        
        // Filter by evaluation type
        if ($request->has('evaluation_type')) {
            $query->where('evaluation_type', $request->evaluation_type);
        }
        
        // Filter by date range
        if ($request->has('start_date')) {
            $query->whereDate('evaluated_at', '>=', $request->start_date);
        }
        
        if ($request->has('end_date')) {
            $query->whereDate('evaluated_at', '<=', $request->end_date);
        }
        
        // Filter by intern
        if ($request->has('intern_id') && $user->isManager()) {
            $query->where('intern_id', $request->intern_id);
        }
        
        // Sort by evaluation date
        $query->orderBy('evaluated_at', 'desc');
        
        $evaluations = $query->paginate(20);
        
        return response()->json($evaluations);
    }
    
    /**
     * Store a newly created evaluation
     */
    public function store(StoreEvaluationRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $validated['manager_id'] = $request->user()->id;
        $validated['evaluated_at'] = now();
        
        $evaluation = Evaluation::create($validated);
        
        return response()->json([
            'message' => 'Evaluation created successfully',
            'evaluation' => $evaluation->load(['intern', 'manager'])
        ], 201);
    }
    
    /**
     * Display the specified evaluation
     */
    public function show(Evaluation $evaluation): JsonResponse
    {
        $user = request()->user();
        
        // Authorization check
        if ($user->isIntern() && $evaluation->intern_id !== $user->id) {
            return response()->json([
                'message' => 'You can only view your own evaluations'
            ], 403);
        }
        
        if ($user->isManager() && $evaluation->manager_id !== $user->id) {
            return response()->json([
                'message' => 'You can only view evaluations you created'
            ], 403);
        }
        
        $evaluation->load(['intern', 'manager']);
        
        return response()->json($evaluation);
    }
    
    /**
     * Update the specified evaluation
     */
    public function update(StoreEvaluationRequest $request, Evaluation $evaluation): JsonResponse
    {
        $user = $request->user();
        
        // Only the manager who created it can update
        if ($evaluation->manager_id !== $user->id) {
            return response()->json([
                'message' => 'Only the manager who created this evaluation can update it'
            ], 403);
        }
        
        $validated = $request->validated();
        $evaluation->update($validated);
        
        return response()->json([
            'message' => 'Evaluation updated successfully',
            'evaluation' => $evaluation->fresh()->load(['intern', 'manager'])
        ]);
    }
    
    /**
     * Remove the specified evaluation
     */
    public function destroy(Evaluation $evaluation): JsonResponse
    {
        $user = request()->user();
        
        // Only the manager who created it can delete
        if ($evaluation->manager_id !== $user->id) {
            return response()->json([
                'message' => 'Only the manager who created this evaluation can delete it'
            ], 403);
        }
        
        $evaluation->delete();
        
        return response()->json([
            'message' => 'Evaluation deleted successfully'
        ]);
    }
    
    /**
     * Get evaluation statistics
     */
    public function getStatistics(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if ($user->isManager()) {
            $stats = Evaluation::selectRaw('
                COUNT(*) as total,
                AVG(score) as average_score,
                MIN(score) as min_score,
                MAX(score) as max_score,
                evaluation_type
            ')
            ->where('manager_id', $user->id)
            ->groupBy('evaluation_type')
            ->get();
            
            // Get evaluations by intern
            $byIntern = Evaluation::selectRaw('
                intern_id,
                COUNT(*) as count,
                AVG(score) as average_score
            ')
            ->where('manager_id', $user->id)
            ->groupBy('intern_id')
            ->with('intern')
            ->get();
            
            return response()->json([
                'by_type' => $stats,
                'by_intern' => $byIntern
            ]);
        } elseif ($user->isIntern()) {
            $stats = Evaluation::selectRaw('
                COUNT(*) as total,
                AVG(score) as average_score,
                MIN(score) as min_score,
                MAX(score) as max_score
            ')
            ->where('intern_id', $user->id)
            ->first();
            
            return response()->json($stats);
        }
        
        return response()->json(['message' => 'Unauthorized'], 403);
    }
    
    /**
     * Get interns for evaluation
     */
    public function getInternsForEvaluation(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if (!$user->isManager()) {
            return response()->json([
                'message' => 'Only managers can evaluate interns'
            ], 403);
        }
        
        $interns = User::where('role', 'intern')
            ->where('manager_id', $user->id)
            ->with('department')
            ->get(['id', 'name', 'email', 'department_id']);
        
        return response()->json($interns);
    }
}
```

## File: Http/Controllers/NotificationController.php
```php
<?php

namespace App\Http\Controllers;

use App\Http\Requests\SendNotificationRequest;
use App\Models\Notification;
use App\Models\NotificationRecipient;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Display a listing of notifications
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if ($user->isManager()) {
            // Manager views notifications they've sent
            $query = Notification::with(['sender', 'recipients.recipient'])
                ->where('sender_id', $user->id);
        } else {
            // Intern views notifications received
            $query = NotificationRecipient::with(['notification.sender', 'recipient'])
                ->where('recipient_id', $user->id);
        }
        
        // Filter by read status (for interns)
        if ($user->isIntern() && $request->has('is_read')) {
            $query->where('is_read', $request->boolean('is_read'));
        }
        
        // Filter by archived status
        if ($request->has('is_archived')) {
            $query->where('is_archived', $request->boolean('is_archived'));
        }
        
        // Search by title/message
        if ($request->has('search')) {
            $search = $request->search;
            if ($user->isManager()) {
                $query->where(function($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('message', 'like', "%{$search}%");
                });
            } else {
                $query->whereHas('notification', function($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('message', 'like', "%{$search}%");
                });
            }
        }
        
        // Sort by creation date
        if ($user->isManager()) {
            $query->orderBy('created_at', 'desc');
            $notifications = $query->paginate(20);
        } else {
            $query->orderBy('created_at', 'desc');
            $notificationRecipients = $query->paginate(20);
            
            return response()->json([
                'notifications' => $notificationRecipients,
                'unread_count' => NotificationRecipient::where('recipient_id', $user->id)
                    ->where('is_read', false)
                    ->where('is_archived', false)
                    ->count()
            ]);
        }
        
        return response()->json($notifications);
    }
    
    /**
     * Store a newly created notification (send notification)
     */
    public function store(SendNotificationRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $validated['sender_id'] = $request->user()->id;
        
        // Create notification
        $notification = Notification::create([
            'sender_id' => $validated['sender_id'],
            'title' => $validated['title'],
            'message' => $validated['message']
        ]);
        
        // Create recipient records
        $recipientsData = [];
        foreach ($validated['recipient_ids'] as $recipientId) {
            $recipientsData[] = [
                'notification_id' => $notification->id,
                'recipient_id' => $recipientId,
                'created_at' => now(),
                'updated_at' => now()
            ];
        }
        
        NotificationRecipient::insert($recipientsData);
        
        return response()->json([
            'message' => 'Notification sent successfully',
            'notification' => $notification->load(['sender', 'recipients.recipient'])
        ], 201);
    }
    
    /**
     * Display the specified notification
     */
    public function show($id): JsonResponse
    {
        $user = request()->user();
        
        if ($user->isManager()) {
            // Manager views notification they sent
            $notification = Notification::with(['sender', 'recipients.recipient'])
                ->findOrFail($id);
            
            if ($notification->sender_id !== $user->id) {
                return response()->json([
                    'message' => 'You can only view notifications you sent'
                ], 403);
            }
        } else {
            // Intern views notification they received
            $notificationRecipient = NotificationRecipient::with(['notification.sender', 'recipient'])
                ->where('id', $id)
                ->where('recipient_id', $user->id)
                ->firstOrFail();
            
            // Mark as read if not already read
            if (!$notificationRecipient->is_read) {
                $notificationRecipient->update([
                    'is_read' => true,
                    'read_at' => now()
                ]);
            }
            
            return response()->json($notificationRecipient);
        }
        
        return response()->json($notification);
    }
    
    /**
     * Update notification recipient (mark as read/archived)
     */
    public function update(Request $request, $id): JsonResponse
    {
        $user = request()->user();
        
        // Only interns can update their notification status
        if (!$user->isIntern()) {
            return response()->json([
                'message' => 'Only interns can update notification status'
            ], 403);
        }
        
        $notificationRecipient = NotificationRecipient::where('id', $id)
            ->where('recipient_id', $user->id)
            ->firstOrFail();
        
        $validated = $request->validate([
            'is_read' => 'sometimes|boolean',
            'is_archived' => 'sometimes|boolean'
        ]);
        
        if (isset($validated['is_read']) && $validated['is_read'] === true) {
            $validated['read_at'] = now();
        }
        
        $notificationRecipient->update($validated);
        
        return response()->json([
            'message' => 'Notification updated successfully',
            'notification' => $notificationRecipient->load(['notification.sender', 'recipient'])
        ]);
    }
    
    /**
     * Remove the specified notification (for manager) or notification recipient (for intern)
     */
    public function destroy($id): JsonResponse
    {
        $user = request()->user();
        
        if ($user->isManager()) {
            // Manager deletes notification they sent
            $notification = Notification::findOrFail($id);
            
            if ($notification->sender_id !== $user->id) {
                return response()->json([
                    'message' => 'You can only delete notifications you sent'
                ], 403);
            }
            
            // Delete recipients first (due to foreign key)
            NotificationRecipient::where('notification_id', $notification->id)->delete();
            $notification->delete();
        } else {
            // Intern deletes their notification recipient record
            $notificationRecipient = NotificationRecipient::where('id', $id)
                ->where('recipient_id', $user->id)
                ->firstOrFail();
            
            $notificationRecipient->delete();
        }
        
        return response()->json([
            'message' => 'Notification deleted successfully'
        ]);
    }
    
    /**
     * Get interns for notification sending
     */
    public function getInternsForNotification(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if (!$user->isManager()) {
            return response()->json([
                'message' => 'Only managers can send notifications'
            ], 403);
        }
        
        $interns = User::where('role', 'intern')
            ->where('manager_id', $user->id)
            ->with('department')
            ->get(['id', 'name', 'email', 'department_id']);
        
        return response()->json($interns);
    }
    
    /**
     * Mark all notifications as read
     */
    public function markAllAsRead(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if (!$user->isIntern()) {
            return response()->json([
                'message' => 'Only interns can mark notifications as read'
            ], 403);
        }
        
        NotificationRecipient::where('recipient_id', $user->id)
            ->where('is_read', false)
            ->update([
                'is_read' => true,
                'read_at' => now()
            ]);
        
        return response()->json([
            'message' => 'All notifications marked as read'
        ]);
    }
}
```

## File: Http/Controllers/ReclamationController.php
```php
<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReclamationRequest;
use App\Http\Requests\RespondReclamationRequest;
use App\Models\Reclamation;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReclamationController extends Controller
{
    /**
     * Display a listing of reclamations
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if ($user->isManager()) {
            // Manager views reclamations received
            $query = Reclamation::with(['intern', 'manager'])
                ->where('manager_id', $user->id);
        } else {
            // Intern views their own reclamations
            $query = Reclamation::with(['intern', 'manager'])
                ->where('intern_id', $user->id);
        }
        
        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        
        // Search by subject
        if ($request->has('search')) {
            $query->where('subject', 'like', "%{$request->search}%");
        }
        
        // Filter by date range
        if ($request->has('start_date')) {
            $query->whereDate('created_at', '>=', $request->start_date);
        }
        
        if ($request->has('end_date')) {
            $query->whereDate('created_at', '<=', $request->end_date);
        }
        
        // Sort by creation date (newest first)
        $query->orderBy('created_at', 'desc');
        
        $reclamations = $query->paginate(20);
        
        return response()->json($reclamations);
    }
    
    /**
     * Store a newly created reclamation (Intern only)
     */
    public function store(StoreReclamationRequest $request): JsonResponse
    {
        $user = $request->user();
        
        $validated = $request->validated();
        $validated['intern_id'] = $user->id;
        $validated['manager_id'] = $user->manager_id;
        $validated['status'] = 'pending';
        
        $reclamation = Reclamation::create($validated);
        
        return response()->json([
            'message' => 'Reclamation submitted successfully',
            'reclamation' => $reclamation->load(['intern', 'manager'])
        ], 201);
    }
    
    /**
     * Display the specified reclamation
     */
    public function show(Reclamation $reclamation): JsonResponse
    {
        $user = request()->user();
        
        // Authorization check
        if ($user->isIntern() && $reclamation->intern_id !== $user->id) {
            return response()->json([
                'message' => 'You can only view your own reclamations'
            ], 403);
        }
        
        if ($user->isManager() && $reclamation->manager_id !== $user->id) {
            return response()->json([
                'message' => 'You can only view reclamations assigned to you'
            ], 403);
        }
        
        $reclamation->load(['intern', 'manager']);
        
        return response()->json($reclamation);
    }
    
    /**
     * Update the specified reclamation (Manager response)
     */
    public function update(RespondReclamationRequest $request, Reclamation $reclamation): JsonResponse
    {
        $user = $request->user();
        
        // Only the assigned manager can respond
        if ($reclamation->manager_id !== $user->id) {
            return response()->json([
                'message' => 'Only the assigned manager can respond to this reclamation'
            ], 403);
        }
        
        // Can only respond to pending reclamations
        if ($reclamation->status !== 'pending') {
            return response()->json([
                'message' => 'This reclamation has already been processed'
            ], 422);
        }
        
        $validated = $request->validated();
        $validated['responded_at'] = now();
        
        if ($validated['status'] === 'solved') {
            $validated['resolved_at'] = now();
        }
        
        $reclamation->update($validated);
        
        return response()->json([
            'message' => 'Reclamation response submitted successfully',
            'reclamation' => $reclamation->fresh()->load(['intern', 'manager'])
        ]);
    }
    
    /**
     * Remove the specified reclamation
     */
    public function destroy(Reclamation $reclamation): JsonResponse
    {
        $user = request()->user();
        
        // Interns can only delete their own pending reclamations
        if ($user->isIntern()) {
            if ($reclamation->intern_id !== $user->id) {
                return response()->json([
                    'message' => 'You can only delete your own reclamations'
                ], 403);
            }
            
            if ($reclamation->status !== 'pending') {
                return response()->json([
                    'message' => 'You can only delete pending reclamations'
                ], 422);
            }
        }
        
        // Managers can delete reclamations assigned to them
        if ($user->isManager() && $reclamation->manager_id !== $user->id) {
            return response()->json([
                'message' => 'You can only delete reclamations assigned to you'
            ], 403);
        }
        
        $reclamation->delete();
        
        return response()->json([
            'message' => 'Reclamation deleted successfully'
        ]);
    }
    
    /**
     * Update reclamation status only
     */
    public function updateStatus(Request $request, Reclamation $reclamation): JsonResponse
    {
        $user = $request->user();
        
        if (!$user->isManager() || $reclamation->manager_id !== $user->id) {
            return response()->json([
                'message' => 'Only the assigned manager can update reclamation status'
            ], 403);
        }
        
        $validated = $request->validate([
            'status' => 'required|in:pending,solved,archived'
        ]);
        
        $reclamation->update($validated);
        
        return response()->json([
            'message' => 'Reclamation status updated successfully',
            'reclamation' => $reclamation->fresh()
        ]);
    }
    
    /**
     * Get reclamation statistics
     */
    public function getStatistics(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if ($user->isManager()) {
            $stats = Reclamation::selectRaw('
                COUNT(*) as total,
                SUM(CASE WHEN status = "pending" THEN 1 ELSE 0 END) as pending,
                SUM(CASE WHEN status = "solved" THEN 1 ELSE 0 END) as solved,
                SUM(CASE WHEN status = "archived" THEN 1 ELSE 0 END) as archived
            ')
            ->where('manager_id', $user->id)
            ->first();
            
            // Get reclamations by intern
            $byIntern = Reclamation::selectRaw('
                intern_id,
                COUNT(*) as total,
                SUM(CASE WHEN status = "pending" THEN 1 ELSE 0 END) as pending_count
            ')
            ->where('manager_id', $user->id)
            ->groupBy('intern_id')
            ->with('intern')
            ->get();
            
            return response()->json([
                'overall_stats' => $stats,
                'by_intern' => $byIntern
            ]);
        } elseif ($user->isIntern()) {
            $stats = Reclamation::selectRaw('
                COUNT(*) as total,
                SUM(CASE WHEN status = "pending" THEN 1 ELSE 0 END) as pending,
                SUM(CASE WHEN status = "solved" THEN 1 ELSE 0 END) as solved,
                SUM(CASE WHEN status = "archived" THEN 1 ELSE 0 END) as archived
            ')
            ->where('intern_id', $user->id)
            ->first();
            
            return response()->json($stats);
        }
        
        return response()->json(['message' => 'Unauthorized'], 403);
    }
    
    /**
     * Get my reclamations (for intern)
     */
    public function myReclamations(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if (!$user->isIntern()) {
            return response()->json([
                'message' => 'Only interns can view their reclamations'
            ], 403);
        }
        
        $query = Reclamation::with(['intern', 'manager'])
            ->where('intern_id', $user->id);
        
        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        
        // Sort by creation date
        $query->orderBy('created_at', 'desc');
        
        $reclamations = $query->paginate(15);
        
        return response()->json($reclamations);
    }
}
```

## File: Http/Controllers/ReportController.php
```php
<?php

namespace App\Http\Controllers;

use App\Http\Requests\GenerateReportRequest;
use App\Models\Report;
use App\Models\Attendance;
use App\Models\Evaluation;
use App\Models\Task;
use App\Models\User;
use App\Models\Department;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    /**
     * Display a listing of reports
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if ($user->isAdmin()) {
            // Admin views all reports
            $query = Report::with(['department', 'generatedBy'])
                ->where('sent_to_admin', true);
        } else {
            // Manager views reports they generated
            $query = Report::with(['department', 'generatedBy'])
                ->where('generated_by', $user->id);
        }
        
        // Filter by type
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }
        
        // Filter by date range
        if ($request->has('period_start')) {
            $query->whereDate('period_start', '>=', $request->period_start);
        }
        
        if ($request->has('period_end')) {
            $query->whereDate('period_end', '<=', $request->period_end);
        }
        
        // Filter by department (admin only)
        if ($user->isAdmin() && $request->has('department_id')) {
            $query->where('department_id', $request->department_id);
        }
        
        // Sort by creation date
        $query->orderBy('created_at', 'desc');
        
        $reports = $query->paginate(20);
        
        return response()->json($reports);
    }
    
    /**
     * Generate a new report
     */
    public function generate(GenerateReportRequest $request): JsonResponse
    {
        $user = $request->user();
        $validated = $request->validated();
        
        // Get department of the manager
        $department = $user->department;
        
        if (!$department) {
            return response()->json([
                'message' => 'You must be assigned to a department to generate reports'
            ], 422);
        }
        
        $validated['department_id'] = $department->id;
        $validated['generated_by'] = $user->id;
        
        // Generate report data based on type
        $reportData = $this->generateReportData(
            $validated['type'],
            $validated['period_start'],
            $validated['period_end'],
            $department->id,
            $user->id
        );
        
        $validated['data'] = $reportData;
        
        $report = Report::create($validated);
        
        return response()->json([
            'message' => 'Report generated successfully',
            'report' => $report->load(['department', 'generatedBy'])
        ], 201);
    }
    
    /**
     * Display the specified report
     */
    public function show(Report $report): JsonResponse
    {
        $user = request()->user();
        
        // Authorization check
        if ($user->isAdmin()) {
            // Admin can view any report sent to admin
            if (!$report->sent_to_admin) {
                return response()->json([
                    'message' => 'This report has not been sent to admin'
                ], 403);
            }
        } else {
            // Manager can only view reports they generated
            if ($report->generated_by !== $user->id) {
                return response()->json([
                    'message' => 'You can only view reports you generated'
                ], 403);
            }
        }
        
        $report->load(['department', 'generatedBy']);
        
        return response()->json($report);
    }
    
    /**
     * Send report to admin
     */
    public function sendToAdmin(Report $report): JsonResponse
    {
        $user = request()->user();
        
        // Only the manager who generated it can send to admin
        if ($report->generated_by !== $user->id) {
            return response()->json([
                'message' => 'You can only send reports you generated'
            ], 403);
        }
        
        if ($report->sent_to_admin) {
            return response()->json([
                'message' => 'This report has already been sent to admin'
            ], 422);
        }
        
        $report->update(['sent_to_admin' => true]);
        
        return response()->json([
            'message' => 'Report sent to admin successfully',
            'report' => $report->fresh()
        ]);
    }
    
    /**
     * Remove the specified report
     */
    public function destroy(Report $report): JsonResponse
    {
        $user = request()->user();
        
        // Only the manager who generated it can delete
        if ($report->generated_by !== $user->id) {
            return response()->json([
                'message' => 'You can only delete reports you generated'
            ], 403);
        }
        
        $report->delete();
        
        return response()->json([
            'message' => 'Report deleted successfully'
        ]);
    }
    
    /**
     * Generate report data based on type
     */
    private function generateReportData(string $type, string $startDate, string $endDate, int $departmentId, int $managerId): array
    {
        if ($type === 'attendance') {
            return $this->generateAttendanceReport($startDate, $endDate, $departmentId, $managerId);
        } else {
            return $this->generatePerformanceReport($startDate, $endDate, $departmentId, $managerId);
        }
    }
    
    /**
     * Generate attendance report data
     */
    private function generateAttendanceReport(string $startDate, string $endDate, int $departmentId, int $managerId): array
    {
        // Get interns in the department managed by this manager
        $interns = User::where('role', 'intern')
            ->where('department_id', $departmentId)
            ->where('manager_id', $managerId)
            ->get(['id', 'name', 'email']);
        
        $attendanceData = [];
        
        foreach ($interns as $intern) {
            $attendanceRecords = Attendance::where('intern_id', $intern->id)
                ->whereBetween('attendance_date', [$startDate, $endDate])
                ->get();
            
            $attendanceSummary = [
                'intern_id' => $intern->id,
                'intern_name' => $intern->name,
                'intern_email' => $intern->email,
                'total_days' => $attendanceRecords->count(),
                'present' => $attendanceRecords->where('status', 'present')->count(),
                'absent' => $attendanceRecords->where('status', 'absent')->count(),
                'late' => $attendanceRecords->where('status', 'late')->count(),
                'excused' => $attendanceRecords->where('status', 'excused')->count(),
                'attendance_rate' => $attendanceRecords->count() > 0 
                    ? round(($attendanceRecords->whereIn('status', ['present', 'excused'])->count() / $attendanceRecords->count()) * 100, 2)
                    : 0,
                'details' => $attendanceRecords->map(function ($record) {
                    return [
                        'date' => $record->attendance_date->format('Y-m-d'),
                        'status' => $record->status,
                        'recorded_at' => $record->recorded_at
                    ];
                })
            ];
            
            $attendanceData[] = $attendanceSummary;
        }
        
        // Overall statistics
        $allAttendances = Attendance::whereHas('intern', function ($query) use ($departmentId, $managerId) {
            $query->where('department_id', $departmentId)
                  ->where('manager_id', $managerId);
        })
        ->whereBetween('attendance_date', [$startDate, $endDate])
        ->get();
        
        $overallStats = [
            'total_records' => $allAttendances->count(),
            'present' => $allAttendances->where('status', 'present')->count(),
            'absent' => $allAttendances->where('status', 'absent')->count(),
            'late' => $allAttendances->where('status', 'late')->count(),
            'excused' => $allAttendances->where('status', 'excused')->count(),
            'overall_attendance_rate' => $allAttendances->count() > 0
                ? round(($allAttendances->whereIn('status', ['present', 'excused'])->count() / $allAttendances->count()) * 100, 2)
                : 0,
        ];
        
        return [
            'report_type' => 'attendance',
            'period' => [
                'start' => $startDate,
                'end' => $endDate
            ],
            'department_id' => $departmentId,
            'interns_count' => $interns->count(),
            'overall_statistics' => $overallStats,
            'intern_attendance' => $attendanceData,
            'generated_at' => now()->toDateTimeString()
        ];
    }
    
    /**
     * Generate performance report data
     */
    private function generatePerformanceReport(string $startDate, string $endDate, int $departmentId, int $managerId): array
    {
        // Get interns in the department managed by this manager
        $interns = User::where('role', 'intern')
            ->where('department_id', $departmentId)
            ->where('manager_id', $managerId)
            ->get(['id', 'name', 'email']);
        
        $performanceData = [];
        
        foreach ($interns as $intern) {
            // Task performance
            $tasks = Task::where('assigned_to', $intern->id)
                ->whereBetween('created_at', [$startDate, $endDate])
                ->get();
            
            $taskStats = [
                'total' => $tasks->count(),
                'completed' => $tasks->where('status', 'completed')->count(),
                'in_progress' => $tasks->where('status', 'in_progress')->count(),
                'pending' => $tasks->where('status', 'pending')->count(),
                'cancelled' => $tasks->where('status', 'cancelled')->count(),
                'overdue' => $tasks->where('deadline', '<', now())
                    ->whereNotIn('status', ['completed', 'cancelled'])
                    ->count(),
                'completion_rate' => $tasks->count() > 0
                    ? round(($tasks->where('status', 'completed')->count() / $tasks->count()) * 100, 2)
                    : 0
            ];
            
            // Evaluation performance
            $evaluations = Evaluation::where('intern_id', $intern->id)
                ->whereBetween('evaluated_at', [$startDate, $endDate])
                ->get();
            
            $evaluationStats = [
                'total' => $evaluations->count(),
                'average_score' => $evaluations->avg('score'),
                'highest_score' => $evaluations->max('score'),
                'lowest_score' => $evaluations->min('score'),
                'by_type' => $evaluations->groupBy('evaluation_type')->map(function ($group) {
                    return [
                        'count' => $group->count(),
                        'average_score' => $group->avg('score')
                    ];
                })
            ];
            
            // Attendance for performance context
            $attendance = Attendance::where('intern_id', $intern->id)
                ->whereBetween('attendance_date', [$startDate, $endDate])
                ->get();
            
            $attendanceStats = [
                'total' => $attendance->count(),
                'present' => $attendance->where('status', 'present')->count(),
                'attendance_rate' => $attendance->count() > 0
                    ? round(($attendance->whereIn('status', ['present', 'excused'])->count() / $attendance->count()) * 100, 2)
                    : 0
            ];
            
            $performanceData[] = [
                'intern_id' => $intern->id,
                'intern_name' => $intern->name,
                'intern_email' => $intern->email,
                'tasks' => $taskStats,
                'evaluations' => $evaluationStats,
                'attendance' => $attendanceStats,
                'overall_performance_score' => $this->calculateOverallPerformance(
                    $taskStats['completion_rate'],
                    $evaluationStats['average_score'] ?? 0,
                    $attendanceStats['attendance_rate']
                )
            ];
        }
        
        // Overall department performance
        $overallStats = [
            'total_interns' => $interns->count(),
            'average_task_completion_rate' => collect($performanceData)->avg('tasks.completion_rate'),
            'average_evaluation_score' => collect($performanceData)->avg('evaluations.average_score'),
            'average_attendance_rate' => collect($performanceData)->avg('attendance.attendance_rate'),
            'average_overall_performance' => collect($performanceData)->avg('overall_performance_score'),
        ];
        
        return [
            'report_type' => 'performance',
            'period' => [
                'start' => $startDate,
                'end' => $endDate
            ],
            'department_id' => $departmentId,
            'overall_statistics' => $overallStats,
            'intern_performance' => $performanceData,
            'generated_at' => now()->toDateTimeString()
        ];
    }
    
    /**
     * Calculate overall performance score
     */
    private function calculateOverallPerformance(float $taskCompletionRate, float $evaluationScore, float $attendanceRate): float
    {
        // Weighted average: 40% tasks, 40% evaluations, 20% attendance
        $taskWeight = 0.4;
        $evalWeight = 0.4;
        $attendanceWeight = 0.2;
        
        return round(
            ($taskCompletionRate * $taskWeight) + 
            ($evaluationScore * $evalWeight) + 
            ($attendanceRate * $attendanceWeight),
            2
        );
    }
    
    /**
     * Get report statistics
     */
    public function getStatistics(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if ($user->isAdmin()) {
            $stats = Report::selectRaw('
                COUNT(*) as total,
                SUM(CASE WHEN type = "attendance" THEN 1 ELSE 0 END) as attendance_reports,
                SUM(CASE WHEN type = "performance" THEN 1 ELSE 0 END) as performance_reports,
                SUM(CASE WHEN sent_to_admin = true THEN 1 ELSE 0 END) as sent_to_admin
            ')
            ->first();
        } else {
            $stats = Report::selectRaw('
                COUNT(*) as total,
                SUM(CASE WHEN type = "attendance" THEN 1 ELSE 0 END) as attendance_reports,
                SUM(CASE WHEN type = "performance" THEN 1 ELSE 0 END) as performance_reports,
                SUM(CASE WHEN sent_to_admin = true THEN 1 ELSE 0 END) as sent_to_admin
            ')
            ->where('generated_by', $user->id)
            ->first();
        }
        
        return response()->json($stats);
    }
}
```

## File: Http/Controllers/TaskController.php
```php
<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    /**
     * Display a listing of tasks (Manager view)
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        
        $query = Task::with(['assignedBy', 'assignedTo.department'])
            ->where('assigned_by', $user->id);
        
        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        
        // Filter by priority
        if ($request->has('priority')) {
            $query->where('priority', $request->priority);
        }
        
        // Filter by intern
        if ($request->has('assigned_to')) {
            $query->where('assigned_to', $request->assigned_to);
        }
        
        // Search by title
        if ($request->has('search')) {
            $query->where('title', 'like', "%{$request->search}%");
        }
        
        // Sort options
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);
        
        $tasks = $query->paginate(15);
        
        return response()->json($tasks);
    }
    
    /**
     * Store a newly created task
     */
    public function store(StoreTaskRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $validated['assigned_by'] = $request->user()->id;
        
        $task = Task::create($validated);
        
        return response()->json([
            'message' => 'Task created successfully',
            'task' => $task->load(['assignedBy', 'assignedTo'])
        ], 201);
    }
    
    /**
     * Display the specified task
     */
    public function show(Task $task): JsonResponse
    {
        // Authorization: Only assigned manager or assigned intern can view
        $user = request()->user();
        
        if ($task->assigned_by !== $user->id && $task->assigned_to !== $user->id) {
            return response()->json([
                'message' => 'You are not authorized to view this task'
            ], 403);
        }
        
        $task->load(['assignedBy', 'assignedTo.department']);
        
        return response()->json($task);
    }
    
    /**
     * Update the specified task
     */
    public function update(UpdateTaskRequest $request, Task $task): JsonResponse
    {
        // Only the assigned manager can update
        if ($task->assigned_by !== $request->user()->id) {
            return response()->json([
                'message' => 'Only the assigned manager can update this task'
            ], 403);
        }
        
        $validated = $request->validated();
        $task->update($validated);
        
        return response()->json([
            'message' => 'Task updated successfully',
            'task' => $task->fresh()->load(['assignedBy', 'assignedTo'])
        ]);
    }
    
    /**
     * Remove the specified task (soft delete)
     */
    public function destroy(Task $task): JsonResponse
    {
        // Only the assigned manager can delete
        if ($task->assigned_by !== request()->user()->id) {
            return response()->json([
                'message' => 'Only the assigned manager can delete this task'
            ], 403);
        }
        
        $task->delete();
        
        return response()->json([
            'message' => 'Task deleted successfully'
        ]);
    }
    
    /**
     * Update task status (Manager or Intern)
     */
    public function updateStatus(Request $request, Task $task): JsonResponse
    {
        $user = $request->user();
        $validated = $request->validate([
            'status' => 'required|in:pending,in_progress,completed,cancelled'
        ]);
        
        // Check authorization
        if ($task->assigned_by !== $user->id && $task->assigned_to !== $user->id) {
            return response()->json([
                'message' => 'You are not authorized to update this task'
            ], 403);
        }
        
        // Interns can only update to in_progress or completed
        if ($user->isIntern() && !in_array($validated['status'], ['in_progress', 'completed'])) {
            return response()->json([
                'message' => 'Interns can only update status to "in_progress" or "completed"'
            ], 403);
        }
        
        $task->update(['status' => $validated['status']]);
        
        // If completed, update completed_at timestamp
        if ($validated['status'] === 'completed') {
            $task->update(['completed_at' => now()]);
        }
        
        return response()->json([
            'message' => 'Task status updated successfully',
            'task' => $task->fresh()
        ]);
    }
    
    /**
     * Get tasks for current intern (Intern view)
     */
    public function myTasks(Request $request): JsonResponse
    {
        $user = $request->user();
        
        $query = Task::with(['assignedBy', 'assignedTo'])
            ->where('assigned_to', $user->id);
        
        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        
        // Filter by priority
        if ($request->has('priority')) {
            $query->where('priority', $request->priority);
        }
        
        // Show overdue tasks
        if ($request->has('overdue') && $request->boolean('overdue')) {
            $query->where('deadline', '<', now())
                  ->whereNotIn('status', ['completed', 'cancelled']);
        }
        
        // Sort by deadline (closest first)
        $query->orderBy('deadline', 'asc');
        
        $tasks = $query->paginate(10);
        
        // Add statistics
        $stats = [
            'total' => Task::where('assigned_to', $user->id)->count(),
            'pending' => Task::where('assigned_to', $user->id)->where('status', 'pending')->count(),
            'in_progress' => Task::where('assigned_to', $user->id)->where('status', 'in_progress')->count(),
            'completed' => Task::where('assigned_to', $user->id)->where('status', 'completed')->count(),
            'overdue' => Task::where('assigned_to', $user->id)
                ->where('deadline', '<', now())
                ->whereNotIn('status', ['completed', 'cancelled'])
                ->count(),
        ];
        
        return response()->json([
            'tasks' => $tasks,
            'statistics' => $stats
        ]);
    }
    
    /**
     * Get interns for task assignment dropdown
     */
    public function getInternsForAssignment(Request $request): JsonResponse
    {
        $user = $request->user();
        
        $interns = User::where('role', 'intern')
            ->where('manager_id', $user->id)
            ->with('department')
            ->get(['id', 'name', 'email', 'department_id']);
        
        return response()->json($interns);
    }
    
    /**
     * Get task statistics for manager dashboard
     */
    public function getStatistics(Request $request): JsonResponse
    {
        $user = $request->user();
        
        $stats = DB::table('tasks')
            ->selectRaw('
                COUNT(*) as total,
                SUM(CASE WHEN status = "pending" THEN 1 ELSE 0 END) as pending,
                SUM(CASE WHEN status = "in_progress" THEN 1 ELSE 0 END) as in_progress,
                SUM(CASE WHEN status = "completed" THEN 1 ELSE 0 END) as completed,
                SUM(CASE WHEN status = "cancelled" THEN 1 ELSE 0 END) as cancelled,
                SUM(CASE WHEN deadline < NOW() AND status NOT IN ("completed", "cancelled") THEN 1 ELSE 0 END) as overdue
            ')
            ->where('assigned_by', $user->id)
            ->first();
        
        // Handle null result (no tasks yet)
        if (!$stats) {
            $stats = (object) [
                'total' => 0,
                'pending' => 0,
                'in_progress' => 0,
                'completed' => 0,
                'cancelled' => 0,
                'overdue' => 0
            ];
        }
        
        return response()->json($stats);
    }
}
```

## File: Http/Controllers/UserController.php
```php
<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\AssignInternRequest;
use App\Models\User;
use App\Models\Department;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of users with filters
     */
    public function index(Request $request): JsonResponse
    {
        $query = User::with(['department', 'manager']);

        // Filter by role
        if ($request->has('role')) {
            $query->where('role', $request->role);
        }

        // Filter by department
        if ($request->has('department_id')) {
            $query->where('department_id', $request->department_id);
        }

        // Search by name or email
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $users = $query->latest()->paginate(10);

        return response()->json($users);
    }

    /**
     * Store a newly created user
     */
    public function store(StoreUserRequest $request): JsonResponse
    {
        $validated = $request->validated();

        // Hash password if provided
        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user = User::create($validated);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user->load(['department', 'manager'])
        ], 201);
    }

    /**
     * Display the specified user
     */
    public function show(User $user): JsonResponse
    {
        $user->load(['department', 'manager', 'interns']);

        // Add role-specific relationships
        if ($user->isIntern()) {
            $user->load(['tasksReceived', 'evaluationsReceived', 'attendances']);
        } elseif ($user->isManager()) {
            $user->load(['tasksAssigned', 'interns.department']);
        }

        return response()->json($user);
    }

    /**
     * Update the specified user
     */
    public function update(StoreUserRequest $request, User $user): JsonResponse
    {
        $validated = $request->validated();

        // Hash password if provided
        if (isset($validated['password']) && $validated['password']) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user->fresh()->load(['department', 'manager'])
        ]);
    }

    /**
     * Remove the specified user (soft delete)
     */
    public function destroy(User $user): JsonResponse
    {
        // Prevent deleting yourself
        if ($user->id === auth()->id()) {
            return response()->json([
                'message' => 'You cannot delete your own account'
            ], 403);
        }

        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully'
        ]);
    }

    /**
     * Assign intern to department and manager
     */
    public function assignIntern(AssignInternRequest $request, User $user): JsonResponse
    {
        // Validate user is an intern
        if (!$user->isIntern()) {
            return response()->json([
                'message' => 'Only interns can be assigned'
            ], 422);
        }

        // Check if already assigned
        if ($user->isAlreadyAssigned()) {
            return response()->json([
                'message' => 'Intern is already assigned to a department and manager'
            ], 422);
        }

        $validated = $request->validated();
        $user->update($validated);

        return response()->json([
            'message' => 'Intern assigned successfully',
            'user' => $user->fresh()->load(['department', 'manager'])
        ]);
    }

    /**
     * Soft delete a user
     */
    public function softDelete(User $user): JsonResponse
    {
        if ($user->id === auth()->id()) {
            return response()->json([
                'message' => 'You cannot delete your own account'
            ], 403);
        }

        $user->delete();

        return response()->json([
            'message' => 'User soft deleted successfully'
        ]);
    }

    /**
     * Restore a soft-deleted user
     */
    public function restore($id): JsonResponse
    {
        $user = User::withTrashed()->findOrFail($id);

        if (!$user->trashed()) {
            return response()->json([
                'message' => 'User is not deleted'
            ], 422);
        }

        $user->restore();

        return response()->json([
            'message' => 'User restored successfully',
            'user' => $user->load(['department', 'manager'])
        ]);
    }

    /**
     * Get all managers for dropdown
     */
    public function getManagers(): JsonResponse
    {
        $managers = User::where('role', 'manager')
            ->with('department')
            ->get(['id', 'name', 'email', 'department_id']);

        return response()->json($managers);
    }

    /**
     * Get all interns (unassigned or filtered)
     */
    public function getInterns(Request $request): JsonResponse
    {
        $query = User::where('role', 'intern')->with(['department', 'manager']);

        // Filter unassigned interns
        if ($request->has('unassigned') && $request->boolean('unassigned')) {
            $query->whereNull('department_id')->whereNull('manager_id');
        }

        // Filter by department
        if ($request->has('department_id')) {
            $query->where('department_id', $request->department_id);
        }

        $interns = $query->get(['id', 'name', 'email', 'department_id', 'manager_id']);

        return response()->json($interns);
    }

    public function getUnassignedInterns(Request $request): JsonResponse
    {
        if (!$request->user()->isAdmin()) {
            return response()->json([
                'message' => 'Only admins can view unassigned interns'
            ], 403);
        }

        $interns = User::where('role', 'intern')
            ->whereNull('department_id')
            ->whereNull('manager_id')
            ->with('department')
            ->get(['id', 'name', 'email', 'department_id', 'manager_id']);

        return response()->json($interns);
    }
}
```

## File: Http/Middleware/Authenticate.php
```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Handle an incoming request.
     */
    public function handle($request, Closure $next, ...$guards)
    {
        $this->authenticate($request, $guards);

        return $next($request);
    }

    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        return $request->expectsJson() ? null : route('login');
    }
}
```

## File: Http/Middleware/CheckRole.php
```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = $request->user();
        
        // Check if user is authenticated
        if (!$user) {
            return response()->json([
                'message' => 'Unauthorized. Please log in.'
            ], 401);
        }
        
        // Check if user has required role
        if (!in_array($user->role, $roles)) {
            return response()->json([
                'message' => 'Forbidden. You do not have permission to access this resource.'
            ], 403);
        }
        
        return $next($request);
    }
}
```

## File: Http/Middleware/EncryptCookies.php
```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EncryptCookies
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        return $next($request);
    }
}

```

## File: Http/Middleware/EnsureJsonResponse.php
```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureJsonResponse
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $request->headers->set('Accept', 'application/json');
        return $next($request);
    }
}
```

## File: Http/Middleware/TrimStrings.php
```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrimStrings
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        return $next($request);
    }
}

```

## File: Http/Middleware/TrustHosts.php
```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrustHosts
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        return $next($request);
    }
}

```

## File: Http/Middleware/TrustProxies.php
```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrustProxies
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        return $next($request);
    }
}

```

## File: Http/Middleware/ValidateSignature.php
```php
<?php

namespace App\Http\Middleware;

use Illuminate\Routing\Middleware\ValidateSignature as Middleware;

class ValidateSignature extends Middleware
{
    /**
     * The names of the query string parameters that should be ignored.
     *
     * @var array<int, string>
     */
    protected $except = [
        // 'fbclid',
        // 'utm_campaign',
        // 'utm_content',
        // 'utm_medium',
        // 'utm_source',
        // 'utm_term',
    ];
}
```

## File: Http/Requests/AssignInternRequest.php
```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AssignInternRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isAdmin();
    }

    public function rules(): array
    {
        return [
            'department_id' => 'required|exists:departments,id',
            'manager_id' => [
                'required',
                'exists:users,id',
                function ($attribute, $value, $fail) {
                    $user = \App\Models\User::find($value);
                    if (!$user || !$user->isManager()) {
                        $fail('The selected user must be a manager.');
                    }
                }
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'department_id.required' => 'Please select a department',
            'manager_id.required' => 'Please select a manager',
            'department_id.exists' => 'Selected department does not exist',
            'manager_id.exists' => 'Selected manager does not exist',
        ];
    }
}
```

## File: Http/Requests/ChangePasswordRequest.php
```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;

class ChangePasswordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // All authenticated users can change their password
    }

    public function rules(): array
    {
        return [
            'current_password' => [
                'required',
                function ($attribute, $value, $fail) {
                    if (!Hash::check($value, $this->user()->password)) {
                        $fail('The current password is incorrect.');
                    }
                }
            ],
            'new_password' => 'required|string|min:8|confirmed',
            'new_password_confirmation' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'new_password.min' => 'New password must be at least 8 characters',
            'new_password.confirmed' => 'Password confirmation does not match',
        ];
    }
}
```

## File: Http/Requests/GenerateReportRequest.php
```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GenerateReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isManager();
    }

    public function rules(): array
    {
        return [
            'type' => 'required|in:attendance,performance',
            'period_start' => 'required|date',
            'period_end' => 'required|date|after_or_equal:period_start',
        ];
    }

    public function messages(): array
    {
        return [
            'type.in' => 'Report type must be either attendance or performance',
            'period_end.after_or_equal' => 'End date must be after or equal to start date',
        ];
    }
}
```

## File: Http/Requests/LoginRequest.php
```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Everyone can attempt to login
    }

    public function rules(): array
    {
        return [
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string|min:6',
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'Email is required',
            'email.email' => 'Please enter a valid email address',
            'email.exists' => 'No account found with this email',
            'password.required' => 'Password is required',
            'password.min' => 'Password must be at least 6 characters',
        ];
    }
}
```

## File: Http/Requests/RespondReclamationRequest.php
```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RespondReclamationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isManager();
    }

    public function rules(): array
    {
        return [
            'response' => 'required|string|min:10',
            'status' => 'required|in:solved,archived',
        ];
    }

    public function messages(): array
    {
        return [
            'response.required' => 'Response is required',
            'response.min' => 'Response must be at least 10 characters',
            'status.in' => 'Status must be either solved or archived',
        ];
    }
}
```

## File: Http/Requests/SendNotificationRequest.php
```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SendNotificationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isManager();
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'message' => 'required|string',
            'recipient_ids' => [
                'required',
                'array',
                function ($attribute, $value, $fail) {
                    foreach ($value as $recipientId) {
                        $recipient = \App\Models\User::find($recipientId);
                        if (!$recipient || !$recipient->isIntern()) {
                            $fail('You can only send notifications to interns.');
                        }
                        if ($recipient->manager_id !== $this->user()->id) {
                            $fail('You can only send notifications to interns in your department.');
                        }
                    }
                }
            ],
            'recipient_ids.*' => 'exists:users,id',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Notification title is required',
            'message.required' => 'Notification message is required',
            'recipient_ids.required' => 'Please select at least one recipient',
            'recipient_ids.array' => 'Recipients must be an array',
        ];
    }
}
```

## File: Http/Requests/StoreAttendanceRequest.php
```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAttendanceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isManager();
    }

    public function rules(): array
    {
        $attendanceId = $this->route('attendance') ? $this->route('attendance')->id : null;

        return [
            'intern_id' => [
                'required',
                'exists:users,id',
                function ($attribute, $value, $fail) {
                    $intern = \App\Models\User::find($value);
                    if (!$intern || !$intern->isIntern()) {
                        $fail('You can only record attendance for interns.');
                    }
                    if ($intern->manager_id !== $this->user()->id) {
                        $fail('You can only record attendance for interns in your department.');
                    }
                }
            ],
            'attendance_date' => [
                'required',
                'date',
                'before_or_equal:today',
                Rule::unique('attendances')->where(function ($query) {
                    return $query->where('intern_id', $this->intern_id);
                })->ignore($attendanceId),
            ],
            'status' => 'required|in:present,absent,late,excused',
        ];
    }

    public function messages(): array
    {
        return [
            'intern_id.required' => 'Please select an intern',
            'attendance_date.required' => 'Attendance date is required',
            'attendance_date.before_or_equal' => 'Attendance date cannot be in the future',
            'attendance_date.unique' => 'Attendance already recorded for this intern on this date',
            'status.in' => 'Status must be: present, absent, late, or excused',
        ];
    }
}
```

## File: Http/Requests/StoreEvaluationRequest.php
```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEvaluationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isManager();
    }

    public function rules(): array
    {
        $evaluationId = $this->route('evaluation') ? $this->route('evaluation')->id : null;

        $rules = [
            'intern_id' => [
                $evaluationId ? 'sometimes' : 'required', // Required for create, optional for update
                'exists:users,id',
                function ($attribute, $value, $fail) {
                    $intern = \App\Models\User::find($value);
                    if (!$intern || !$intern->isIntern()) {
                        $fail('You can only evaluate interns.');
                    }
                    if ($intern->manager_id !== $this->user()->id) {
                        $fail('You can only evaluate interns in your department.');
                    }
                }
            ],
            'score' => 'required|numeric|min:0|max:100',
            'comments' => 'nullable|string',
            'evaluation_type' => $evaluationId ? 'sometimes|required' : 'required|in:mid_term,final,monthly,weekly,quarterly,project',
        ];

        return $rules;
    }

    public function messages(): array
    {
        return [
            'score.min' => 'Score cannot be less than 0',
            'score.max' => 'Score cannot be greater than 100',
            'evaluation_type.in' => 'Evaluation type must be: mid_term, final, monthly, weekly, quarterly, or project',
        ];
    }
}
```

## File: Http/Requests/StoreReclamationRequest.php
```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReclamationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isIntern();
    }

    public function rules(): array
    {
        return [
            'subject' => 'required|string|max:255',
            'description' => 'required|string|min:10',
        ];
    }

    public function messages(): array
    {
        return [
            'subject.required' => 'Subject is required',
            'description.required' => 'Description is required',
            'description.min' => 'Description must be at least 10 characters',
        ];
    }
}
```

## File: Http/Requests/StoreTaskRequest.php
```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isManager();
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'assigned_to' => [
                'required',
                'exists:users,id',
                function ($attribute, $value, $fail) {
                    $intern = \App\Models\User::find($value);
                    if (!$intern || !$intern->isIntern()) {
                        $fail('You can only assign tasks to interns.');
                    }
                    if ($intern->manager_id !== $this->user()->id) {
                        $fail('You can only assign tasks to interns in your department.');
                    }
                }
            ],
            'priority' => 'required|in:low,medium,high,urgent',
            'deadline' => 'required|date|after:today',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Task title is required',
            'description.required' => 'Task description is required',
            'assigned_to.required' => 'Please select an intern to assign the task',
            'deadline.after' => 'Deadline must be a future date',
            'priority.in' => 'Priority must be: low, medium, high, or urgent',
        ];
    }
}
```

## File: Http/Requests/StoreUserRequest.php
```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isAdmin();
    }

    public function rules(): array
    {
        $userId = $this->route('user') ? $this->route('user')->id : null;

        $rules = [
            'name' => 'sometimes|required|string|max:255',
            'email' => [
                'sometimes',
                'required',
                'email',
                'max:255',
                Rule::unique('users')->ignore($userId),
            ],
            'password' => $userId ? 'sometimes|nullable|min:8' : 'required|min:8',
            'role' => 'sometimes|required|in:admin,manager,intern',
            'department_id' => 'nullable|exists:departments,id',
            'manager_id' => [
                'nullable',
                'exists:users,id',
                function ($attribute, $value, $fail) {
                    if ($value && !\App\Models\User::find($value)->isManager()) {
                        $fail('The selected manager must have a manager role.');
                    }
                }
            ],
        ];

        return $rules;
    }

    public function messages(): array
    {
        return [
            'role.in' => 'Role must be one of: admin, manager, intern',
            'department_id.exists' => 'Selected department does not exist',
            'manager_id.exists' => 'Selected manager does not exist',
        ];
    }
}
```

## File: Http/Requests/UpdateAttendanceRequest.php
```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAttendanceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isManager();
    }

    public function rules(): array
    {
        return [
            'status' => 'required|in:present,absent,late,excused',
        ];
    }

    public function messages(): array
    {
        return [
            'status.in' => 'Status must be: present, absent, late, or excused',
        ];
    }
}
```

## File: Http/Requests/UpdateProfileRequest.php
```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // All authenticated users can update their profile
    }

    public function rules(): array
    {
        $userId = $this->user()->id;

        return [
            'name' => 'sometimes|required|string|max:255',
            'email' => [
                'sometimes',
                'required',
                'email',
                'max:255',
                'unique:users,email,' . $userId,
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Name is required',
            'email.required' => 'Email is required',
            'email.email' => 'Please enter a valid email address',
            'email.unique' => 'This email is already taken',
        ];
    }
}
```

## File: Http/Requests/UpdateTaskRequest.php
```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->isManager();
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'priority' => 'sometimes|required|in:low,medium,high,urgent',
            'deadline' => [
                'sometimes',
                'required',
                'date',
                function ($attribute, $value, $fail) {
                    if (strtotime($value) <= strtotime('today')) {
                        $fail('The deadline must be a future date.');
                    }
                }
            ],
            'status' => 'sometimes|required|in:pending,in_progress,completed,cancelled'
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Task title is required',
            'description.required' => 'Task description is required',
            'deadline.after' => 'Deadline must be a future date',
            'priority.in' => 'Priority must be: low, medium, high, or urgent',
            'status.in' => 'Status must be: pending, in_progress, completed, or cancelled',
        ];
    }
}
```

## File: Models/Attendance.php
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attendance extends Model
{
    protected $fillable = [
        'intern_id',
        'recorded_by',
        'attendance_date',
        'status',
        'recorded_at',
    ];

    protected $casts = [
        'attendance_date' => 'date',
        'recorded_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function intern(): BelongsTo
    {
        return $this->belongsTo(User::class, 'intern_id');
    }

    public function recordedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'recorded_by');
    }
}
```

## File: Models/Department.php
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Department extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'manager_id',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public function manager(): BelongsTo
    {
        return $this->belongsTo(User::class, 'manager_id');
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function interns(): HasMany
    {
        return $this->hasMany(User::class)->where('role', 'intern');
    }

    public function managers(): HasMany
    {
        return $this->hasMany(User::class)->where('role', 'manager');
    }

    public function reports(): HasMany
    {
        return $this->hasMany(Report::class);
    }
}
```

## File: Models/Evaluation.php
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Evaluation extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'intern_id',
        'manager_id',
        'score',
        'comments',
        'evaluation_type',
        'evaluated_at',
    ];

    protected $casts = [
        'score' => 'decimal:2',
        'evaluated_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public function intern(): BelongsTo
    {
        return $this->belongsTo(User::class, 'intern_id');
    }

    public function manager(): BelongsTo
    {
        return $this->belongsTo(User::class, 'manager_id');
    }
}
```

## File: Models/Notification.php
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Notification extends Model
{
    protected $fillable = [
        'sender_id',
        'title',
        'message',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function recipients(): HasMany
    {
        return $this->hasMany(NotificationRecipient::class);
    }
}
```

## File: Models/NotificationRecipient.php
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NotificationRecipient extends Model
{
    protected $fillable = [
        'notification_id',
        'recipient_id',
        'is_read',
        'read_at',
        'is_archived',
    ];

    protected $casts = [
        'is_read' => 'boolean',
        'read_at' => 'datetime',
        'is_archived' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function notification(): BelongsTo
    {
        return $this->belongsTo(Notification::class);
    }

    public function recipient(): BelongsTo
    {
        return $this->belongsTo(User::class, 'recipient_id');
    }
}
```

## File: Models/Reclamation.php
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reclamation extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'intern_id',
        'manager_id',
        'subject',
        'description',
        'status',
        'response',
        'resolved_at',
        'responded_at',
    ];

    protected $casts = [
        'resolved_at' => 'datetime',
        'responded_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public function intern(): BelongsTo
    {
        return $this->belongsTo(User::class, 'intern_id');
    }

    public function manager(): BelongsTo
    {
        return $this->belongsTo(User::class, 'manager_id');
    }
}
```

## File: Models/Report.php
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Report extends Model
{
    protected $fillable = [
        'type',
        'period_start',
        'period_end',
        'department_id',
        'data',
        'generated_by',
        'sent_to_admin',
    ];

    protected $casts = [
        'period_start' => 'date',
        'period_end' => 'date',
        'data' => 'array',
        'sent_to_admin' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function generatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'generated_by');
    }
}
```

## File: Models/Task.php
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'status',
        'priority',
        'assigned_by',
        'assigned_to',
        'deadline',
    ];

    protected $casts = [
        'deadline' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public function assignedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_by');
    }

    public function assignedTo(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}
```

## File: Models/User.php
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'department_id',
        'manager_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function manager(): BelongsTo
    {
        return $this->belongsTo(User::class, 'manager_id');
    }

    public function interns(): HasMany
    {
        return $this->hasMany(User::class, 'manager_id')->where('role', 'intern');
    }

    public function tasksAssigned(): HasMany
    {
        return $this->hasMany(Task::class, 'assigned_by');
    }

    public function tasksReceived(): HasMany
    {
        return $this->hasMany(Task::class, 'assigned_to');
    }

    public function attendances(): HasMany
    {
        return $this->hasMany(Attendance::class, 'intern_id');
    }

    public function evaluationsReceived(): HasMany
    {
        return $this->hasMany(Evaluation::class, 'intern_id');
    }

    public function evaluationsGiven(): HasMany
    {
        return $this->hasMany(Evaluation::class, 'manager_id');
    }

    public function reclamationsSent(): HasMany
    {
        return $this->hasMany(Reclamation::class, 'intern_id');
    }

    public function reclamationsReceived(): HasMany
    {
        return $this->hasMany(Reclamation::class, 'manager_id');
    }

    public function notificationsSent(): HasMany
    {
        return $this->hasMany(Notification::class, 'sender_id');
    }

    public function notificationRecipients(): HasMany
    {
        return $this->hasMany(NotificationRecipient::class, 'recipient_id');
    }

    public function reportsGenerated(): HasMany
    {
        return $this->hasMany(Report::class, 'generated_by');
    }

    // Helper methods from your class diagram
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isManager(): bool
    {
        return $this->role === 'manager';
    }

    public function isIntern(): bool
    {
        return $this->role === 'intern';
    }

    public function hasRole(string $role): bool
    {
        return $this->role === $role;
    }

    public function isAlreadyAssigned(): bool
    {
        return $this->isIntern() && 
               !is_null($this->department_id) && 
               !is_null($this->manager_id);
    }

    public function validateDepartmentMembership(User $manager): bool
    {
        return $this->department_id === $manager->department_id;
    }
}
```

## File: Providers/AppServiceProvider.php
```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}

```

