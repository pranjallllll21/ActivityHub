import type {
  Activity,
  AdminStats,
  ClubStats,
  FacultyStats,
  Notification,
  StudentStats,
  User,
  UserRole,
} from '@/types';
import {
  mockActivities,
  mockAdminStats,
  mockClubStats,
  mockCertificates,
  mockFacultyStats,
  mockNotifications,
  mockStudentStats,
  mockUsers,
  mockEvents,
} from '@/lib/mock-data';

export type DashboardMetric = {
  label: string;
  value: string;
  description: string;
};

export type DashboardAction = {
  label: string;
  href: string;
  description: string;
  primary?: boolean;
};

export type DashboardFeedItem = {
  title: string;
  description: string;
  meta: string;
  tag: string;
};

export type DashboardView = {
  role: UserRole;
  title: string;
  subtitle: string;
  user: User;
  metrics: DashboardMetric[];
  actions: DashboardAction[];
  feedTitle: string;
  feedItems: DashboardFeedItem[];
  footerNote: string;
};

const studentActivityFeed: Activity[] = mockActivities.slice(0, 3);
const studentNotifications: Notification[] = mockNotifications.slice(0, 2);

const facultyFeed = mockCertificates.slice(0, 3).map((certificate) => ({
  title: certificate.courseName,
  description: `${certificate.organization} • ${certificate.hoursClaimed} hours requested`,
  meta: `${certificate.status} review`,
  tag: certificate.status,
}));

const hodFeed = mockEvents.slice(0, 3).map((event) => ({
  title: event.name,
  description: `${event.clubName} • ${event.venue}`,
  meta: event.status,
  tag: event.category,
}));

const committeeFeed = mockEvents.slice(0, 3).map((event) => ({
  title: event.name,
  description: `${event.registeredCount ?? 0} registrations • ${event.venue}`,
  meta: event.status,
  tag: event.category,
}));

function formatStudentMetrics(stats: StudentStats): DashboardMetric[] {
  return [
    { label: 'Hours completed', value: `${stats.hoursCompleted}`, description: `${stats.hoursRemaining} remaining from ${stats.hoursRequired}` },
    { label: 'AICTE points', value: `${stats.aictePointsEarned}`, description: `${stats.aictePointsTarget} point target` },
    { label: 'Events attended', value: `${stats.eventsAttended}`, description: 'Recorded in the activity timeline' },
    { label: 'Certificates approved', value: `${stats.certificatesApproved}`, description: `${stats.certificatesUploaded} uploaded in total` },
  ];
}

function formatFacultyMetrics(stats: FacultyStats): DashboardMetric[] {
  return [
    { label: 'Students assigned', value: `${stats.studentsAssigned}`, description: 'Mentor workload in the current term' },
    { label: 'Pending reviews', value: `${stats.pendingVerifications}`, description: 'Certificates waiting for verification' },
    { label: 'Approved certificates', value: `${stats.approvedCertificates}`, description: 'Actions completed by faculty' },
    { label: 'Logged hours', value: `${stats.totalHoursLogged}`, description: 'Aggregate student activity hours' },
  ];
}

function formatAdminMetrics(stats: AdminStats): DashboardMetric[] {
  return [
    { label: 'Total students', value: `${stats.totalStudents}`, description: 'Institution wide student strength' },
    { label: 'Total events', value: `${stats.totalEvents}`, description: 'Approvals and draft requests' },
    { label: 'Active clubs', value: `${stats.activeClubs}`, description: 'Operational student clubs' },
    { label: 'AICTE points', value: `${stats.totalAictePoints}`, description: 'Department level credit pool' },
  ];
}

function formatCommitteeMetrics(stats: ClubStats): DashboardMetric[] {
  return [
    { label: 'Events managed', value: `${stats.totalEvents}`, description: 'Planned by the committee' },
    { label: 'Active events', value: `${stats.activeEvents}`, description: 'Running or upcoming events' },
    { label: 'Registrations', value: `${stats.totalRegistrations}`, description: 'Tracked across the club' },
    { label: 'Average attendance', value: `${stats.avgAttendance}%`, description: 'Based on completed events' },
  ];
}

export const dashboardViews: Record<UserRole, DashboardView> = {
  STUDENT: {
    role: 'STUDENT',
    title: 'Student Dashboard',
    subtitle: 'Track hours, check progress, and keep every certificate in one place.',
    user: mockUsers.student,
    metrics: formatStudentMetrics(mockStudentStats),
    actions: [
      { label: 'Open dashboard', href: '/dashboard', description: 'Review current progress and pending tasks', primary: true },
      { label: 'View timeline', href: '/dashboard/timeline', description: 'See the latest activity feed' },
      { label: 'Upload certificate', href: '/dashboard/certificates', description: 'Mock placeholder for future upload flow' },
    ],
    feedTitle: 'Recent activity',
    feedItems: [
      ...studentActivityFeed.map((activity) => ({
        title: activity.title,
        description: activity.description,
        meta: activity.timestamp,
        tag: activity.type,
      })),
      ...studentNotifications.map((notification) => ({
        title: notification.message,
        description: notification.read ? 'Read' : 'Unread',
        meta: notification.createdAt,
        tag: notification.type,
      })),
    ],
    footerNote: 'Student screens remain mock-only until backend integration is introduced.',
  },
  FACULTY: {
    role: 'FACULTY',
    title: 'Faculty Dashboard',
    subtitle: 'Review certificates, monitor students, and keep the verification queue moving.',
    user: mockUsers.faculty,
    metrics: formatFacultyMetrics(mockFacultyStats),
    actions: [
      { label: 'Open verification queue', href: '/faculty/verification', description: 'See pending certificates', primary: true },
      { label: 'Review students', href: '/faculty/students', description: 'Scan assigned student progress' },
      { label: 'Faculty settings', href: '/faculty/settings', description: 'Mock configuration area' },
    ],
    feedTitle: 'Verification queue',
    feedItems: facultyFeed,
    footerNote: 'Verification views are UI only and intentionally disconnected from APIs.',
  },
  HOD: {
    role: 'HOD',
    title: 'HOD Dashboard',
    subtitle: 'Department overview for approvals, governance, and progress tracking.',
    user: mockUsers.hod,
    metrics: formatAdminMetrics(mockAdminStats),
    actions: [
      { label: 'Review approvals', href: '/admin/events', description: 'Inspect pending event workflows', primary: true },
      { label: 'Department analytics', href: '/admin/analytics', description: 'Mock overview area for later charts' },
      { label: 'Rule book', href: '/admin/aicte-rules', description: 'Reference AICTE foundation rules' },
    ],
    feedTitle: 'Department queue',
    feedItems: hodFeed,
    footerNote: 'Administrative actions are placeholders until business workflows are added.',
  },
  COMMITTEE: {
    role: 'COMMITTEE',
    title: 'Committee Dashboard',
    subtitle: 'Plan club activity, manage registrations, and prepare event workflows.',
    user: mockUsers.committee,
    metrics: formatCommitteeMetrics(mockClubStats),
    actions: [
      { label: 'Create event', href: '/club/events/create', description: 'Draft a new club event', primary: true },
      { label: 'Track registrations', href: '/club/registrations', description: 'Monitor mock attendee flow' },
      { label: 'Attendance area', href: '/club/attendance', description: 'Placeholder for later QR flow' },
    ],
    feedTitle: 'Upcoming events',
    feedItems: committeeFeed,
    footerNote: 'Committee screens stay intentionally read-only for this phase.',
  },
};