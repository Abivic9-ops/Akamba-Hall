import type { Role } from '@/lib/types/role'

export interface NavItem {
  label: string
  icon: string
  path: string
  section: string
  roles: Role[]
}

export interface NavSection {
  label: string
  items: NavItem[]
}

export const navigationRegistry: NavItem[] = [
  // ─── SUPER ADMIN ───────────────────────────────
  {
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    path: '/super-admin/dashboard',
    section: 'Overview',
    roles: ['SUPER_ADMIN'],
  },
  {
    label: 'User Registry',
    icon: 'Users',
    path: '/super-admin/users',
    section: 'System Management',
    roles: ['SUPER_ADMIN'],
  },
  {
    label: 'Role Management',
    icon: 'Shield',
    path: '/super-admin/roles',
    section: 'System Management',
    roles: ['SUPER_ADMIN'],
  },
  {
    label: 'System Health',
    icon: 'Activity',
    path: '/super-admin/health',
    section: 'Monitoring',
    roles: ['SUPER_ADMIN'],
  },
  {
    label: 'Activity Log',
    icon: 'ScrollText',
    path: '/super-admin/activity',
    section: 'Monitoring',
    roles: ['SUPER_ADMIN'],
  },
  {
    label: 'System Settings',
    icon: 'Settings',
    path: '/super-admin/config',
    section: 'Configuration',
    roles: ['SUPER_ADMIN'],
  },
  {
    label: 'All Dashboards',
    icon: 'Grid3X3',
    path: '/super-admin/dashboards',
    section: 'Quick Access',
    roles: ['SUPER_ADMIN'],
  },

  // ─── LIBRARY HEAD ──────────────────────────────
  {
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    path: '/library-head/dashboard',
    section: 'Overview',
    roles: ['LIBRARY_HEAD'],
  },
  {
    label: 'Bookings',
    icon: 'CalendarCheck',
    path: '/library-head/bookings',
    section: 'Operations',
    roles: ['LIBRARY_HEAD'],
  },
  {
    label: 'Inventory',
    icon: 'Library',
    path: '/library-head/inventory',
    section: 'Operations',
    roles: ['LIBRARY_HEAD'],
  },
  {
    label: 'Members',
    icon: 'Users',
    path: '/library-head/members',
    section: 'People',
    roles: ['LIBRARY_HEAD'],
  },
  {
    label: 'Staff',
    icon: 'BriefcaseBusiness',
    path: '/library-head/staff',
    section: 'People',
    roles: ['LIBRARY_HEAD'],
  },

  // ─── STUDENT (Phase 4 Scaffold) ────────────────
  {
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    path: '/student/dashboard',
    section: 'Main',
    roles: ['STUDENT'],
  },

  // ─── STAFF (Phase 4 Scaffold) ──────────────────
  {
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    path: '/staff/dashboard',
    section: 'Main',
    roles: ['STAFF'],
  },

  // ─── DESK (Phase 4 Scaffold) ───────────────────
  {
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    path: '/desk/dashboard',
    section: 'Main',
    roles: ['ASSISTANT', 'CAPTAIN', 'PREFECT'],
  },

  // ─── EXECUTIVE (Phase 4 Scaffold) ──────────────
  {
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    path: '/executive/dashboard',
    section: 'Main',
    roles: ['EXECUTIVE'],
  },
]

export function getNavigationForRole(role: Role): NavItem[] {
  return navigationRegistry.filter((item) => item.roles.includes(role))
}

export function getNavigationSections(role: Role): NavSection[] {
  const items = getNavigationForRole(role)
  return groupNavigationBySection(items)
}

export function groupNavigationBySection(items: NavItem[]): NavSection[] {
  const sectionMap = new Map<string, NavItem[]>()
  for (const item of items) {
    const existing = sectionMap.get(item.section) ?? []
    existing.push(item)
    sectionMap.set(item.section, existing)
  }
  return Array.from(sectionMap.entries()).map(([label, sectionItems]) => ({
    label,
    items: sectionItems,
  }))
}
