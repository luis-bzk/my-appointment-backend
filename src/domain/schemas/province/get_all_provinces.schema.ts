import { z } from 'zod';
import { GetAllFiltersSchema } from '../general';

export const GetAllProvincesSchema = z.object({
  ...GetAllFiltersSchema.shape,
  id_country: z
    .string()
    .optional()
    .refine((val) => val === undefined || !isNaN(parseInt(val)), {
      message: 'El parámetro "id country" debe ser un número válido',
    }),
});

export type GetAllProvincesPortDto = z.infer<typeof GetAllProvincesSchema>;

export type GetAllProvincesDto = Omit<
  GetAllProvincesPortDto,
  'limit' | 'offset' | 'id_country'
> & {
  limit?: number;
  offset?: number;
  id_country?: number;
};
