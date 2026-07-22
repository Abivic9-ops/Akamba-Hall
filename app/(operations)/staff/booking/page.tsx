import { requireRole } from '@/lib/auth/roleGuard'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { Video, CalendarCheck, Clock, MapPin, Plus } from 'lucide-react'

const bookings = [
  { id: 'bk1', type: 'Boardroom' as const, title: 'Physics Department Review', location: 'Boardroom A', date: 'Today', startTime: '2:00 PM', endTime: '3:30 PM', status: 'Confirmed' as const },
  { id: 'bk2', type: 'AVR' as const, title: 'Form 4 Revision Session Recording', location: 'Audio Visual Room', date: 'Today', startTime: '4:00 PM', endTime: '5:00 PM', status: 'Approved' as const },
  { id: 'bk3', type: 'Boardroom' as const, title: 'Library Committee Meeting', location: 'Boardroom A', date: 'Tomorrow', startTime: '3:00 PM', endTime: '4:00 PM', status: 'Pending' as const },
  { id: 'bk4', type: 'AVR' as const, title: 'E-Resource Training Session', location: 'Audio Visual Room', date: '25 Jul 2026', startTime: '10:00 AM', endTime: '12:00 PM', status: 'Confirmed' as const },
]

const status_config = {
  Confirmed: { label: 'Confirmed', variant: 'success' as const },
  Approved: { label: 'Approved', variant: 'info' as const },
  Pending: { label: 'Pending', variant: 'warning' as const },
}

const type_config = {
  Boardroom: { color: 'bg-purple-50 text-purple-700', iconColor: 'text-[#8B5CF6]' },
  AVR: { color: 'bg-blue-50 text-blue-700', iconColor: 'text-[#2563EB]' },
}

export default async function StaffBookingPage() {
  await requireRole(['STAFF', 'SUPER_ADMIN'])

  const todayCount = bookings.filter((b) => b.date === 'Today').length
  const pendingCount = bookings.filter((b) => b.status === 'Pending').length

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-[28px] font-medium text-slate-900">AVR / Boardroom Booking</h1>
          <p className="text-[15px] text-slate-500 mt-1">Book audio-visual rooms and boardrooms for meetings and sessions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SectionCard title="Today&apos;s Bookings">
            <p className="text-[32px] font-bold text-[#2563EB]">{todayCount}</p>
            <p className="text-[13px] text-slate-400 mt-1">Scheduled for today</p>
          </SectionCard>
          <SectionCard title="Pending Approval">
            <p className="text-[32px] font-bold text-[#F97316]">{pendingCount}</p>
            <p className="text-[13px] text-slate-400 mt-1">Awaiting confirmation</p>
          </SectionCard>
          <SectionCard title="Total Bookings">
            <p className="text-[32px] font-bold text-slate-900">{bookings.length}</p>
            <p className="text-[13px] text-slate-400 mt-1">This week</p>
          </SectionCard>
        </div>

        <SectionCard title="My Bookings" icon={CalendarCheck} cta={{ label: 'New Booking', href: '#' }}>
          <div className="space-y-0">
            {bookings.map((bk) => {
              const sc = status_config[bk.status]
              const tc = type_config[bk.type]
              return (
                <div key={bk.id} className="flex items-center gap-4 py-3.5 border-b border-slate-50 last:border-0 hover:bg-slate-50 rounded-lg px-2 transition-colors">
                  <div className="h-10 w-10 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                    <Video className={`h-4 w-4 ${tc.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-slate-800 truncate">{bk.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <MapPin className="h-3 w-3" />
                        {bk.location}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Clock className="h-3 w-3" />
                        {bk.date} · {bk.startTime} – {bk.endTime}
                      </span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${tc.color}`}>
                    {bk.type}
                  </span>
                  <Badge variant={sc.variant} className="text-[10px]">{sc.label}</Badge>
                </div>
              )
            })}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
