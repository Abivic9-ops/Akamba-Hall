import { requireRole } from '@/lib/auth/roleGuard'
import { get_eresources } from '@/lib/actions/resources'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, ExternalLink, Globe, Database, FileText } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function StaffEResourcesPage() {
  await requireRole(['STAFF', 'SUPER_ADMIN'])

  const resources = await get_eresources()

  const categoryColors: Record<string, string> = {
    Journals: 'bg-blue-50 text-blue-700',
    Databases: 'bg-[#5B9BD5]/10 text-[#2563EB]',
    Catalogue: 'bg-emerald-50 text-emerald-700',
    National: 'bg-amber-50 text-amber-700',
    'E-Books': 'bg-rose-50 text-rose-700',
  }

  const categories = new Set(resources.map((r) => r.category))

  const iconMap: Record<string, typeof Database> = {
    Journals: Database,
    Databases: Database,
    Catalogue: Globe,
    National: Globe,
    'E-Books': FileText,
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0]">E-Resources</h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] mt-1">Access digital databases, journals, and online research tools.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SectionCard title="Active Resources">
            <p className="text-[32px] font-bold text-[#2563EB]">{resources.length}</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">Available digital platforms</p>
          </SectionCard>
          <SectionCard title="Categories">
            <p className="text-[32px] font-bold text-[#8B5CF6]">{categories.size}</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">Resource types</p>
          </SectionCard>
          <SectionCard title="Status">
            <p className="text-[32px] font-bold text-[#18A957]">All Online</p>
            <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] mt-1">All systems operational</p>
          </SectionCard>
        </div>

        <SectionCard title="Available Resources" icon={BookOpen}>
          <div className="space-y-0">
            {resources.length === 0 ? (
              <p className="text-[13px] text-slate-400 text-center py-8">No e-resources configured yet.</p>
            ) : (
              resources.map((res) => {
                const cat = res.category ?? 'Other'
                const Icon = iconMap[cat] ?? Globe
                return (
                  <div key={res.id} className="flex items-center gap-4 py-3.5 border-b border-slate-50 last:border-0 hover:bg-slate-50 dark:hover:bg-white/[0.04] rounded-lg px-2 transition-colors group">
                    <div className="h-10 w-10 rounded-lg bg-[#2563EB]/5 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-[#2563EB]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0]">{res.title}</p>
                        <Badge variant="success" className="text-[9px]">ACTIVE</Badge>
                      </div>
                      <p className="text-[12px] text-slate-400 dark:text-[#6B7A99] mt-0.5">{res.description}</p>
                    </div>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${categoryColors[cat] ?? 'bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-[#94A3B8]'}`}>
                      {cat}
                    </span>
                    {res.url && res.url !== '#' && (
                      <a href={res.url} target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-lg flex items-center justify-center border border-slate-200 dark:border-white/10 hover:border-[#2563EB] hover:bg-[#2563EB]/5 transition-all shrink-0">
                        <ExternalLink className="h-3.5 w-3.5 text-slate-400 dark:text-[#6B7A99] group-hover:text-[#2563EB]" />
                      </a>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
