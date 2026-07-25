'use client'

import { Shield, Users } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

const permissions = [
  { role: 'STUDENT', access: ['Browse Catalogue', 'View E-Resources', 'Submit Feedback', 'View Announcements'] },
  { role: 'STAFF', access: ['All Student permissions', 'Checkout/Return Books', 'Manage Bookings', 'View Members'] },
  { role: 'EXECUTIVE', access: ['All Staff permissions', 'Approve Bookings', 'View Reports', 'Manage Announcements'] },
  { role: 'LIBRARY_HEAD', access: ['All Executive permissions', 'Manage Inventory', 'Manage Staff', 'Manage Policies', 'View Charges'] },
  { role: 'SUPER_ADMIN', access: ['Full system access', 'Manage Users', 'System Settings', 'Audit Logs', 'Backups'] },
]

export function PermissionsClient() {
  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Permissions</h1>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Role-based access control overview</p>
          </div>
        </div>

        <div className="space-y-4">
          {permissions.map((p) => (
            <div key={p.role} className="bg-white dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-50 flex items-center gap-2">
                <Users className="h-4 w-4 text-slate-400 dark:text-[#6B7A99]" />
                <h2 className="text-[15px] font-medium text-slate-900 dark:text-[#E2E8F0]">{p.role.replace('_', ' ')}</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {p.access.map((a, i) => (
                    <div key={i} className="flex items-center gap-2 text-[13px] text-slate-600 dark:text-[#E2E8F0]">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
