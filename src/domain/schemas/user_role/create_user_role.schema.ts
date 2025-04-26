import { z } from 'zod';

export const CreateUserRoleSchema = z.object({
  id_user: z.coerce.number({
    required_error: 'El ID del usuario es necesario',
    invalid_type_error: 'El ID del usuario debe ser un número válido',
  }),
  id_role: z.coerce.number({
    required_error: 'El ID del rol es necesario',
    invalid_type_error: 'El ID del rol debe ser un número válido',
  }),
});

export type CreateUserRoleDto = z.infer<typeof CreateUserRoleSchema>;
