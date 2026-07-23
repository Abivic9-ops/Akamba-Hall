import { requireRole } from '@/lib/auth/roleGuard'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, ExternalLink, Globe, Database, FileText } from 'lucide-react'

const resources = [
  { id: 'er1', name: 'JSTOR', description: 'Academic journals, books, and primary sources across multiple disciplines.', category: 'Journals', status: 'active' as const, url: '#', icon: Database },
  { id: 'er2', name: 'EBSCOhost', description: 'Research databases for academic, medical, and business information.', category: 'Databases', status: 'active' as const, url: '#', icon: Database },
  { id: 'er3', name: 'Koha Library System', description: 'Online public access catalogue for searching the local collection.', category: 'Catalogue', status: 'active' as const, url: '#', icon: Globe },
  { id: 'er4', name: 'Kenya Libraries Portal', description: 'National library network digital resources and inter-library loans.', category: 'National', status: 'active' as const, url: '#', icon: Globe },
  { id: 'er5', name: 'Digital School Library', description: 'E-books and digital reading materials for curriculum support.', category: 'E-Books', status: 'active' as const, url: '#', icon: FileText },
]

const category_colors: Record<string, string> = {
  Journals: 'bg-blue-50 text-blue-700',
  Databases: 'bg-[#5B9BD5]/10 text-[#2563EB]',
  Catalogue: 'bg-emerald-50 text-emerald-700',
  National: 'bg-amber-50 text-amber-700',
  'E-Books': 'bg-rose-50 text-rose-700',
}

export default async function StaffEResourcesPage() {
  await requireRole(['STAFF', 'SUPER_ADMIN'])

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-[28px] font-medium text-slate-900">E-Resources</h1>
          <p className="text-[15px] text-slate-500 mt-1">Access digital databases, journals, and online research tools.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SectionCard title="Active Resources">
            <p className="text-[32px] font-bold text-[#2563EB]">{resources.length}</p>
            <p className="text-[13px] text-slate-400 mt-1">Available digital platforms</p>
          </SectionCard>
          <SectionCard title="Categories">
            <p className="text-[32px] font-bold text-[#8B5CF6]">{new Set(resources.map((r) => r.category)).size}</p>
            <p className="text-[13px] text-slate-400 mt-1">Resource types</p>
          </SectionCard>
          <SectionCard title="Status">
            <p className="text-[32px] font-bold text-[#18A957]">All Online</p>
            <p className="text-[13px] text-slate-400 mt-1">All systems operational</p>
          </SectionCard>
        </div>

        <SectionCard title="Available Resources" icon={BookOpen}>
          <div className="space-y-0">
            {resources.map((res) => {
              const Icon = res.icon
              return (
                <div key={res.id} className="flex items-center gap-4 py-3.5 border-b border-slate-50 last:border-0 hover:bg-slate-50 rounded-lg px-2 transition-colors group">
                  <div className="h-10 w-10 rounded-lg bg-[#2563EB]/5 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-[#2563EB]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[14px] font-medium text-slate-800">{res.name}</p>
                      <Badge variant="success" className="text-[9px]">ACTIVE</Badge>
                    </div>
                    <p className="text-[12px] text-slate-400 mt-0.5">{res.description}</p>
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${category_colors[res.category] ?? 'bg-slate-100 text-slate-600'}`}>
                    {res.category}
                  </span>
                  <a href={res.url} className="h-8 w-8 rounded-lg flex items-center justify-center border border-slate-200 hover:border-[#2563EB] hover:bg-[#2563EB]/5 transition-all shrink-0">
                    <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#2563EB]" />
                  </a>
                </div>
              )
            })}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
