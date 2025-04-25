import { z } from 'zod';

export const SignupUserSchema = z.object({
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

  password: z
    .string()
    .min(8, 'La contraseña debe tener mínimo 8 caracteres')
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
