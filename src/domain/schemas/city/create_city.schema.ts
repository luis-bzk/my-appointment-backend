import { z } from 'zod';

export const CreateCitySchema = z.object({
  name: z
    .string({ required_error: 'El nombre de la ciudad es requerido' })
    .min(1, 'El nombre de la ciudad es requerido')
    .max(100, 'El nombre de la ciudad no puede tener más de 100 caracteres')
    .transform((s) => s.toLowerCase()),
  id_country: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        if (/^\d+$/.test(val)) {
          return Number(val);
        } else {
          return NaN;
        }
      }
      return val;
    },
    z
      .number({
        required_error: 'El ID del país es requerido',
        invalid_type_error: 'El ID del país debe ser un número válido',
      })
      .int('El ID del país debe ser un número entero')
      .min(1, 'El ID del país debe ser mayor que 0')
      .max(500, 'El ID del país debe ser menor o igual a 500'),
  ),
  id_province: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        if (/^\d+$/.test(val)) {
          return Number(val);
        } else {
          return NaN;
        }
      }
      return val;
    },
    z
      .number({
        required_error: 'El ID de la provincia es requerido',
        invalid_type_error: 'El ID de la provincia debe ser un número válido',
      })
      .int('El ID de la provincia debe ser un número entero')
      .min(1, 'El ID de la provincia debe ser mayor que 0')
      .max(5000, 'El ID de la provincia debe ser menor o igual a 5000'),
  ),
});

export type CreateCityDto = z.infer<typeof CreateCitySchema>;
