import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as dotenv from 'dotenv-ts'

dotenv.config();

const client = new Client({
  host: process.env.PG_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  ssl: false,
});

await client.connect();

export const db = drizzle(client);