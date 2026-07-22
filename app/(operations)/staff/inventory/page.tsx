import { requireRole } from '@/lib/auth/roleGuard'
import { SectionCard } from '@/components/ui/section-card'
import { Library } from 'lucide-react'

export default async function StaffInventoryPage() {
  await requireRole(['STAFF', 'SUPER_ADMIN'])

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-[28px] font-medium text-slate-900">Inventory Management</h1>
          <p className="text-[15px] text-slate-500 mt-1">Manage the library collection, add new titles, and update records.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SectionCard title="Total Books">
            <p className="text-[32px] font-bold text-slate-900">12,847</p>
            <p className="text-[13px] text-slate-400 mt-1">Across all categories</p>
          </SectionCard>
          <SectionCard title="Available Now">
            <p className="text-[32px] font-bold text-[#18A957]">11,203</p>
            <p className="text-[13px] text-slate-400 mt-1">Currently on shelves</p>
          </SectionCard>
          <SectionCard title="On Loan">
            <p className="text-[32px] font-bold text-[#2563EB]">1,644</p>
            <p className="text-[13px] text-slate-400 mt-1">Checked out by members</p>
          </SectionCard>
        </div>

        <SectionCard title="Collection Overview" icon={Library}>
          <div className="text-center py-8">
            <Library className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-[15px] text-slate-500">Full inventory management coming soon.</p>
            <p className="text-[13px] text-slate-400 mt-1">You&apos;ll be able to search, add, edit, and remove books from the collection.</p>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
