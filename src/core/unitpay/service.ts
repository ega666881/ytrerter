import {TransactionCurrency} from "../database/schema";
import * as crypto from "node:crypto";

export namespace Unitpay {
}

export namespace Unitpay.Types {
  export interface Webhook {
    method: 'check' | 'pay' | 'error',
    'params[unitpayId]': number,
    'params[projectId]': number,
    'params[account]': string,
    'params[payerSum]': number,
    'params[sum]': number,
    'params[ip]': string,
    'params[isPreauth]': number,
    'params[payerCurrency]': string,
    'params[profit]': number,
    'params[phone]'?: string,
    'params[paymentType]': string,
    'params[orderSum]': number,
    'params[orderCurrency]': TransactionCurrency,
    'params[operator]'?: string,
    'params[date]': string,
    'params[errorMessage]'?: string,
    'params[test]': number,
    'params[3ds]': number,
    'params[subscriptionId]'?: number,
    'params[signature]'?: string,
  }
}

export namespace Unitpay.Methods {
  import Webhook = Unitpay.Types.Webhook;

  export function verifySignature(
    signature: string,
    webhook: Unitpay.Types.Webhook
  ): boolean {
    let hashString = `${webhook.method}`

    const webhookCopy: Partial<Webhook> = {
      ...webhook,
    }

    delete webhookCopy['method']
    delete webhookCopy['params[signature]']

    for (const key in Object.keys(webhookCopy).sort()) {
      if (!key.startsWith('params[') || !key.endsWith(']')) {
        continue
      }

      const value = webhookCopy[key as keyof Webhook]

      hashString += `${Unitpay.Constants.separator}${value!.toString()}`
    }

    hashString += process.env.UNITPAY_SECRET_KEY!

    return crypto.createHash('sha256').update(hashString).digest('hex') === signature
  }
}

export namespace Unitpay.Constants {
  export const separator = '{up}'
}
