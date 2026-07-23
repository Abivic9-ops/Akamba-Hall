import { requireRole } from '@/lib/auth/roleGuard'
import { SectionCard } from '@/components/ui/section-card'
import { Megaphone } from 'lucide-react'

export default async function StaffAnnouncementsPage() {
  await requireRole(['STAFF', 'SUPER_ADMIN'])

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224] dark:bg-[#071224]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Announcements</h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Create and manage library announcements and alerts.</p>
        </div>

        <SectionCard title="Create Announcement" icon={Megaphone}>
          <div className="text-center py-8">
            <Megaphone className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">Announcement management coming soon.</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Create closures, acquisition notices, workshop announcements, and policy updates.</p>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
