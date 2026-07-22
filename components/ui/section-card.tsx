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
    <div className={cn('bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden', className)}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-50">
        <h2 className="text-[15px] font-medium text-slate-900 flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-slate-400" />}
          {title}
        </h2>
        {cta && (
          <Link href={cta.href} className="inline-flex items-center gap-1.5 h-7 px-3.5 rounded-full border border-[#2563EB]/20 text-[12px] font-medium text-[#2563EB] bg-[#2563EB]/5 hover:bg-[#2563EB]/10 transition-colors">
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
