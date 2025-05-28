import { z } from 'zod';
import { CreatePhoneTypeSchema } from './create_phone_type.schema';

export const UpdatePhoneTypeSchema = z.object({
  ...CreatePhoneTypeSchema.shape,
  id: z
    .string({ required_error: 'El ID del tipo de teléfono es necesario' })
    .refine((val) => !isNaN(parseInt(val)), {
      message: 'El ID del tipo de teléfono no es válido',
    })
    .refine((val) => parseInt(val, 10) >= 1, {
      message: 'El ID del tipo de teléfono no puede ser menor a 1',
    })
    .refine((val) => parseInt(val, 10) <= 500, {
      message: 'El ID del tipo de teléfono no puede ser mayor a 500',
    }),
});

export type UpdatePhoneTypePortDto = z.infer<typeof UpdatePhoneTypeSchema>;

export type UpdatePhoneTypeDto = Omit<UpdatePhoneTypePortDto, 'id'> & {
  id: number;
};
