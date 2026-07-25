'use client'

import { useState } from 'react'
import {
  Bookmark, MapPin, Clock, AlertCircle,
  Package, Users as UsersIcon,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface BookmarkItem {
  id: string
  bookTitle: string
  author: string
  category: string | null
  createdAt: string
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function ReservationsPageClient({ bookmarks }: { bookmarks: BookmarkItem[] }) {
  const [activeTab, setActiveTab] = useState<'all'>('all')

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224] dark:bg-[#071224]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-6">

        {/* header */}
        <div>
          <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Reservations</h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">
            Track your saved books and bookmarked items.
          </p>
        </div>

        {/* status cards */}
        <div className="grid grid-cols-1 gap-4">
          <div className="p-4 rounded-xl border bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08]">
            <div className="flex items-center gap-2 mb-2">
              <Bookmark className="h-4 w-4 text-[#2563EB]" />
              <span className="text-[13px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">Saved Bookmarks</span>
            </div>
            <p className="text-[24px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">{bookmarks.length}</p>
          </div>
        </div>

        {/* bookmarks list */}
        <div className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] overflow-hidden">
          {bookmarks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Bookmark className="h-12 w-12 text-slate-300 mb-4" />
              <p className="text-[16px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">No bookmarks yet</p>
            </div>
          ) : (
            bookmarks.map((bm) => (
              <div
                key={bm.id}
                className="flex items-start gap-4 p-5 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors"
              >
                <div className="w-[48px] h-[64px] rounded-lg bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06] flex items-center justify-center shrink-0">
                  <Bookmark className="h-5 w-5 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[16px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{bm.bookTitle}</p>
                    <Badge variant="info" dot>Saved</Badge>
                  </div>
                  <p className="text-[14px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-0.5">{bm.author}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-[13px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">Saved: {formatDate(bm.createdAt)}</span>
                    {bm.category && (
                      <span className="text-[13px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">Category: {bm.category}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button className="h-9 px-5 rounded-lg bg-[#2563EB] text-white text-[14px] font-medium hover:bg-[#1D4ED8] transition-colors">
                    Borrow
                  </button>
                  <button className="h-9 px-4 rounded-lg border border-slate-200 dark:border-white/10 dark:border-white/10 text-[13px] text-slate-600 dark:text-[#94A3B8] dark:text-[#94A3B8] hover:bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06] dark:bg-white/[0.06] transition-colors">
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* policy note */}
        <div className="bg-slate-50 dark:bg-white/[0.04] dark:bg-white/[0.04] border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] shrink-0 mt-0.5" />
          <div>
            <p className="text-[14px] font-medium text-slate-700 dark:text-[#E2E8F0]">Reservation Policy</p>
            <p className="text-[13px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-0.5">
              Ready items must be collected within 3 business days. Unclaimed reservations will be released to the next
              person in queue. You can hold a maximum of 5 active reservations at any time.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
