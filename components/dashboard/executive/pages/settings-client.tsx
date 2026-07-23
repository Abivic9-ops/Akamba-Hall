'use client'

import { Settings, ArrowRight } from 'lucide-react'

const settings = [
  { section: 'General', items: ['Portal Name', 'Logo & Branding', 'Default Language', 'Timezone'] },
  { section: 'Notifications', items: ['Email Notifications', 'SMS Alerts', 'Push Notifications', 'Digest Frequency'] },
  { section: 'Security', items: ['Two-Factor Authentication', 'Session Timeout', 'Password Policy', 'IP Whitelist'] },
  { section: 'Integrations', items: ['Supabase Configuration', 'Payment Gateway', 'Email Service (SMTP)', 'SMS Provider'] },
]

export function SettingsClient() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] dark:text-[#E2E8F0]">Settings</h1>
        <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">System configuration and preferences</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {settings.map((s) => (
          <div key={s.section} className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none dark:shadow-none p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-white/[0.04] dark:bg-white/[0.04] flex items-center justify-center">
                <Settings className="h-5 w-5 text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
              </div>
              <p className="text-[14px] font-semibold text-slate-800 dark:text-[#E2E8F0]">{s.section}</p>
            </div>
            <div className="space-y-1">
              {s.items.map((item) => (
                <div key={item} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-white/[0.04] dark:bg-white/[0.04] dark:hover:bg-white dark:bg-[#0E1F3F]/[0.04] dark:bg-white/[0.04] transition-colors cursor-pointer group">
                  <span className="text-[13px] text-slate-600 dark:text-[#94A3B8] dark:text-[#94A3B8]">{item}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] transition-colors" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
