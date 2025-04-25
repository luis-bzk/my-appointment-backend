import { z } from 'zod';

export const GoogleAuthSchema = z.object({
  email: z.string().min(1, 'El email es requerido.'),
  name: z.string().min(1, 'El nombre es requerido.'),
  given_name: z.string().optional(),
  picture: z.string().min(1, 'La foto es requerida.'),
  id: z.string().min(1, 'El ID es requerido.'),
});

export type GoogleAuthDto = z.infer<typeof GoogleAuthSchema>;
