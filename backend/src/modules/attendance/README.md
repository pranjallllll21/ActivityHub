# Attendance Module

> **Phase 3** — To be implemented

This module will handle:
- **QR Code Attendance** — Generate event-specific QR codes, students scan to mark attendance
- **Excel Upload** — Committee members upload attendance sheets for bulk marking
- **Attendance Reports** — View attendance records per event or per student

## Planned Files
- `attendance.controller.ts` — Route handlers
- `attendance.service.ts` — Business logic (QR generation, Excel parsing)
- `attendance.validation.ts` — Zod schemas
- `attendance.routes.ts` — Express router
