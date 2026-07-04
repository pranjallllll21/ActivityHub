import { RoutePlaceholder } from '@/components/placeholders/route-placeholder';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function AdminPlaceholderPage({ params }: PageProps) {
  const { slug } = await params;
  const routeName = slug.join(' / ');

  return (
    <RoutePlaceholder
      title={routeName ? `HOD / ${routeName}` : 'HOD section'}
      description="Administrative analytics, approvals, and governance modules are intentionally left as placeholders in Phase 1."
      parentHref="/admin"
      notes={['Event approvals, rules, reports, and settings are pending future implementation.', 'No charts or business logic are included yet.']}
    />
  );
}