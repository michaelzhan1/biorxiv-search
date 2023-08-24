import { pool } from '@/utils/database'
import { PoolClient, QueryResult } from 'pg'


interface RequestBody {
  email: string;
  search: string;
  categories: string[];
}


export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const email: string = body.email;
  const search: string = body.search;
  const categoryList: string[] = body.categories;
  const categories: string = categoryList.join(';');

  const client: PoolClient = await pool.connect();
  try {
    await client.query('BEGIN')
    const existingUser: QueryResult = await client.query('SELECT * FROM users WHERE email = $1', [email])
    if (existingUser.rowCount === 0) {
      await client.query('INSERT INTO USERS (email) VALUES ($1)', [email])
    }
    const idQuery: QueryResult = await client.query('SELECT id FROM users WHERE email = $1', [email])
    const id: number = idQuery.rows[0].id
    const existingFilter: QueryResult = await client.query('SELECT * FROM filters WHERE id = $1', [id])
    if (existingFilter.rowCount === 0) {
      await client.query('INSERT INTO filters (id, query, categories) VALUES ($1, $2, $3)', [id, search, categories])
    } else {
      await client.query('UPDATE filters SET query = $1, categories = $2 WHERE id = $3', [search, categories, id])
    }
    console.log('Filter updated/added')
    await client.query('COMMIT')
    client.release()
  } catch (e: any) {
    await client.query('ROLLBACK')
    client.release()
    console.log('Error', e.message)
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}