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
      <div className="flex mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, author, subject..."
            className="w-full h-13 pl-11 pr-4 rounded-xl border-2 border-slate-200 bg-white text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
          />
        </div>
        <button className="h-13 px-7 rounded-xl bg-[#2563EB] text-white text-[15px] font-medium hover:bg-[#1D4ED8] transition-colors ml-2 shrink-0">
          Search
        </button>
      </div>

      {/* filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {chips.map((chip) => (
          <button
            key={chip}
            onClick={() => setActiveChip(chip)}
            className={`px-4 py-2 rounded-full text-[13px] font-normal whitespace-nowrap transition-all ${
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
