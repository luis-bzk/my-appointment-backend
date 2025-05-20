import { z } from 'zod';

export const LoginAccountSchema = z.object({
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

  password: z.string().min(1, 'El password del usuario es requerido'),
});

export type LoginAccountDto = z.infer<typeof LoginAccountSchema>;
