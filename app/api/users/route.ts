import { pool } from '@/utils/database'
import { PoolClient, QueryResult } from 'pg'
import { User, NewUser } from '@/types/backend'


// Route to get all users
export async function GET() {
  console.log('Getting users');
  const client: PoolClient = await pool.connect();
  try {
    const query: QueryResult = await client.query('SELECT * FROM users');
    const result: User[] = query.rows;
    client.release();
    return new Response(JSON.stringify({ error: null, result: result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    console.error(e);
    client.release();
    return new Response(JSON.stringify({ error: e.message, result: null }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


// Route to delete a user from the edit page
export async function DELETE(request: Request) {
  const rawId: string = await request.text();
  const id: number = parseInt(rawId);
  console.log(`Deleting user ${id}`);
  const client: PoolClient = await pool.connect();
  try {
    await client.query('DELETE FROM users WHERE id = $1', [id]);
    client.release();
    return new Response(JSON.stringify({ error: null }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    console.error(e);
    client.release();
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


// Route to add or update a user from the home page
export async function POST(request: Request) {
  const body: NewUser = await request.json();
  const email: string = body.email;
  const search: string = body.search;
  const categories: string = body.categories.join(';');

  let message: string;

  const client: PoolClient = await pool.connect();
  try {
    await client.query('BEGIN')

    const existingUserRow: QueryResult = await client.query('SELECT * FROM users WHERE email = $1', [email])
    if (existingUserRow.rowCount === 0) {
      await client.query('INSERT INTO users (email, search, categories) VALUES ($1, $2, $3)', [email, search, categories])
      message = `User added for ${email}`
    } else {
      await client.query('UPDATE users SET search = $1, categories = $2 WHERE email = $3', [search, categories, email])
      message = `User updated for ${email}`
    }
    console.log('User updated/added')
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


export async function UPDATE(request: Request) {
  const body: NewUser = await request.json();
  const email: string = body.email;
  const search: string = body.search;
  const categories: string = body.categories.join(';');

  const client: PoolClient = await pool.connect();
  try {
    await client.query('UPDATE users SET search = $1, categories = $2 WHERE email = $3', [search, categories, email])
    console.log('User updated')
    client.release()
    return new Response(JSON.stringify({ error: null }), {
      status: 200,
      headers: { 'Content-Type': 'application/json'}
    })
  } catch (e: any) {
    client.release()
    console.log('Error', e.message)
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}