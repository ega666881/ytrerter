import { eq } from "drizzle-orm";
import { db } from "../config/connection";
import { Key, keys, users } from "../config/schemas";



export const createKey = async (insertData: Key) => {
    const [insertRow] = await db.insert(keys).values(insertData).returning()
    return insertRow
}

export const getKey = async (id?: string, trxId?: string) => {
    const query = db.select()
        .from(keys)
        .leftJoin(users, eq(keys.userId, users.id))

    id && query.where(eq(keys.id, id))
    trxId && query.where(eq(keys.transactionId, trxId))

    const [findedRow] = await query

    return findedRow
}

export const updateKeyStatus = async (id: string, status: boolean) => {
    const [updatedRow] = await db.update(keys).set({paymentSuccess: status}).where(eq(keys.id, id)).returning()

    return updatedRow
}
