import { dashboardViews } from '@/lib/dashboard-data';
import { RoleDashboard } from '@/components/dashboard/role-dashboard';

export const metadata = {
  title: 'Faculty Dashboard',
};

export default function FacultyPage() {
  return <RoleDashboard view={dashboardViews.FACULTY} />;
}