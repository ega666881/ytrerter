import { db } from "../config/connection";
import { Key, keys } from "../config/schemas";



export const createKey = async (insertData: Key) => {
    const [insertRow] = await db.insert(keys).values(insertData).returning()
    return insertRow
}
