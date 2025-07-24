import { pgTable, serial, varchar, timestamp, doublePrecision, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});