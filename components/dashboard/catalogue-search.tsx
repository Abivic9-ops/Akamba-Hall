'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'
import { AiSearchSuggestions } from '@/components/ai/ai-search-suggestions'

const chips = ['Title', 'Author', 'Subject', 'Keyword', 'Available Now']

export function CatalogueSearch() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [activeChip, setActiveChip] = useState('Title')

  function handleSearch() {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <SectionCard title="Search the Catalogue" icon={Search} contentClassName="p-5 sm:p-6">
      <div className="flex mb-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-[#6B7A99]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search by title, author, subject..."
            className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1F3F] text-[14px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
          />
          <AiSearchSuggestions query={query} onSelect={(s) => { setQuery(s); router.push(`/search?q=${encodeURIComponent(s)}`) }} />
        </div>
        <button
          onClick={handleSearch}
          className="h-10 px-5 rounded-lg bg-[#2563EB] text-white text-[14px] font-medium hover:bg-[#1D4ED8] transition-colors ml-1.5 shrink-0"
        >
          Search
        </button>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {chips.map((chip) => (
          <button
            key={chip}
            onClick={() => setActiveChip(chip)}
            className={`px-3 py-1.5 rounded-full text-[12px] font-normal whitespace-nowrap transition-all ${
              activeChip === chip
                ? 'bg-[#2563EB] text-white'
                : 'bg-[#F8F9FB] dark:bg-[#071224] text-slate-600 dark:text-[#94A3B8] border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/[0.06]'
            }`}
          >
            {chip}
          </button>
        ))}
      </div>
    </SectionCard>
  )
}
