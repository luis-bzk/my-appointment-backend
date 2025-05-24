import { z } from 'zod';

export const RecoverPasswordSchema = z.object({
  email: z
    .string({ required_error: 'El email del usuario es requerido' })
    .max(100, 'El email del usuario no puede tener más de 100 caracteres')
    .min(1, 'El email del usuario es requerido')
    .email('El email ingresado no es válido')
    .transform((e) => e.toLowerCase()),
});

export type RecoverPasswordDto = z.infer<typeof RecoverPasswordSchema>;
