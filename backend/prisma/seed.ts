import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

/**
 * Seed script for ActivityHub database.
 * Creates sample users, clubs, events, registrations, attendance,
 * certificates, credits, and notifications for development/testing.
 *
 * Uses upsert for idempotency — safe to run multiple times.
 * All users share the password: password123
 */
async function main() {
  console.log('🌱 Seeding database...');

  const passwordHash = await bcrypt.hash('password123', 12);

  // ─── Users ──────────────────────────────────────────────────────────────────

  // HOD (Head of Department) — highest authority, approves events
  const hod = await prisma.user.upsert({
    where: { email: 'dr.rajesh@college.edu.in' },
    update: {},
    create: {
      name: 'Dr. Rajesh Kumar',
      email: 'dr.rajesh@college.edu.in',
      passwordHash,
      role: Role.HOD,
      department: 'Computer Engineering',
    },
  });

  // Faculty Mentor — reviews certificates, mentors students
  const faculty = await prisma.user.upsert({
    where: { email: 'prof.meera@college.edu.in' },
    update: {},
    create: {
      name: 'Prof. Meera Joshi',
      email: 'prof.meera@college.edu.in',
      passwordHash,
      role: Role.FACULTY,
      department: 'Computer Engineering',
    },
  });

  // Committee Member — creates and manages events
  const committee = await prisma.user.upsert({
    where: { email: 'committee@college.edu.in' },
    update: {},
    create: {
      name: 'Sneha Patil',
      email: 'committee@college.edu.in',
      passwordHash,
      role: Role.COMMITTEE,
      department: 'Computer Engineering',
    },
  });

  // Student 1 — active student with registrations, certificates, and credits
  const student1 = await prisma.user.upsert({
    where: { email: 'aarav.shah@college.edu.in' },
    update: {},
    create: {
      name: 'Aarav Shah',
      email: 'aarav.shah@college.edu.in',
      passwordHash,
      role: Role.STUDENT,
      department: 'Computer Engineering',
      division: 'A',
      rollNo: 'CE21021',
      mentorId: faculty.id,
    },
  });

  // Student 2
  const student2 = await prisma.user.upsert({
    where: { email: 'priya.desai@college.edu.in' },
    update: {},
    create: {
      name: 'Priya Desai',
      email: 'priya.desai@college.edu.in',
      passwordHash,
      role: Role.STUDENT,
      department: 'Computer Engineering',
      division: 'B',
      rollNo: 'CE21045',
      mentorId: faculty.id,
    },
  });

  // ─── Club ───────────────────────────────────────────────────────────────────

  const club = await prisma.club.upsert({
    where: { name: 'TechClub CE' },
    update: {},
    create: {
      name: 'TechClub CE',
      type: 'technical',
      description: 'Computer Engineering Technical Club - CSI Student Chapter',
      facultyMentorId: faculty.id,
      members: { connect: [{ id: committee.id }] },
    },
  });

  // ─── Events ─────────────────────────────────────────────────────────────────

  const event1 = await prisma.event.create({
    data: {
      name: 'Web Development Workshop',
      description: 'Hands-on workshop covering React, Next.js, and modern web technologies.',
      venue: 'Seminar Hall A',
      date: new Date('2026-07-15T10:00:00'),
      durationHours: 4,
      category: 'TECHNICAL',
      status: 'APPROVED',
      registrationLimit: 60,
      clubId: club.id,
    },
  });

  const event2 = await prisma.event.create({
    data: {
      name: 'AI/ML Hackathon',
      description: '24-hour hackathon focused on building AI/ML solutions for real-world problems.',
      venue: 'Computer Lab 3',
      date: new Date('2026-07-25T09:00:00'),
      durationHours: 24,
      category: 'TECHNICAL',
      status: 'PENDING',
      registrationLimit: 40,
      clubId: club.id,
    },
  });

  const event3 = await prisma.event.create({
    data: {
      name: 'Annual Cultural Fest - Technotsav',
      description: 'College annual cultural festival with performances, competitions, and exhibitions.',
      venue: 'Main Auditorium',
      date: new Date('2026-08-10T09:00:00'),
      durationHours: 8,
      category: 'CULTURAL',
      status: 'APPROVED',
      registrationLimit: 200,
      clubId: club.id,
    },
  });

  // ─── Registrations ─────────────────────────────────────────────────────────

  await prisma.registration.create({
    data: { studentId: student1.id, eventId: event1.id },
  });
  await prisma.registration.create({
    data: { studentId: student2.id, eventId: event1.id },
  });
  await prisma.registration.create({
    data: { studentId: student1.id, eventId: event3.id },
  });

  // ─── Attendance ─────────────────────────────────────────────────────────────

  await prisma.attendance.create({
    data: { studentId: student1.id, eventId: event1.id, method: 'QR', present: true },
  });
  await prisma.attendance.create({
    data: { studentId: student2.id, eventId: event1.id, method: 'QR', present: true },
  });

  // ─── Certificates ──────────────────────────────────────────────────────────

  const cert1 = await prisma.certificate.create({
    data: {
      studentId: student1.id,
      fileUrl: 'https://res.cloudinary.com/demo/certificate-ml-fundamentals.pdf',
      courseName: 'Machine Learning Fundamentals',
      organization: 'Coursera',
      completionDate: new Date('2026-06-15'),
      hoursClaimed: 40,
      status: 'APPROVED',
      reviewedByMentorId: faculty.id,
      ocrExtractedData: {
        studentName: 'Aarav Shah',
        courseName: 'Machine Learning Fundamentals',
        organization: 'Coursera',
        completionDate: '2026-06-15',
        confidence: 0.95,
      },
      aiFlags: { duplicate: false, fakeRisk: false },
    },
  });

  await prisma.certificate.create({
    data: {
      studentId: student1.id,
      fileUrl: 'https://res.cloudinary.com/demo/certificate-python.pdf',
      courseName: 'Python for Data Science',
      organization: 'NPTEL',
      completionDate: new Date('2026-05-20'),
      hoursClaimed: 30,
      status: 'PENDING',
      ocrExtractedData: {
        studentName: 'Aarav Shah',
        courseName: 'Python for Data Science',
        organization: 'NPTEL',
        completionDate: '2026-05-20',
        confidence: 0.88,
      },
      aiFlags: { duplicate: false, fakeRisk: false },
    },
  });

  // ─── Credits ────────────────────────────────────────────────────────────────

  await prisma.credit.create({
    data: {
      studentId: student1.id,
      hours: 4,
      aictePoints: 1, // 4 / 4 = 1
      source: 'EVENT',
      sourceId: event1.id,
    },
  });

  await prisma.credit.create({
    data: {
      studentId: student1.id,
      hours: 40,
      aictePoints: 10, // 40 / 4 = 10
      source: 'CERTIFICATE',
      sourceId: cert1.id, // Use actual certificate ID
    },
  });

  // ─── Notifications ─────────────────────────────────────────────────────────

  await prisma.notification.createMany({
    data: [
      {
        userId: student1.id,
        message: 'Your certificate "Machine Learning Fundamentals" has been approved.',
        type: 'CERTIFICATE_APPROVED',
      },
      {
        userId: student1.id,
        message: 'You have successfully registered for "Annual Cultural Fest".',
        type: 'REGISTRATION_CONFIRMED',
      },
      {
        userId: committee.id,
        message: 'Your event "AI/ML Hackathon" is pending HOD approval.',
        type: 'EVENT_CREATED',
      },
      {
        userId: hod.id,
        message: 'New event "AI/ML Hackathon" requires your approval.',
        type: 'EVENT_CREATED',
      },
      {
        userId: faculty.id,
        message: 'New certificate submitted by Aarav Shah requires verification.',
        type: 'CERTIFICATE_UPLOADED',
      },
    ],
  });

  console.log('✅ Seed data created successfully!');
  console.log('\n📋 Login credentials (all users): password123');
  console.log('  HOD:       dr.rajesh@college.edu.in');
  console.log('  Faculty:   prof.meera@college.edu.in');
  console.log('  Committee: committee@college.edu.in');
  console.log('  Student 1: aarav.shah@college.edu.in');
  console.log('  Student 2: priya.desai@college.edu.in');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
