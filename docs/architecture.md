# ActivityHub — Architecture Overview

## System Architecture

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Frontend   │────▶│   Backend    │────▶│  PostgreSQL  │
│  (Next.js)   │     │  (Express)   │     │  (Prisma)    │
│  Port: 3000  │     │  Port: 5000  │     │  Port: 5432  │
└──────────────┘     └──────┬───────┘     └──────────────┘
                            │
                            ▼
                     ┌──────────────┐     ┌──────────────┐
                     │ OCR Service  │     │  Cloudinary  │
                     │  (FastAPI)   │     │  (Storage)   │
                     │  Port: 8000  │     └──────────────┘
                     └──────────────┘
```

## Data Flow

### Event Lifecycle
1. Committee creates event → status: PENDING
2. HOD reviews → APPROVED / REJECTED
3. Students browse & register for approved events
4. Attendance recorded via QR scan or Excel upload
5. Credits auto-allocated for present students

### Certificate Lifecycle
1. Student uploads certificate (PDF/JPG/PNG)
2. File stored on Cloudinary
3. OCR service extracts text (name, course, org, date)
4. Faculty mentor reviews AI-extracted data
5. On approval, credits auto-allocated

### Credit Calculation
- **Rule**: 1 AICTE Point = 4 Activity Hours
- **Target**: 400 hours = 100 points (over full degree)
- **Categories**: Technical, Cultural, Sports & NSS

## Authentication

- JWT-based stateless authentication
- Login restricted to @college.edu.in domain
- Role-based access control (RBAC)
- Middleware guards on all protected routes

## Database Schema (ERD)

See `backend/prisma/schema.prisma` for the complete schema.

### Core Entities
- **User** — Students, Faculty, HOD, Committee members
- **Club** — Student clubs/committees
- **Event** — Institutional events and activities
- **Registration** — Student event registrations
- **Attendance** — QR/Excel attendance records
- **Certificate** — External course/activity certificates
- **Credit** — AICTE credit allocations
- **Notification** — In-app notifications
