'use client'

import { GraduationCap, Users, Briefcase, Star, UserX, ArrowRight } from 'lucide-react'

interface RoleItem {
  role: string
  icon: string
  count: number
  status: string
  color: string
}

const icon_map: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  Users,
  Briefcase,
  Star,
  UserX,
}

const status_colors: Record<string, string> = {
  Active: 'bg-emerald-50 text-emerald-600',
  Suspended: 'bg-red-50 text-red-500',
}

export function UserRoleVisibility({ roles }: { roles: RoleItem[] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-semibold text-slate-900">User Role Visibility</h3>
          <p className="text-[12px] text-slate-400 mt-0.5">Member distribution</p>
        </div>
        <button className="text-[12px] font-semibold text-[#2563EB] hover:text-blue-700 inline-flex items-center gap-1 transition-colors">
          Manage users <ArrowRight className="h-3 w-3" />
        </button>
      </div>
      <div className="space-y-2">
        {roles.map((role) => {
          const Icon = icon_map[role.icon] ?? Users
          return (
            <div key={role.role} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
              <Icon className={`h-4 w-4 ${role.color} shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-slate-700">{role.role}</p>
              </div>
              <span className="text-[14px] font-bold text-slate-900">{role.count.toLocaleString()}</span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${status_colors[role.status] ?? 'bg-slate-100 text-slate-500'}`}>
                {role.status}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
