import { RoutePlaceholder } from '@/components/placeholders/route-placeholder';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function DashboardPlaceholderPage({ params }: PageProps) {
  const { slug } = await params;
  const routeName = slug.join(' / ');

  return (
    <RoutePlaceholder
      title={routeName ? `Student / ${routeName}` : 'Student dashboard section'}
      description="This route is reserved for a future student feature. Only the UI shell is in place for now."
      parentHref="/dashboard"
      notes={['Events, certificates, progress, and timeline screens are still placeholders.', 'No API integration exists in Phase 1.']}
    />
  );
}