import { type ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { type LucideIcon, ArrowUpRight } from 'lucide-react'

interface SectionCardProps {
  title: string
  icon?: LucideIcon
  cta?: { label: string; href: string }
  children: ReactNode
  className?: string
  contentClassName?: string
}

export function SectionCard({ title, icon: Icon, cta, children, className, contentClassName }: SectionCardProps) {
  return (
    <div className={cn('bg-white dark:bg-[#13285A] rounded-xl border border-slate-100 dark:border-white/[0.08] shadow-sm overflow-hidden', className)}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-50 dark:border-white/[0.06]">
        <h2 className="text-[15px] font-medium text-slate-900 dark:text-white flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-slate-400 dark:text-white/40" />}
          {title}
        </h2>
        {cta && (
          <Link href={cta.href} className="inline-flex items-center gap-1.5 h-7 px-3.5 rounded-full border border-[#2563EB]/20 dark:border-[#5B9BD5]/30 text-[12px] font-medium text-[#2563EB] dark:text-[#5B9BD5] bg-[#2563EB]/5 dark:bg-[#5B9BD5]/10 hover:bg-[#2563EB]/10 dark:hover:bg-[#5B9BD5]/15 transition-colors">
            {cta.label}
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        )}
      </div>
      <div className={cn('p-4', contentClassName)}>
        {children}
      </div>
    </div>
  )
}
