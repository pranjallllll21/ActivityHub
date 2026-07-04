# 🎓 ActivityHub

**AI-Powered Centralized Student Activity & Event Management System**

A comprehensive web platform for engineering colleges to digitally manage student activities, institutional events, attendance tracking, certificate verification (with AI/OCR), and AICTE activity credit calculation.

## 🏗️ Architecture

```
ActivityHub/
├── frontend/          # Next.js (App Router) + TypeScript + Tailwind CSS
├── backend/           # Express.js + TypeScript + Prisma ORM
├── ocr-service/       # Python FastAPI (Mock stub, AI/OCR ready)
├── docs/              # Project documentation
└── CHANGELOG.md
```

## ✨ Features

- **Event Management**: Create, approve, and manage institutional events
- **QR Attendance**: Real-time attendance tracking via QR codes
- **Certificate Verification**: AI-powered OCR for certificate validation
- **AICTE Credit Calculation**: Automated activity hour → AICTE point conversion (4 hrs = 1 point)
- **Role-Based Dashboards**: Student, Faculty, HOD, and Committee views
- **Reports & Analytics**: Comprehensive reporting and data visualization

## 🔑 User Roles

| Role | Description |
|------|-------------|
| **Student** | Browse events, register, upload certificates, track progress |
| **Committee** | Create events, manage attendance, view registrations |
| **Faculty Mentor** | Verify certificates, track student progress |
| **HOD (Admin)** | Approve events, department analytics, system management |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Python 3.9+ (for OCR service, optional in Phase 1)
- npm

### Backend Setup
```bash
cd backend
npm install
# Configure .env (copy from .env.example)
npx prisma db push
npx prisma db seed
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### OCR Service (Mock)
```bash
cd ocr-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## 🔐 Default Login Credentials

All accounts use password: `password123`

| Role | Email |
|------|-------|
| HOD | dr.rajesh@college.edu.in |
| Faculty | prof.meera@college.edu.in |
| Committee | committee@college.edu.in |
| Student | aarav.shah@college.edu.in |

## 📊 AICTE Credit Rule

**1 AICTE Point = 4 Activity Hours**

Students must complete **400 hours** (100 AICTE points) over their degree.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Recharts, Framer Motion
- **Backend**: Express.js, TypeScript, Prisma ORM, PostgreSQL, JWT, Zod
- **AI/OCR**: Python, FastAPI, EasyOCR (planned), OpenCV (planned)
- **Storage**: Cloudinary

## 📝 License

This project is developed as a BE (Bachelor of Engineering) final year project.
