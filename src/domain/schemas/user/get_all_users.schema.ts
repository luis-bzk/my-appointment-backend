import { z } from 'zod';

export const GetAllUsersSchema = z.object({
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .refine((val) => val === undefined || !isNaN(val), {
      message: 'El parámetro "limit" debe ser un número válido',
    }),

  offset: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .refine((val) => val === undefined || !isNaN(val), {
      message: 'El parámetro "offset" debe ser un número válido',
    }),
});

export type GetAllUsersDto = z.infer<typeof GetAllUsersSchema>;
