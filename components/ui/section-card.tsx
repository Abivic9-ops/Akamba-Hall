import { type ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { type LucideIcon } from 'lucide-react'

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
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-50">
        <h2 className="text-[17px] font-medium text-slate-900 flex items-center gap-2.5">
          {Icon && <Icon className="h-5 w-5 text-slate-400" />}
          {title}
        </h2>
        {cta && (
          <Link href={cta.href} className="text-[14px] font-medium text-[#2563EB] hover:underline">
            {cta.label}
          </Link>
        )}
      </div>
      <div className={cn('p-6', contentClassName)}>
        {children}
      </div>
    </div>
  )
}
