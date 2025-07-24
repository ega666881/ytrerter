import { TransactionCurrency, TransactionState } from "../config/schemas";

export interface ITransaction {
  userId: string;
  state: TransactionState; 
  currency: TransactionCurrency;
  url: string;
}

interface IConvertInfo {
  from: string;
  to: string;
  amount: string;
  converted_amount: string;
}

export interface IPaymentWebhookBody {
  type: string;
  uuid: string;
  order_id: string;
  amount: string;
  payment_amount: string;
  payment_amount_usd: string;
  merchant_amount: string;
  commission: string;
  is_final: boolean;
  status: 'confirm_check' | 'paid' | 'paid_over' | 'fail' | 'wrong_amount' | 'cancel' | 'system_fail' | 'refund_process' | 'refund_fail' | 'refund_paid';
  from: string;
  wallet_address_uuid: string;
  network: string;
  currency: string;
  payer_currency: string;
  additional_data: string;
  convert?: IConvertInfo;
  txid?: string;
  sign: string;
}