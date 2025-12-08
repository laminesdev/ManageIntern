// src/types/department.types.ts
export interface Department {
   id: number;
   name: string;
   description?: string;
   manager_id: number;
   created_at?: string;
   updated_at?: string;
   deleted_at?: string;
   manager?: {
      id: number;
      name: string;
      email: string;
   };
   users?: any[];
   interns?: any[];
   managers?: any[];
   interns_count?: number;
}
