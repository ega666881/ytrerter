import {
  Function,
  IpVersion,
  Location,
  Protocol,
  Subnet,
  Tariff,
  TransactionCurrency,
  UsageType
} from "../../../core/database/schema";

export class CreateTransactionDto {
  constructor(
    public userId: string,
    public currency: TransactionCurrency,
    public ipVersion: IpVersion,
    public usageType: UsageType,
    public proxyFunction: Function,
    public protocol: Protocol,
    public tariff: Tariff,
    public tcpConnectionsLimit: number,
    public whitelistedIpLimit: number,
    public subnet: Subnet,
    public location: Location
  ) {
  }
}
