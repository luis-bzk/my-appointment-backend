import { z } from 'zod';

export const GetUsersByIdsSchema = z.object({
  ids: z
    .array(
      z
        .number({ required_error: 'El ID del rol es necesario' })
        .refine((val) => !isNaN(val), {
          message: 'El ID del rol no es válido',
        }),
    )
    .min(1, { message: 'Debe haber al menos un ID' }),
});

export type GetUsersByIdsDto = z.infer<typeof GetUsersByIdsSchema>;
