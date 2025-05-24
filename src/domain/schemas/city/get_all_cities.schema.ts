import { z } from 'zod';
import { GetAllFiltersSchema } from '../general';

export const GetAllCitiesSchema = z.object({
  ...GetAllFiltersSchema.shape,
  id_country: z
    .string()
    .optional()
    .refine((val) => val === undefined || !isNaN(parseInt(val)), {
      message: 'El parámetro "id country" debe ser un número válido',
    }),
  id_province: z
    .string()
    .optional()
    .refine((val) => val === undefined || !isNaN(parseInt(val)), {
      message: 'El parámetro "id province" debe ser un número válido',
    }),
});

export type GetAllCitiesPortDto = z.infer<typeof GetAllCitiesSchema>;

export type GetAllCitiesDto = Omit<
  GetAllCitiesPortDto,
  'limit' | 'offset' | 'id_country' | 'id_province'
> & {
  limit?: number;
  offset?: number;
  id_country?: number;
  id_province?: number;
};
