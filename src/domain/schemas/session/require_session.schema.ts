// src/domain/schemas/require-session.schema.ts
import { z } from 'zod';

export const RequireSessionSchema = z.object({
  jwt: z.string().min(1, 'El token de sesión es requerido'),
});

export type RequireSessionDto = z.infer<typeof RequireSessionSchema>;
