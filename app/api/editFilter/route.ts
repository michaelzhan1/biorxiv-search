import { pool } from '@/utils/database'
import { PoolClient, QueryResult } from 'pg'


interface RequestBody {
  email: string;
  search: string;
  categories: string[];
}


export async function GET(request: Request) {
  const body = await request.json()
  return new Response(JSON.stringify({ error: null, message: 'Hello world' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}


export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const email: string = body.email;
  const search: string = body.search;
  const categoryList: string[] = body.categories;
  const categories: string = categoryList.join(';');

  let message: string;

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
      message = `Filter added for ${email}`
    } else {
      await client.query('UPDATE filters SET query = $1, categories = $2 WHERE id = $3', [search, categories, id])
      message = `Filter updated for ${email}`
    }
    console.log('Filter updated/added')
    await client.query('COMMIT')
    client.release()
  } catch (e: any) {
    await client.query('ROLLBACK')
    client.release()
    console.log('Error', e.message)
    return new Response(JSON.stringify({ error: e.message, message: null }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  return new Response(JSON.stringify({ error: null, message: message }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}