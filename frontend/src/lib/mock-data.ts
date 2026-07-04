import { User, Event, Certificate, StudentStats, FacultyStats, AdminStats, ClubStats, Activity, Notification } from '@/types';

// Current logged-in users (mock)
export const mockUsers: Record<string, User> = {
  student: {
    id: '1',
    name: 'Aarav Shah',
    email: 'aarav.shah@college.edu.in',
    role: 'STUDENT',
    department: 'Computer Engineering',
    division: 'A',
    rollNo: 'CE21021',
    status: 'active',
  },
  faculty: {
    id: '2',
    name: 'Prof. Meera Joshi',
    email: 'prof.meera@college.edu.in',
    role: 'FACULTY',
    department: 'Computer Engineering',
    status: 'active',
  },
  hod: {
    id: '3',
    name: 'Dr. Rajesh Kumar',
    email: 'dr.rajesh@college.edu.in',
    role: 'HOD',
    department: 'Computer Engineering',
    status: 'active',
  },
  committee: {
    id: '4',
    name: 'Sneha Patil',
    email: 'committee@college.edu.in',
    role: 'COMMITTEE',
    department: 'Computer Engineering',
    status: 'active',
  },
};

// Student stats
export const mockStudentStats: StudentStats = {
  hoursRequired: 400,
  hoursCompleted: 156,
  hoursRemaining: 244,
  aictePointsEarned: 39,
  aictePointsTarget: 100,
  eventsAttended: 12,
  certificatesUploaded: 8,
  certificatesApproved: 6,
  technicalHours: 80,
  culturalHours: 44,
  sportsNssHours: 32,
};

// Faculty stats
export const mockFacultyStats: FacultyStats = {
  studentsAssigned: 45,
  pendingVerifications: 8,
  approvedCertificates: 127,
  totalHoursLogged: 5420,
};

// Admin stats
export const mockAdminStats: AdminStats = {
  totalStudents: 840,
  totalEvents: 64,
  activeClubs: 12,
  totalHoursLogged: 45200,
  totalAictePoints: 11300,
};

// Club stats
export const mockClubStats: ClubStats = {
  totalEvents: 18,
  activeEvents: 3,
  totalRegistrations: 450,
  avgAttendance: 78,
};

// Upcoming events
export const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Web Development Workshop',
    description: 'Hands-on workshop covering React, Next.js, and modern web technologies.',
    venue: 'Seminar Hall A',
    date: '2026-07-15T10:00:00',
    durationHours: 4,
    category: 'TECHNICAL',
    status: 'APPROVED',
    registrationLimit: 60,
    registeredCount: 42,
    clubName: 'TechClub CE',
  },
  {
    id: '2',
    name: 'AI/ML Hackathon',
    description: '24-hour hackathon focused on building AI/ML solutions for real-world problems.',
    venue: 'Computer Lab 3',
    date: '2026-07-25T09:00:00',
    durationHours: 24,
    category: 'TECHNICAL',
    status: 'PENDING',
    registrationLimit: 40,
    registeredCount: 0,
    clubName: 'TechClub CE',
  },
  {
    id: '3',
    name: 'Annual Cultural Fest - Technotsav',
    description: 'College annual cultural festival with performances, competitions, and exhibitions.',
    venue: 'Main Auditorium',
    date: '2026-08-10T09:00:00',
    durationHours: 8,
    category: 'CULTURAL',
    status: 'APPROVED',
    registrationLimit: 200,
    registeredCount: 156,
    clubName: 'Cultural Committee',
  },
  {
    id: '4',
    name: 'NSS Blood Donation Camp',
    description: 'Annual blood donation drive organized by NSS unit.',
    venue: 'College Ground',
    date: '2026-08-05T08:00:00',
    durationHours: 6,
    category: 'SPORTS_NSS',
    status: 'APPROVED',
    registrationLimit: 100,
    registeredCount: 67,
    clubName: 'NSS Unit',
  },
];

// Certificates
export const mockCertificates: Certificate[] = [
  {
    id: '1',
    courseName: 'Machine Learning Fundamentals',
    organization: 'Coursera',
    completionDate: '2026-06-15',
    hoursClaimed: 40,
    status: 'APPROVED',
    fileUrl: '/certificates/ml-fundamentals.pdf',
  },
  {
    id: '2',
    courseName: 'Python for Data Science',
    organization: 'NPTEL',
    completionDate: '2026-05-20',
    hoursClaimed: 30,
    status: 'PENDING',
    fileUrl: '/certificates/python-ds.pdf',
  },
  {
    id: '3',
    courseName: 'Cloud Computing Basics',
    organization: 'Udemy',
    completionDate: '2026-04-10',
    hoursClaimed: 20,
    status: 'APPROVED',
    fileUrl: '/certificates/cloud-computing.pdf',
  },
  {
    id: '4',
    courseName: 'UI/UX Design Workshop',
    organization: 'Interaction Design Foundation',
    completionDate: '2026-03-28',
    hoursClaimed: 15,
    status: 'REJECTED',
    fileUrl: '/certificates/uiux-workshop.pdf',
  },
];

// Recent Activity
export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'certificate_approved',
    title: 'Certificate Approved',
    description: '"Machine Learning Fundamentals" — 40 hours credited',
    timestamp: '2026-07-03T14:30:00',
  },
  {
    id: '2',
    type: 'event_attended',
    title: 'Event Attended',
    description: '"Web Development Workshop" — 4 hours logged',
    timestamp: '2026-07-01T16:00:00',
  },
  {
    id: '3',
    type: 'certificate_uploaded',
    title: 'Certificate Uploaded',
    description: '"Python for Data Science" — pending verification',
    timestamp: '2026-06-28T10:15:00',
  },
  {
    id: '4',
    type: 'event_registered',
    title: 'Registered for Event',
    description: '"Annual Cultural Fest - Technotsav"',
    timestamp: '2026-06-25T09:00:00',
  },
];

// Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    message: 'Your certificate "Machine Learning Fundamentals" has been approved.',
    type: 'CERTIFICATE_APPROVED',
    read: false,
    createdAt: '2026-07-03T14:30:00',
  },
  {
    id: '2',
    message: 'You have successfully registered for "Annual Cultural Fest".',
    type: 'REGISTRATION_CONFIRMED',
    read: false,
    createdAt: '2026-06-25T09:00:00',
  },
  {
    id: '3',
    message: 'New event "Web Development Workshop" is now open for registration.',
    type: 'GENERAL',
    read: true,
    createdAt: '2026-06-20T12:00:00',
  },
];
