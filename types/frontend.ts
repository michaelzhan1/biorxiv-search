import { User } from './backend';


export interface CategoryOption {
  value: string;
  label: string;
}


export interface NewUserResponse {
  error: string | null;
  message: string | null;
}


export interface UserResponse {
  error: string | null;
  result: User[] | null;
}


export interface DeleteUserResponse {
  error: string | null;
}


export interface UpdateUserResponse {
  error: string | null;
}