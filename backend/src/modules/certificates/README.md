# Certificate Module

> **Phase 4** — To be implemented

This module will handle:
- **Certificate Upload** — Students upload external course/workshop certificates
- **OCR Processing** — Integrate with AI/OCR microservice to extract certificate data
- **AI Fraud Detection** — Flag duplicates and potentially fake certificates
- **Faculty Review** — Faculty mentors verify and approve/reject certificates

## Planned Files
- `certificates.controller.ts` — Route handlers
- `certificates.service.ts` — Business logic (OCR integration, AI analysis)
- `certificates.validation.ts` — Zod schemas
- `certificates.routes.ts` — Express router
