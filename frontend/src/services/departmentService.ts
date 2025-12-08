// src/services/departmentService.ts
import api from "./api";
import { Department } from "@/types/department.types";

export interface DepartmentFormData {
   name: string;
   description?: string;
   manager_id: number;
}

export const departmentService = {
   // Get all departments
   getDepartments: async (): Promise<Department[]> => {
      const response = await api.get("/departments");
      return response.data;
   },

   // Get department by ID
   getDepartment: async (id: number): Promise<Department> => {
      const response = await api.get(`/departments/${id}`);
      return response.data;
   },

   // Create new department
   createDepartment: async (data: DepartmentFormData): Promise<Department> => {
      const response = await api.post("/departments", data);
      return response.data.department;
   },

   // Update department
   updateDepartment: async (
      id: number,
      data: Partial<DepartmentFormData>
   ): Promise<Department> => {
      const response = await api.put(`/departments/${id}`, data);
      return response.data.department;
   },

   // Delete department
   deleteDepartment: async (id: number): Promise<void> => {
      await api.delete(`/departments/${id}`);
   },

   // Get managers for a specific department
   getDepartmentManagers: async (departmentId: number): Promise<any[]> => {
      const response = await api.get(`/departments/${departmentId}/managers`);
      return response.data;
   },
};
