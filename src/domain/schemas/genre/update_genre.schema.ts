import { z } from 'zod';
import { CreateGenreSchema } from './create_genre.schema';

export const UpdateGenreSchema = z.object({
  ...CreateGenreSchema.shape,
  id: z
    .string({ required_error: 'El ID del género es necesario' })
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

export type UpdateGenrePortDto = z.infer<typeof UpdateGenreSchema>;

export type UpdateGenreDto = Omit<UpdateGenrePortDto, 'id'> & {
  id: number;
};
