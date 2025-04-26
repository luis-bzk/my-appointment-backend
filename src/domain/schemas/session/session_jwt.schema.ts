import { z } from 'zod';

export const SessionJwtSchema = z.object({
  jwt: z.string().min(1, 'El token de sesión es requerido'),
});

export type SessionJwtDto = z.infer<typeof SessionJwtSchema>;
