import { z } from 'zod';

export const UserRoleIdSchema = z.object({
  id: z
    .string({
      required_error: 'El ID del registro es requerido',
    })
    .refine((val) => !isNaN(parseInt(val)), {
      message: 'El ID del registro debe ser un número válido',
    })
    .refine((val) => parseInt(val, 10) >= 1, {
      message: 'El ID del registro no puede ser menor a 1',
    })
    .refine((val) => parseInt(val, 10) <= 100000, {
      message: 'El ID del registro no puede ser mayor a 100000',
    }),
});

export type UserRoleIdPortDto = z.infer<typeof UserRoleIdSchema>;

export type UserRoleIdDto = Omit<UserRoleIdPortDto, 'id'> & {
  id: number;
};
