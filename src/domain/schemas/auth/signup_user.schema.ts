import { z } from 'zod';

export const SignupUserSchema = z.object({
  name: z
    .string({ required_error: 'El nombre del usuario es requerido' })
    .min(1, 'El nombre del usuario es requerido')
    .max(50, 'El nombre del usuario no puede tener más de 50 caracteres')
    .transform((s) => s.toLowerCase()),

  last_name: z
    .string({ required_error: 'El apellido del usuario es requerido' })
    .min(1, 'El apellido del usuario es requerido')
    .max(50, 'El apellido del usuario no puede tener más de 50 caracteres')
    .transform((s) => s.toLowerCase()),

  email: z
    .string({ required_error: 'El email del usuario es requerido' })
    .min(1, 'El email del usuario es requerido')
    .max(100, 'El email del usuario no puede tener más de 100 caracteres')
    .email('El email no es válido')
    .transform((s) => s.toLowerCase()),

  password: z
    .string({ required_error: 'La contraseña es requerida' })
    .min(8, 'La contraseña debe tener mínimo 8 caracteres')
    .max(50, 'La contraseña no puede tener más de 50 caracteres')
    .refine((val) => /[a-z]/.test(val), {
      message: 'La contraseña debe tener letras minúsculas',
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: 'La contraseña debe tener letras mayúsculas',
    })
    .refine((val) => /[0-9]/.test(val), {
      message: 'La contraseña debe tener números',
    })
    .refine((val) => /[\W_]/.test(val), {
      message: 'La contraseña debe tener caracteres especiales',
    }),
});

export type SignupUserDto = z.infer<typeof SignupUserSchema>;
