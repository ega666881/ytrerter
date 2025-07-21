import { z } from 'zod';

export const CreateUserDto = z.object({
  email: z.string().email("Invalid email address"),
});

export type CreateUserDtoType = z.infer<typeof CreateUserDto>;