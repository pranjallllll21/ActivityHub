import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import { requestLogger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';

const app = express();

// ─── Security Middleware ────────────────────────────────────────────────────────
app.use(helmet()); // Set security-related HTTP headers
app.use(cors({ origin: env.FRONTEND_URL, credentials: true })); // CORS for frontend

// ─── Body Parsing Middleware ────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' })); // Parse JSON payloads (up to 10MB for file uploads)
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads

// ─── Logging Middleware ─────────────────────────────────────────────────────────
app.use(requestLogger); // HTTP request logger

// ─── API Routes ─────────────────────────────────────────────────────────────────
app.use('/api', routes);

// ─── Global Error Handler (must be registered last) ─────────────────────────────
app.use(errorHandler);

// ─── Start Server ───────────────────────────────────────────────────────────────
app.listen(env.PORT, () => {
  console.log(`🚀 ActivityHub API running on http://localhost:${env.PORT}`);
  console.log(`📊 Health check: http://localhost:${env.PORT}/api/health`);
  console.log(`🌍 Environment: ${env.NODE_ENV}`);
});

export default app;
