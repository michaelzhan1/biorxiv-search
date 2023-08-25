import { pool } from '@/utils/database'
import { PoolClient, QueryResult } from 'pg'
import { User } from '@/types/biorxiv'


async function getUsers(): Promise<User[]> {
  const client: PoolClient = await pool.connect();
  try {
    const query: QueryResult = await client.query('SELECT * FROM users');
    const result: User[] = query.rows;
    client.release();
    return result;
  } catch (err: any) {
    console.error(err);
    client.release();
    return [];
  }
}

export async function GET() {
  console.log('Getting users');
  try {
    const users: User[] = await getUsers();
    return new Response(JSON.stringify({ error: null, result: users }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message, result: null }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


export async function DELETE(request: Request) {
  const rawId: string = await request.text();
  const id: number = parseInt(rawId);
  console.log(`Deleting user ${id}`);
  const client: PoolClient = await pool.connect();
  try {
    await client.query('DELETE FROM users WHERE id = $1', [id]);
    await client.query('DELETE FROM filters WHERE id = $1', [id]);
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