import Link from 'next/link';
import { ArrowLeft, Construction } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RoutePlaceholderProps {
  title: string;
  description: string;
  parentHref: string;
  notes?: string[];
}

export function RoutePlaceholder({ title, description, parentHref, notes = [] }: RoutePlaceholderProps) {
  return (
    <div className="grid min-h-[calc(100vh-4rem)] place-items-center px-4 py-10 sm:px-6 lg:px-8">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <div className="flex items-center gap-2 text-primary">
            <Construction className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-[0.24em]">Placeholder route</span>
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Mock only</Badge>
            <Badge variant="outline">No backend wiring</Badge>
            <Badge variant="outline">Future module</Badge>
          </div>
          {notes.length > 0 ? (
            <div className="space-y-2 rounded-3xl border border-border bg-surface-elevated p-5 text-sm text-muted">
              {notes.map((note) => (
                <p key={note}>• {note}</p>
              ))}
            </div>
          ) : null}
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" asChild>
              <Link href={parentHref} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to dashboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}