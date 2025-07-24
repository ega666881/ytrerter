import { Elysia } from 'elysia';

import paynamentRoutes from './paynament';
import ipv6Routes from './ipv6';
import feedbackRoutes from './feedback';

const routes = new Elysia()
  // .use(userRoutes)
  .use(paynamentRoutes)
  .use(ipv6Routes)
  .use(feedbackRoutes)

export default routes;