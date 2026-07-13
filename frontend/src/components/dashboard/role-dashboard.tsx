import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { DashboardView } from '@/lib/dashboard-data';
import { AppShell } from '@/components/layout/app-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface RoleDashboardProps {
  view: DashboardView;
}

function formatDateLabel(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function RoleDashboard({ view }: RoleDashboardProps) {
  return (
    <AppShell view={view}>
      <div className="space-y-6">
        <section className="grid gap-6 rounded-[2rem] border border-border bg-surface/90 p-6 shadow-[0_24px_90px_rgba(15,23,42,0.08)] lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
          <div className="space-y-5">
            <Badge className="w-fit">Foundation phase</Badge>
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{view.title}</h2>
              <p className="max-w-2xl text-sm leading-7 text-muted sm:text-base">{view.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {view.actions.map((action) => (
                <Button key={action.href} variant={action.primary ? 'primary' : 'secondary'} asChild>
                  <Link href={action.href} className="flex items-center gap-2">
                    <span>{action.label}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
            <div className="rounded-3xl border border-border bg-background/50 p-4 text-sm text-muted">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="h-4 w-4" />
                <span className="font-medium uppercase tracking-[0.22em]">Mock JSON only</span>
              </div>
              <p className="mt-2 leading-6">{view.footerNote}</p>
            </div>
          </div>

              <Card className="self-start">
            <CardHeader>
              <CardTitle>{view.user.name}</CardTitle>
              <CardDescription>{view.user.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-border bg-surface-elevated p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted">Role</p>
                  <p className="mt-2 text-base font-semibold text-foreground">{view.role}</p>
                </div>
                <div className="rounded-2xl border border-border bg-surface-elevated p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted">Department</p>
                  <p className="mt-2 text-base font-semibold text-foreground">{view.user.department}</p>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-surface-elevated p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-muted">Status</p>
                <p className="mt-2 text-base font-semibold text-foreground">Active mock workspace</p>
                <p className="mt-1 text-sm text-muted">All actions remain local and read-only in this phase.</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {view.metrics.map((metric) => (
            <Card key={metric.label}>
              <CardContent className="space-y-2 p-5">
                <p className="text-sm text-muted">{metric.label}</p>
                <p className="text-3xl font-semibold tracking-tight text-foreground">{metric.value}</p>
                <p className="text-sm leading-6 text-muted">{metric.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Quick actions</CardTitle>
              <CardDescription>Shortcuts for the most common mock tasks in this role.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {view.actions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="block rounded-2xl border border-border bg-surface px-4 py-4 transition-colors hover:border-primary/40 hover:bg-primary/10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-foreground">{action.label}</p>
                      <p className="mt-1 text-sm leading-6 text-muted">{action.description}</p>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{view.feedTitle}</CardTitle>
              <CardDescription>Latest mock records that represent what will later come from the backend.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {view.feedItems.map((item) => (
                <div key={`${item.title}-${item.meta}`} className="rounded-2xl border border-border bg-surface px-4 py-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm leading-6 text-muted">{item.description}</p>
                    </div>
                    <Badge variant="outline">{item.tag}</Badge>
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-[0.22em] text-muted">{formatDateLabel(item.meta)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}