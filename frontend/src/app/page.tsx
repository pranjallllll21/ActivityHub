import Link from 'next/link';
import { ArrowRight, Sparkles, Shield, LayoutDashboard, BadgeCheck, Users } from 'lucide-react';
import { mockAdminStats, mockFacultyStats, mockStudentStats } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-8 rounded-[2.25rem] border border-border bg-surface/70 p-6 shadow-[0_24px_90px_rgba(4,8,24,0.35)] backdrop-blur lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
        <div className="space-y-6">
          <Badge className="w-fit">ActivityHub foundation</Badge>
          <div className="space-y-4">
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              AI powered student activity and event management, built as a clean front-end foundation.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
              The current interface is mock-first and future-ready: reusable layouts, strong dark theme styling, and separate entry points for every major role.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/login" className="flex items-center gap-2">
                Open login page
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/dashboard">Student dashboard</Link>
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Student hours', value: `${mockStudentStats.hoursCompleted}/${mockStudentStats.hoursRequired}` },
              { label: 'Faculty reviews', value: `${mockFacultyStats.pendingVerifications} pending` },
              { label: 'Department points', value: `${mockAdminStats.totalAictePoints}` },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-border bg-surface-elevated p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-muted">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-medium uppercase tracking-[0.24em]">What is ready</span>
              </div>
              <CardTitle>Shared foundation pieces</CardTitle>
              <CardDescription>Reusable shell components and route placeholders already exist for the main roles.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted">
              <p>• Dark themed global layout with custom surface layers.</p>
              <p>• Sidebar and navbar for the dashboard experience.</p>
              <p>• Student, Faculty, HOD, and Committee dashboard roots.</p>
              <p>• Login UI with mock accounts and no API wiring.</p>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: 'Student', href: '/dashboard', icon: LayoutDashboard, description: 'Progress and activity overview' },
              { title: 'Faculty', href: '/faculty', icon: BadgeCheck, description: 'Certificate verification workspace' },
              { title: 'HOD', href: '/admin', icon: Shield, description: 'Department governance shell' },
              { title: 'Committee', href: '/club', icon: Users, description: 'Event planning shell' },
            ].map((role) => {
              const Icon = role.icon;

              return (
                <Link key={role.title} href={role.href} className="rounded-2xl border border-border bg-surface px-4 py-4 transition-colors hover:border-primary/40 hover:bg-primary/10">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl border border-border bg-surface-elevated p-3 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{role.title}</p>
                      <p className="text-sm text-muted">{role.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
