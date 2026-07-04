import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

/**
 * Custom application error class.
 * Includes an HTTP status code for proper API error responses.
 */
export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    // Restore prototype chain (needed for instanceof checks with TS)
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/**
 * Global error handling middleware.
 * Catches all errors thrown in route handlers and sends appropriate responses.
 * Handles AppError (custom), ZodError (validation), and generic errors.
 */
export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  console.error('[Error]', err);

  // Handle custom application errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: err.issues,
    });
  }

  // Handle unknown/unexpected errors
  return res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
}
