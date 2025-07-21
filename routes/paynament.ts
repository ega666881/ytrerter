import { Elysia } from 'elysia';
import { createPaynamentCrypto, getWebhookPaynamentCrypto } from '../controllers/paynament.controller';

const paynamentRoutes = new Elysia()
  .post('/api/users/get-paynament', getWebhookPaynamentCrypto)
  .post('/api/users/create-paynament', createPaynamentCrypto)

export default paynamentRoutes;