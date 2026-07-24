'use client'

import { Suspense } from 'react'
import { BookOpen, RotateCcw, AlertTriangle, FileText, Calendar } from 'lucide-react'
import { useAuth } from '@/lib/contexts/auth-context'
import { DeskWelcomeHeader } from './greeting-status'
import { KpiCards } from './kpi-cards'
import { QuickIssueWorkspace } from './quick-issue-workspace'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { OfflineBanner } from './offline-banner'
import { DeskQuickActions } from './desk-quick-actions'
import {
  desk_kpi,
  recent_transactions,
  holds_queue,
  today_returns,
  overdue_alerts,
  library_notices,
  upcoming_events,
} from '@/lib/mock/desk-data'

function PanelSkeleton() {
  return (
    <div className="bg-white dark:bg-[#13285A] rounded-xl border border-slate-100 dark:border-white/[0.08] shadow-sm p-6 space-y-3 animate-pulse">
      <div className="h-5 w-40 bg-slate-200 dark:bg-white/10 rounded-lg" />
      <div className="space-y-2">
        <div className="h-10 bg-slate-100 dark:bg-white/[0.06] rounded-lg" />
        <div className="h-10 bg-slate-100 dark:bg-white/[0.06] rounded-lg" />
      </div>
    </div>
  )
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  return `${Math.floor(mins / 60)}h ago`
}

function RecentTransactionsCard() {
  return (
    <SectionCard title="Recent Transactions" icon={BookOpen} cta={{ label: 'View all', href: '/desk/issue-log' }}>
      <div className="space-y-0">
        {recent_transactions.slice(0, 6).map((tx) => (
          <div key={tx.id} className="flex items-center gap-3 py-3 border-b border-slate-50 dark:border-white/[0.06] last:border-0">
            <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
              tx.type === 'issue' ? 'bg-blue-50 dark:bg-blue-500/10 text-[#2563EB] dark:text-blue-400' :
              tx.type === 'return' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
              'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400'
            }`}>
              {tx.type === 'issue' ? <BookOpen className="h-4 w-4" /> :
               tx.type === 'return' ? <RotateCcw className="h-4 w-4" /> :
               <RotateCcw className="h-4 w-4" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-slate-800 dark:text-white/80 truncate">
                {tx.type === 'issue' ? 'Issued' : tx.type === 'return' ? 'Returned' : 'Renewed'}: {tx.itemTitle}
              </p>
              <p className="text-[11px] text-slate-400 dark:text-white/40 mt-0.5">{tx.memberName}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Badge variant={tx.status === 'Issued' ? 'success' : tx.status === 'Returned' ? 'info' : 'warning'}>
                {tx.status}
              </Badge>
              <span className="text-[11px] text-slate-400 dark:text-white/40">{timeAgo(tx.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}

function HoldsQueueCard() {
  const status_variant: Record<string, 'success' | 'warning' | 'danger'> = {
    'Ready': 'success',
    'Waiting': 'warning',
    'Overdue for pickup': 'danger',
  }

  return (
    <SectionCard title="Holds Queue" icon={AlertTriangle} cta={{ label: 'View all', href: '#' }}>
      <div className="space-y-0">
        {holds_queue.map((hold) => (
          <div key={hold.id} className="flex items-start gap-3 py-3 border-b border-slate-50 dark:border-white/[0.06] last:border-0">
            <div className="w-[32px] h-[42px] rounded-lg bg-slate-100 dark:bg-white/[0.06] flex items-center justify-center shrink-0">
              <BookOpen className="h-3.5 w-3.5 text-slate-400 dark:text-white/40" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-slate-800 dark:text-white/80 truncate">{hold.title}</p>
              <p className="text-[11px] text-slate-400 dark:text-white/40">{hold.requestedBy}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={status_variant[hold.status] ?? 'info'}>{hold.status}</Badge>
                <span className="text-[10px] text-slate-400 dark:text-white/40">#{hold.queuePosition}/{hold.totalInQueue}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}

function TodaysReturnsCard() {
  return (
    <SectionCard title="Today's Returns" icon={RotateCcw} cta={{ label: 'View all', href: '#' }}>
      <div className="space-y-0">
        {today_returns.map((ret) => (
          <div key={ret.id} className="flex items-center gap-3 py-3 border-b border-slate-50 dark:border-white/[0.06] last:border-0">
            <div className="w-[32px] h-[42px] rounded-lg bg-slate-100 dark:bg-white/[0.06] flex items-center justify-center shrink-0">
              <RotateCcw className="h-3.5 w-3.5 text-slate-400 dark:text-white/40" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-slate-800 dark:text-white/80 truncate">{ret.title}</p>
              <p className="text-[11px] text-slate-400 dark:text-white/40">{ret.author}</p>
            </div>
            <div className="flex flex-col items-end shrink-0">
              <Badge variant="success">Returned</Badge>
              <span className="text-[10px] text-slate-400 dark:text-white/40 mt-1">
                {new Date(ret.returnedAt).toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit', hour12: false })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}

function LibraryNoticesCard() {
  const notice_icons: Record<string, { iconBg: string; iconColor: string }> = {
    digital: { iconBg: 'bg-blue-50 dark:bg-blue-500/10', iconColor: 'text-[#2563EB] dark:text-blue-400' },
    event: { iconBg: 'bg-amber-50 dark:bg-amber-500/10', iconColor: 'text-amber-600 dark:text-amber-400' },
    general: { iconBg: 'bg-slate-100 dark:bg-white/[0.06]', iconColor: 'text-slate-500 dark:text-white/50' },
  }

  return (
    <SectionCard title="Library Notices" icon={FileText} cta={{ label: 'View all', href: '#' }}>
      <div className="space-y-0">
        {library_notices.map((notice) => {
          const config = notice_icons[notice.category] ?? notice_icons.general
          return (
            <div key={notice.id} className="flex items-start gap-3 py-3 border-b border-slate-50 dark:border-white/[0.06] last:border-0">
              <div className={`h-8 w-8 rounded-lg ${config.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                <FileText className={`h-3.5 w-3.5 ${config.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-slate-800 dark:text-white/80">{notice.title}</p>
                <p className="text-[11px] text-slate-400 dark:text-white/40 mt-0.5 truncate">{notice.body}</p>
              </div>
              <span className="text-[10px] text-slate-400 dark:text-white/40 shrink-0 mt-1">{notice.timeAgo}</span>
            </div>
          )
        })}
      </div>
    </SectionCard>
  )
}

function UpcomingEventsCard() {
  return (
    <SectionCard title="Upcoming Events" icon={Calendar} cta={{ label: 'View calendar', href: '#' }}>
      <div className="space-y-0">
        {upcoming_events.map((event) => (
          <div key={event.id} className="flex items-center gap-3 py-3 border-b border-slate-50 dark:border-white/[0.06] last:border-0">
            <div className="h-[42px] w-[42px] rounded-lg bg-[#0B1A3B] dark:bg-white/[0.08] flex flex-col items-center justify-center shrink-0">
              <span className="text-[8px] font-bold text-[#E8A63C] leading-none tracking-wider">{event.month}</span>
              <span className="text-[16px] font-bold text-white leading-none mt-0.5">{event.day}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-slate-800 dark:text-white/80">{event.title}</p>
              <p className="text-[11px] text-slate-400 dark:text-white/40 mt-0.5">{event.time} · {event.venue}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}

function OverdueAlertsCard() {
  return (
    <SectionCard title="Overdue Alerts" icon={AlertTriangle}>
      <div className="space-y-0">
        {overdue_alerts.map((alert) => (
          <div key={alert.id} className="flex items-center gap-3 py-3 border-b border-slate-50 dark:border-white/[0.06] last:border-0">
            <div className="w-[32px] h-[42px] rounded-lg bg-red-50 dark:bg-red-500/10 flex items-center justify-center shrink-0">
              <AlertTriangle className="h-3.5 w-3.5 text-red-400 dark:text-red-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-slate-800 dark:text-white/80 truncate">{alert.title}</p>
              <p className="text-[11px] text-slate-400 dark:text-white/40">{alert.author}</p>
              <p className="text-[11px] text-red-500 dark:text-red-400 font-medium mt-0.5">
                Due: {new Date(alert.dueDate).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <Badge variant={alert.daysOverdue >= 4 ? 'danger' : 'warning'}>
                {alert.daysOverdue}d overdue
              </Badge>
              <span className="text-[9px] text-slate-400 dark:text-white/40 font-mono">{alert.memberId}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}

export function DeskDashboardClient() {
  const { user } = useAuth()
  const firstName = user?.fullName?.split(' ')[0] ?? 'Mary'

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1200px] mx-auto p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5">

        <DeskWelcomeHeader firstName={firstName} />

        <KpiCards
          loansIssued={desk_kpi.loansIssued}
          returnsProcessed={desk_kpi.returnsProcessed}
          renewals={desk_kpi.renewals}
          newMembers={desk_kpi.newMembers}
          overdueItems={desk_kpi.overdueItems}
        />

        <QuickIssueWorkspace />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          <Suspense fallback={<PanelSkeleton />}><RecentTransactionsCard /></Suspense>
          <Suspense fallback={<PanelSkeleton />}><HoldsQueueCard /></Suspense>
          <Suspense fallback={<PanelSkeleton />}><TodaysReturnsCard /></Suspense>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start">
          <div className="lg:col-span-3">
            <Suspense fallback={<PanelSkeleton />}><LibraryNoticesCard /></Suspense>
          </div>
          <div className="lg:col-span-2">
            <Suspense fallback={<PanelSkeleton />}><UpcomingEventsCard /></Suspense>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start">
          <div className="lg:col-span-3">
            <Suspense fallback={<PanelSkeleton />}><OverdueAlertsCard /></Suspense>
          </div>
          <div className="lg:col-span-2">
            <DeskQuickActions />
          </div>
        </div>

      </div>

      <OfflineBanner isOnline={true} queuedCount={0} />
    </div>
  )
}
