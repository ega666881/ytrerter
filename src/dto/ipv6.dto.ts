import { t, Static } from 'elysia'

export const DomainQuerySchema = t.Object({
  domain: t.String({
    minLength: 3,
    maxLength: 253,
    pattern: '^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,}$',
    description: 'Fully qualified domain name',
    examples: ['example.com', 'www.google.com', 'api.v1.service.org']
  })
});

export type CheckIpV6Dto = Static<typeof DomainQuerySchema>;