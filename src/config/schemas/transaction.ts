import {pgEnum, pgTable, text, timestamp, uuid} from "drizzle-orm/pg-core";
import {InferSelectModel, relations} from "drizzle-orm";
import {keys} from "./key";
import {users} from "./user";


export enum TransactionState {
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "failed"
}

export enum TransactionCurrency {
  USD = "USD",
  RUB = 'RUB',
}

export const transactionStateEnum = pgEnum(
  'transaction_state',
  Object.values(TransactionState) as [string, ...string[]]
);

export const transactionCurrencyEnum = pgEnum(
  'transaction_currency',
  Object.values(TransactionCurrency) as [string, ...string[]]
)

export const transactions = pgTable('transactions', {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid().notNull().references(() => users.id),
  state: transactionStateEnum().notNull(),
  currency: transactionCurrencyEnum().notNull(),
  url: text().notNull(),
  createdAt: timestamp().defaultNow()
})

export type Transaction = InferSelectModel<typeof transactions>

export const transactionsRelations = relations(transactions, ({one}) => ({
  userId: one(users, {
    fields: [transactions.userId],
    references: [users.id]
  }),
  key: one(keys)
}))