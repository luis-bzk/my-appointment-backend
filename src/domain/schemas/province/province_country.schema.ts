import { z } from 'zod';

export const ProvinceCountrySchema = z.object({
  id_country: z
    .number({
      required_error: 'El ID del país es requerido',
      invalid_type_error: 'El ID del país debe ser un número válido',
    })
    .int({ message: 'El ID del país debe ser un número entero' })
    .min(1, { message: 'El ID del país debe ser mayor que 0' })
    .max(500, { message: 'El ID del país no puede ser mayor que 500' }),

  id_province: z
    .number({
      required_error: 'El ID de la provincia es requerido',
      invalid_type_error: 'El ID de la provincia debe ser un número válido',
    })
    .int({ message: 'El ID de la provincia debe ser un número entero' })
    .min(1, { message: 'El ID de la provincia debe ser mayor que 0' })
    .max(1000, {
      message: 'El ID de la provincia no puede ser mayor que 1000',
    }),
});

export type ProvinceCountryDto = z.infer<typeof ProvinceCountrySchema>;
