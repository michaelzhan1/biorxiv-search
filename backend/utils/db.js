import pg from "pg";

const { Client } = pg;

const userCache = {};

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

// Get user information for one id
async function getUserInfo(id) {
  if (userCache[id]) {
    return userCache[id];
  }

  const client = createClient();
  await client.connect();
  const result = await client.query('SELECT * FROM users WHERE id = $1', [id]);
  await client.end();

  userCache[id] = result.rows;
  return result.rows;
}

export { createClient, getAllUserInfo, getUserInfo };