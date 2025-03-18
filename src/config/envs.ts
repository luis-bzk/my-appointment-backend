process.loadEnvFile();

import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().default('3000').transform(Number),
  JWT_SEED: z.string(),
  FRONTEND_URL: z.string().default('http://localhost:5173'),
  SYSTEM_NAME: z.string().default('Sistema'),
  DB_USER: z.string(),
  DB_HOST: z.string(),
  DB_DATABASE: z.string(),
  DB_PASSWORD: z.string(),
  DB_PORT: z.string().transform(Number),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string(),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('❌ Environment validation failed:');
  console.error(env.error.format());
  process.exit(1);
}

export const EnvConfig = () => ({
  PORT: env.data.PORT,
  JWT_SEED: env.data.JWT_SEED,
  FRONTEND_URL: env.data.FRONTEND_URL,
  SYSTEM_NAME: env.data.SYSTEM_NAME,
  DB_USER: env.data.DB_USER,
  DB_HOST: env.data.DB_HOST,
  DB_DATABASE: env.data.DB_DATABASE,
  DB_PASSWORD: env.data.DB_PASSWORD,
  DB_PORT: env.data.DB_PORT,
  SMTP_HOST: env.data.SMTP_HOST,
  SMTP_PORT: env.data.SMTP_PORT,
  SMTP_USER: env.data.SMTP_USER,
  SMTP_PASS: env.data.SMTP_PASS,
});
