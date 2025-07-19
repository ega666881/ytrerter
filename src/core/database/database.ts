import {drizzle, NodePgDatabase} from 'drizzle-orm/node-postgres';
import * as schemas from "./schema";
import winston from "winston";
import {getLoggerOptions} from "../logger/config.ts";

namespace Database {
  const logger = winston.createLogger(getLoggerOptions('database'))

  let db: NodePgDatabase<typeof schemas> | null = null;

  export const connect = (): void => {
    if (db !== null) {
      throw new Error('Database is already connected');
    }

    db = drizzle({
      connection: process.env.DATABASE_URL!, casing: 'snake_case', schema: schemas
    })

    logger.info('Database Connected')
  }

  export const get = (): NodePgDatabase<typeof schemas> => {
    if (db === null) {
      throw new Error('Database not connected');
    }

    return db
  }
}

export default Database

