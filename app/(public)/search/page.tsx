'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { FadeIn } from '@/components/motion'

export default function CatalogueSearchPage() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <FadeIn>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 bg-[#0B1A3B]/5 text-[#0B1A3B] text-[13px] font-medium uppercase tracking-widest px-4 py-2 rounded-full">
              <Search className="h-3.5 w-3.5" aria-hidden="true" />
              Catalogue
            </span>
            <h1 className="text-[40px] md:text-[52px] font-medium text-[#101828] mt-5 leading-tight tracking-tight">
              Catalogue Search
            </h1>
            <p className="text-[16px] text-[#5B6376] mt-5 max-w-xl mx-auto leading-relaxed">
              Find books, journals, and digital resources across the entire library collection. Search by title, author, subject, or keyword.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex gap-2 p-4 bg-[#F5F6FA] border border-[#E4E7EE] rounded-2xl shadow-sm">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-[#5B6376]" aria-hidden="true" />
              <Input
                placeholder="Search by title, author, subject, or keyword..."
                className="pl-12 h-12 bg-white text-base rounded-xl border-[#E4E7EE] focus:ring-gold"
                autoFocus
                aria-label="Search library catalogue"
              />
            </div>
            <Button className="h-12 px-8 rounded-xl font-medium bg-gold hover:bg-gold-hover text-navy" aria-label="Search catalogue">
              Search
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-[#E4E7EE] rounded-2xl bg-[#F5F6FA]/50">
            <Search className="h-12 w-12 text-[#5B6376]/30 mb-4" aria-hidden="true" />
            <h3 className="text-[18px] font-medium text-[#101828]">Enter a search term</h3>
            <p className="text-[15px] text-[#5B6376] max-w-sm mt-2 leading-relaxed">
              Search our entire database of physical and digital materials. Try searching for &ldquo;Machine Learning&rdquo; or &ldquo;History&rdquo;.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
