import { useAuthStore, useAuthComputed } from '@/stores/authStore';
import { useTaskStore } from '@/stores/taskStore';
import { useAttendanceStore } from '@/stores/attendanceStore';
import { useEvaluationStore } from '@/stores/evaluationStore';
import { useReclamationStore } from '@/stores/reclamationStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { useDashboardStore } from '@/stores/dashboardStore';

export const useStore = () => {
  const auth = useAuthStore();
  const authComputed = useAuthComputed();
  const tasks = useTaskStore();
  const attendance = useAttendanceStore();
  const evaluations = useEvaluationStore();
  const reclamations = useReclamationStore();
  const notifications = useNotificationStore();
  const dashboard = useDashboardStore();

  return {
    auth,
    authComputed,
    tasks,
    attendance,
    evaluations,
    reclamations,
    notifications,
    dashboard,
  };
};