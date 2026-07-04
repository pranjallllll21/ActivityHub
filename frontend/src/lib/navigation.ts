import { SidebarConfig } from '@/types';

export const sidebarConfigs: Record<string, SidebarConfig> = {
  STUDENT: {
    role: 'STUDENT',
    sections: [
      {
        items: [
          { title: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
          { title: 'Events', href: '/dashboard/events', icon: 'Calendar' },
          { title: 'Certificates', href: '/dashboard/certificates', icon: 'Award' },
          { title: 'Progress', href: '/dashboard/progress', icon: 'TrendingUp' },
          { title: 'Timeline', href: '/dashboard/timeline', icon: 'Clock' },
          { title: 'Settings', href: '/dashboard/settings', icon: 'Settings' },
        ],
      },
    ],
  },
  FACULTY: {
    role: 'FACULTY',
    sections: [
      {
        items: [
          { title: 'Overview', href: '/faculty', icon: 'LayoutDashboard' },
          { title: 'Verification', href: '/faculty/verification', icon: 'CheckCircle' },
          { title: 'Students', href: '/faculty/students', icon: 'Users' },
          { title: 'Analytics', href: '/faculty/analytics', icon: 'BarChart3' },
          { title: 'Settings', href: '/faculty/settings', icon: 'Settings' },
        ],
      },
    ],
  },
  HOD: {
    role: 'HOD',
    sections: [
      {
        title: 'Overview',
        items: [
          { title: 'Dashboard', href: '/admin', icon: 'LayoutDashboard' },
          { title: 'Analytics', href: '/admin/analytics', icon: 'BarChart3' },
        ],
      },
      {
        title: 'Management',
        items: [
          { title: 'Students', href: '/admin/students', icon: 'GraduationCap' },
          { title: 'Faculty', href: '/admin/faculty', icon: 'Users' },
          { title: 'Clubs', href: '/admin/clubs', icon: 'Users2' },
          { title: 'Events', href: '/admin/events', icon: 'Calendar' },
        ],
      },
      {
        title: 'System',
        items: [
          { title: 'AICTE Rules', href: '/admin/aicte-rules', icon: 'BookOpen' },
          { title: 'Reports', href: '/admin/reports', icon: 'FileText' },
          { title: 'Settings', href: '/admin/settings', icon: 'Settings' },
        ],
      },
    ],
  },
  COMMITTEE: {
    role: 'COMMITTEE',
    sections: [
      {
        title: 'Club',
        items: [
          { title: 'Dashboard', href: '/club', icon: 'LayoutDashboard' },
          { title: 'Create Event', href: '/club/events/create', icon: 'PlusCircle' },
          { title: 'My Events', href: '/club/events', icon: 'Calendar' },
        ],
      },
      {
        title: 'Manage',
        items: [
          { title: 'Registrations', href: '/club/registrations', icon: 'ClipboardList' },
          { title: 'Attendance', href: '/club/attendance', icon: 'UserCheck' },
          { title: 'Analytics', href: '/club/analytics', icon: 'BarChart3' },
        ],
      },
      {
        items: [
          { title: 'Settings', href: '/club/settings', icon: 'Settings' },
        ],
      },
    ],
  },
};
