import { z } from 'zod';

export const ProvinceIdSchema = z.object({
  id: z
    .string({ required_error: 'El ID de la provincia es requerido' })
    .refine((val) => !isNaN(parseInt(val)), {
      message: 'El ID de la provincia no es válido',
    }),
});

export type ProvinceIdPortDto = z.infer<typeof ProvinceIdSchema>;

export type ProvinceIdDto = Omit<ProvinceIdPortDto, 'id'> & {
  id: number;
};
