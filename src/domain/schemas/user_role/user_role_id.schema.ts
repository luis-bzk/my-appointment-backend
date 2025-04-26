import { z } from 'zod';

export const UserRoleIdSchema = z.object({
  id: z
    .string({
      required_error: 'El ID del registro es requerido',
    })
    .refine((val) => !isNaN(parseInt(val)), {
      message: 'El ID del registro debe ser un número válido',
    }),
});

export type UserRoleIdPortDto = z.infer<typeof UserRoleIdSchema>;

export type UserRoleIdDto = Omit<UserRoleIdPortDto, 'id'> & {
  id: number;
};
