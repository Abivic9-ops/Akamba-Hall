'use client'

import { BookOpen, Database, BookMarked, FileText, ArrowRight } from 'lucide-react'

interface Resource {
  id: string
  type: 'book' | 'database' | 'journal' | 'ebook'
  title: string
  author?: string
  subtitle?: string
  detail?: string
  tag?: string
}

const type_config: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string; bg: string }> = {
  book: { icon: BookOpen, color: 'text-[#2563EB]', bg: 'bg-blue-50' },
  database: { icon: Database, color: 'text-[#0D9488]', bg: 'bg-teal-50' },
  journal: { icon: BookMarked, color: 'text-[#8B5CF6]', bg: 'bg-purple-50' },
  ebook: { icon: FileText, color: 'text-[#D97706]', bg: 'bg-amber-50' },
}

export function ReadingDigitalResources({ resources }: { resources: Resource[] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-semibold text-slate-900">Reading &amp; Digital Resources</h3>
          <p className="text-[12px] text-slate-400 mt-0.5">Featured collections</p>
        </div>
        <button className="h-8 px-4 rounded-full bg-blue-50 text-[12px] font-semibold text-[#2563EB] hover:bg-blue-100 hover:text-blue-700 inline-flex items-center gap-1.5 transition-all duration-200">
          Browse all <ArrowRight className="h-3 w-3" />
        </button>
      </div>
      <div className="space-y-2">
        {resources.map((res) => {
          const config = type_config[res.type] ?? type_config.book
          const Icon = config.icon
          return (
            <div key={res.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
              <div className={`h-9 w-9 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
                <Icon className={`h-4 w-4 ${config.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-slate-700 truncate">{res.title}</p>
                <p className="text-[11px] text-slate-400 truncate">
                  {res.author ?? res.subtitle} {res.detail ? `· ${res.detail}` : ''}
                </p>
              </div>
              {res.tag && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 shrink-0">
                  {res.tag}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
