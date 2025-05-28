import { z } from 'zod';

export const CreateNotificationTypeSchema = z.object({
  name: z
    .string({
      required_error: 'El nombre del tipo de notificación es requerido',
    })
    .min(1, 'El nombre del tipo de notificación no puede estar vacío')
    .max(
      50,
      'El nombre del tipo de notificación no puede tener más de 50 caracteres',
    )
    .transform((s) => s.toLowerCase()),
  description: z
    .string({
      required_error: 'La descripción del tipo de notificación es requerido',
    })
    .min(1, 'La descripción del tipo de notificación no puede estar vacío')
    .max(
      100,
      'La descripción del tipo de notificación no puede tener más de 100 caracteres',
    )
    .transform((s) => s.toLowerCase()),
});

export type CreateNotificationTypeDto = z.infer<
  typeof CreateNotificationTypeSchema
>;
