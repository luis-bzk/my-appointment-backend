import { z } from 'zod';

export const RoleIdSchema = z.object({
  id: z
    .string({ required_error: 'El ID del rol es necesario' })
    .refine((val) => !isNaN(parseInt(val)), {
      message: 'El ID del rol no es válido',
    }),
});

export type RoleIdPortDto = z.infer<typeof RoleIdSchema>;

export type RoleIdDto = Omit<RoleIdPortDto, 'id'> & {
  id: number;
};
