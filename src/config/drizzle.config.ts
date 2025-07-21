import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv-ts'

dotenv.config();

export default {
  schema: './config/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.PG_HOST!,
    port: 5432,
    user: process.env.PG_USER!,
    password: process.env.PG_PASSWORD!,
    database: process.env.PG_DATABASE!,
    ssl: false,
  },
} satisfies Config;