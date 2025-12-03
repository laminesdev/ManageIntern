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