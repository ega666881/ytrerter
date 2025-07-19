import {z} from "zod";
import {CreateTransactionDto} from "../../../../../service/transaction/dto";
import {
  Function,
  IpVersion,
  Location,
  Protocol,
  Subnet,
  Tariff,
  TransactionCurrency,
  UsageType
} from "../../../../../core/database/schema";

export const schema = z.object({
  email: z.string().email(),
  currency: z.nativeEnum(TransactionCurrency),
  ipVersion: z.nativeEnum(IpVersion),
  usageType: z.nativeEnum(UsageType),
  function: z.nativeEnum(Function),
  protocol: z.nativeEnum(Protocol),
  tariff: z.nativeEnum(Tariff),
  tcpConnectionsLimit: z.number().int().gte(1).lte(10000),
  whitelistedIpLimit: z.number().int().gte(3).lte(100),
  subnet: z.nativeEnum(Subnet),
  location: z.nativeEnum(Location),
  rentHours: z.number().int().gte(24).lte(2160),
})

export const toDto = (object: z.infer<typeof schema>, userId: string): CreateTransactionDto => {
  return new CreateTransactionDto(
    userId,
    object.currency,
    object.ipVersion,
    object.usageType,
    object.function,
    object.protocol,
    object.tariff,
    object.tcpConnectionsLimit,
    object.whitelistedIpLimit,
    object.subnet,
    object.location,
  )
}


