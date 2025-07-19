import {pgTable, text, uuid} from "drizzle-orm/pg-core";
import {InferSelectModel, relations} from "drizzle-orm";
import {keys} from "./key.ts";
import {timestamps} from "../util/timestamps.ts";
import {transactions} from "./transaction.ts";

export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  email: text().notNull().unique(),
  ...timestamps,
})

export const usersRelations = relations(users, ({many}) => ({
  keys: many(keys),
  transactions: many(transactions)
}))

export type User = InferSelectModel<typeof users>

