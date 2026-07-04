import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import type { SignOptions } from 'jsonwebtoken';

/**
 * JWT payload structure used throughout the application.
 * Embedded in every authenticated request via the auth middleware.
 */
export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

/**
 * Generate a signed JWT token with the given payload.
 * Token expiry is configured via the JWT_EXPIRES_IN environment variable.
 */
export function generateToken(payload: JwtPayload): string {
  const options: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
  };

  return jwt.sign(payload, env.JWT_SECRET, options);
}

/**
 * Verify and decode a JWT token.
 * Throws if the token is invalid or expired.
 */
export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
}
