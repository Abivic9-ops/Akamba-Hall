'use client'

import { Newspaper, Search } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

const newspapers = [
  { title: 'Daily Nation', category: 'National', status: 'Available' },
  { title: 'The Standard', category: 'National', status: 'Available' },
  { title: 'The East African', category: 'Regional', status: 'Available' },
  { title: 'Business Daily', category: 'Business', status: 'Available' },
  { title: 'The Star', category: 'National', status: 'Available' },
]

export function NewspapersList() {
  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
            <Newspaper className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Newspapers</h1>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Daily and weekly newspaper collection</p>
          </div>
        </div>

        <SectionCard title="Newspaper Collection" icon={Newspaper}>
          <div className="space-y-2">
            {newspapers.map((n, i) => (
              <div key={i} className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-white/[0.04] rounded-xl transition-colors">
                <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <Newspaper className="h-4 w-4 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0]">{n.title}</p>
                  <p className="text-[12px] text-slate-400 dark:text-[#6B7A99]">{n.category}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-600">{n.status}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
