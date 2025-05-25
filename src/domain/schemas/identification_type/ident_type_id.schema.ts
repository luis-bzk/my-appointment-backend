import { z } from 'zod';

export const IdentTypeIdSchema = z.object({
  id: z
    .string({ required_error: 'El ID del tipo de identificación es requerido' })
    .refine((val) => !isNaN(parseInt(val)), {
      message: 'El ID del tipo de identificación no es válido',
    })
    .refine((val) => parseInt(val, 10) >= 1, {
      message: 'El ID del tipo de identificación no puede ser menor a 1',
    })
    .refine((val) => parseInt(val, 10) <= 100, {
      message: 'El ID del tipo de identificación no puede ser mayor a 100',
    }),
});

export type IdentTypeIdPortDto = z.infer<typeof IdentTypeIdSchema>;

export type IdentTypeIdDto = Omit<IdentTypeIdPortDto, 'id'> & {
  id: number;
};
