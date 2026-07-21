'use client'

import { CreditCard, Download, Eye } from 'lucide-react'

interface QRCardProps {
  label: string
  memberId: string
  userName: string
  status: 'Active' | 'Suspended'
}

export function QRCard({ label, memberId, userName, status }: QRCardProps) {
  const initials = userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="bg-[#1E3A6E] rounded-xl p-6 shadow-lg text-white">
      {/* header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <CreditCard className="h-5 w-5 text-white/70" />
          <span className="text-[14px] font-medium text-white">{label}</span>
        </div>
        <span className="text-[12px] text-white/40 cursor-help" title="Show this QR code at the library desk or entrance to verify your membership.">
          ⓘ
        </span>
      </div>

      {/* QR code placeholder */}
      <div className="bg-white rounded-xl p-4 flex items-center justify-center mb-5">
        <div className="w-[150px] h-[150px] bg-slate-100 rounded-lg flex items-center justify-center">
          <span className="text-[12px] text-slate-400 text-center">QR Code<br />{memberId}</span>
        </div>
      </div>

      {/* user info */}
      <div className="text-center mb-4">
        <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-[13px] font-medium text-white mx-auto mb-2">
          {initials}
        </div>
        <p className="text-[16px] font-medium text-white">{userName}</p>
        <p className="text-[13px] text-white/50">{memberId}</p>
      </div>

      {/* status */}
      <div className="flex items-center justify-center gap-1.5 mb-5">
        <span className={`h-2 w-2 rounded-full ${status === 'Active' ? 'bg-emerald-400' : 'bg-red-400'}`} />
        <span className="text-[13px] font-normal text-white/70">{status}</span>
      </div>

      {/* actions */}
      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg border border-white/20 text-[13px] font-medium text-white hover:bg-white/10 transition-colors">
          <Eye className="h-4 w-4" />
          View Full Card
        </button>
        <button className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg border border-white/20 text-[13px] font-medium text-white hover:bg-white/10 transition-colors">
          <Download className="h-4 w-4" />
          Download
        </button>
      </div>
    </div>
  )
}
