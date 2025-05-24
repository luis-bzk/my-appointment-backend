import { z } from 'zod';

export const CheckTokenSchema = z.object({
  token: z
    .string({ required_error: 'El token de seguridad es requerido' })
    .min(1, 'El token de seguridad es requerido.')
    .max(100, 'El token de seguridad no puede tener más de 100 caracteres'),
});

export type CheckTokenDto = z.infer<typeof CheckTokenSchema>;
