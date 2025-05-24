import { z } from 'zod';
import { CreateCountrySchema } from './create_country.schema';

export const UpdateCountrySchema = z.object({
  ...CreateCountrySchema.shape,
  id: z
    .string({ required_error: 'El ID del país es necesario' })
    .refine((val) => !isNaN(parseInt(val)), {
      message: 'El ID del país no es válido',
    }),
});

export type UpdateCountryPortDto = z.infer<typeof UpdateCountrySchema>;

export type UpdateCountryDto = Omit<UpdateCountryPortDto, 'id'> & {
  id: number;
};
