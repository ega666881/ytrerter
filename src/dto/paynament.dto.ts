import { t, Static } from 'elysia';

export const CreatePaynamentSchema = t.Object({
  amount: t.Number({ minimum: 0.01 }),
  email: t.String({ format: 'email' }),
  ipVersion: t.String(),
  usageType: t.String(),
  function: t.String(),
  protocol: t.String(),
  tariff: t.String(),
  tcpConnectionsLimit: t.Number(),
  whitelistedIpLimit: t.Number(),
  subnet: t.String(),
  location: t.String(),
  permalink: t.String(),
  expiresAt: t.String(),
});

export type CreatePaynamentDto = Static<typeof CreatePaynamentSchema>;