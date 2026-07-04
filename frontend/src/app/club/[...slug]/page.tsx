import { RoutePlaceholder } from '@/components/placeholders/route-placeholder';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function ClubPlaceholderPage({ params }: PageProps) {
  const { slug } = await params;
  const routeName = slug.join(' / ');

  return (
    <RoutePlaceholder
      title={routeName ? `Committee / ${routeName}` : 'Committee section'}
      description="Club event, attendance, and registration screens will be introduced in the next phase."
      parentHref="/club"
      notes={['Create-event and attendance flows are placeholders only.', 'Mock data is used throughout the current frontend.']}
    />
  );
}