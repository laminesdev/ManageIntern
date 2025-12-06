import api from './api';

export const userService = {
  // Get all users (Admin only)
  getUsers: async (params: any = {}): Promise<any> => {
    const response = await api.get('/users', { params });
    return response.data;
  },

  // Create user (Admin only)
  createUser: async (data: any): Promise<any> => {
    const response = await api.post('/users', data);
    return response.data;
  },

  // Get user details (Admin only)
  getUser: async (id: number): Promise<any> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Update user (Admin only)
  updateUser: async (id: number, data: any): Promise<any> => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  // Delete user (Admin only)
  deleteUser: async (id: number): Promise<any> => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  // Soft delete user (Admin only)
  softDeleteUser: async (id: number): Promise<any> => {
    const response = await api.delete(`/users/${id}/soft-delete`);
    return response.data;
  },

  // Restore user (Admin only)
  restoreUser: async (id: number): Promise<any> => {
    const response = await api.post(`/users/${id}/restore`);
    return response.data;
  },

  // Get managers list
  getManagers: async (): Promise<any> => {
    const response = await api.get('/managers');
    return response.data;
  },

  // Get interns list
  getInterns: async (params: any = {}): Promise<any> => {
    const response = await api.get('/interns', { params });
    return response.data;
  },

  // Get unassigned interns
  getUnassignedInterns: async (): Promise<any> => {
    const response = await api.get('/unassigned-interns');
    return response.data;
  },

  // Assign intern (Admin only)
  assignIntern: async (id: number, data: any): Promise<any> => {
    const response = await api.post(`/users/${id}/assign`, data);
    return response.data;
  }
};