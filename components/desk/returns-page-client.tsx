'use client'

import { useState } from 'react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { RotateCw, Search, PackageCheck, CalendarDays, BookOpen, AlertTriangle, CheckCircle2 } from 'lucide-react'

interface ReturnItem {
  id: string
  title: string
  author: string
  dueDate: string
  returnedAt: string
}

export function ReturnsPageClient({ todayReturns }: { todayReturns: ReturnItem[] }) {
  const [memberId, setMemberId] = useState('')
  const [bookBarcode, setBookBarcode] = useState('')
  const [returnDate, setReturnDate] = useState(() => new Date().toISOString().split('T')[0])
  const [condition, setCondition] = useState('Good')
  const [searchQuery, setSearchQuery] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const filteredReturns = todayReturns.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.author.toLowerCase().includes(searchQuery.toLowerCase())
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!memberId || !bookBarcode) return
    setSubmitted(true)
    setTimeout(() => {
      setMemberId('')
      setBookBarcode('')
      setCondition('Good')
      setSubmitted(false)
    }, 2000)
  }

  return (
    <div className="bg-[#F8F9FB] min-h-screen">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <RotateCw className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] tracking-tight">Process Returns</h1>
            <p className="text-[12px] text-slate-500">Scan or enter item details to process a return</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <SectionCard title="Return Form" icon={PackageCheck}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[12px] font-bold text-slate-600 mb-1.5">Search by Member ID or Book Barcode</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Scan or type member ID / barcode..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-9 pr-4 rounded-lg border border-slate-200 bg-white text-[13px] text-[#0B1B3D] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-slate-600 mb-1.5">Member ID</label>
                  <input
                    type="text"
                    placeholder="e.g. STU-24011076"
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-[13px] text-[#0B1B3D] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-slate-600 mb-1.5">Book Barcode</label>
                  <input
                    type="text"
                    placeholder="e.g. BKL-004821"
                    value={bookBarcode}
                    onChange={(e) => setBookBarcode(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-[13px] text-[#0B1B3D] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-slate-600 mb-1.5">Return Date</label>
                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-200 bg-white text-[13px] text-[#0B1B3D] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-slate-600 mb-1.5">Condition</label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-[13px] text-[#0B1B3D] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition appearance-none"
                  >
                    <option value="Good">Good</option>
                    <option value="Damaged">Damaged</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={!memberId || !bookBarcode || submitted}
                className="w-full h-10 rounded-lg bg-[#0B1B3D] text-white text-[13px] font-bold hover:bg-[#162950] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitted ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Return Processed
                  </>
                ) : (
                  <>
                    <RotateCw className="h-4 w-4" />
                    Process Return
                  </>
                )}
              </button>
            </form>
          </SectionCard>

          <SectionCard title="Quick Scan" icon={Search}>
            <div className="flex flex-col items-center justify-center h-full min-h-[260px] text-center gap-4">
              <div className="h-20 w-20 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center">
                <Search className="h-8 w-8 text-slate-300" />
              </div>
              <div>
                <p className="text-[14px] font-bold text-[#0B1B3D]">Scan Member QR Card</p>
                <p className="text-[12px] text-slate-500 mt-1">Point scanner at the member&apos;s QR code to auto-fill details</p>
              </div>
              <div className="flex gap-3">
                <button className="h-9 px-4 rounded-lg border border-slate-200 bg-white text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition">
                  Manual Entry
                </button>
                <button className="h-9 px-4 rounded-lg bg-[#2563EB] text-white text-[12px] font-bold hover:bg-blue-700 transition">
                  Activate Scanner
                </button>
              </div>
              <div className="w-full max-w-[280px] mt-2 p-3 rounded-lg bg-amber-50 border border-amber-100">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                  <p className="text-[11px] text-amber-700 font-medium">2 items are overdue and may incur fines on return</p>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        <SectionCard title="Recent Returns Today" icon={BookOpen}>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Title</th>
                  <th className="py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Author</th>
                  <th className="py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Due Date</th>
                  <th className="py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Returned At</th>
                  <th className="py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredReturns.map((ret) => {
                  const wasLate = new Date(ret.returnedAt) > new Date(ret.dueDate)
                  return (
                    <tr key={ret.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                      <td className="py-3 px-3">
                        <span className="text-[13px] font-bold text-[#0B1B3D]">{ret.title}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-[12px] text-slate-500">{ret.author}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-[12px] text-slate-500">
                          {new Date(ret.dueDate).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-[12px] font-medium text-slate-600">
                          {new Date(ret.returnedAt).toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <Badge variant={wasLate ? 'warning' : 'success'} dot>
                          {wasLate ? 'Late' : 'On Time'}
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
                {filteredReturns.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-[13px] text-slate-400">No returns found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-3 text-center">
            <span className="text-[11px] text-slate-400">{todayReturns.length} returns processed today</span>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
