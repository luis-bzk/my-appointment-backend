import { z } from 'zod';

export const DeleteUserSchema = z.object({
  id: z
    .string()
    .refine((val) => val !== undefined && val !== '', {
      message: 'El ID del usuario es requerido',
    })
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: 'El ID del usuario no es válido',
    }),
});

export type DeleteUserDto = z.infer<typeof DeleteUserSchema>;

export type DeleteUserParamsDto = {
  id: string;
};
