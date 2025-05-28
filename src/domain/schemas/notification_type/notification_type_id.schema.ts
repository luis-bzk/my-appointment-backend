import { z } from 'zod';

export const NotificationTypeIdSchema = z.object({
  id: z
    .string({ required_error: 'El ID del tipo de notificación es requerido' })
    .refine((val) => !isNaN(parseInt(val)), {
      message: 'El ID del tipo de notificación no es válido',
    })
    .refine((val) => parseInt(val, 10) >= 1, {
      message: 'El ID del tipo de notificación no puede ser menor a 1',
    })
    .refine((val) => parseInt(val, 10) <= 500, {
      message: 'El ID del tipo de notificación no puede ser mayor a 500',
    }),
});

export type NotificationTypeIdPortDto = z.infer<
  typeof NotificationTypeIdSchema
>;

export type NotificationTypeIdDto = Omit<NotificationTypeIdPortDto, 'id'> & {
  id: number;
};
