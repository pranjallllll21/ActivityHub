import { dashboardViews } from '@/lib/dashboard-data';
import { RoleDashboard } from '@/components/dashboard/role-dashboard';

export const metadata = {
  title: 'HOD Dashboard',
};

export default function AdminPage() {
  return <RoleDashboard view={dashboardViews.HOD} />;
}