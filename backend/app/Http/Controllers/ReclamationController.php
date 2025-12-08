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
        
        // Check if intern is assigned to a manager
        if (!$user->manager_id) {
            return response()->json([
                'message' => 'You must be assigned to a department and manager before submitting a reclamation.'
            ], 422);
        }
        
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
