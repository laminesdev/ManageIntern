import { create } from "zustand";
import type {
   Evaluation,
   EvaluationStatistics,
   EvaluationStoreState,
} from "@/types";

interface EvaluationStoreActions {
   // Actions
   setEvaluations: (evaluations: Evaluation[]) => void;
   setSelectedEvaluation: (evaluation: Evaluation | null) => void;
   setStatistics: (stats: EvaluationStatistics) => void;
   setLoading: (loading: boolean) => void;
   setError: (error: string | null) => void;
   setFilters: (filters: Partial<EvaluationStoreState["filters"]>) => void;
   resetFilters: () => void;

   // Evaluation operations
   addEvaluation: (evaluation: Evaluation) => void;
   updateEvaluation: (id: number, updates: Partial<Evaluation>) => void;
   deleteEvaluation: (id: number) => void;
}

export const useEvaluationStore = create<
   EvaluationStoreState & EvaluationStoreActions
>((set, get) => ({
   // Initial state
   evaluations: [],
   selectedEvaluation: null,
   statistics: null,
   isLoading: false,
   error: null,
   filters: {},

   // Actions
   setEvaluations: (evaluations) => set({ evaluations }),

   setSelectedEvaluation: (evaluation) =>
      set({ selectedEvaluation: evaluation }),

   setStatistics: (statistics) => set({ statistics }),

   setLoading: (loading) => set({ isLoading: loading }),

   setError: (error) => set({ error }),

   setFilters: (filters) =>
      set((state) => ({
         filters: { ...state.filters, ...filters },
      })),

   resetFilters: () => set({ filters: {} }),

   // Evaluation operations
   addEvaluation: (evaluation) =>
      set((state) => {
         const updatedEvaluations = [evaluation, ...state.evaluations];

         // Update statistics
         let newStats = state.statistics;
         if (state.statistics) {
            newStats = {
               total: state.statistics.total + 1,
               average_score: Math.round(
                  (state.statistics.average_score * state.statistics.total +
                     evaluation.score) /
                     (state.statistics.total + 1)
               ),
               by_type: {
                  ...state.statistics.by_type,
                  [evaluation.evaluation_type]:
                     (state.statistics.by_type[evaluation.evaluation_type] ||
                        0) + 1,
               },
            };
         }

         return {
            evaluations: updatedEvaluations,
            statistics: newStats,
         };
      }),

   updateEvaluation: (id, updates) =>
      set((state) => {
         const updatedEvaluations = state.evaluations.map((evaluation) =>
            evaluation.id === id ? { ...evaluation, ...updates } : evaluation
         );

         // Update statistics if score changed
         let newStats = state.statistics;
         if (updates.score !== undefined && state.statistics) {
            const oldEvaluation = state.evaluations.find((e) => e.id === id);
            if (oldEvaluation) {
               const totalScore =
                  state.statistics.average_score * state.statistics.total;
               const newTotalScore =
                  totalScore - oldEvaluation.score + updates.score;
               newStats = {
                  ...state.statistics,
                  average_score: Math.round(
                     newTotalScore / state.statistics.total
                  ),
               };
            }
         }

         return {
            evaluations: updatedEvaluations,
            selectedEvaluation:
               state.selectedEvaluation?.id === id
                  ? { ...state.selectedEvaluation, ...updates }
                  : state.selectedEvaluation,
            statistics: newStats,
         };
      }),

   deleteEvaluation: (id) =>
      set((state) => {
         const evaluationToDelete = state.evaluations.find((e) => e.id === id);
         const updatedEvaluations = state.evaluations.filter(
            (e) => e.id !== id
         );

         // Update statistics
         let newStats = state.statistics;
         if (
            evaluationToDelete &&
            state.statistics &&
            state.statistics.total > 1
         ) {
            const totalScore =
               state.statistics.average_score * state.statistics.total;
            const newTotalScore = totalScore - evaluationToDelete.score;
            newStats = {
               total: state.statistics.total - 1,
               average_score: Math.round(
                  newTotalScore / (state.statistics.total - 1)
               ),
               by_type: {
                  ...state.statistics.by_type,
                  [evaluationToDelete.evaluation_type]: Math.max(
                     0,
                     (state.statistics.by_type[
                        evaluationToDelete.evaluation_type
                     ] || 0) - 1
                  ),
               },
            };
         } else if (state.statistics?.total === 1) {
            newStats = { total: 0, average_score: 0, by_type: {} };
         }

         return {
            evaluations: updatedEvaluations,
            selectedEvaluation:
               state.selectedEvaluation?.id === id
                  ? null
                  : state.selectedEvaluation,
            statistics: newStats,
         };
      }),

   // Computed properties
   get recentEvaluations() {
      return get().evaluations.slice(0, 10); // Last 10 evaluations
   },

   get averageScore() {
      const evaluations = get().evaluations;
      if (evaluations.length === 0) return 0;

      const total = evaluations.reduce(
         (sum, evalItem) => sum + evalItem.score,
         0
      );
      return Math.round(total / evaluations.length);
   },
}));
