import { z } from 'zod';

export const UpdateCountrySchema = z.object({
  id: z
    .string({ required_error: 'El ID del país es necesario' })
    .refine((val) => !isNaN(parseInt(val)), {
      message: 'El ID del país no es válido',
    }),
  name: z
    .string({ required_error: 'El nombre del país es requerido' })
    .min(1, 'El nombre del país no puede estar vacío')
    .max(100, 'El nombre del país no puede tener más de 100 caracteres')
    .transform((s) => s.toLowerCase()),
  code: z
    .string({ required_error: 'El código del país es requerido' })
    .min(1, 'El código del país no puede estar vacío')
    .max(10, 'El código del país no puede tener más de 10 caracteres')
    .transform((s) => s.toLowerCase()),
  prefix: z
    .string({ required_error: 'El prefijo del país es requerido' })
    .min(1, 'El prefijo del país no puede estar vacío')
    .max(10, 'El prefijo del país no puede tener más de 10 caracteres')
    .transform((s) => s.toLowerCase()),
});

export type UpdateCountryPortDto = z.infer<typeof UpdateCountrySchema>;

export type UpdateCountryDto = Omit<UpdateCountryPortDto, 'id'> & {
  id: number;
};
