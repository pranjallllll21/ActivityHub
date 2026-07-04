'use client';

import Link from 'next/link';
import { LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const demoAccounts = [
  { role: 'Student', href: '/dashboard', email: 'aarav.shah@college.edu.in' },
  { role: 'Faculty', href: '/faculty', email: 'prof.meera@college.edu.in' },
  { role: 'HOD', href: '/admin', email: 'dr.rajesh@college.edu.in' },
  { role: 'Committee', href: '/club', email: 'committee@college.edu.in' },
];

export function LoginForm() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex items-center gap-2 text-primary">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-[0.24em]">Mock access</span>
          </div>
          <CardTitle>Sign in to ActivityHub</CardTitle>
          <CardDescription>
            This frontend uses mock JSON only. The form is a UI prototype for the final integration phase.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="email">
                College email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <Input id="email" type="email" placeholder="student@college.edu.in" className="pl-11" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <Input id="password" type="password" placeholder="password123" className="pl-11" />
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <Badge variant="outline">JWT ready</Badge>
              <Link href="/dashboard" className="text-sm text-primary hover:underline">
                Use demo account
              </Link>
            </div>
            <Button type="submit" className="w-full">
              Open dashboard preview
            </Button>
          </form>

          <div className="rounded-3xl border border-border bg-surface-elevated p-5">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted">Demo accounts</p>
            <div className="mt-4 space-y-3">
              {demoAccounts.map((account) => (
                <Link
                  key={account.role}
                  href={account.href}
                  className="block rounded-2xl border border-border bg-surface px-4 py-3 transition-colors hover:border-primary/30 hover:bg-primary/10"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-foreground">{account.role}</p>
                      <p className="text-sm text-muted">{account.email}</p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.22em] text-primary">Open</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>What is included</CardTitle>
            <CardDescription>Everything here is mocked so the foundation can ship before backend wiring.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted">
            <p>• Student, Faculty, HOD, and Committee dashboard shells.</p>
            <p>• Shared sidebar and navbar built for the App Router.</p>
            <p>• Placeholder routes for future features without business logic.</p>
            <p>• Strong dark theme and reusable UI primitives.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security notes</CardTitle>
            <CardDescription>Foundation phase keeps authentication visual only.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted">
            <p>• No backend API calls are made from this page.</p>
            <p>• Login actions intentionally stop at the UI layer.</p>
            <p>• JWT and protected routes will be connected later.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}