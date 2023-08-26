export interface User {
  id: number;
  email: string;
  search: string;
  categories: string;
}


export interface NewUser {
  email: string;
  search: string;
  categories: string[];
}