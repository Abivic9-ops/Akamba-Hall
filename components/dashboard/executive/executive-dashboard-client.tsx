'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { executive_profile, executive_overview, approval_queue, oversight_reports, executive_summary, executive_announcements, reading_resources, upcoming_events, performance_snapshot } from '@/lib/mock/executive-data'
import { ExecutiveWelcomeHeader } from './executive-welcome-header'
import { ExecutiveOverviewCards } from './executive-overview-cards'
import { ExecutiveHeroBanner } from './executive-hero-banner'

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
    <div className={`bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] p-5 space-y-3 animate-pulse ${className}`}>
      <div className="h-5 w-36 bg-slate-200 rounded" />
      <div className="space-y-2">
        <div className="h-8 bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06] rounded" />
        <div className="h-8 bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06] rounded" />
        <div className="h-8 bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06] rounded" />
      </div>
    </div>
  )
}

export function ExecutiveDashboardClient() {
  return (
    <div className="space-y-7">
      {/* Row 1: Welcome header */}
      <ExecutiveWelcomeHeader fullName={executive_profile.fullName} />

      {/* Row 2: Overview cards (4-col grid) */}
      <ExecutiveOverviewCards
        activeLoans={executive_overview.activeLoans}
        activeLoansTrend={executive_overview.activeLoansTrend}
        pendingApprovals={executive_overview.pendingApprovals}
        upcomingBookings={executive_overview.upcomingBookings}
        holdsAwaiting={executive_overview.holdsAwaiting}
      />

      {/* Row 3: Hero banner (left, narrower) + Approval queue (right, wider) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-2">
          <ExecutiveHeroBanner />
        </div>
        <div className="lg:col-span-3">
          <Suspense fallback={<PanelSkeleton className="h-full" />}>
            <ApprovalQueueTable items={approval_queue} />
          </Suspense>
        </div>
      </div>

      {/* Row 4: Oversight (tall) / Policy (medium) / Summary (short) — varied heights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        <Suspense fallback={<PanelSkeleton className="min-h-[320px]" />}>
          <div className="lg:row-span-2">
            <OversightReports
              borrowingTrend={oversight_reports.borrowingTrend}
              overdueTrend={oversight_reports.overdueTrend}
              bookingUtilization={oversight_reports.bookingUtilization}
              equipmentUsage={oversight_reports.equipmentUsage}
              spaceUtilization={oversight_reports.spaceUtilization}
              sparklineData={oversight_reports.sparklineData}
            />
          </div>
        </Suspense>
        <Suspense fallback={<PanelSkeleton />}>
          <PolicyVisibility />
        </Suspense>
        <Suspense fallback={<PanelSkeleton />}>
          <ExecutiveSummary
            totalMembers={executive_summary.totalMembers}
            totalMembersTrend={executive_summary.totalMembersTrend}
            activeStaff={executive_summary.activeStaff}
            activeStaffTrend={executive_summary.activeStaffTrend}
            systemUptime={executive_summary.systemUptime}
            uptimeStatus={executive_summary.uptimeStatus}
            auditHighlights={executive_summary.auditHighlights}
            sensitiveActions={executive_summary.sensitiveActions}
          />
        </Suspense>
      </div>

      {/* Row 5: Performance Snapshot (left, wide) + Reading Resources + Events (right, stacked) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        <div className="lg:col-span-2">
          <Suspense fallback={<PanelSkeleton />}>
            <LibraryPerformanceSnapshot
              collectionsUsage={performance_snapshot.collectionsUsage}
              spaceUtilization={performance_snapshot.spaceUtilization}
              equipmentUsage={performance_snapshot.equipmentUsage}
              userSatisfaction={performance_snapshot.userSatisfaction}
            />
          </Suspense>
        </div>
        <div className="lg:col-span-1 space-y-5">
          <Suspense fallback={<PanelSkeleton />}>
            <ReadingDigitalResources resources={reading_resources} />
          </Suspense>
          <Suspense fallback={<PanelSkeleton />}>
            <UpcomingLibraryEvents events={upcoming_events} />
          </Suspense>
        </div>
      </div>

      {/* Row 6: Quick Actions + Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Suspense fallback={<PanelSkeleton />}>
          <QuickExecutiveActions />
        </Suspense>
        <Suspense fallback={<PanelSkeleton />}>
          <LibraryAnnouncements items={executive_announcements} />
        </Suspense>
      </div>
    </div>
  )
}
