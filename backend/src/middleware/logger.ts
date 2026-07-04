import morgan from 'morgan';

/**
 * HTTP request logger middleware using morgan.
 * Uses 'dev' format for concise colored output in development.
 */
export const requestLogger = morgan('dev');
