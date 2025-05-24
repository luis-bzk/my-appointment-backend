import { z } from 'zod';

export const CityIdSchema = z.object({
  id: z
    .string({ required_error: 'El ID de la ciudad es requerido' })
    .refine((val) => !isNaN(parseInt(val)), {
      message: 'El ID de la ciudad no es válido',
    }),
});

export type CityIdPortDto = z.infer<typeof CityIdSchema>;

export type CityIdDto = Omit<CityIdPortDto, 'id'> & {
  id: number;
};
