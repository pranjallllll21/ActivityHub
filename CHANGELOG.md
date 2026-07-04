# Changelog

All notable changes to ActivityHub will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [0.1.0] - 2026-07-04

### Added
- **Project Foundation**: Initial monorepo structure with frontend, backend, and OCR service
- **Backend**: Express.js server with TypeScript, Prisma ORM, PostgreSQL connection
- **Backend**: JWT authentication skeleton (register, login, me endpoints)
- **Backend**: Health check API, global error handler, request logger
- **Backend**: Complete Prisma schema (User, Club, Event, Registration, Attendance, Certificate, Credit, Notification)
- **Backend**: Database seed with realistic demo data
- **Frontend**: Next.js (App Router) with TypeScript and Tailwind CSS
- **Frontend**: shadcn/ui integration with custom dark theme design system
- **Frontend**: Role-aware sidebar navigation (Student, Faculty, HOD, Committee)
- **Frontend**: Premium login page with role-based quick access
- **Frontend**: Dashboard layouts and stat cards for all 4 roles
- **Frontend**: Mock data for development (users, events, certificates, stats)
- **OCR Service**: FastAPI stub with health check and mock extraction endpoint
- **Docs**: Architecture documentation, API reference placeholder

### Not Yet Implemented
- Event Management CRUD operations
- QR-based attendance tracking
- Excel/CSV attendance upload
- Certificate upload to Cloudinary
- Real OCR/AI integration (EasyOCR, Tesseract)
- Credit allocation engine
- Reports & analytics with charts
- Notification system
- Backend-frontend API integration

### Known Issues
- Frontend uses mock data only (no backend connection)
- OCR service returns mock responses
- PostgreSQL must be running locally for backend
