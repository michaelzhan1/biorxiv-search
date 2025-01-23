import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "./utils.js";

dotenv.config();

// Express setup
const app = express();
app.use(express.json());

// CORS setup
const corsOptions = {
  origin: 'http://localhost:8080'
};
app.use(cors(corsOptions));

// Routes
app.get('/users', async (req, res) => {
  const client = createClient();
  await client.connect();
  const result = await client.query('SELECT * FROM users');
  await client.end();

  res.json(result.rows);
})

app.post('/users', async (req, res) => {
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
});

app.delete('/users', async (req, res) => {
  const id = parseInt(req.body.id);
  if (!id) {
    return res.status(400).json({ message: 'Invalid id' });
  }

  const client = createClient();
  await client.connect();
  await client.query('DELETE FROM users where id = $1', [id]);
  await client.end();

  res.json({ message: `User id ${id} deleted` });
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Helper functions