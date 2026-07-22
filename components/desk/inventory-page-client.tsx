'use client'

import { useState } from 'react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Archive, Search, Package, CheckCircle2, AlertTriangle, XCircle,
  ScanLine, Clock, BarChart3,
} from 'lucide-react'

interface InventoryItem {
  barcode: string
  title: string
  category: string
  expectedLocation: string
  countedStatus: 'Match' | 'Missing' | 'Extra'
}

const inventorySnapshot = {
  totalItems: 12847,
  available: 7837,
  onLoan: 5010,
  damaged: 312,
  lost: 188,
  percentAvailable: 61,
}

const stocktakeItems: InventoryItem[] = [
  { barcode: 'BK-9780134685991', title: 'Advanced Physics: Principles and Applications', category: 'Science', expectedLocation: 'Shelf A3', countedStatus: 'Match' },
  { barcode: 'BK-9780134685992', title: 'Chemistry: The Central Science', category: 'Science', expectedLocation: 'Shelf A4', countedStatus: 'Match' },
  { barcode: 'BK-9780134685993', title: 'Biology: Concepts and Applications', category: 'Science', expectedLocation: 'Shelf B1', countedStatus: 'Missing' },
  { barcode: 'BK-9780134685994', title: 'Introduction to Computer Science', category: 'Technology', expectedLocation: 'Shelf C2', countedStatus: 'Match' },
  { barcode: 'BK-9780134685995', title: 'Economics: A Modern Introduction', category: 'Commerce', expectedLocation: 'Shelf D1', countedStatus: 'Extra' },
  { barcode: 'BK-9780134685996', title: 'Kenya History and Geography', category: 'Humanities', expectedLocation: 'Shelf E3', countedStatus: 'Match' },
]

const pastSessions = [
  { id: 'SS-012', date: '2026-06-15', itemsChecked: 12847, matches: 12502, missing: 312, extras: 33, conductedBy: 'Mary Wanjiku' },
  { id: 'SS-011', date: '2026-05-20', itemsChecked: 12693, matches: 12388, missing: 280, extras: 25, conductedBy: 'Peter Kamau' },
  { id: 'SS-010', date: '2026-04-18', itemsChecked: 12510, matches: 12215, missing: 268, extras: 27, conductedBy: 'Mary Wanjiku' },
]

function countedBadge(status: InventoryItem['countedStatus']) {
  switch (status) {
    case 'Match':
      return <Badge variant="success" dot>Match</Badge>
    case 'Missing':
      return <Badge variant="danger" dot>Missing</Badge>
    case 'Extra':
      return <Badge variant="warning" dot>Extra</Badge>
  }
}

export function InventoryPageClient() {
  const [search, setSearch] = useState('')
  const [stocktakeActive, setStocktakeActive] = useState(false)

  const filteredItems = stocktakeItems.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.barcode.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0B1B3D] tracking-tight">Inventory & Stocktake</h1>
          <p className="text-sm text-slate-500 mt-1">Track inventory health and manage stocktake sessions.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col items-center gap-1">
            <Package className="h-5 w-5 text-blue-500 mb-1" />
            <span className="text-xl font-extrabold text-[#0B1B3D]">{inventorySnapshot.totalItems.toLocaleString()}</span>
            <span className="text-[11px] font-bold text-slate-500">Total Items</span>
          </div>
          <div className="bg-white rounded-xl border border-emerald-100 shadow-sm p-4 flex flex-col items-center gap-1">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 mb-1" />
            <span className="text-xl font-extrabold text-[#0B1B3D]">{inventorySnapshot.available.toLocaleString()}</span>
            <span className="text-[11px] font-bold text-slate-500">Available</span>
          </div>
          <div className="bg-white rounded-xl border border-amber-100 shadow-sm p-4 flex flex-col items-center gap-1">
            <Clock className="h-5 w-5 text-amber-500 mb-1" />
            <span className="text-xl font-extrabold text-[#0B1B3D]">{inventorySnapshot.onLoan.toLocaleString()}</span>
            <span className="text-[11px] font-bold text-slate-500">On Loan</span>
          </div>
          <div className="bg-white rounded-xl border border-red-100 shadow-sm p-4 flex flex-col items-center gap-1">
            <AlertTriangle className="h-5 w-5 text-red-500 mb-1" />
            <span className="text-xl font-extrabold text-[#0B1B3D]">{inventorySnapshot.damaged.toLocaleString()}</span>
            <span className="text-[11px] font-bold text-slate-500">Damaged</span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col items-center gap-1">
            <XCircle className="h-5 w-5 text-slate-500 mb-1" />
            <span className="text-xl font-extrabold text-[#0B1B3D]">{inventorySnapshot.lost.toLocaleString()}</span>
            <span className="text-[11px] font-bold text-slate-500">Lost</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-bold text-blue-600">{inventorySnapshot.percentAvailable}% Available</span>
            <span className="text-[11px] text-slate-400">{inventorySnapshot.available.toLocaleString()} of {inventorySnapshot.totalItems.toLocaleString()}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden flex">
            <div className="bg-blue-500 h-full transition-all" style={{ width: `${inventorySnapshot.percentAvailable}%` }} />
            <div className="bg-amber-400 h-full transition-all" style={{ width: `${Math.round((inventorySnapshot.onLoan / inventorySnapshot.totalItems) * 100)}%` }} />
            <div className="bg-red-400 h-full transition-all" style={{ width: `${Math.round(((inventorySnapshot.damaged + inventorySnapshot.lost) / inventorySnapshot.totalItems) * 100)}%` }} />
          </div>
          <div className="flex gap-4 mt-2">
            <span className="flex items-center gap-1.5 text-[10px] text-slate-500"><span className="h-2 w-2 rounded-full bg-blue-500" /> Available</span>
            <span className="flex items-center gap-1.5 text-[10px] text-slate-500"><span className="h-2 w-2 rounded-full bg-amber-400" /> On Loan</span>
            <span className="flex items-center gap-1.5 text-[10px] text-slate-500"><span className="h-2 w-2 rounded-full bg-red-400" /> Damaged/Lost</span>
          </div>
        </div>

        <SectionCard title="Stocktake Session" icon={ScanLine}>
          <div className="flex items-center gap-3 mb-4">
            <Button
              onClick={() => setStocktakeActive(!stocktakeActive)}
              className={stocktakeActive ? 'bg-red-600 hover:bg-red-700 text-white' : ''}
              size="sm"
            >
              {stocktakeActive ? 'End Stocktake' : 'Start Stocktake'}
            </Button>
            {stocktakeActive && <Badge variant="danger" dot>In Progress</Badge>}
          </div>

          {stocktakeActive && (
            <>
              <div className="relative mb-4 max-w-sm">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search items..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-9"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Barcode</th>
                      <th className="text-left py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Title</th>
                      <th className="text-left py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Category</th>
                      <th className="text-left py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Expected Location</th>
                      <th className="text-left py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Counted Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => (
                      <tr key={item.barcode} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-3 font-mono text-[12px] text-slate-600">{item.barcode}</td>
                        <td className="py-3 px-3 font-medium text-[13px] text-slate-800 max-w-[220px] truncate">{item.title}</td>
                        <td className="py-3 px-3 text-[12px] text-slate-600">{item.category}</td>
                        <td className="py-3 px-3 text-[12px] text-slate-600">{item.expectedLocation}</td>
                        <td className="py-3 px-3">{countedBadge(item.countedStatus)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </SectionCard>

        <SectionCard title="Recent Stocktake History" icon={BarChart3}>
          <div className="space-y-0">
            {pastSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-[13px] font-medium text-slate-800">{session.id} — {new Date(session.date).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Conducted by {session.conductedBy}</p>
                </div>
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="text-slate-500">{session.itemsChecked.toLocaleString()} items</span>
                  <Badge variant="success">{session.matches.toLocaleString()} matched</Badge>
                  <Badge variant="danger">{session.missing} missing</Badge>
                  <Badge variant="warning">{session.extras} extra</Badge>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
