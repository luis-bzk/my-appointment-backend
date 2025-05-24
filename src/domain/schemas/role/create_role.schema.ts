import { z } from 'zod';

export const CreateRoleSchema = z.object({
  name: z
    .string({ required_error: 'EL nombre del rol es requerido' })
    .min(1, 'El nombre del rol es requerido')
    .max(50, 'El nombre del rol no puede tener más de 50 caracteres')
    .transform((s) => s.toLowerCase()),
  description: z
    .string({ required_error: 'La descripción del rol es requerido' })
    .min(1, 'La descripción del rol es requerido')
    .max(200, 'La descripción del rol no puede tener más de 200 caracteres')
    .transform((s) => s.toLowerCase()),
});

export type CreateRoleDto = z.infer<typeof CreateRoleSchema>;
