'use client'

import { Settings, ArrowRight, Bell, Shield, User, Globe } from 'lucide-react'

interface SettingsSection {
  title: string
  items: string[]
}

interface SettingsPageClientProps {
  role: string
  sections: SettingsSection[]
}

export function SettingsPageClient({ role, sections }: SettingsPageClientProps) {
  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0]">Settings</h1>
          <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] mt-1">
            Manage your {role} portal preferences and configuration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.map((section) => (
            <div key={section.title} className="bg-white dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] shadow-sm p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-white/[0.04] flex items-center justify-center">
                  <Settings className="h-5 w-5 text-slate-500 dark:text-[#6B7A99]" />
                </div>
                <p className="text-[14px] font-semibold text-slate-800 dark:text-[#E2E8F0]">{section.title}</p>
              </div>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <div key={item} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors cursor-pointer group">
                    <span className="text-[13px] text-slate-600 dark:text-[#94A3B8]">{item}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-500 dark:text-[#6B7A99] transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
