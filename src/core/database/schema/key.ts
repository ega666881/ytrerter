import {integer, pgEnum, pgTable, text, timestamp, uuid} from "drizzle-orm/pg-core";
import {InferSelectModel, relations} from "drizzle-orm";
import {users} from "./user.ts";
import {timestamps} from "../util/timestamps.ts";
import {transactions} from "./transaction.ts";
import {getEnumValues} from "../util/get-enum-values.ts";

export enum IpVersion {
  V4 = 'v4',
  V6 = 'v6',
}

const ipVersionEnum = pgEnum('ip_version', getEnumValues(IpVersion))

export enum UsageType {
  SHARED = 'shared',
}

const usageTypeEnum = pgEnum('usage_type', getEnumValues(UsageType))

export enum Function {
  ROTATION = 'rotation',
}

const functionEnum = pgEnum('function', getEnumValues(Function))

export enum Protocol {
  HTTP = 'http',
  HTTPS = 'https',
  SOCKS = 'socks',
  SOCKS5 = 'socks5',
  SOCKS5H = 'socks5h',
}

const protocolEnum = pgEnum('protocol', getEnumValues(Protocol))

export enum Tariff {
  TELEGRAM = 'telegram',
  YOUTUBE = 'youtube',
  XEVIL = 'xevil',
  CAPMONSTER = 'capmonster',
}

const tariffEnum = pgEnum('tariff', getEnumValues(Tariff))

export enum Subnet {
  ONE_SLASH_TWENTY_NINE = '1/29',
}

const subnetEnum = pgEnum('subnet', getEnumValues(Subnet))

export enum Location {
  GERMANY = 'germany'
}

const locationEnum = pgEnum('location', getEnumValues(Location))

export const keys = pgTable('keys', {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid().notNull().references(() => users.id),
  transactionId: uuid().notNull().references(() => transactions.id),
  ipVersion: ipVersionEnum().notNull(),
  usageType: usageTypeEnum().notNull(),
  function: functionEnum().notNull(),
  protocol: protocolEnum().notNull(),
  tariff: tariffEnum().notNull(),
  tcpConnectionsLimit: integer().notNull(),
  whitelistedIpLimit: integer().notNull(),
  subnet: subnetEnum().notNull(),
  location: locationEnum().notNull(),
  permalink: text().notNull(),
  expiresAt: timestamp().notNull(),
  // TODO: add credentials key or smth
  ...timestamps,
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
