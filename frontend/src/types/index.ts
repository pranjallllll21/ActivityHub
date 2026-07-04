// User & Auth types
export type UserRole = 'STUDENT' | 'COMMITTEE' | 'FACULTY' | 'HOD';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  division?: string;
  rollNo?: string;
  avatar?: string;
  status: string;
}

// Event types
export type EventStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type EventCategory = 'TECHNICAL' | 'CULTURAL' | 'SPORTS_NSS';

export interface Event {
  id: string;
  name: string;
  description: string;
  venue: string;
  date: string;
  durationHours: number;
  category: EventCategory;
  status: EventStatus;
  registrationLimit?: number;
  registeredCount?: number;
  clubName?: string;
}

// Certificate types
export type CertificateStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Certificate {
  id: string;
  courseName: string;
  organization: string;
  completionDate: string;
  hoursClaimed: number;
  status: CertificateStatus;
  fileUrl: string;
  ocrExtractedData?: Record<string, any>;
  aiFlags?: { duplicate: boolean; fakeRisk: boolean };
}

// Credit types
export interface Credit {
  id: string;
  hours: number;
  aictePoints: number;
  source: 'EVENT' | 'CERTIFICATE';
  sourceId: string;
  allocatedAt: string;
}

// Stats for dashboards
export interface StudentStats {
  hoursRequired: number;
  hoursCompleted: number;
  hoursRemaining: number;
  aictePointsEarned: number;
  aictePointsTarget: number;
  eventsAttended: number;
  certificatesUploaded: number;
  certificatesApproved: number;
  technicalHours: number;
  culturalHours: number;
  sportsNssHours: number;
}

export interface FacultyStats {
  studentsAssigned: number;
  pendingVerifications: number;
  approvedCertificates: number;
  totalHoursLogged: number;
}

export interface AdminStats {
  totalStudents: number;
  totalEvents: number;
  activeClubs: number;
  totalHoursLogged: number;
  totalAictePoints: number;
}

export interface ClubStats {
  totalEvents: number;
  activeEvents: number;
  totalRegistrations: number;
  avgAttendance: number;
}

// Activity feed
export interface Activity {
  id: string;
  type: 'certificate_approved' | 'event_attended' | 'certificate_uploaded' | 'credit_allocated' | 'event_registered';
  title: string;
  description: string;
  timestamp: string;
}

// Notification
export interface Notification {
  id: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

// Sidebar navigation
export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface SidebarConfig {
  role: UserRole;
  sections: {
    title?: string;
    items: NavItem[];
  }[];
}
