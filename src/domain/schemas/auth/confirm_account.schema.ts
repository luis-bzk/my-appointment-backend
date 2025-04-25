import { z } from 'zod';

export const ConfirmAccountSchema = z.object({
  token: z.string().min(1, 'El token de seguridad es requerido.'),
});

export type ConfirmAccountDto = z.infer<typeof ConfirmAccountSchema>;
