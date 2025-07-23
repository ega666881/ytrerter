import { db } from "../config/connection";
import { feedback } from "../config/schemas";
import { IFeedback } from "../types/feedback.types";


export const createFeedback = async (insertData: IFeedback) => {
    const [insertRow] = await db.insert(feedback).values(insertData).returning()
    return insertRow

}

export const getFeedbacks = async () => {
    return db.select().from(feedback)
}