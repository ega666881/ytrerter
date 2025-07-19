import {z} from "zod";
import {create} from './schema'
import {Transaction, User} from "../../../../core/database/schema";
import {UserService as NativeUserService} from "../../../../service/user";
import {TransactionService as NativeTransactionService} from "../../../../service/transaction";
import {CreateUserDto} from "../../../../service/user/dto";

type CreateTransactionDto = z.infer<typeof create.schema>

export class TransactionService {
  async create(dto: CreateTransactionDto): Promise<Transaction | never> {
    let user: User | null = await NativeUserService.getByEmail(dto.email).catch(() => null)

    if (!user) {
      user = await NativeUserService.create(new CreateUserDto(dto.email))
    }

    console.log(user)

    return NativeTransactionService.create(create.toDto(dto, user.id))
  }
}

