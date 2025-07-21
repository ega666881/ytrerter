import CryptoJS from 'crypto-js';
import { Context } from 'elysia';
import axios from 'axios'
import * as dotenv from 'dotenv-ts'
import { success } from 'zod';

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
    
}

export const createPaynamentCrypto = async (contex: Context) => {
    const body = {
        amount: "15",
        currency: "ETH",
        network: 'eth',
        order_id: "1312sdfsdf31312213131111231311",
        url_callback: "https://uncleanly-sincere-margay.cloudpub.ru/api/users/get-paynament",
        status: 'paid',
    }

    const sign = generateSign(body, process.env.HELEKET_API_KEY)

    try {
        const response = await axios.post(`https://api.heleket.com/v1/test-webhook/payment`, body,
            {
                headers: {
                    merchant: process.env.HELEKET_MERCHAND_ID,
                    sign: sign,
                    "Content-Type": 'application/json'
                }
            }
        )
        return response.data
    } catch (error) {
        //@ts-ignore
        console.log(error)
        return error
    }
}