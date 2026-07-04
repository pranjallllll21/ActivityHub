'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LayoutDashboard, Calendar, Award, TrendingUp, Clock, Settings, CheckCircle, Users, BarChart3, GraduationCap, Users2, BookOpen, FileText, PlusCircle, ClipboardList, UserCheck } from 'lucide-react';
import { sidebarConfigs } from '@/lib/navigation';
import type { UserRole, User } from '@/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const iconMap = {
  LayoutDashboard,
  Calendar,
  Award,
  TrendingUp,
  Clock,
  Settings,
  CheckCircle,
  Users,
  BarChart3,
  GraduationCap,
  Users2,
  BookOpen,
  FileText,
  PlusCircle,
  ClipboardList,
  UserCheck,
  Menu,
  X,
};

function getIcon(name: string) {
  return iconMap[name as keyof typeof iconMap] ?? LayoutDashboard;
}

interface AppSidebarProps {
  role: UserRole;
  user: User;
  open: boolean;
  onClose: () => void;
}

export function AppSidebar({ role, user, open, onClose }: AppSidebarProps) {
  const pathname = usePathname();
  const config = sidebarConfigs[role];

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm transition-opacity lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-[290px] border-r border-border bg-surface/95 px-4 py-5 shadow-2xl transition-transform lg:static lg:z-auto lg:translate-x-0 lg:shadow-none',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        <div className="mb-6 flex items-start justify-between gap-4 rounded-3xl border border-border bg-surface-elevated px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">ActivityHub</p>
            <h2 className="mt-1 text-lg font-semibold text-foreground">{config.role} Workspace</h2>
            <p className="mt-1 text-sm text-muted">Mock foundation for Phase 1</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-border p-2 text-muted lg:hidden">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-6 rounded-3xl border border-border bg-surface-elevated px-4 py-4">
          <p className="text-xs uppercase tracking-[0.24em] text-muted">Signed in as</p>
          <p className="mt-2 text-base font-semibold text-foreground">{user.name}</p>
          <p className="text-sm text-muted">{user.email}</p>
          <div className="mt-3 flex items-center gap-2">
            <Badge variant="outline">{user.department}</Badge>
            <Badge>{role}</Badge>
          </div>
        </div>

        <nav className="space-y-5">
          {config.sections.map((section, index) => (
            <div key={`${section.title ?? 'section'}-${index}`}>
              {section.title ? <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.28em] text-muted">{section.title}</p> : null}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = getIcon(item.icon);
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        'flex items-center gap-3 rounded-2xl border px-3 py-3 text-sm transition-colors',
                        active
                          ? 'border-primary/40 bg-primary/10 text-primary'
                          : 'border-transparent text-muted hover:border-border hover:bg-surface-elevated hover:text-foreground',
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="flex-1 font-medium">{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}