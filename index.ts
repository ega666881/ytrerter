import { Elysia } from 'elysia';
import routes from './routes';
import swagger from '@elysiajs/swagger';

const app = new Elysia()
  .use(routes)
  .use(swagger())
  .listen(8000, () => {
    console.log(`Server running on http://localhost`);
  });