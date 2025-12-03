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
Route::get('/test', function () {
    return response()->json([
        'message' => 'Test endpoint works',
        'hash_test' => \Illuminate\Support\Facades\Hash::check('test', 'hashed') // Test Hash facade
    ]);
});

use Illuminate\Support\Facades\Hash;

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
        
        // Reports (admin view)
        Route::get('/reports', [ReportController::class, 'index']);
        Route::get('/reports/{report}', [ReportController::class, 'show']);
    });
    
    // ========== MANAGER ROUTES ==========
    Route::middleware(['role:manager'])->group(function () {
        // Tasks
        Route::apiResource('tasks', TaskController::class);
        Route::put('/tasks/{task}/status', [TaskController::class, 'updateStatus']);
        
        // Attendance
        Route::apiResource('attendances', AttendanceController::class);
        Route::get('/attendances/intern/{intern}', [AttendanceController::class, 'getInternAttendance']);
        
        // Evaluations
        Route::apiResource('evaluations', EvaluationController::class);
        Route::get('/evaluations/intern/{intern}', [EvaluationController::class, 'getInternEvaluations']);
        
        // Reclamations
        Route::apiResource('reclamations', ReclamationController::class)->except(['store']);
        Route::put('/reclamations/{reclamation}/respond', [ReclamationController::class, 'respond']);
        Route::put('/reclamations/{reclamation}/status', [ReclamationController::class, 'updateStatus']);
        
        // Notifications
        Route::apiResource('notifications', NotificationController::class);
        Route::post('/notifications/bulk', [NotificationController::class, 'sendBulk']);
        
        // Reports (generation)
        Route::post('/reports/generate', [ReportController::class, 'generate']);
        Route::post('/reports/{report}/send-to-admin', [ReportController::class, 'sendToAdmin']);
    });
    
    // ========== INTERN ROUTES ==========
    Route::middleware(['role:intern'])->group(function () {
        // Tasks (read-only)
        Route::get('/my-tasks', [TaskController::class, 'myTasks']);
        Route::get('/my-tasks/{task}', [TaskController::class, 'show']);
        Route::put('/my-tasks/{task}/status', [TaskController::class, 'updateTaskStatus']);
        
        // Evaluations (read-only)
        Route::get('/my-evaluations', [EvaluationController::class, 'myEvaluations']);
        
        // Reclamations (create only)
        Route::post('/reclamations', [ReclamationController::class, 'store']);
        Route::get('/my-reclamations', [ReclamationController::class, 'myReclamations']);
        
        // Notifications
        Route::get('/my-notifications', [NotificationController::class, 'myNotifications']);
        Route::put('/my-notifications/{notification}/mark-read', [NotificationController::class, 'markAsRead']);
        Route::put('/my-notifications/{notification}/archive', [NotificationController::class, 'archive']);
    });
});