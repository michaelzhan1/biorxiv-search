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

export interface Article {
  doi: string;
  title: string;
  authors: string;
  author_corresponding: string;
  author_corresponding_institution: string;
  date: string;
  version: string;
  category: string;
  jatsxml: string;
  abstract: string;
  published: string;
}

export interface Message {
  status: string;
  interval: string;
  cursor: string;
  count: number;
  count_new_papers: number;
  total: number;
}

export interface Biorxiv {
  collection: Article[];
  messages: Message[];
}


export interface DataStatusResponse {
  error: string | null;
  result: string | null;
}