import { axiosPublic } from "../config/axiosClient";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  username: string;
  confirmPassword: string;
}

export interface ResetPasswordData {
  password: string;
  confirmPassword: string;
  code: string;
}

export interface AuthResponse {
  _id?: string;
  email: string;
  username: string;
  avatar?: string;
  password: string;
  verified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  message?: string;
}

export interface Task {
  _id?: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export const register = async (data: RegisterData) =>
  axiosPublic.post<AuthResponse>("/auth/register", data);

export const login = async (data: LoginData) =>
  axiosPublic.post<AuthResponse>("/auth/login", data);

export const logout = async () =>
  axiosPublic.get<{ message: string }>("/auth/logout");

export const verifyEmail = async (code: string) =>
  axiosPublic.get<AuthResponse>(`/auth/verify-email/${code}`);

export const forgotPassword = async (email: string) =>
  axiosPublic.post<{ message: string }>(`/auth/forgot-password`, { email });

export const resetPassword = async (data: ResetPasswordData) =>
  axiosPublic.put<AuthResponse>(`/auth/reset-password`, data);

export const getUser = async (): Promise<AuthResponse> =>
  axiosPublic.get("/user");

export const getAllTasks = async (): Promise<Task[]> =>
  axiosPublic.get("/task/all-tasks");

export const getTask = async (taskId: string): Promise<Task> =>
  axiosPublic.get(`/task/${taskId}`);

export const getCompletedTasks = async (): Promise<Task[]> =>
  axiosPublic.get("/task/completed-tasks");

export const getPendingTasks = async (): Promise<Task[]> =>
  axiosPublic.get("/task/pending-tasks");

export const getOverdueTasks = async (): Promise<Task[]> =>
  axiosPublic.get("/task/overdue-tasks");

export const createTask = async (data: Task) =>
  axiosPublic.post<Task>("/task/create-task", data);

export const updateTask = async (data: Task, taskId: string) =>
  axiosPublic.put<Task>(`/task/edit-task/${taskId}`, data);

export const completeTask = async (taskId: string) =>
  axiosPublic.put<Task>(`/task/${taskId}`);

export const deleteTask = async (id: string) =>
  axiosPublic.delete<{ message: string }>(`/task/${id}`);

export const deleteAllTasks = async () =>
  axiosPublic.delete<{ message: string }>("/task/delete-all-tasks");

export const editUserProfile = async (data: AuthResponse) =>
  axiosPublic.put("/user", data);
