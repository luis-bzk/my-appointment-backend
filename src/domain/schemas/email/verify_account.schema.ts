import { z } from 'zod';

export const VerifyAccountSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre del usuario es requerido')
    .transform((s) => s.toLowerCase()),

  last_name: z
    .string()
    .min(1, 'El apellido del usuario es requerido')
    .transform((s) => s.toLowerCase()),

  email: z
    .string()
    .min(1, 'El email del usuario es requerido')
    .email('El email no es válido')
    .transform((s) => s.toLowerCase()),

  token: z.string().min(1, 'El token del usuario es requerido'),
});

export type VerifyAccountDto = z.infer<typeof VerifyAccountSchema>;
