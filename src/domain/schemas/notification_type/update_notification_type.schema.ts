import { z } from 'zod';
import { CreateNotificationTypeSchema } from './create_notification_type.schema';

export const UpdateNotificationTypeSchema = z.object({
  ...CreateNotificationTypeSchema.shape,
  id: z
    .string({ required_error: 'El ID del tipo de notificación es necesario' })
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

export type UpdateNotificationTypePortDto = z.infer<
  typeof UpdateNotificationTypeSchema
>;

export type UpdateNotificationTypeDto = Omit<
  UpdateNotificationTypePortDto,
  'id'
> & {
  id: number;
};
