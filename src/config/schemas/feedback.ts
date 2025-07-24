import { pgTable, serial, varchar, timestamp, doublePrecision, uuid, text } from 'drizzle-orm/pg-core';


export const feedback = pgTable('feedbacks', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name'),
  text: text('text'),
  createdAt: timestamp('createdAt').defaultNow(),
});