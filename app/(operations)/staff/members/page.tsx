import { requireRole } from '@/lib/auth/roleGuard'
import { SectionCard } from '@/components/ui/section-card'
import { Users } from 'lucide-react'

export default async function StaffMembersPage() {
  await requireRole(['STAFF', 'SUPER_ADMIN'])

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224] dark:bg-[#071224]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Member Management</h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">View and manage library member accounts and memberships.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SectionCard title="Total Members">
            <p className="text-[32px] font-bold text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">1,247</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Active library members</p>
          </SectionCard>
          <SectionCard title="Students">
            <p className="text-[32px] font-bold text-[#2563EB]">1,198</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Forms 1–4</p>
          </SectionCard>
          <SectionCard title="Staff Members">
            <p className="text-[32px] font-bold text-[#8B5CF6]">49</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Teaching & non-teaching</p>
          </SectionCard>
        </div>

        <SectionCard title="Member Directory" icon={Users}>
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">Full member directory coming soon.</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Search members, view profiles, and manage memberships.</p>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
