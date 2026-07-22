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
        <h1 className="text-[28px] font-medium text-slate-900">Settings</h1>
        <p className="text-[15px] text-slate-500 mt-1">System configuration and preferences</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {settings.map((s) => (
          <div key={s.section} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center">
                <Settings className="h-5 w-5 text-slate-500" />
              </div>
              <p className="text-[14px] font-semibold text-slate-800">{s.section}</p>
            </div>
            <div className="space-y-1">
              {s.items.map((item) => (
                <div key={item} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
                  <span className="text-[13px] text-slate-600">{item}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-500 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
