'use client'

import {
  MessageCircle, BookPlus, ThumbsUp, ShieldAlert, Settings, HelpCircle,
  ChevronRight,
} from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

const options = [
  {
    title: 'Ask a Librarian',
    description: 'Direct help for reference and resource queries',
    icon: MessageCircle,
    color: '#2563EB',
    gradient: 'from-[#2563EB]/5 to-transparent',
  },
  {
    title: 'Book Suggestions',
    description: 'Recommend titles for the library collection',
    icon: BookPlus,
    color: '#0D9488',
    gradient: 'from-[#0D9488]/5 to-transparent',
  },
  {
    title: 'Feedback & Requests',
    description: 'Share feedback or a special access request',
    icon: ThumbsUp,
    color: '#8B5CF6',
    gradient: 'from-[#8B5CF6]/5 to-transparent',
  },
  {
    title: 'Lost Card / Login Help',
    description: 'Report a lost card or access problem',
    icon: ShieldAlert,
    color: '#D97706',
    gradient: 'from-[#D97706]/5 to-transparent',
  },
  {
    title: 'IT & Resource Help',
    description: 'Issues with e-resources, databases, or logins',
    icon: Settings,
    color: '#64748B',
    gradient: 'from-slate-50 to-transparent',
  },
]

export function StaffSupport() {
  return (
    <SectionCard title="Need Help?" icon={HelpCircle}>
      <div className="flex flex-col gap-2">
        {options.map((opt) => {
          const Icon = opt.icon
          return (
            <button
              key={opt.title}
              className={`relative flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-gradient-to-r ${opt.gradient} hover:shadow-sm hover:border-slate-200 transition-all text-left cursor-pointer group`}
            >
              <div
                className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full"
                style={{ backgroundColor: opt.color }}
              />
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${opt.color}12` }}
              >
                <Icon className="h-5 w-5" style={{ color: opt.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium text-slate-800">{opt.title}</p>
                <p className="text-[12px] text-slate-400 mt-0.5">{opt.description}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-slate-500 transition-colors shrink-0" />
            </button>
          )
        })}
      </div>
    </SectionCard>
  )
}
