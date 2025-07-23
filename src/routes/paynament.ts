import { Elysia } from 'elysia';
import { createPaynamentCrypto, getWebhookPaynamentCrypto } from '../controllers/paynament.controller';
import { CreatePaynamentSchema } from '../dto/paynament.dto';

const paynamentRoutes = new Elysia()
  .post('/api/paynament/get-paynament', getWebhookPaynamentCrypto)
  .post(
      '/api/paynament/create-paynament', 
      createPaynamentCrypto, 
      {
        body: CreatePaynamentSchema as any
      }
    )

export default paynamentRoutes;