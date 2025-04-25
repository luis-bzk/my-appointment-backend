import { z } from 'zod';

export const DeleteSessionSchema = z.object({
  jwt: z.string().min(1, 'El JWT es necesario'),
});

export type DeleteSessionDto = z.infer<typeof DeleteSessionSchema>;
