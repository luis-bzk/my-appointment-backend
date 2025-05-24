import { z } from 'zod';
import { CreateProvinceSchema } from './create_province.schema';

export const UpdateProvinceSchema = z.object({
  ...CreateProvinceSchema.shape,
  id: z
    .string({ required_error: 'El ID de la provincia es necesario' })
    .refine((val) => !isNaN(parseInt(val)), {
      message: 'El ID de la provincia no es válido',
    }),
});

export type UpdateProvincePortDto = z.infer<typeof UpdateProvinceSchema>;

export type UpdateProvinceDto = Omit<UpdateProvincePortDto, 'id'> & {
  id: number;
};
