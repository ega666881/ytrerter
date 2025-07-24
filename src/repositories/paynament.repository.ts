import { eq } from "drizzle-orm";
import { db } from "../config/connection";
import { transactions } from '../config/schemas/transaction';
import { ITransaction } from "../types/transaction.types";


export const createTransaction = async (insertData: ITransaction) => {
    const [insertRow] = await db.insert(transactions).values(insertData).returning()
    return insertRow
} 

export const updateTransaction = async (trxId: string, updatedData: any) => {
    return await db.update(transactions).set(updatedData).where(eq(transactions.id, trxId))
}

export const getTransaction = async (trxId: string) => {
    const [findedRow] = await db.select()
        .from(transactions)
        .where(eq(transactions.id, trxId))
    
    return findedRow
}