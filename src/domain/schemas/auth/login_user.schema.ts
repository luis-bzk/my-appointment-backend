import { z } from 'zod';

export const LoginUserSchema = z.object({
  email: z
    .string({ required_error: 'El email del usuario es requerido' })
    .email('El email no es válido'),
  password: z.string({
    required_error: 'La contraseña del usuario es requerida',
  }),
});

export type LoginUserDto = z.infer<typeof LoginUserSchema>;
