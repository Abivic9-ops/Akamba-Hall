import { requireRole } from '@/lib/auth/roleGuard'
import { get_books, get_book_stats } from '@/lib/actions/books'
import { StaffInventoryClient } from '@/components/staff/staff-inventory-client'

export const dynamic = 'force-dynamic'

export default async function StaffInventoryPage() {
  await requireRole(['STAFF', 'SUPER_ADMIN'])

  const [books, stats] = await Promise.all([
    get_books({ limit: 100 }),
    get_book_stats(),
  ])

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0]">Inventory Management</h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] mt-1">Manage the library collection, add new titles, and update records.</p>
        </div>

        <StaffInventoryClient books={books} stats={stats} />
      </div>
    </div>
  )
}
