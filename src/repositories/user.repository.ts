import { eq } from "drizzle-orm";
import { db } from "../config/connection";
import { users } from "../config/schemas/user";
import { IUser } from "../types/user.types";


export const createOrGetUserByEmail = async (email: string) => {
    const [user] = await db.select().from(users).where(eq(users.email, email))
    if (user) {
        return user
    } else {
        const [insertRow] = await db.insert(users).values({
            email: email
        })
        .returning()

        return insertRow
    }
}