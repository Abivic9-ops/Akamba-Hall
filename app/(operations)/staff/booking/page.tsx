import { requireRole } from '@/lib/auth/roleGuard'
import { get_user_bookings, get_booking_stats } from '@/lib/actions/bookings'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { Video, CalendarCheck, Clock, MapPin } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function StaffBookingPage() {
  const profile = await requireRole(['STAFF', 'SUPER_ADMIN'])

  const [bookings, stats] = await Promise.all([
    get_user_bookings(profile.id),
    get_booking_stats(),
  ])

  const typeConfig: Record<string, { color: string; iconColor: string }> = {
    Boardroom: { color: 'bg-[#5B9BD5]/10 text-[#2563EB]', iconColor: 'text-[#5B9BD5]' },
    AVR: { color: 'bg-blue-50 text-blue-700', iconColor: 'text-[#2563EB]' },
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0]">AVR / Boardroom Booking</h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] mt-1">Book audio-visual rooms and boardrooms for meetings and sessions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SectionCard title="Today&apos;s Bookings">
            <p className="text-[32px] font-bold text-[#2563EB]">{stats.todayCount}</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">Scheduled for today</p>
          </SectionCard>
          <SectionCard title="Pending Approval">
            <p className="text-[32px] font-bold text-[#F97316]">{stats.pending}</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">Awaiting confirmation</p>
          </SectionCard>
          <SectionCard title="Total Bookings">
            <p className="text-[32px] font-bold text-slate-900 dark:text-[#E2E8F0]">{stats.totalActive}</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">This week</p>
          </SectionCard>
        </div>

        <SectionCard title="My Bookings" icon={CalendarCheck} cta={{ label: 'New Booking', href: '#' }}>
          <div className="space-y-0">
            {bookings.length === 0 ? (
              <p className="text-[13px] text-slate-400 text-center py-8">No bookings yet.</p>
            ) : (
              bookings.map((bk) => {
                const tc = typeConfig[bk.type] ?? { color: 'bg-slate-100 text-slate-600', iconColor: 'text-slate-400' }
                const statusVariant = bk.status === 'CONFIRMED' ? 'success' : bk.status === 'APPROVED' ? 'info' : 'warning'
                const statusLabel = bk.status.charAt(0) + bk.status.slice(1).toLowerCase()
                return (
                  <div key={bk.id} className="flex items-center gap-4 py-3.5 border-b border-slate-50 last:border-0 hover:bg-slate-50 dark:hover:bg-white/[0.04] rounded-lg px-2 transition-colors">
                    <div className="h-10 w-10 rounded-lg bg-slate-50 dark:bg-white/[0.04] flex items-center justify-center shrink-0">
                      <Video className={`h-4 w-4 ${tc.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{bk.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-[#6B7A99]">
                          <MapPin className="h-3 w-3" />
                          {bk.location}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-[#6B7A99]">
                          <Clock className="h-3 w-3" />
                          {new Date(bk.startAt).toLocaleDateString()} · {new Date(bk.startAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} – {new Date(bk.endAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                        </span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${tc.color}`}>
                      {bk.type}
                    </span>
                    <Badge variant={statusVariant as 'success' | 'info' | 'warning'} className="text-[10px]">{statusLabel}</Badge>
                  </div>
                )
              })
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
