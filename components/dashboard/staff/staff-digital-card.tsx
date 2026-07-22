'use client'

import { CreditCard, Download, Eye } from 'lucide-react'

interface StaffDigitalCardProps {
  label: string
  memberId: string
  userName: string
  status: 'Active' | 'Suspended'
}

export function StaffDigitalCard({ label, memberId, userName, status }: StaffDigitalCardProps) {
  const initials = userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="bg-gradient-to-br from-[#1E3A6E] via-[#1A3060] to-[#14264D] rounded-xl p-5 shadow-lg text-white h-full min-h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-white/70" />
          <span className="text-[13px] font-medium text-white">{label}</span>
        </div>
        <span className="text-[11px] text-white/40 cursor-help" title="Show this QR code at the library desk or entrance to verify your membership.">
          ⓘ
        </span>
      </div>

      <div className="bg-white rounded-xl p-3 flex items-center justify-center mb-4 flex-1">
        <div className="w-full max-w-[160px] aspect-square bg-slate-100 rounded-lg flex items-center justify-center">
          <span className="text-[11px] text-slate-400 text-center">QR Code<br />{memberId}</span>
        </div>
      </div>

      <div className="text-center mb-3">
        <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-[12px] font-medium text-white mx-auto mb-1.5">
          {initials}
        </div>
        <p className="text-[14px] font-medium text-white">{userName}</p>
        <p className="text-[12px] text-white/50">{memberId}</p>
      </div>

      <div className="flex items-center justify-center gap-1.5 mb-4">
        <span className={`h-2 w-2 rounded-full ${status === 'Active' ? 'bg-emerald-400' : 'bg-red-400'}`} />
        <span className="text-[12px] font-normal text-white/70">{status}</span>
      </div>

      <div className="flex gap-2 mt-auto">
        <button className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg border border-white/20 text-[12px] font-medium text-white hover:bg-white/10 transition-colors">
          <Eye className="h-3.5 w-3.5" />
          View
        </button>
        <button className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg border border-white/20 text-[12px] font-medium text-white hover:bg-white/10 transition-colors">
          <Download className="h-3.5 w-3.5" />
          Download
        </button>
      </div>
    </div>
  )
}
