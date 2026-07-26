'use client'

import { Eye, BookOpen, Calendar, ShieldCheck } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

interface Activity {
  id: string
  type: 'LOAN' | 'BOOKING' | 'ROLE_REQUEST'
  action: string
  detail: string
  userName: string
  timestamp: string
}

interface AuditTrailsClientProps {
  activities: Activity[]
}

const typeConfig: Record<string, { Icon: typeof BookOpen; color: string; bg: string }> = {
  LOAN: { Icon: BookOpen, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10' },
  BOOKING: { Icon: Calendar, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-500/10' },
  ROLE_REQUEST: { Icon: ShieldCheck, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10' },
}

export function AuditTrailsClient({ activities }: AuditTrailsClientProps) {
  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
            <Eye className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Audit Trails</h1>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Track all system actions and changes</p>
          </div>
        </div>

        <SectionCard title="Unified Activity Feed" icon={Eye}>
          {activities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Eye className="h-10 w-10 text-slate-300 dark:text-[#6B7A99] mb-3" />
              <p className="text-[14px] text-slate-500 dark:text-[#6B7A99]">No recent activity recorded.</p>
            </div>
          ) : (
            <div className="space-y-1">
              {activities.map((activity) => {
                const tc = typeConfig[activity.type] ?? typeConfig.LOAN
                const TIcon = tc.Icon
                return (
                  <div key={activity.id} className="flex items-start gap-3 py-3 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                    <div className={`h-8 w-8 rounded-lg ${tc.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                      <TIcon className={`h-4 w-4 ${tc.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[13px] font-medium text-slate-800 dark:text-[#E2E8F0]">{activity.action}</span>
                        <span className="text-[11px] text-slate-400 dark:text-[#6B7A99]">{activity.userName}</span>
                      </div>
                      <p className="text-[12px] text-slate-500 dark:text-[#6B7A99] truncate">{activity.detail}</p>
                    </div>
                    <span className="text-[11px] text-slate-400 dark:text-[#6B7A99] whitespace-nowrap shrink-0">
                      {new Date(activity.timestamp).toLocaleString()}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  )
}
