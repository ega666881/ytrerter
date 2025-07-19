import {CreateTransactionDto} from './dto'
import {Transaction} from "../../core/database/schema";

export namespace TransactionService {
  export const create = async (
    dto: CreateTransactionDto
  ): Promise<Transaction> => {
    throw new Error('not implemented');
  }
}
