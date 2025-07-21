import { pgTable, serial, varchar, timestamp, doublePrecision } from 'drizzle-orm/pg-core';

export const paynamentsHistory = pgTable('paynamentsHistory', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: timestamp('createdAt').defaultNow(),
  amount: doublePrecision('amount').notNull()
});