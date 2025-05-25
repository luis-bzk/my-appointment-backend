import { z } from 'zod';
import { CreateRoleSchema } from './create_role.schema';

export const UpdateRoleSchema = z.object({
  ...CreateRoleSchema.shape,
  id: z
    .string({ required_error: 'El ID del rol es necesario' })
    .refine((val) => !isNaN(parseInt(val)), {
      message: 'El ID del rol no es válido',
    })
    .refine((val) => parseInt(val, 10) >= 1, {
      message: 'El ID del rol no puede ser menor a 1',
    })
    .refine((val) => parseInt(val, 10) <= 50, {
      message: 'El ID del rol no puede ser mayor a 50',
    }),
});

export type UpdateRolePortDto = z.infer<typeof UpdateRoleSchema>;

export type UpdateRoleDto = Omit<UpdateRolePortDto, 'id'> & {
  id: number;
};
