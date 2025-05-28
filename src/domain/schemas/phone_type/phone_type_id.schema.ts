import { z } from 'zod';

export const PhoneTypeIdSchema = z.object({
  id: z
    .string({ required_error: 'El ID del tipo de teléfono es requerido' })
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

export type PhoneTypeIdPortDto = z.infer<typeof PhoneTypeIdSchema>;

export type PhoneTypeIdDto = Omit<PhoneTypeIdPortDto, 'id'> & {
  id: number;
};
