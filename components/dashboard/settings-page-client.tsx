'use client'

import { useState, useEffect, useCallback } from 'react'
import { Settings, Bell, Shield, User, Globe, Monitor, CheckCircle2, Loader2, Save } from 'lucide-react'
import { get_user_settings, save_user_settings, type UserSettingsData } from '@/lib/actions/settings'
import { useTheme } from '@/lib/contexts/theme-context'

interface SettingsSection {
  title: string
  items: string[]
}

interface SettingsPageClientProps {
  role: string
  sections: SettingsSection[]
}

const SECTION_ICONS: Record<string, typeof Bell> = {
  Notifications: Bell,
  Privacy: Shield,
  Display: Monitor,
  Account: User,
  Department: Globe,
  Management: Shield,
  Circulation: Globe,
  General: Settings,
  Security: Shield,
  Integrations: Globe,
}

export function SettingsPageClient({ role, sections }: SettingsPageClientProps) {
  const { theme, set_theme } = useTheme()
  const [settings, set_settings] = useState<UserSettingsData | null>(null)
  const [loading, set_loading] = useState(true)
  const [saving, set_saving] = useState(false)
  const [saved_msg, set_saved_msg] = useState<string | null>(null)
  const [active_tab, set_active_tab] = useState(sections[0]?.title ?? '')

  const load_settings = useCallback(async () => {
    set_loading(true)
    const data = await get_user_settings()
    set_settings(data)
    set_loading(false)
  }, [])

  useEffect(() => {
    load_settings()
  }, [load_settings])

  useEffect(() => {
    if (saved_msg) {
      const timer = setTimeout(() => set_saved_msg(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [saved_msg])

  const update_setting = useCallback(async (key: keyof UserSettingsData, value: boolean | string | number) => {
    if (!settings) return
    const next = { ...settings, [key]: value }
    set_settings(next)
    set_saving(true)
    const result = await save_user_settings({ [key]: value })
    set_saving(false)
    if (result.success) {
      set_saved_msg('Setting saved successfully.')
      if (key === 'theme') {
        set_theme(value as 'light' | 'dark')
      }
    } else {
      set_saved_msg(result.error ?? 'Failed to save setting.')
    }
  }, [settings, set_theme])

  function render_toggle(key: keyof UserSettingsData, label: string) {
    const val = settings?.[key] as boolean ?? false
    return (
      <div key={key} className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors">
        <span className="text-[13px] text-slate-700 dark:text-[#CBD5E1]">{label}</span>
        <button
          onClick={() => update_setting(key, !val)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
            val ? 'bg-gold' : 'bg-slate-200 dark:bg-white/10'
          }`}
          role="switch"
          aria-checked={val}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
            val ? 'translate-x-6' : 'translate-x-1'
          }`} />
        </button>
      </div>
    )
  }

  function render_select(key: keyof UserSettingsData, label: string, options: { value: string; label: string }[]) {
    const val = settings?.[key] as string ?? ''
    return (
      <div key={key} className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors">
        <span className="text-[13px] text-slate-700 dark:text-[#CBD5E1]">{label}</span>
        <select
          value={val}
          onChange={(e) => update_setting(key, e.target.value)}
          className="h-8 px-2 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1F3F] text-[12px] text-slate-700 dark:text-[#CBD5E1] focus:outline-none focus:border-gold/40 cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    )
  }

  function render_range(key: keyof UserSettingsData, label: string, min: number, max: number, unit: string) {
    const val = settings?.[key] as number ?? min
    return (
      <div key={key} className="py-3 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[13px] text-slate-700 dark:text-[#CBD5E1]">{label}</span>
          <span className="text-[12px] text-slate-500 dark:text-[#6B7A99] font-medium">{val}{unit}</span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={val}
          onChange={(e) => update_setting(key, Number(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none bg-slate-200 dark:bg-white/10 accent-gold cursor-pointer"
        />
      </div>
    )
  }

  function render_section_content(section_title: string) {
    if (!settings) return null

    switch (section_title) {
      case 'Notifications':
        return (
          <div className="space-y-1">
            {render_toggle('emailNotifications', 'Email Notifications')}
            {render_toggle('pushNotifications', 'Push Notifications')}
            {render_toggle('smsAlerts', 'SMS Alerts')}
            {render_select('digestFrequency', 'Digest Frequency', [
              { value: 'realtime', label: 'Real-time' },
              { value: 'daily', label: 'Daily' },
              { value: 'weekly', label: 'Weekly' },
              { value: 'never', label: 'Never' },
            ])}
          </div>
        )
      case 'Privacy':
        return (
          <div className="space-y-1">
            {render_select('profileVisibility', 'Profile Visibility', [
              { value: 'public', label: 'Public' },
              { value: 'members', label: 'Members Only' },
              { value: 'private', label: 'Private' },
            ])}
            {render_select('readingHistory', 'Reading History', [
              { value: 'public', label: 'Public' },
              { value: 'members', label: 'Members Only' },
              { value: 'private', label: 'Private' },
            ])}
            {render_select('bookmarksPrivacy', 'Bookmarks Privacy', [
              { value: 'public', label: 'Public' },
              { value: 'members', label: 'Members Only' },
              { value: 'private', label: 'Private' },
            ])}
            {render_toggle('dataSharing', 'Data Sharing for Analytics')}
          </div>
        )
      case 'Display':
        return (
          <div className="space-y-1">
            {render_select('theme', 'Theme', [
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
              { value: 'system', label: 'System' },
            ])}
            {render_select('language', 'Language', [
              { value: 'en', label: 'English' },
              { value: 'sw', label: 'Kiswahili' },
            ])}
            {render_select('fontSize', 'Font Size', [
              { value: 'small', label: 'Small' },
              { value: 'medium', label: 'Medium' },
              { value: 'large', label: 'Large' },
            ])}
            {render_toggle('compactMode', 'Compact Mode')}
          </div>
        )
      case 'Account':
        return (
          <div className="space-y-1">
            {render_toggle('twoFactorAuth', 'Two-Factor Authentication')}
            {render_range('sessionTimeout', 'Session Timeout', 5, 120, ' min')}
          </div>
        )
      case 'Department':
        return (
          <div className="space-y-1">
            {render_select('digestFrequency', 'Book Allocation Notification', [
              { value: 'realtime', label: 'Real-time' },
              { value: 'daily', label: 'Daily' },
              { value: 'weekly', label: 'Weekly' },
            ])}
            {render_toggle('emailNotifications', 'Reservation Rule Changes')}
            {render_toggle('pushNotifications', 'Teaching Schedule Updates')}
          </div>
        )
      case 'Management':
        return (
          <div className="space-y-1">
            {render_toggle('emailNotifications', 'Staff Permission Changes')}
            {render_toggle('pushNotifications', 'Borrowing Policy Updates')}
            {render_toggle('smsAlerts', 'Fine Structure Changes')}
            {render_select('digestFrequency', 'Access Level Reports', [
              { value: 'daily', label: 'Daily' },
              { value: 'weekly', label: 'Weekly' },
              { value: 'monthly', label: 'Monthly' },
            ])}
          </div>
        )
      case 'Circulation':
        return (
          <div className="space-y-1">
            {render_toggle('emailNotifications', 'Overdue Alert Notifications')}
            {render_toggle('pushNotifications', 'Daily Digest Reports')}
            {render_select('digestFrequency', 'Auto-Renewal Rules', [
              { value: 'enabled', label: 'Enabled' },
              { value: 'disabled', label: 'Disabled' },
            ])}
            {render_toggle('smsAlerts', 'Fine Rate Change Alerts')}
          </div>
        )
      case 'General':
        return (
          <div className="space-y-1">
            {render_select('language', 'Default Language', [
              { value: 'en', label: 'English' },
              { value: 'sw', label: 'Kiswahili' },
            ])}
            {render_select('theme', 'Portal Theme', [
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
              { value: 'system', label: 'System' },
            ])}
          </div>
        )
      case 'Security':
        return (
          <div className="space-y-1">
            {render_toggle('twoFactorAuth', 'Two-Factor Authentication')}
            {render_range('sessionTimeout', 'Session Timeout', 5, 120, ' min')}
            {render_toggle('smsAlerts', 'IP Whitelist Alerts')}
          </div>
        )
      case 'Integrations':
        return (
          <div className="space-y-1">
            {render_toggle('emailNotifications', 'Email Service (SMTP) Status')}
            {render_toggle('pushNotifications', 'SMS Provider Status')}
            {render_toggle('smsAlerts', 'Payment Gateway Status')}
          </div>
        )
      default:
        return (
          <div className="space-y-1">
            {sections.find(s => s.title === section_title)?.items.map(item => (
              render_toggle('emailNotifications', item)
            ))}
          </div>
        )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224] flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-500 dark:text-[#6B7A99]">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-[14px]">Loading settings...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0]">Settings</h1>
            <p className="text-[15px] text-slate-500 dark:text-[#6B7A99] mt-1">
              Manage your {role} portal preferences and configuration.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {saving && (
              <div className="flex items-center gap-1.5 text-[12px] text-slate-400 dark:text-[#6B7A99]">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Saving...
              </div>
            )}
            {saved_msg && !saving && (
              <div className="flex items-center gap-1.5 text-[12px] text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {saved_msg}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar tabs */}
          <div className="lg:w-56 shrink-0">
            <div className="bg-white dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] shadow-sm p-2 flex lg:flex-col gap-1 overflow-x-auto">
              {sections.map((section) => {
                const Icon = SECTION_ICONS[section.title] ?? Settings
                const is_active = active_tab === section.title
                return (
                  <button
                    key={section.title}
                    onClick={() => set_active_tab(section.title)}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[13px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                      is_active
                        ? 'bg-gold/10 text-gold'
                        : 'text-slate-500 dark:text-[#6B7A99] hover:bg-slate-50 dark:hover:bg-white/[0.04] hover:text-slate-700 dark:hover:text-[#CBD5E1]'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {section.title}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Content area */}
          <div className="flex-1 min-w-0">
            <div className="bg-white dark:bg-[#0E1F3F] rounded-2xl border border-slate-100 dark:border-white/[0.08] shadow-sm p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-white/[0.04] flex items-center justify-center">
                  {(() => {
                    const Icon = SECTION_ICONS[active_tab] ?? Settings
                    return <Icon className="h-5 w-5 text-slate-500 dark:text-[#6B7A99]" />
                  })()}
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-slate-800 dark:text-[#E2E8F0]">{active_tab}</p>
                  <p className="text-[12px] text-slate-400 dark:text-[#6B7A99]">
                    Configure your {active_tab.toLowerCase()} preferences
                  </p>
                </div>
              </div>

              {render_section_content(active_tab)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
