'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { ExecutiveWelcomeHeader } from './executive-welcome-header'
import { ExecutiveOverviewCards } from './executive-overview-cards'
import { ExecutiveHeroBanner } from './executive-hero-banner'
import { AiAnnouncementBanner } from '@/components/ai/ai-announcement-banner'

const ApprovalQueueTable = dynamic(() => import('./approval-queue-table').then(m => ({ default: m.ApprovalQueueTable })), { ssr: false })
const OversightReports = dynamic(() => import('./oversight-reports').then(m => ({ default: m.OversightReports })), { ssr: false })
const PolicyVisibility = dynamic(() => import('./policy-visibility').then(m => ({ default: m.PolicyVisibility })), { ssr: false })
const ExecutiveSummary = dynamic(() => import('./executive-summary').then(m => ({ default: m.ExecutiveSummary })), { ssr: false })
const LibraryAnnouncements = dynamic(() => import('./library-announcements').then(m => ({ default: m.LibraryAnnouncements })), { ssr: false })
const ReadingDigitalResources = dynamic(() => import('./reading-digital-resources').then(m => ({ default: m.ReadingDigitalResources })), { ssr: false })
const UpcomingLibraryEvents = dynamic(() => import('./upcoming-library-events').then(m => ({ default: m.UpcomingLibraryEvents })), { ssr: false })
const QuickExecutiveActions = dynamic(() => import('./quick-executive-actions').then(m => ({ default: m.QuickExecutiveActions })), { ssr: false })
const LibraryPerformanceSnapshot = dynamic(() => import('./library-performance-snapshot').then(m => ({ default: m.LibraryPerformanceSnapshot })), { ssr: false })

function PanelSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white dark:bg-[#0E1F3F] rounded-xl border border-slate-100 dark:border-white/[0.08] p-5 space-y-3 animate-pulse ${className}`}>
      <div className="h-5 w-36 bg-slate-200 rounded" />
      <div className="space-y-2">
        <div className="h-8 bg-slate-100 dark:bg-white/[0.06] rounded" />
        <div className="h-8 bg-slate-100 dark:bg-white/[0.06] rounded" />
        <div className="h-8 bg-slate-100 dark:bg-white/[0.06] rounded" />
      </div>
    </div>
  )
}

interface Props {
  profile: { fullName: string }
  overview: { activeLoans: number; pendingApprovals: number; upcomingBookings: number; holdsAwaiting: number }
  summary: { totalMembers: number; activeStaff: number; systemUptime: string }
  approvalQueue: { id: string; type: 'room_booking' | 'special_access' | 'policy_exception' | 'incident' | 'general'; request: string; requestor: string; context: string; date: string; priority: 'normal' | 'high' }[]
  userRoles: { role: string; count: number; status: 'Active' | 'Suspended' }[]
  announcements: { id: string; title: string; detail: string; status: 'New' | 'Notice' | 'Update' }[]
  events: { id: string; day: number; month: string; title: string; time: string; venue: string }[]
  resources: { id: string; type: 'book' | 'database' | 'journal' | 'ebook'; title: string; subtitle: string; detail: string }[]
  performance: { collectionsUsage: number; overdueRate: number }
  policies: { id: string; title: string; description: string; category: string }[]
  criticalAlerts: number
}

export function ExecutiveDashboardClient({
  profile,
  overview,
  summary,
  approvalQueue,
  announcements,
  events,
  resources,
  performance,
}: Props) {
  return (
    <div className="space-y-5 sm:space-y-7 px-4 sm:px-5 md:px-0">
      <ExecutiveWelcomeHeader fullName={profile.fullName} />

      <ExecutiveOverviewCards
        activeLoans={overview.activeLoans}
        activeLoansTrend={{ direction: 'up', value: '' }}
        pendingApprovals={overview.pendingApprovals}
        upcomingBookings={overview.upcomingBookings}
        holdsAwaiting={overview.holdsAwaiting}
      />

      <AiAnnouncementBanner portal="executive" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-2">
          <ExecutiveHeroBanner />
        </div>
        <div className="lg:col-span-3">
          <Suspense fallback={<PanelSkeleton className="h-full" />}>
            <ApprovalQueueTable items={approvalQueue} />
          </Suspense>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        <Suspense fallback={<PanelSkeleton className="min-h-[320px]" />}>
          <div className="lg:row-span-2">
            <OversightReports
              borrowingTrend={{ direction: 'up', value: '' }}
              overdueTrend={{ direction: 'down', value: '' }}
              bookingUtilization={performance.collectionsUsage}
              equipmentUsage={0}
              spaceUtilization={0}
              sparklineData={[]}
            />
          </div>
        </Suspense>
        <Suspense fallback={<PanelSkeleton />}>
          <PolicyVisibility />
        </Suspense>
        <Suspense fallback={<PanelSkeleton />}>
          <ExecutiveSummary
            totalMembers={summary.totalMembers}
            totalMembersTrend={{ direction: 'up', value: '' }}
            activeStaff={summary.activeStaff}
            activeStaffTrend={{ direction: 'stable', value: '—' }}
            systemUptime={summary.systemUptime}
            uptimeStatus="Excellent"
            auditHighlights={0}
            sensitiveActions={0}
          />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        <div className="lg:col-span-2">
          <Suspense fallback={<PanelSkeleton />}>
            <LibraryPerformanceSnapshot
              collectionsUsage={performance.collectionsUsage}
              spaceUtilization={0}
              equipmentUsage={0}
              userSatisfaction={0}
            />
          </Suspense>
        </div>
        <div className="lg:col-span-1 space-y-5">
          <Suspense fallback={<PanelSkeleton />}>
            <ReadingDigitalResources resources={resources} />
          </Suspense>
          <Suspense fallback={<PanelSkeleton />}>
            <UpcomingLibraryEvents events={events} />
          </Suspense>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Suspense fallback={<PanelSkeleton />}>
          <QuickExecutiveActions />
        </Suspense>
        <Suspense fallback={<PanelSkeleton />}>
          <LibraryAnnouncements items={announcements.map(a => ({ ...a, icon: 'Megaphone' }))} />
        </Suspense>
      </div>
    </div>
  )
}
