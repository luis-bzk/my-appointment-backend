import { z } from 'zod';

export const UpdateRoleSchema = z.object({
  id: z
    .string({ required_error: 'El ID del rol es necesario' })
    .refine((val) => !isNaN(parseInt(val)), {
      message: 'El ID del rol no es válido',
    }),

  name: z
    .string({
      required_error: 'El nombre del rol es requerido',
    })
    .max(100, 'El nombre del rol no puede tener más de 100 caracteres')
    .transform((s) => s.toLowerCase()),
  description: z
    .string({
      required_error: 'La descripción del rol es requerida',
    })
    .max(200, 'La descripción del rol no puede tener más de 200 caracteres')
    .transform((s) => s.toLowerCase()),
});

export type UpdateRolePortDto = z.infer<typeof UpdateRoleSchema>;

export type UpdateRoleDto = Omit<UpdateRolePortDto, 'id'> & {
  id: number;
};
