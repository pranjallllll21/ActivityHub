import { dashboardViews } from '@/lib/dashboard-data';
import { RoleDashboard } from '@/components/dashboard/role-dashboard';

export const metadata = {
  title: 'Student Dashboard',
};

export default function DashboardPage() {
  return <RoleDashboard view={dashboardViews.STUDENT} />;
}