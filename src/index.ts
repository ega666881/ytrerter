import { Elysia } from 'elysia';
import routes from './routes';
import swagger from '@elysiajs/swagger';
import { rateLimit } from 'elysia-rate-limit';

const app = new Elysia()
  .onError(({ code, error, set }) => {
    console.error('Error occurred:', error);
    
    switch (code) {
      case 'VALIDATION':
        set.status = 400;
        return {
          error: 'Validation Failed',
          message: 'Input validation failed',
        };
      case 'NOT_FOUND':
        set.status = 404;
        return {
          error: 'Not Found',
          message: 'Requested resource not found'
        };
      case 'PARSE':
        set.status = 400;
        return {
          error: 'Parse Error',
          message: 'Failed to parse request'
        };
      default:
        set.status = 500;
        return {
          error: 'Internal Server Error',
          message: 'An unexpected error occurred'
        };
    }
  })
  .use(routes)
  .use(swagger())
  
  .listen(8000, () => {
    console.log(`Server running on http://localhost`);
  });