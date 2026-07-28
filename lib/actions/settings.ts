'use server'

import prisma from '@/lib/db/prisma'
import { getAuthUser } from '@/lib/auth/roleGuard'

export interface UserSettingsData {
  emailNotifications: boolean
  pushNotifications: boolean
  smsAlerts: boolean
  digestFrequency: string
  theme: string
  language: string
  fontSize: string
  compactMode: boolean
  profileVisibility: string
  readingHistory: string
  bookmarksPrivacy: string
  dataSharing: boolean
  twoFactorAuth: boolean
  sessionTimeout: number
}

const DEFAULT_SETTINGS: UserSettingsData = {
  emailNotifications: true,
  pushNotifications: true,
  smsAlerts: false,
  digestFrequency: 'daily',
  theme: 'system',
  language: 'en',
  fontSize: 'medium',
  compactMode: false,
  profileVisibility: 'members',
  readingHistory: 'private',
  bookmarksPrivacy: 'private',
  dataSharing: false,
  twoFactorAuth: false,
  sessionTimeout: 30,
}

export async function get_user_settings(): Promise<UserSettingsData> {
  const auth_user = await getAuthUser()
  if (!auth_user) return DEFAULT_SETTINGS

  const settings = await prisma.userSettings.findUnique({
    where: { userId: auth_user.id },
  })

  if (!settings) return DEFAULT_SETTINGS

  return {
    emailNotifications: settings.emailNotifications,
    pushNotifications: settings.pushNotifications,
    smsAlerts: settings.smsAlerts,
    digestFrequency: settings.digestFrequency,
    theme: settings.theme,
    language: settings.language,
    fontSize: settings.fontSize,
    compactMode: settings.compactMode,
    profileVisibility: settings.profileVisibility,
    readingHistory: settings.readingHistory,
    bookmarksPrivacy: settings.bookmarksPrivacy,
    dataSharing: settings.dataSharing,
    twoFactorAuth: settings.twoFactorAuth,
    sessionTimeout: settings.sessionTimeout,
  }
}

export async function save_user_settings(data: Partial<UserSettingsData>): Promise<{ success: boolean; error?: string }> {
  const auth_user = await getAuthUser()
  if (!auth_user) return { success: false, error: 'You must be signed in to save settings.' }

  try {
    const existing = await prisma.userSettings.findUnique({
      where: { userId: auth_user.id },
    })

    if (existing) {
      await prisma.userSettings.update({
        where: { userId: auth_user.id },
        data: {
          ...data,
          updatedAt: new Date(),
        },
      })
    } else {
      await prisma.userSettings.create({
        data: {
          userId: auth_user.id,
          ...DEFAULT_SETTINGS,
          ...data,
        },
      })
    }

    return { success: true }
  } catch (error) {
    console.error('[save_user_settings]', error)
    return { success: false, error: 'Failed to save settings. Please try again.' }
  }
}

export async function get_theme_setting(): Promise<string> {
  const auth_user = await getAuthUser()
  if (!auth_user) return 'system'

  const settings = await prisma.userSettings.findUnique({
    where: { userId: auth_user.id },
    select: { theme: true },
  })

  return settings?.theme ?? 'system'
}
