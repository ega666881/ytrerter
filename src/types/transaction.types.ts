import { TransactionCurrency, TransactionState } from "../config/schemas";

export interface ITransaction {
  userId: string;
  state: TransactionState; 
  currency: TransactionCurrency;
  url: string;
}