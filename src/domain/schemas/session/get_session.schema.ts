import { z } from 'zod';

export const GetSessionSchema = z.object({
  jwt: z.string().min(1, 'El JWT es necesario'),
});

export type GetSessionDto = z.infer<typeof GetSessionSchema>;
