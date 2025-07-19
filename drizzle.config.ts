import {defineConfig} from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/core/database/schema",
  casing: 'snake_case',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
