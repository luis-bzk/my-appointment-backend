import { z } from 'zod';

export const ChangePasswordSchema = z.object({
  token: z.string().min(1, 'El token de verificación es requerido'),

  password: z
    .string()
    .min(8, 'La contraseña del usuario debe tener mínimo 8 caracteres')
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

export type ChangePasswordDto = z.infer<typeof ChangePasswordSchema>;
