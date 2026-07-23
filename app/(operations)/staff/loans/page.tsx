import { requireRole } from '@/lib/auth/roleGuard'
import { SectionCard } from '@/components/ui/section-card'
import { BookOpen } from 'lucide-react'

export default async function StaffLoansPage() {
  await requireRole(['STAFF', 'SUPER_ADMIN'])

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224] dark:bg-[#071224]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Loan Management</h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Process check-ins, check-outs, and manage member loans.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SectionCard title="Today's Check-outs">
            <p className="text-[32px] font-bold text-[#2563EB]">7</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Books issued today</p>
          </SectionCard>
          <SectionCard title="Today's Returns">
            <p className="text-[32px] font-bold text-[#18A957]">12</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Books returned today</p>
          </SectionCard>
          <SectionCard title="Overdue Items">
            <p className="text-[32px] font-bold text-[#DC2626]">4</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Requires follow-up</p>
          </SectionCard>
        </div>

        <SectionCard title="Process Loan" icon={BookOpen}>
          <div className="text-center py-8">
            <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]">Loan processing interface coming soon.</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Scan member QR codes and book barcodes to process transactions.</p>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
