import pg from "pg";
import dotenv from "dotenv";

const { Client } = pg;
dotenv.config();

// Create a Postgres client
function createClient() {
  return new Client({
    connectionString: process.env.DATABASE_URL,
  });
}

// Get all user information from the database
async function getAllUserInfo() {
  const client = createClient();
  await client.connect();
  const result = await client.query('SELECT * FROM users');
  await client.end();

  return result.rows;
}

export { createClient, getAllUserInfo };