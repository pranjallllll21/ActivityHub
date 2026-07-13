'use client';

import { Menu, Bell, Search } from 'lucide-react';
import type { User, UserRole } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AppNavbarProps {
  role: UserRole;
  user: User;
  title: string;
  subtitle: string;
  onMenuClick: () => void;
}

export function AppNavbar({ role, user, title, subtitle, onMenuClick }: AppNavbarProps) {
  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="flex items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Button variant="ghost" size="sm" className="lg:hidden" onClick={onMenuClick} aria-label="Open navigation">
          <Menu className="h-4 w-4" />
        </Button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{role}</Badge>
            <p className="text-xs uppercase tracking-[0.28em] text-muted">Mock UI only</p>
          </div>
          <h1 className="mt-2 truncate text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
          <p className="mt-1 max-w-3xl text-sm text-muted">{subtitle}</p>
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted shadow-sm shadow-slate-200/50">
            <Search className="h-4 w-4" />
            <span>Search placeholder</span>
          </div>
          <Button variant="ghost" size="sm" aria-label="Notifications placeholder">
            <Bell className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3 rounded-full border border-border bg-surface px-3 py-2 shadow-sm shadow-slate-200/50">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">{initials}</div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted">{user.department}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}