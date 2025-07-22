import { Elysia } from 'elysia';
import { createPaynamentCrypto, getWebhookPaynamentCrypto } from '../controllers/paynament.controller';
import { CreatePaynamentSchema } from '../dto/paynament.dto';

const paynamentRoutes = new Elysia()
  .post('/api/users/get-paynament', getWebhookPaynamentCrypto)
  .post(
      '/api/users/create-paynament', 
      createPaynamentCrypto, 
      {
        body: CreatePaynamentSchema as any
      }
    )

export default paynamentRoutes;