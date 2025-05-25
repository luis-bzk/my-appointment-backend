import { z } from 'zod';
import { CreateUserRoleSchema } from './create_user_role.schema';

export const UpdateUserRoleSchema = z.object({
  ...CreateUserRoleSchema.shape,
  id: z
    .string({ required_error: 'El ID del registro es necesario' })
    .refine((val) => !isNaN(parseInt(val)), {
      message: 'El ID del registro no es válido',
    })
    .refine((val) => parseInt(val, 10) >= 1, {
      message: 'El ID del registro no puede ser menor a 1',
    })
    .refine((val) => parseInt(val, 10) <= 100000, {
      message: 'El ID del registro no puede ser mayor a 100000',
    }),
});

export type UpdateUserRolePortDto = z.infer<typeof UpdateUserRoleSchema>;

export type UpdateUserRoleDto = Omit<UpdateUserRolePortDto, 'id'> & {
  id: number;
};
