import { requireRole } from '@/lib/auth/roleGuard'
import { get_all_users } from '@/lib/actions/users'
import UserManagement from '@/components/super-admin/user-management'
import { Users, Shield } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function super_admin_users_page() {
  const profile = await requireRole(['SUPER_ADMIN'])
  const users = await get_all_users()

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        {/* header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[22px] font-extrabold text-slate-900 font-[var(--font-poppins)] flex items-center gap-2">
              <Users className="h-5 w-5 text-slate-400" />
              User Registry
            </h1>
            <p className="text-[13px] text-slate-500 mt-1">
              Manage user roles and permissions across the system
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 border border-red-100">
            <Shield className="h-4 w-4 text-red-500" />
            <span className="text-[12px] font-bold text-red-600">Super Admin</span>
          </div>
        </div>

        {/* role legend */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-[13px] font-bold text-slate-700 mb-3">Role Hierarchy</h3>
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
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100"
              >
                <span className="text-[11px] font-bold text-slate-700">
                  {item.role.replace('_', ' ')}
                </span>
                <span className="text-[10px] text-slate-400">&mdash; {item.desc}</span>
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
