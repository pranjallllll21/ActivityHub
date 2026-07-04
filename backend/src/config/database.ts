import { PrismaClient } from '@prisma/client';

/**
 * Singleton Prisma client instance.
 * Logs queries in development for debugging, only errors in production.
 */
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

export default prisma;
