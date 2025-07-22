import CryptoJS from 'crypto-js';
import { Context } from 'elysia';
import axios from 'axios'
import * as dotenv from 'dotenv-ts'
import { success } from 'zod';
import { CreateUserDtoType } from '../dto/user.dto';
import { CreatePaynamentDto } from '../dto/paynament.dto';
import * as paynamentRepository from '../repositories/paynament.repository'
import * as userRepository from '../repositories/user.repository'
import * as keyRepository from '../repositories/key.repository'
import { TransactionCurrency, TransactionState } from '../config/schemas';


dotenv.config();

const generateSign = (data: any, apiKey: string | undefined): string =>  {
  const jsonData = JSON.stringify(data);

  const base64Data = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(jsonData));

  const sign = CryptoJS.MD5(base64Data + apiKey)?.toString();

  return sign;
}

const verifySign = (data: any, receivedSign: string, apiKey: string | undefined): boolean => {
  const generatedSign = generateSign(data, apiKey);
  return generatedSign === receivedSign;
};

export const getWebhookPaynamentCrypto = (context: Context) => {
    const { sign, ...payload } = context.body as any

    if (!sign) {
        return { success: false, error: "No sign provided" }
    }

    const isValid = verifySign(payload, sign, process.env.HELEKET_API_KEY)
    console.log(isValid)
    
}

export const createPaynamentCrypto = async (contex: Context) => {
    const body = contex.body as CreatePaynamentDto
    const user = await userRepository.createOrGetUserByEmail(body.email)

    const transaction = await paynamentRepository.createTransaction({
        userId: user.id,
        state: TransactionState.PENDING,
        currency: TransactionCurrency.USD,
        url: '',
    })

    const {amount, email, ...insertDataKey} = body
    //@ts-ignore
    await keyRepository.createKey({
        ...insertDataKey,
        transactionId: transaction.id,
        userId: user.id,
    })

    const paynamentBody = {
        amount: body.amount.toString(),
        currency: "USD",
        order_id: transaction.id.toString(),
        url_callback: process.env.URL_HELEKET_CALLBACK,
    }


    const sign = generateSign(paynamentBody, process.env.HELEKET_API_KEY)

    try {
        const response = await axios.post(`https://api.heleket.com/v1/payment`, paynamentBody,
            {
                headers: {
                    merchant: process.env.HELEKET_MERCHAND_ID,
                    sign: sign,
                    "Content-Type": 'application/json'
                }
            }
        )
        const url = response.data.result.url
        await paynamentRepository.updateTransaction(transaction.id, {url: url})
        return url
    } catch (error) {
        //@ts-ignore
        console.log(error.response.data)
        return error
    }
}