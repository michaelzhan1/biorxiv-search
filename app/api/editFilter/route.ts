import { pool } from '@/utils/database'


interface RequestBody {
  email: string;
  search: string;
  categories: string[];
}


export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const email: string = body.email;
  const search: string = body.search;
  const categories: string[] = body.categories;
}