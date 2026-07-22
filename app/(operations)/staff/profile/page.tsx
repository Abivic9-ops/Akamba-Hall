import { requireRole } from '@/lib/auth/roleGuard'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { User, Mail, BookOpen, Star, Shield, Edit3 } from 'lucide-react'

export default async function StaffProfilePage() {
  await requireRole(['STAFF', 'SUPER_ADMIN'])

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-[28px] font-medium text-slate-900">My Profile</h1>
          <p className="text-[15px] text-slate-500 mt-1">View and manage your library account details.</p>
        </div>

        <SectionCard title="Personal Information" icon={User} cta={{ label: 'Edit Profile', href: '#' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-[12px] font-medium text-slate-400 uppercase tracking-wide">Full Name</label>
                <p className="text-[15px] text-slate-800 mt-1">James Mwangi</p>
              </div>
              <div>
                <label className="text-[12px] font-medium text-slate-400 uppercase tracking-wide">Title</label>
                <p className="text-[15px] text-slate-800 mt-1">Mr.</p>
              </div>
              <div>
                <label className="text-[12px] font-medium text-slate-400 uppercase tracking-wide">Staff ID</label>
                <p className="text-[15px] text-slate-800 mt-1 font-mono">SBC-STF-047</p>
              </div>
              <div>
                <label className="text-[12px] font-medium text-slate-400 uppercase tracking-wide">Email</label>
                <p className="text-[15px] text-slate-800 mt-1">james.mwangi@starehe.ac.ke</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[12px] font-medium text-slate-400 uppercase tracking-wide">Department</label>
                <p className="text-[15px] text-slate-800 mt-1">Science Department</p>
              </div>
              <div>
                <label className="text-[12px] font-medium text-slate-400 uppercase tracking-wide">Position</label>
                <p className="text-[15px] text-slate-800 mt-1">Senior Physics Teacher</p>
              </div>
              <div>
                <label className="text-[12px] font-medium text-slate-400 uppercase tracking-wide">Member Type</label>
                <p className="text-[15px] text-slate-800 mt-1">Staff</p>
              </div>
              <div>
                <label className="text-[12px] font-medium text-slate-400 uppercase tracking-wide">Account Status</label>
                <div className="mt-1">
                  <Badge variant="success" dot>Active</Badge>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SectionCard title="Membership Tier">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center">
                <Star className="h-6 w-6 text-slate-500 fill-slate-300" />
              </div>
              <div>
                <p className="text-[15px] font-medium text-slate-800">Silver Scholar</p>
                <p className="text-[12px] text-slate-400">2,340 / 3,000 pts to Gold</p>
              </div>
            </div>
          </SectionCard>
          <SectionCard title="Active Loans">
            <p className="text-[32px] font-bold text-[#2563EB]">3</p>
            <p className="text-[13px] text-slate-400 mt-1">Currently borrowed</p>
          </SectionCard>
          <SectionCard title="QR Access Card">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-[#2563EB]/5 flex items-center justify-center">
                <Shield className="h-6 w-6 text-[#2563EB]" />
              </div>
              <div>
                <p className="text-[14px] font-medium text-slate-800 font-mono">SBC-STF-047</p>
                <Badge variant="success" className="text-[10px] mt-1">Active</Badge>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
