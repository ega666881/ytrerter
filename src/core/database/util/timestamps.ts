import {timestamp} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
}

export {
  timestamps
}
