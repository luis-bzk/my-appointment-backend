import { z } from 'zod';

export const CountryIdSchema = z.object({
  id: z
    .string({ required_error: 'El ID del país es requerido' })
    .refine((val) => !isNaN(parseInt(val)), {
      message: 'El ID del país no es válido',
    })
    .refine((val) => parseInt(val, 10) >= 1, {
      message: 'El ID del país no puede ser menor a 1',
    })
    .refine((val) => parseInt(val, 10) <= 500, {
      message: 'El ID del país no puede ser mayor a 500',
    }),
});

export type CountryIdPortDto = z.infer<typeof CountryIdSchema>;

export type CountryIdDto = Omit<CountryIdPortDto, 'id'> & {
  id: number;
};
