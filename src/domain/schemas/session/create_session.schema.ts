import { z } from 'zod';

export const CreateSessionSchema = z.object({
  // jwt: z.string().min(1, 'El JWT es necesario'),
  id_user: z.number({
    invalid_type_error: 'El ID del usuario debe ser numérico',
  }),
  expire_date: z.coerce.date({
    required_error: 'La fecha de expiración es necesaria',
    invalid_type_error: 'La fecha de expiración no es válida',
  }),
  ip: z.string().min(1, 'La IP es necesaria'),
  user_agent: z.string().min(1, 'El user agent es necesario'),
});

export type CreateSessionDto = z.infer<typeof CreateSessionSchema>;

export type CreateSessionJwtDto = CreateSessionDto & { jwt: string };
