import { z } from 'zod';

export const CreateIdentTypeSchema = z.object({
  name: z
    .string({ required_error: 'El nombre es requerido' })
    .min(1, 'El nombre es requerido')
    .max(50, 'El nombre no puede tener más de 50 caracteres')
    .transform((s) => s.toLowerCase()),
  description: z
    .string({ required_error: 'La descripción es requerida' })
    .min(1, 'La descripción es requerida')
    .max(100, 'La descripción no puede tener más de 100 caracteres')
    .transform((s) => s.toLowerCase()),
  abbreviation: z
    .string({ required_error: 'La abreviación es requerida' })
    .min(1, 'La abreviación es requerida')
    .max(10, 'La abreviación no puede tener más de 10 caracteres')
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
});

export type CreateIdentTypeDto = z.infer<typeof CreateIdentTypeSchema>;
