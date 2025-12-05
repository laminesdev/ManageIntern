// src/services/dashboardService.ts
import api from './api';
import type { DashboardStats } from '@/types';

class DashboardService {
  async getAdminDashboard(): Promise<DashboardStats> {
    try {
      const response = await api.get('/dashboard');
      return response.data;
    } catch (error: any) {
      console.error('Dashboard error:', error);
      throw error;
    }
  }

  async getManagerDashboard(): Promise<DashboardStats> {
    try {
      const response = await api.get('/dashboard');
      return response.data;
    } catch (error: any) {
      console.error('Dashboard error:', error);
      throw error;
    }
  }

  async getInternDashboard(): Promise<DashboardStats> {
    try {
      const response = await api.get('/dashboard');
      return response.data;
    } catch (error: any) {
      console.error('Dashboard error:', error);
      throw error;
    }
  }
}

export const dashboardService = new DashboardService();