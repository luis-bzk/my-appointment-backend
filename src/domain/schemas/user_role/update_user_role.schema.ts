import { z } from 'zod';

export const UpdateUserRoleSchema = z.object({
  id: z
    .string({ required_error: 'El ID del registro es necesario' })
    .refine((val) => !isNaN(parseInt(val)), {
      message: 'El ID del registro no es válido',
    }),
  id_user: z.coerce.number({
    required_error: 'El ID del usuario es requerido',
    invalid_type_error: 'El ID del usuario debe ser un número válido',
  }),
  id_role: z.coerce.number({
    required_error: 'El ID del rol es requerido',
    invalid_type_error: 'El ID del rol debe ser un número válido',
  }),
});

export type UpdateUserRolePortDto = z.infer<typeof UpdateUserRoleSchema>;

export type UpdateUserRoleDto = Omit<UpdateUserRolePortDto, 'id'> & {
  id: number;
};
