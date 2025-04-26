import { z } from 'zod';

export const GetAllUserRolesSchema = z.object({
  limit: z
    .string()
    .optional()
    .refine((val) => val && !isNaN(parseInt(val)), {
      message: 'El parámetro "limit" debe ser un número válido',
    }),

  offset: z
    .string()
    .optional()
    .refine((val) => val && !isNaN(parseInt(val)), {
      message: 'El parámetro "offset" debe ser un número válido',
    }),
});

export type GetAllUsersRolesPortDto = z.infer<typeof GetAllUserRolesSchema>;

export type GetAllUsersRolesDto = Omit<
  GetAllUsersRolesPortDto,
  'limit' | 'offset'
> & {
  limit: number;
  offset: number;
};
