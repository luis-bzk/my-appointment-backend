import { z } from 'zod';

export const GetAllUsersSchema = z.object({
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

export type GetAllUsersPortDto = z.infer<typeof GetAllUsersSchema>;

export type GetAllUsersDto = Omit<GetAllUsersPortDto, 'limit' | 'offset'> & {
  limit: number;
  offset: number;
};
