import { z } from 'zod';

export const CreateGenreSchema = z.object({
  name: z
    .string({ required_error: 'El nombre es requerido' })
    .min(1, 'El nombre es requerido')
    .max(50, 'El nombre no puede tener más de 50 caracteres')
    .transform((s) => s.toLowerCase()),
  description: z
    .string({ required_error: 'La descripción es requerida' })
    .min(1, 'La descripción es requerida')
    .max(100, 'La descripción no puede tener más de 100 caracteres')
    .transform((s) => s.toLowerCase()),
  abbreviation: z
    .string({ required_error: 'La abreviación es requerida' })
    .min(1, 'La abreviación es requerida')
    .max(10, 'La abreviación no puede tener más de 10 caracteres')
    .transform((s) => s.toLowerCase()),
});

export type CreateGenreDto = z.infer<typeof CreateGenreSchema>;
