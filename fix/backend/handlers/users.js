import { createClient, getAllUserInfo } from '../utils/db.js';

export async function getUsers(req, res) {
  const result = await getAllUserInfo();
  res.json(result);
}

export async function postUsers(req, res) {
  const { email, search } = req.body;
  const categories = req.body.categories.join(';');

  if (!email) {
    return res.status(400).json({ message: 'Missing email' });
  }

  let message;
  let status = 200;

  const client = createClient();
  await client.connect();

  try {
    await client.query('BEGIN');
    const existingUserRow = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (existingUserRow.rowCount === 0) {
      await client.query(
        'INSERT INTO users (email, search, categories) VALUES ($1, $2, $3)',
        [email, search, categories]
      );
      message = `User created with email: ${email}`;
    } else {
      await client.query(
        'UPDATE users SET search = $1, categories = $2 WHERE email = $3',
        [search, categories, email]
      );
      message = `User updated with email: ${email}`;
    }
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    message = 'An error occurred';
    status = 500;
  } finally {
    await client.end();
  }

  res.status(status).json({ message });
}

export async function deleteUsers(req, res) {
  const id = parseInt(req.body.id);
  if (!id) {
    return res.status(400).json({ message: 'Invalid id' });
  }

  const client = createClient();
  await client.connect();
  await client.query('DELETE FROM users where id = $1', [id]);
  await client.end();

  res.json({ message: `User id ${id} deleted` });
}