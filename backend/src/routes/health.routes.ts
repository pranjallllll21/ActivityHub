import { Router, Request, Response } from 'express';
import prisma from '../config/database';

const router = Router();

/**
 * GET /api/health
 * Health check endpoint — verifies the API server and database connection.
 * Returns 200 if healthy, 503 if the database is unreachable.
 */
router.get('/', async (_req: Request, res: Response) => {
  try {
    // Attempt a simple database query to verify connectivity
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      success: true,
      message: 'ActivityHub API is running',
      timestamp: new Date().toISOString(),
      database: 'connected',
    });
  } catch {
    res.status(503).json({
      success: false,
      message: 'Service unavailable',
      database: 'disconnected',
    });
  }
});

export default router;
