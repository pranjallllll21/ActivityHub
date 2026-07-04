import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import prisma from '../config/database';
import { generateToken } from '../utils/jwt';
import { successResponse } from '../utils/response';
import { env } from '../config/env';
import { authenticate } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

const router = Router();

// ─── Validation Schemas ─────────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['STUDENT', 'COMMITTEE', 'FACULTY', 'HOD']).default('STUDENT'),
  department: z.string().min(1, 'Department is required'),
  division: z.string().optional(),
  rollNo: z.string().optional(),
});

// ─── Routes ─────────────────────────────────────────────────────────────────────

/**
 * POST /api/auth/register
 * Register a new user. Only emails matching the allowed domain can register.
 * Passwords are hashed with bcrypt (12 salt rounds).
 * Returns the created user (without password) and a JWT token.
 */
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = registerSchema.parse(req.body);

    // Validate email domain against the allowed institutional domain
    const emailDomain = data.email.split('@')[1];
    if (emailDomain !== env.ALLOWED_EMAIL_DOMAIN) {
      throw new AppError(`Only @${env.ALLOWED_EMAIL_DOMAIN} emails are allowed`, 400);
    }

    // Check for existing user with the same email
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      throw new AppError('Email already registered', 409);
    }

    // Hash password and create user
    const passwordHash = await bcrypt.hash(data.password, 12);
    const { password: _password, ...userData } = data;
    const user = await prisma.user.create({
      data: {
        ...userData,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        division: true,
        rollNo: true,
      },
    });

    // Generate JWT token for immediate login after registration
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    successResponse(res, { user, token }, 'Registration successful', 201);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/auth/login
 * Authenticate a user with email and password.
 * Returns user profile (without password) and a JWT token.
 */
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = loginSchema.parse(req.body);

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    // Verify password
    const valid = await bcrypt.compare(data.password, user.passwordHash);
    if (!valid) {
      throw new AppError('Invalid credentials', 401);
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    successResponse(res, {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
      },
      token,
    }, 'Login successful');
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/auth/me
 * Get the currently authenticated user's profile.
 * Requires a valid JWT token in the Authorization header.
 */
router.get('/me', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        division: true,
        rollNo: true,
        avatar: true,
      },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    successResponse(res, user);
  } catch (error) {
    next(error);
  }
});

export default router;
