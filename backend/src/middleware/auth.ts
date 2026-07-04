import { Request, Response, NextFunction } from 'express';
import { verifyToken, JwtPayload } from '../utils/jwt';
import { AppError } from './errorHandler';

// Extend Express Request type to include the authenticated user payload
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

/**
 * Authentication middleware — verifies JWT Bearer token from the Authorization header.
 * Attaches the decoded user payload to `req.user` for downstream handlers.
 */
export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    throw new AppError('Authentication required', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    req.user = verifyToken(token);
    next();
  } catch {
    throw new AppError('Invalid or expired token', 401);
  }
}

/**
 * Authorization middleware factory — restricts access to specific roles.
 * Must be used AFTER the `authenticate` middleware.
 *
 * @param roles - Allowed roles for this route (e.g., 'HOD', 'FACULTY')
 *
 * @example
 * router.get('/admin', authenticate, authorize('HOD', 'FACULTY'), handler);
 */
export function authorize(...roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }
    if (!roles.includes(req.user.role)) {
      throw new AppError('Insufficient permissions', 403);
    }
    next();
  };
}
