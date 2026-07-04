import { dashboardViews } from '@/lib/dashboard-data';
import { RoleDashboard } from '@/components/dashboard/role-dashboard';

export const metadata = {
  title: 'Committee Dashboard',
};

export default function ClubPage() {
  return <RoleDashboard view={dashboardViews.COMMITTEE} />;
}