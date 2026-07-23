'use client'

import { Globe, ExternalLink } from 'lucide-react'

const databases = [
  { name: 'JSTOR', description: 'Arts, Humanities & Social Sciences', access: 'Full Access', status: 'Active' },
  { name: 'IEEE Xplore', description: 'Engineering & Technology', access: 'Full Access', status: 'Active' },
  { name: 'SpringerLink', description: 'Science, Technology & Medicine', access: 'Full Access', status: 'Active' },
  { name: 'EBSCOhost', description: 'Multi-disciplinary Research Database', access: 'Full Access', status: 'Active' },
  { name: 'ProQuest', description: 'Dissertations & Theses Global', access: 'Limited', status: 'Active' },
  { name: 'Google Scholar', description: 'Open Access Academic Search', access: 'Open', status: 'Active' },
]

export function DigitalLibraryClient() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Digital Library</h1>
        <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Access e-resources and online databases</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {databases.map((db) => (
          <div key={db.name} className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-xl bg-teal-50 flex items-center justify-center">
                <Globe className="h-5 w-5 text-[#0D9488]" />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-slate-800 dark:text-[#E2E8F0]">{db.name}</p>
                <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">{db.access}</p>
              </div>
            </div>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mb-3">{db.description}</p>
            <button className="h-8 px-4 rounded-full bg-teal-50 text-[12px] font-semibold text-[#0D9488] hover:bg-teal-100 inline-flex items-center gap-1.5 transition-all duration-200">
              Open <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
