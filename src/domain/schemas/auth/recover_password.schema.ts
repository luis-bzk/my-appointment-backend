import { z } from 'zod';

export const RecoverPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'El email del usuario es requerido')
    .email('El email ingresado no es válido')
    .transform((e) => e.toLowerCase()),
});

export type RecoverPasswordDto = z.infer<typeof RecoverPasswordSchema>;
