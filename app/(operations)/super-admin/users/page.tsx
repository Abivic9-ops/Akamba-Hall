import { requireRole } from '@/lib/auth/roleGuard'
import { get_all_users } from '@/lib/actions/users'
import UserManagement from '@/components/super-admin/user-management'
import { Users, Shield } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function super_admin_users_page() {
  const profile = await requireRole(['SUPER_ADMIN'])
  const users = await get_all_users()

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        {/* header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0] font-[var(--font-poppins)] flex items-center gap-3">
              <Users className="h-6 w-6 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
              User Registry
            </h1>
            <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">
              Manage user roles and permissions across the system
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 border border-red-100">
            <Shield className="h-4 w-4 text-red-500" />
            <span className="text-[14px] font-normal text-red-600">Super Admin</span>
          </div>
        </div>

        {/* role legend */}
        <div className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none p-5">
          <h3 className="text-[15px] font-medium text-slate-700 dark:text-[#E2E8F0] mb-3">Role Hierarchy</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { role: 'SUPER_ADMIN', desc: 'Full system access' },
              { role: 'LIBRARY_HEAD', desc: 'Library operations' },
              { role: 'EXECUTIVE', desc: 'Executive oversight' },
              { role: 'STAFF', desc: 'General staff' },
              { role: 'CAPTAIN', desc: 'Desk captain' },
              { role: 'PREFECT', desc: 'Desk prefect' },
              { role: 'ASSISTANT', desc: 'Library assistant' },
              { role: 'STUDENT', desc: 'Default role' },
            ].map((item) => (
              <div
                key={item.role}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-white/[0.04] dark:bg-white/[0.04] border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08]"
              >
                <span className="text-[13px] font-normal text-slate-700 dark:text-[#E2E8F0]">
                  {item.role.replace('_', ' ')}
                </span>
                <span className="text-[12px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">&mdash; {item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* user management table */}
        <UserManagement users={users} currentUserId={profile.id} />
      </div>
    </div>
  )
}
