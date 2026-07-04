/**
 * Shared TypeScript types for the ActivityHub API.
 * Used across routes, middleware, and services for type consistency.
 */

/** Standard API response envelope */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
}

/** Pagination parameters accepted by list endpoints */
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/** Paginated API response with metadata */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Re-export Prisma enums for convenient access throughout the application
export {
  Role,
  EventStatus,
  EventCategory,
  AttendanceMethod,
  CertificateStatus,
  CreditSource,
  NotificationType,
} from '@prisma/client';
