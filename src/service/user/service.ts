import {CreateUserDto} from './dto'
import Database from "../../core/database/database.ts";
import database from "../../core/database/database.ts";
import {User, users as usersSchema} from "../../core/database/schema";
import {eq} from "drizzle-orm";
import {getFirstOrThrow} from "../utils/get-first.ts";

namespace UserService {
  export const getByEmail = async (email: string): Promise<User | never> => {
    const users = await database.get()
      .select()
      .from(usersSchema)
      .where(eq(usersSchema.email, email))

    return getFirstOrThrow(users, new Error('user not found'))
  }

  export const create = async (
    dto: CreateUserDto
  ): Promise<User | never> => {
    const [user] = await Database.get()
      .insert(usersSchema)
      .values({email: dto.email})
      .returning()

    return user
  }
}

export {
  UserService
}
