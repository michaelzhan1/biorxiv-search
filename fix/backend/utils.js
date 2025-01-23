import pg from "pg";
import dotenv from "dotenv";

const { Client } = pg;
dotenv.config();

export function createClient() {
  return new Client({
    connectionString: process.env.DATABASE_URL,
  });
}