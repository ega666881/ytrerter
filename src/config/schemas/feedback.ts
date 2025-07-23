import { pgTable, serial, varchar, timestamp, doublePrecision, uuid, text } from 'drizzle-orm/pg-core';


export const feedback = pgTable('feedbacks', {
  id: uuid().primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar(),
  text: text(),
  createdAt: timestamp('createdAt').defaultNow(),
});