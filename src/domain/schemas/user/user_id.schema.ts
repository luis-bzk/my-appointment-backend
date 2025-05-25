import { z } from 'zod';

export const UserIdSchema = z.object({
  id: z
    .string({ required_error: 'El ID del usuario es requerido' })
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

export type UserIdPortDto = z.infer<typeof UserIdSchema>;

export type UserIdDto = Omit<UserIdPortDto, 'id'> & {
  id: number;
};
