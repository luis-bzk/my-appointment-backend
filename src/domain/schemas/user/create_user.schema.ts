import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z
    .string({ required_error: 'El nombre del usuario es requerido' })
    .max(100, 'El nombre del usuario no puede tener más de 100 caracteres')
    .transform((s) => s.toLowerCase()),
  last_name: z
    .string({ required_error: 'El apellido del usuario es requerido' })
    .max(100, 'El apellido del usuario no puede tener más de 100 caracteres')
    .transform((s) => s.toLowerCase()),
  email: z
    .string({ required_error: 'El email del usuario es requerido' })
    .max(100, 'El email del usuario no puede tener más de 100 caracteres')
    .email('El email del usuario no es válido')
    .transform((s) => s.toLowerCase()),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
