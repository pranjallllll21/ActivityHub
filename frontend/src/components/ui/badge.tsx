import * as React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'outline';

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-primary/15 text-primary border border-primary/30',
  success: 'bg-emerald-400/15 text-emerald-300 border border-emerald-400/30',
  warning: 'bg-amber-400/15 text-amber-300 border border-amber-400/30',
  danger: 'bg-rose-400/15 text-rose-300 border border-rose-400/30',
  outline: 'border border-border text-muted bg-transparent',
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.14em]', variantStyles[variant], className)} {...props} />;
}