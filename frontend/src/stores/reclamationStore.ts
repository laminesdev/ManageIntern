import { create } from 'zustand';
import type { 
  Reclamation, 
  ReclamationStatistics, 
  ReclamationStoreState 
} from '@/types';

interface ReclamationStoreActions {
  // Actions
  setReclamations: (reclamations: Reclamation[]) => void;
  setSelectedReclamation: (reclamation: Reclamation | null) => void;
  setStatistics: (stats: ReclamationStatistics) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilters: (filters: Partial<ReclamationStoreState['filters']>) => void;
  resetFilters: () => void;
  
  // Reclamation operations
  addReclamation: (reclamation: Reclamation) => void;
  updateReclamation: (id: number, updates: Partial<Reclamation>) => void;
  deleteReclamation: (id: number) => void;
  
  // Helper method
  getReclamationsByUserId: (userId: number, userRole: 'admin' | 'manager' | 'intern') => Reclamation[];
}

export const useReclamationStore = create<ReclamationStoreState & ReclamationStoreActions>((set, get) => ({
  // Initial state
  reclamations: [],
  selectedReclamation: null,
  statistics: null,
  isLoading: false,
  error: null,
  filters: {},

  // Actions
  setReclamations: (reclamations) => set({ reclamations }),
  
  setSelectedReclamation: (reclamation) => set({ selectedReclamation: reclamation }),
  
  setStatistics: (statistics) => set({ statistics }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  
  resetFilters: () => set({ filters: {} }),

  // Reclamation operations
  addReclamation: (reclamation) =>
    set((state) => ({
      reclamations: [reclamation, ...state.reclamations],
      statistics: state.statistics
        ? {
            ...state.statistics,
            total: state.statistics.total + 1,
            pending: state.statistics.pending + 1,
          }
        : null,
    })),

  updateReclamation: (id, updates) =>
    set((state) => {
      const updatedReclamations = state.reclamations.map((reclamation) =>
        reclamation.id === id ? { ...reclamation, ...updates } : reclamation
      );
      
      // Update statistics if status changed
      let newStats = state.statistics;
      if (updates.status && state.statistics) {
        const oldReclamation = state.reclamations.find((r) => r.id === id);
        if (oldReclamation) {
          newStats = { ...state.statistics };
          
          // Decrement old status
          if (oldReclamation.status === 'pending') newStats.pending--;
          if (oldReclamation.status === 'in_review') newStats.in_review--;
          if (oldReclamation.status === 'solved') newStats.solved--;
          if (oldReclamation.status === 'archived') newStats.archived--;
          
          // Increment new status
          if (updates.status === 'pending') newStats.pending++;
          if (updates.status === 'in_review') newStats.in_review++;
          if (updates.status === 'solved') newStats.solved++;
          if (updates.status === 'archived') newStats.archived++;
        }
      }

      return {
        reclamations: updatedReclamations,
        selectedReclamation:
          state.selectedReclamation?.id === id
            ? { ...state.selectedReclamation, ...updates }
            : state.selectedReclamation,
        statistics: newStats,
      };
    }),

  deleteReclamation: (id) =>
    set((state) => {
      const reclamationToDelete = state.reclamations.find((r) => r.id === id);
      const updatedReclamations = state.reclamations.filter((r) => r.id !== id);
      
      // Update statistics
      let newStats = state.statistics;
      if (reclamationToDelete && state.statistics) {
        newStats = { ...state.statistics, total: state.statistics.total - 1 };
        
        if (reclamationToDelete.status === 'pending') newStats.pending--;
        if (reclamationToDelete.status === 'in_review') newStats.in_review--;
        if (reclamationToDelete.status === 'solved') newStats.solved--;
        if (reclamationToDelete.status === 'archived') newStats.archived--;
      }

      return {
        reclamations: updatedReclamations,
        selectedReclamation: state.selectedReclamation?.id === id ? null : state.selectedReclamation,
        statistics: newStats,
      };
    }),

  // Helper method instead of computed property
  getReclamationsByUserId: (userId: number, userRole: 'admin' | 'manager' | 'intern') => {
    const reclamations = get().reclamations;
    
    if (userRole === 'intern') {
      return reclamations.filter((reclamation) => reclamation.intern_id === userId);
    }
    
    // For managers, show reclamations assigned to them
    if (userRole === 'manager') {
      return reclamations.filter((reclamation) => reclamation.manager_id === userId);
    }
    
    // Admin can see all
    return reclamations;
  },

  // Computed properties (no auth dependency)
  get pendingReclamations() {
    return get().reclamations.filter((reclamation) => reclamation.status === 'pending');
  },
}));