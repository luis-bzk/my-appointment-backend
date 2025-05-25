import { z } from 'zod';
import { CreateIdentTypeSchema } from './create_identification_type.schema';

export const UpdateIdentTypeSchema = z.object({
  ...CreateIdentTypeSchema.shape,
  id: z
    .string({ required_error: 'El ID del tipo de identificación es necesario' })
    .refine((val) => !isNaN(parseInt(val)), {
      message: 'El ID del tipo de identificación no es válido',
    })
    .refine((val) => parseInt(val, 10) >= 1, {
      message: 'El ID del tipo de identificación no puede ser menor a 1',
    })
    .refine((val) => parseInt(val, 10) <= 100, {
      message: 'El ID del tipo de identificación no puede ser mayor a 100',
    }),
});

export type UpdateIdentTypePortDto = z.infer<typeof UpdateIdentTypeSchema>;

export type UpdateIdentTypeDto = Omit<UpdateIdentTypePortDto, 'id'> & {
  id: number;
};
