'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

const chips = ['Title', 'Author', 'Subject', 'Keyword', 'Available Now']

export function CatalogueSearch() {
  const [activeChip, setActiveChip] = useState('Title')

  return (
    <SectionCard title="Search the Catalogue" icon={Search}>
      {/* search bar */}
      <div className="flex mb-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, author, subject..."
            className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-200 bg-white text-[14px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
          />
        </div>
        <button className="h-10 px-5 rounded-lg bg-[#2563EB] text-white text-[14px] font-medium hover:bg-[#1D4ED8] transition-colors ml-1.5 shrink-0">
          Search
        </button>
      </div>

      {/* filter chips */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {chips.map((chip) => (
          <button
            key={chip}
            onClick={() => setActiveChip(chip)}
            className={`px-3 py-1.5 rounded-full text-[12px] font-normal whitespace-nowrap transition-all ${
              activeChip === chip
                ? 'bg-[#2563EB] text-white'
                : 'bg-[#F8F9FB] text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {chip}
          </button>
        ))}
      </div>
    </SectionCard>
  )
}
