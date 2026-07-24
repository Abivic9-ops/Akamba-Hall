import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'new'

const variant_styles: Record<BadgeVariant, string> = {
  success: 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
  warning: 'bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400',
  danger: 'bg-red-50 dark:bg-red-500/15 text-red-700 dark:text-red-400',
  info: 'bg-sky-50 dark:bg-sky-500/15 text-sky-700 dark:text-sky-400',
  neutral: 'bg-slate-100 dark:bg-white/[0.08] text-slate-600 dark:text-white/60',
  new: 'bg-red-600 text-white',
}

const inverted_styles: Record<BadgeVariant, string> = {
  success: 'bg-emerald-600 text-white',
  warning: 'bg-amber-500 text-white',
  danger: 'bg-red-600 text-white',
  info: 'bg-sky-600 text-white',
  neutral: 'bg-slate-600 text-white',
  new: 'bg-red-600 text-white',
}

interface BadgeProps {
  variant?: BadgeVariant
  inverted?: boolean
  dot?: boolean
  children: ReactNode
  className?: string
}

export function Badge({ variant = 'neutral', inverted = false, dot = false, children, className }: BadgeProps) {
  const styles = inverted ? inverted_styles[variant] : variant_styles[variant]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[13px] font-medium uppercase tracking-wide',
        styles,
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full',
            variant === 'success' && 'bg-emerald-500',
            variant === 'warning' && 'bg-amber-500',
            variant === 'danger' && 'bg-red-500',
            variant === 'info' && 'bg-sky-500',
            variant === 'neutral' && 'bg-slate-400',
            variant === 'new' && 'bg-white'
          )}
        />
      )}
      {children}
    </span>
  )
}
