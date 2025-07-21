import { z } from 'zod';

export const CreatePaynamentSchema = z.object({
  amount: z.float64().positive(),
  email: z.string().email("Invalid email address"),
});
export type CreatePaynamentDtoType = z.infer<typeof CreatePaynamentSchema>;