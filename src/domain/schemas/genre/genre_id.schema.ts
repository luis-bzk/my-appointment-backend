import { z } from 'zod';

export const GenreIdSchema = z.object({
  id: z
    .string({ required_error: 'El ID del género es requerido' })
    .refine((val) => !isNaN(parseInt(val)), {
      message: 'El ID del género no es válido',
    })
    .refine((val) => parseInt(val, 10) >= 1, {
      message: 'El ID del género no puede ser menor a 1',
    })
    .refine((val) => parseInt(val, 10) <= 100, {
      message: 'El ID del género no puede ser mayor a 100',
    }),
});

export type GenreIdPortDto = z.infer<typeof GenreIdSchema>;

export type GenreIdDto = Omit<GenreIdPortDto, 'id'> & {
  id: number;
};
