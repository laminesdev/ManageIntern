import { create } from "zustand";
import type { Task, TaskStatistics, TaskStoreState } from "@/types";
import { isPastDate } from "@/utils/date/formatters";

interface TaskStoreActions {
   // Actions
   setTasks: (tasks: Task[]) => void;
   setSelectedTask: (task: Task | null) => void;
   setStatistics: (stats: TaskStatistics) => void;
   setLoading: (loading: boolean) => void;
   setError: (error: string | null) => void;
   setPagination: (pagination: Partial<TaskStoreState["pagination"]>) => void;
   setFilters: (filters: Partial<TaskStoreState["filters"]>) => void;
   setSort: (sort: Partial<TaskStoreState["sort"]>) => void;
   resetFilters: () => void;

   // Task operations
   addTask: (task: Task) => void;
   updateTask: (id: number, updates: Partial<Task>) => void;
   deleteTask: (id: number) => void;

   // Helper methods
   getPendingTasks: () => Task[];
   getInProgressTasks: () => Task[];
   getCompletedTasks: () => Task[];
   getOverdueTasks: () => Task[];
}

export const useTaskStore = create<TaskStoreState & TaskStoreActions>(
   (set, get) => ({
      // Initial state
      tasks: [],
      selectedTask: null,
      statistics: null,
      isLoading: false,
      error: null,
      pagination: {
         currentPage: 1,
         totalPages: 1,
         totalItems: 0,
         perPage: 15,
      },
      filters: {},
      sort: {
         field: "created_at",
         order: "desc",
      },

      // Actions
      setTasks: (tasks) => set({ tasks }),

      setSelectedTask: (task) => set({ selectedTask: task }),

      setStatistics: (statistics) => set({ statistics }),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      setPagination: (pagination) =>
         set((state) => ({
            pagination: { ...state.pagination, ...pagination },
         })),

      setFilters: (filters) =>
         set((state) => ({
            filters: { ...state.filters, ...filters },
            pagination: { ...state.pagination, currentPage: 1 },
         })),

      setSort: (sort) =>
         set((state) => ({
            sort: { ...state.sort, ...sort },
         })),

      resetFilters: () =>
         set({
            filters: {},
            sort: { field: "created_at", order: "desc" },
            pagination: {
               currentPage: 1,
               totalPages: 1,
               totalItems: 0,
               perPage: 15,
            },
         }),

      // Task operations
      addTask: (task) =>
         set((state) => ({
            tasks: [task, ...state.tasks],
            statistics: state.statistics
               ? {
                    ...state.statistics,
                    total: state.statistics.total + 1,
                    pending: state.statistics.pending + 1,
                 }
               : null,
         })),

      updateTask: (id, updates) =>
         set((state) => {
            const updatedTasks = state.tasks.map((task) =>
               task.id === id ? { ...task, ...updates } : task
            );

            // Update statistics if status changed
            let newStats = state.statistics;
            if (updates.status && state.statistics) {
               const oldTask = state.tasks.find((t) => t.id === id);
               if (oldTask) {
                  newStats = { ...state.statistics };

                  // Decrement old status
                  if (oldTask.status === "pending") newStats.pending--;
                  if (oldTask.status === "in_progress") newStats.in_progress--;
                  if (oldTask.status === "completed") newStats.completed--;
                  if (oldTask.status === "cancelled") newStats.cancelled--;

                  // Increment new status
                  if (updates.status === "pending") newStats.pending++;
                  if (updates.status === "in_progress") newStats.in_progress++;
                  if (updates.status === "completed") newStats.completed++;
                  if (updates.status === "cancelled") newStats.cancelled++;
               }
            }

            return {
               tasks: updatedTasks,
               selectedTask:
                  state.selectedTask?.id === id
                     ? { ...state.selectedTask, ...updates }
                     : state.selectedTask,
               statistics: newStats,
            };
         }),

      deleteTask: (id) =>
         set((state) => {
            const taskToDelete = state.tasks.find((task) => task.id === id);
            const updatedTasks = state.tasks.filter((task) => task.id !== id);

            // Update statistics
            let newStats = state.statistics;
            if (taskToDelete && state.statistics) {
               newStats = {
                  ...state.statistics,
                  total: state.statistics.total - 1,
               };

               if (taskToDelete.status === "pending") newStats.pending--;
               if (taskToDelete.status === "in_progress")
                  newStats.in_progress--;
               if (taskToDelete.status === "completed") newStats.completed--;
               if (taskToDelete.status === "cancelled") newStats.cancelled--;
            }

            return {
               tasks: updatedTasks,
               selectedTask:
                  state.selectedTask?.id === id ? null : state.selectedTask,
               statistics: newStats,
            };
         }),

      // Helper methods instead of computed properties
      getPendingTasks: () => {
         return get().tasks.filter((task) => task.status === "pending");
      },

      getInProgressTasks: () => {
         return get().tasks.filter((task) => task.status === "in_progress");
      },

      getCompletedTasks: () => {
         return get().tasks.filter((task) => task.status === "completed");
      },

      getOverdueTasks: () => {
         const now = new Date();
         return get().tasks.filter(
            (task) => task.status !== "completed" && isPastDate(task.deadline)
         );
      },
   })
);
