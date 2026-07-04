import { Response } from 'express';

/**
 * Send a standardized success response.
 * All successful API responses follow this format for consistency.
 */
export function successResponse(res: Response, data: any, message = 'Success', statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

/**
 * Send a standardized error response.
 * All error API responses follow this format for consistency.
 */
export function errorResponse(res: Response, message = 'Error', statusCode = 500, errors?: any) {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
}
