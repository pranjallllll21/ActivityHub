import { RoutePlaceholder } from '@/components/placeholders/route-placeholder';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function FacultyPlaceholderPage({ params }: PageProps) {
  const { slug } = await params;
  const routeName = slug.join(' / ');

  return (
    <RoutePlaceholder
      title={routeName ? `Faculty / ${routeName}` : 'Faculty section'}
      description="Verification, student monitoring, and analytics screens will be added in a later phase."
      parentHref="/faculty"
      notes={['Faculty verification and student views are not implemented yet.', 'The page exists only as a route placeholder.']}
    />
  );
}