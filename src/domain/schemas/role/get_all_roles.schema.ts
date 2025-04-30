import { z } from 'zod';

export const GetAllRolesSchema = z.object({
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
});

export type GetAllRolesPortDto = z.infer<typeof GetAllRolesSchema>;

export type GetAllRolesDto = Omit<GetAllRolesPortDto, 'limit' | 'offset'> & {
  limit: number;
  offset: number;
};
