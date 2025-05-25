import { z } from 'zod';
import { CreateUserSchema } from './create_user.schema';

export const UpdateUserSchema = z.object({
  ...CreateUserSchema.shape,
  id: z
    .string({ required_error: 'El ID del usuario es necesario' })
    .refine((val) => !isNaN(parseInt(val)), {
      message: 'El ID del usuario no es válido',
    })
    .refine((val) => parseInt(val, 10) >= 1, {
      message: 'El ID del usuario no puede ser menor a 1',
    })
    .refine((val) => parseInt(val, 10) <= 50000, {
      message: 'El ID del usuario no puede ser mayor a 50000',
    }),
});

export type UpdateUserParamsDto = z.infer<typeof UpdateUserSchema>;

export type UpdateUserDto = Omit<UpdateUserParamsDto, 'id'> & {
  id: number;
};
