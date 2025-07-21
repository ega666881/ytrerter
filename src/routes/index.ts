import { Elysia } from 'elysia';

import paynamentRoutes from './paynament';

const routes = new Elysia()
  // .use(userRoutes)
  .use(paynamentRoutes)

export default routes;