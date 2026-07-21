import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'new'

const variant_styles: Record<BadgeVariant, string> = {
  success: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-red-50 text-red-700',
  info: 'bg-sky-50 text-sky-700',
  neutral: 'bg-slate-100 text-slate-600',
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
