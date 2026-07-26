import { requireRole } from '@/lib/auth/roleGuard'
import { get_announcements } from '@/lib/actions/announcements'
import { StaffAnnouncementsClient } from '@/components/staff/staff-announcements-client'

export const dynamic = 'force-dynamic'

export default async function StaffAnnouncementsPage() {
  await requireRole(['STAFF', 'SUPER_ADMIN'])

  const raw = await get_announcements()

  const announcements = raw.map((a) => ({
    id: a.id,
    title: a.title,
    body: a.body,
    category: a.category,
    attachmentUrl: a.attachmentUrl,
    isPinned: a.isPinned,
    publishedAt: a.publishedAt,
    createdAt: a.createdAt,
  }))

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0]">Announcements</h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] mt-1">Create and manage library announcements and alerts.</p>
        </div>

        <StaffAnnouncementsClient announcements={announcements} />
      </div>
    </div>
  )
}
