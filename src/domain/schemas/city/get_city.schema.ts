import { z } from 'zod';

export const CityIdSchema = z.object({
  id: z
    .string({ required_error: 'El ID de la ciudad es requerido' })
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

export type CityIdPortDto = z.infer<typeof CityIdSchema>;

export type CityIdDto = Omit<CityIdPortDto, 'id'> & {
  id: number;
};
