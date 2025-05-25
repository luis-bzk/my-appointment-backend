import { z } from 'zod';
import { CreateCitySchema } from './create_city.schema';

export const UpdateCitySchema = z.object({
  ...CreateCitySchema.shape,
  id: z
    .string({ required_error: 'El ID de la ciudad es necesario' })
    .refine((val) => !isNaN(parseInt(val)), {
      message: 'El ID de la ciudad no es válido',
    })
    .refine((val) => parseInt(val, 10) >= 1, {
      message: 'El ID de la ciudad no puede ser menor a 1',
    })
    .refine((val) => parseInt(val, 10) <= 10000, {
      message: 'El ID de la ciudad no puede ser mayor a 10000',
    }),
});

export type UpdateCityPortDto = z.infer<typeof UpdateCitySchema>;

export type UpdateCityDto = Omit<UpdateCityPortDto, 'id'> & {
  id: number;
};
