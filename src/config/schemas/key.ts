import {integer, pgEnum, pgTable, text, timestamp, uuid, varchar} from "drizzle-orm/pg-core";
import {InferSelectModel, relations} from "drizzle-orm";
import {users} from "./user";

import {transactions} from "./transaction";


export const keys = pgTable('keys', {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid().notNull().references(() => users.id),
  transactionId: uuid().notNull().references(() => transactions.id),
  ipVersion: varchar().notNull(),
  usageType: varchar().notNull(),
  function: varchar().notNull(),
  protocol: varchar().notNull(),
  tariff: varchar().notNull(),
  tcpConnectionsLimit: integer().notNull(),
  whitelistedIpLimit: integer().notNull(),
  subnet: varchar().notNull(),
  location: varchar().notNull(),
  permalink: text().notNull(),
  expiresAt: varchar(),
  createdAt: timestamp().defaultNow()
})

export const keysRelations = relations(keys, ({one}) => ({
  userId: one(users, {
    fields: [keys.userId],
    references: [users.id]
  }),
  transactionId: one(transactions, {
    fields: [keys.transactionId],
    references: [transactions.id]
  })
}))

export type Key = InferSelectModel<typeof keys>