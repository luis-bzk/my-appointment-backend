import { z } from 'zod';

export const GetUserSchema = z.object({
  id: z
    .string({ required_error: 'El ID del usuario es requerido' })
    .refine((val) => !isNaN(parseInt(val)), {
      message: 'El ID del usuario no es válido',
    }),
});

export type GetUserParamsDto = z.infer<typeof GetUserSchema>;

export type GetUserDto = Omit<GetUserParamsDto, 'id'> & {
  id: number;
};
