import { z } from 'zod';

export const RoleIdSchema = z.object({
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

export type RoleIdPortDto = z.infer<typeof RoleIdSchema>;

export type RoleIdDto = Omit<RoleIdPortDto, 'id'> & {
  id: number;
};
