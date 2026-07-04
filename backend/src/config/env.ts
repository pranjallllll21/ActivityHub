import { z } from 'zod';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Environment variable schema — validates and provides type-safe access
 * to all required and optional environment variables.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('7d'),
  ALLOWED_EMAIL_DOMAIN: z.string().default('college.edu.in'),
  FRONTEND_URL: z.string().default('http://localhost:3000'),
  OCR_SERVICE_URL: z.string().default('http://localhost:8000'),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
});

export const env = envSchema.parse(process.env);
