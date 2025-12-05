import { useAuthStore } from '@/stores/authStore';
import { useReclamationStore } from '@/stores/reclamationStore';

export const useReclamationFilters = () => {
  const { user } = useAuthStore();
  const { getReclamationsByUserId } = useReclamationStore();
  
  const getMyReclamations = () => {
    if (!user) return [];
    return getReclamationsByUserId(user.id, user.role);
  };
  
  return {
    getMyReclamations,
  };
};