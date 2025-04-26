import { z } from 'zod';

export const UserIdSchema = z.object({
  id: z
    .string({ required_error: 'El ID del usuario es requerido' })
    .refine((val) => !isNaN(parseInt(val)), {
      message: 'El ID del usuario no es válido',
    }),
});

export type UserIdPortDto = z.infer<typeof UserIdSchema>;

export type UserIdDto = Omit<UserIdPortDto, 'id'> & {
  id: number;
};
