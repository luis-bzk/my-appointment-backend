import { z } from 'zod';

export const CountryIdSchema = z.object({
  id: z
    .string({ required_error: 'El ID del país es requerido' })
    .refine((val) => !isNaN(parseInt(val)), {
      message: 'El ID del país no es válido',
    }),
});

export type CountryIdPortDto = z.infer<typeof CountryIdSchema>;

export type CountryIdDto = Omit<CountryIdPortDto, 'id'> & {
  id: number;
};
