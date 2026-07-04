import { Router } from 'express';
import healthRoutes from './health.routes';
import authRoutes from './auth.routes';

const router = Router();

// Health check endpoint
router.use('/health', healthRoutes);

// Authentication routes (register, login, profile)
router.use('/auth', authRoutes);

// TODO: Phase 2 - Event routes
// router.use('/events', eventRoutes);

// TODO: Phase 3 - Attendance routes
// router.use('/attendance', attendanceRoutes);

// TODO: Phase 4 - Certificate routes
// router.use('/certificates', certificateRoutes);

// TODO: Phase 5 - Credit routes
// router.use('/credits', creditRoutes);

// TODO: Phase 6 - Report routes
// router.use('/reports', reportRoutes);

// TODO: Phase 7 - Notification routes
// router.use('/notifications', notificationRoutes);

export default router;
