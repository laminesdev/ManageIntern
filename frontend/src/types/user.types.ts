export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: "admin" | "manager" | "intern";
  department_id?: number;
  manager_id?: number;
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {}

export interface AssignInternRequest {
  department_id: number;
  manager_id: number;
}