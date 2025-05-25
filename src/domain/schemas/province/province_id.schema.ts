import { z } from 'zod';

export const ProvinceIdSchema = z.object({
  id: z
    .string({ required_error: 'El ID de la provincia es requerido' })
    .refine((val) => !isNaN(parseInt(val)), {
      message: 'El ID de la provincia no es válido',
    })
    .refine((val) => parseInt(val, 10) >= 1, {
      message: 'El ID de la provincia no puede ser menor a 1',
    })
    .refine((val) => parseInt(val, 10) <= 5000, {
      message: 'El ID de la provincia no puede ser mayor a 5000',
    }),
});

export type ProvinceIdPortDto = z.infer<typeof ProvinceIdSchema>;

export type ProvinceIdDto = Omit<ProvinceIdPortDto, 'id'> & {
  id: number;
};
