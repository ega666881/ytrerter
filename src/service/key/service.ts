import {BaseQuery} from "../utils/base-query.ts";
import Database from "../../core/database/database.ts";
import {Key, keys as keysSchemas} from "../../core/database/schema";
import {getPaginationOptions, PaginationOptions} from "../utils/pagination.ts";
import {eq} from "drizzle-orm";
import {getFirstOrThrow} from "../utils/get-first.ts";

namespace KeyService {
  export const getByUser = async (
    userId: string,
    query: BaseQuery = {
      pageSize: undefined,
      currentPage: undefined
    },
  ): Promise<Key[]> => {
    const paginationOptions: PaginationOptions = getPaginationOptions(query)

    return Database.get()
      .select()
      .from(keysSchemas)
      .where(eq(keysSchemas.userId, userId))
      .limit(paginationOptions.limit)
      .offset(paginationOptions.offset)
  }

  export const getByPermalink = async (permalink: string): Promise<Key | never> => {
    const keys = await Database.get()
      .select()
      .from(keysSchemas)
      .where(eq(keysSchemas.permalink, permalink))

    return getFirstOrThrow(keys, new Error('key not found'))
  }
}

export {KeyService}
