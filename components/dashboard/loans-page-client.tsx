'use client'

import { useState } from 'react'
import {
  BookOpen, RefreshCw, Filter,
  AlertCircle, CheckCircle2, Search,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface Loan {
  id: string
  title: string
  author: string
  coverUrl: string
  dueDate: string
  renewable: boolean
  category: string
  borrowedDate: string
}

const mockLoans: Loan[] = [
  {
    id: 'loan-1',
    title: 'Introduction to Physics',
    author: 'J.K. Kariuki',
    coverUrl: '',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    renewable: true,
    category: 'Science',
    borrowedDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'loan-2',
    title: 'Secondary School Mathematics',
    author: 'A.O. Awino',
    coverUrl: '',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    renewable: true,
    category: 'Mathematics',
    borrowedDate: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'loan-3',
    title: 'The Secret Runner',
    author: 'Tim Kennemar',
    coverUrl: '',
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    renewable: false,
    category: 'Fiction',
    borrowedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'loan-4',
    title: 'Kenya: A History Since Independence',
    author: 'Nic Cheeseman',
    coverUrl: '',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    renewable: true,
    category: 'History',
    borrowedDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

function daysLeft(dueDate: string): number {
  return Math.ceil((new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function LoansPageClient() {
  const [filter, setFilter] = useState<'all' | 'active' | 'overdue' | 'returned'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredLoans = mockLoans.filter((loan) => {
    const days = daysLeft(loan.dueDate)
    if (filter === 'overdue' && days >= 0) return false
    if (filter === 'active' && days < 0) return false
    if (searchQuery && !loan.title.toLowerCase().includes(searchQuery.toLowerCase()) && !loan.author.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const overdueCount = mockLoans.filter((l) => daysLeft(l.dueDate) < 0).length
  const activeCount = mockLoans.filter((l) => daysLeft(l.dueDate) >= 0).length

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-6">

        {/* page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-medium text-slate-900">My Loans</h1>
            <p className="text-[15px] text-slate-500 mt-1">
              View and manage all books you have borrowed from Akamba Hall Library.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-[#2563EB] text-white text-[14px] font-medium hover:bg-[#1D4ED8] transition-colors shrink-0">
            <Search className="h-4 w-4" />
            Browse Catalogue
          </button>
        </div>

        {/* stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-4 w-4 text-[#2563EB]" />
              <span className="text-[13px] text-slate-500">Total Loans</span>
            </div>
            <p className="text-[24px] font-medium text-slate-900">{mockLoans.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span className="text-[13px] text-slate-500">Active</span>
            </div>
            <p className="text-[24px] font-medium text-slate-900">{activeCount}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-[13px] text-slate-500">Overdue</span>
            </div>
            <p className="text-[24px] font-medium text-slate-900">{overdueCount}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <RefreshCw className="h-4 w-4 text-amber-500" />
              <span className="text-[13px] text-slate-500">Renewable</span>
            </div>
            <p className="text-[24px] font-medium text-slate-900">{mockLoans.filter(l => l.renewable).length}</p>
          </div>
        </div>

        {/* filters + search */}
        <div className="bg-white rounded-xl border border-slate-100 p-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <span className="text-[13px] text-slate-500">Filter:</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {(['all', 'active', 'overdue'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-[13px] font-normal transition-all capitalize ${
                  filter === f
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex-1 sm:ml-auto">
            <input
              type="text"
              placeholder="Search loans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[14px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] transition-colors"
            />
          </div>
        </div>

        {/* loans list */}
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
          {filteredLoans.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <BookOpen className="h-12 w-12 text-slate-300 mb-4" />
              <p className="text-[16px] text-slate-500">No loans found</p>
              <p className="text-[14px] text-slate-400 mt-1">Try adjusting your search or filter</p>
            </div>
          ) : (
            <div>
              {filteredLoans.map((loan) => {
                const days = daysLeft(loan.dueDate)
                const isOverdue = days < 0
                const isDueSoon = days >= 0 && days <= 3

                return (
                  <div
                    key={loan.id}
                    className="flex items-center gap-4 p-5 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors"
                  >
                    {/* cover */}
                    <div className="w-[48px] h-[64px] rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                      <BookOpen className="h-5 w-5 text-slate-400" />
                    </div>

                    {/* details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-[16px] font-medium text-slate-800 truncate">{loan.title}</p>
                        {isOverdue && <Badge variant="danger" inverted>Overdue</Badge>}
                        {isDueSoon && !isOverdue && <Badge variant="warning">{days}d left</Badge>}
                        {!isOverdue && !isDueSoon && <Badge variant="success">{days}d left</Badge>}
                      </div>
                      <p className="text-[14px] text-slate-500 mt-0.5">{loan.author}</p>
                      <div className="flex items-center gap-4 mt-1.5">
                        <span className="text-[13px] text-slate-400">Category: {loan.category}</span>
                        <span className="text-[13px] text-slate-400">Borrowed: {formatDate(loan.borrowedDate)}</span>
                        <span className={`text-[13px] ${isOverdue ? 'text-red-600 font-medium' : 'text-slate-400'}`}>
                          Due: {formatDate(loan.dueDate)}
                        </span>
                      </div>
                    </div>

                    {/* actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      {loan.renewable && (
                        <button className="h-8 px-4 rounded-lg border border-slate-200 text-[13px] font-normal text-slate-700 hover:bg-slate-100 transition-colors">
                          Renew
                        </button>
                      )}
                      <button className="h-8 px-4 rounded-lg bg-[#2563EB] text-white text-[13px] font-medium hover:bg-[#1D4ED8] transition-colors">
                        Details
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* renewal policy notice */}
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-[14px] font-medium text-amber-800">Renewal Policy</p>
            <p className="text-[13px] text-amber-700 mt-0.5">
              Books can be renewed up to 2 times before the due date. Each renewal extends the loan by 14 days.
              Overdue items cannot be renewed online — please visit the library desk.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
