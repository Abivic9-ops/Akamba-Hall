'use client'

import { Plug, Database, Shield, Cloud, Globe, CheckCircle, XCircle } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

interface IntegrationsClientProps {
  integrations: {
    database: { connected: boolean; lastSync: string }
    supabaseAuth: { connected: boolean; lastSync: string }
    cloudinary: { connected: boolean; lastSync: string }
    vercel: { connected: boolean; lastSync: string }
  }
}

const integrationList = [
  {
    key: 'database' as const,
    name: 'PostgreSQL (Prisma)',
    description: 'Primary database for all application data',
    Icon: Database,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-500/10',
  },
  {
    key: 'supabaseAuth' as const,
    name: 'Supabase Auth',
    description: 'User authentication and session management',
    Icon: Shield,
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
  },
  {
    key: 'cloudinary' as const,
    name: 'Cloudinary',
    description: 'File storage for images, PDFs, and media',
    Icon: Cloud,
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-500/10',
  },
  {
    key: 'vercel' as const,
    name: 'Vercel',
    description: 'Deployment hosting and serverless functions',
    Icon: Globe,
    color: 'text-slate-700 dark:text-slate-300',
    bg: 'bg-slate-100 dark:bg-white/[0.06]',
  },
]

export function IntegrationsClient({ integrations }: IntegrationsClientProps) {
  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
            <Plug className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Integrations</h1>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">External service connections</p>
          </div>
        </div>

        <SectionCard title="Connected Services" icon={Plug}>
          <div className="space-y-3">
            {integrationList.map((intg) => {
              const data = integrations[intg.key]
              const Icon = intg.Icon
              return (
                <div key={intg.key} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06]">
                  <div className={`h-10 w-10 rounded-xl ${intg.bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`h-5 w-5 ${intg.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0]">{intg.name}</h3>
                    <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">{intg.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <div className="flex items-center gap-1.5">
                      {data.connected ? (
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5 text-red-500" />
                      )}
                      <span className={`text-[12px] font-medium ${data.connected ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                        {data.connected ? 'Connected' : 'Disconnected'}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 dark:text-[#6B7A99]">
                      Last sync: {new Date(data.lastSync).toLocaleString()}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
