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