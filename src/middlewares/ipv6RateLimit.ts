import { Context } from "elysia";

export const fiveRequestsPerMinute = () => {
  const requests = new Map();

  return (context: any) => {
    const ip = context.request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               context.request.headers.get('x-real-ip') || 
               context.request.remoteAddress || 
               'unknown';

    const key = `ip_limit:${ip}`;
    const now = Date.now();
    const windowMs = 60000;
    const max = 5;

    const data = requests.get(key) || { count: 0, resetTime: 0 };

    if (data.resetTime < now) {
      requests.set(key, { count: 1, resetTime: now + windowMs });
      return context;
    }

    if (data.count >= max) {
      context.set.status = 429;
      return {
        error: 'Too Many Requests',
        message: 'Limit: 5 requests per minute',
        retryAfter: Math.ceil((data.resetTime - now) / 1000)
      };
    }

    requests.set(key, { count: data.count + 1, resetTime: data.resetTime });
    return context;
  };
};