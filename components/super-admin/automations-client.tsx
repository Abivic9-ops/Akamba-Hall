'use client'

import { Zap, AlertCircle, Clock, CalendarCheck, Megaphone } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

interface AutomationsClientProps {
  rules: {
    overdueLoans: number
    expiringHolds: number
    pendingBookings: number
    activeAnnouncements: number
  }
}

const automationRules = [
  {
    id: 'overdue-notifications',
    name: 'Overdue Loan Notifications',
    description: 'Automatically notify borrowers with overdue books via email',
    icon: AlertCircle,
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-500/10',
    countKey: 'overdueLoans' as const,
  },
  {
    id: 'hold-expiry',
    name: 'Hold Expiry Reminders',
    description: 'Send reminders before hold requests expire and auto-cancel expired holds',
    icon: Clock,
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-500/10',
    countKey: 'expiringHolds' as const,
  },
  {
    id: 'booking-reminders',
    name: 'Booking Confirmation',
    description: 'Auto-approve pending bookings and send confirmation emails',
    icon: CalendarCheck,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-500/10',
    countKey: 'pendingBookings' as const,
  },
  {
    id: 'announcement-digest',
    name: 'Announcement Distribution',
    description: 'Distribute new announcements to all eligible users',
    icon: Megaphone,
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-500/10',
    countKey: 'activeAnnouncements' as const,
  },
]

export function AutomationsClient({ rules }: AutomationsClientProps) {
  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Automations</h1>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">System automation rules and scheduled tasks</p>
          </div>
        </div>

        <SectionCard title="Automation Rules" icon={Zap}>
          <div className="space-y-3">
            {automationRules.map((rule) => {
              const Icon = rule.icon
              const count = rules[rule.countKey]
              const isActive = count > 0
              return (
                <div key={rule.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06]">
                  <div className={`h-10 w-10 rounded-xl ${rule.bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`h-5 w-5 ${rule.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0]">{rule.name}</h3>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        isActive
                          ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-[#6B7A99]'
                      }`}>
                        <div className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-slate-300 dark:bg-[#6B7A99]'}`} />
                        {isActive ? 'Active' : 'Idle'}
                      </span>
                    </div>
                    <p className="text-[12px] text-slate-500 dark:text-[#6B7A99] mt-0.5">{rule.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[17px] font-extrabold text-slate-800 dark:text-[#E2E8F0]">{count}</p>
                    <p className="text-[11px] text-slate-400 dark:text-[#6B7A99]">pending</p>
                  </div>
                </div>
              )
            })}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
