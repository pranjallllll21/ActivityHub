'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import type { DashboardView } from '@/lib/dashboard-data';
import { AppNavbar } from '@/components/layout/app-navbar';
import { AppSidebar } from '@/components/layout/app-sidebar';

interface AppShellProps {
  view: DashboardView;
  children: ReactNode;
}

export function AppShell({ view, children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <AppSidebar role={view.role} user={view.user} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <AppNavbar
            role={view.role}
            user={view.user}
            title={view.title}
            subtitle={view.subtitle}
            onMenuClick={() => setSidebarOpen((current) => !current)}
          />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}