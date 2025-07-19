import {BaseQuery} from "./base-query.ts";

interface PaginationOptions {
  limit: number,
  offset: number,
}

const getPaginationOptions = <T extends BaseQuery>(query: T) => {
  const options: PaginationOptions = {
    limit: 0,
    offset: 0,
  }

  if (query.pageSize) {
    if (query.pageSize <= 0) {
      throw new Error('pageSize must be greater than or equal to zero')
    }

    options.limit = query.pageSize
  }

  if (query.currentPage !== undefined) {
    if (query.pageSize === undefined) {
      throw new Error('currentPage option cannot be applied if pageSize is undefined')
    }

    if (query.currentPage <= 0) {
      throw new Error('currentPage must be greater than or equal to zero')
    }

    options.offset = (query.currentPage - 1) * query.pageSize
  }

  return options
}

export {
  PaginationOptions,
  getPaginationOptions,
}
