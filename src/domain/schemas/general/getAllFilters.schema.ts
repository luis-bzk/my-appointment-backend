import { z } from 'zod';

export const GetAllFiltersSchema = z.object({
  limit: z
    .string()
    .optional()
    .refine((val) => val === undefined || !isNaN(parseInt(val)), {
      message: 'El parámetro "limit" debe ser un número válido',
    }),

  offset: z
    .string()
    .optional()
    .refine((val) => val === undefined || !isNaN(parseInt(val)), {
      message: 'El parámetro "offset" debe ser un número válido',
    }),
  filter: z
    .string()
    .max(50, { message: 'El filtro no puede tener más de 50 caracteres' })
    .optional(),
});

export type GetAllFiltersPortDto = z.infer<typeof GetAllFiltersSchema>;

export type GetAllFiltersDto = Omit<
  GetAllFiltersPortDto,
  'limit' | 'offset'
> & {
  limit?: number;
  offset?: number;
};
