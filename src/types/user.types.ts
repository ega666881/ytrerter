export interface IUser {
  id: number;
  email: string;
  createdAt: Date | string;
}

export interface ApiResponse<T> {
  user?: T;
  error?: string;
  hello?: string;
}