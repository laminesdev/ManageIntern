<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\EvaluationController;
use App\Http\Controllers\ReclamationController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\DashboardController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Test routes (can remove in production)
Route::get('/test', function () {
    return response()->json([
        'message' => 'Test endpoint works',
        'hash_test' => \Illuminate\Support\Facades\Hash::check('test', 'hashed')
    ]);
});

Route::get('/debug-hash', function () {
    return response()->json([
        'hash_test' => Hash::make('test123'),
        'hash_check' => Hash::check('test123', Hash::make('test123')),
        'env' => app()->environment(),
        'debug' => config('app.debug'),
    ]);
});

// Protected routes (require authentication)
Route::middleware(['auth:sanctum'])->group(function () {
    
    // Common routes for all authenticated users
    Route::get('/user', [AuthController::class, 'getCurrentUser']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::put('/change-password', [AuthController::class, 'changePassword']);
    
    // Dashboard data
    Route::get('/dashboard', [DashboardController::class, 'index']);
    
    // ========== ADMIN ROUTES ==========
    Route::middleware(['role:admin'])->group(function () {
        // User management
        Route::apiResource('users', UserController::class);
        Route::post('/users/{user}/assign', [UserController::class, 'assignIntern']);
        Route::delete('/users/{user}/soft-delete', [UserController::class, 'softDelete']);
        Route::post('/users/{user}/restore', [UserController::class, 'restore']);
        
        // Get lists for dropdowns
        Route::get('/managers', [UserController::class, 'getManagers']);
        Route::get('/interns', [UserController::class, 'getInterns']);
        Route::get('/unassigned-interns', [UserController::class, 'getInterns']);
        
        // Reports (admin view)
        Route::apiResource('reports', ReportController::class)->only(['index', 'show']);
        Route::get('/reports/statistics', [ReportController::class, 'getStatistics']);
    });
    
    // ========== MANAGER ROUTES ==========
    Route::middleware(['role:manager'])->group(function () {
        // Tasks
        Route::apiResource('tasks', TaskController::class);
        Route::put('/tasks/{task}/status', [TaskController::class, 'updateStatus']);
        Route::get('/tasks/statistics', [TaskController::class, 'getStatistics']);
        Route::get('/interns-for-tasks', [TaskController::class, 'getInternsForAssignment']);
        
        // Attendance
        Route::apiResource('attendances', AttendanceController::class);
        Route::get('/attendance/statistics', [AttendanceController::class, 'getStatistics']);
        Route::get('/interns-for-attendance', [AttendanceController::class, 'getInternsForAttendance']);
        
        // Evaluations
        Route::apiResource('evaluations', EvaluationController::class);
        Route::get('/evaluations/statistics', [EvaluationController::class, 'getStatistics']);
        Route::get('/interns-for-evaluation', [EvaluationController::class, 'getInternsForEvaluation']);
        
        // Reclamations
        Route::apiResource('reclamations', ReclamationController::class)->except(['store']);
        Route::put('/reclamations/{reclamation}/respond', [ReclamationController::class, 'update']);
        Route::put('/reclamations/{reclamation}/status', [ReclamationController::class, 'updateStatus']);
        Route::get('/reclamations/statistics', [ReclamationController::class, 'getStatistics']);
        
        // Notifications
        Route::apiResource('notifications', NotificationController::class);
        Route::get('/notifications/interns', [NotificationController::class, 'getInternsForNotification']);
        Route::post('/notifications/send', [NotificationController::class, 'store']);
        
        // Reports
        Route::post('/reports/generate', [ReportController::class, 'generate']);
        Route::post('/reports/{report}/send-to-admin', [ReportController::class, 'sendToAdmin']);
        Route::get('/reports/statistics', [ReportController::class, 'getStatistics']);
    });
    
    // ========== INTERN ROUTES ==========
    Route::middleware(['role:intern'])->group(function () {
        // Tasks
        Route::get('/my-tasks', [TaskController::class, 'myTasks']);
        Route::get('/my-tasks/{task}', [TaskController::class, 'show']);
        Route::put('/my-tasks/{task}/status', [TaskController::class, 'updateStatus']);
        
        // Evaluations
        Route::get('/my-evaluations', [EvaluationController::class, 'index']);
        Route::get('/my-evaluations/{evaluation}', [EvaluationController::class, 'show']);
        Route::get('/my-evaluations/statistics', [EvaluationController::class, 'getStatistics']);
        
        // Reclamations
        Route::apiResource('reclamations', ReclamationController::class)->only(['store', 'index', 'show', 'destroy']);
        Route::get('/my-reclamations', [ReclamationController::class, 'myReclamations']);
        Route::get('/reclamations/statistics', [ReclamationController::class, 'getStatistics']);
        
        // Notifications
        Route::get('/my-notifications', [NotificationController::class, 'index']);
        Route::get('/my-notifications/{notification}', [NotificationController::class, 'show']);
        Route::put('/my-notifications/{notification}', [NotificationController::class, 'update']);
        Route::delete('/my-notifications/{notification}', [NotificationController::class, 'destroy']);
        Route::post('/my-notifications/mark-all-read', [NotificationController::class, 'markAllAsRead']);
        
        // Attendance
        Route::get('/my-attendance', [AttendanceController::class, 'index']);
        Route::get('/my-attendance/{attendance}', [AttendanceController::class, 'show']);
        Route::get('/my-attendance/statistics', [AttendanceController::class, 'getStatistics']);
    });
});