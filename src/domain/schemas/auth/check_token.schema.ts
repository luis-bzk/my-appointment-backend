import { z } from 'zod';

export const CheckTokenSchema = z.object({
  token: z.string().min(1, 'El token de seguridad es requerido.'),
});

export type CheckTokenDto = z.infer<typeof CheckTokenSchema>;
