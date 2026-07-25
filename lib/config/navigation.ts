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

  // ─── SUPER ADMIN: CONTENT MANAGEMENT ───────────
  {
    label: 'Manage Books',
    icon: 'BookPlus',
    path: '/super-admin/catalogue',
    section: 'Content',
    roles: ['SUPER_ADMIN'],
  },
  {
    label: 'Announcements',
    icon: 'Megaphone',
    path: '/super-admin/announcements',
    section: 'Content',
    roles: ['SUPER_ADMIN'],
  },
  {
    label: 'Events',
    icon: 'CalendarCheck',
    path: '/super-admin/events',
    section: 'Content',
    roles: ['SUPER_ADMIN'],
  },
  {
    label: 'Policies',
    icon: 'ShieldCheck',
    path: '/super-admin/policies',
    section: 'Content',
    roles: ['SUPER_ADMIN'],
  },
  {
    label: 'Courses',
    icon: 'GraduationCap',
    path: '/super-admin/courses',
    section: 'Content',
    roles: ['SUPER_ADMIN'],
  },
  {
    label: 'E-Resources',
    icon: 'Globe',
    path: '/super-admin/eresources',
    section: 'Content',
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
  {
    label: 'Approval Queue',
    icon: 'ClipboardCheck',
    path: '/library-head/requests',
    section: 'People',
    roles: ['LIBRARY_HEAD'],
  },

  // ─── LIBRARY HEAD: CONTENT MANAGEMENT ──────────
  {
    label: 'Manage Books',
    icon: 'BookPlus',
    path: '/library-head/catalogue',
    section: 'Content',
    roles: ['LIBRARY_HEAD'],
  },
  {
    label: 'Announcements',
    icon: 'Megaphone',
    path: '/library-head/announcements',
    section: 'Content',
    roles: ['LIBRARY_HEAD'],
  },
  {
    label: 'Events',
    icon: 'CalendarCheck',
    path: '/library-head/events',
    section: 'Content',
    roles: ['LIBRARY_HEAD'],
  },
  {
    label: 'Policies',
    icon: 'ShieldCheck',
    path: '/library-head/policies',
    section: 'Content',
    roles: ['LIBRARY_HEAD'],
  },
  {
    label: 'Courses',
    icon: 'GraduationCap',
    path: '/library-head/courses',
    section: 'Content',
    roles: ['LIBRARY_HEAD'],
  },
  {
    label: 'E-Resources',
    icon: 'Globe',
    path: '/library-head/eresources',
    section: 'Content',
    roles: ['LIBRARY_HEAD'],
  },

  // ─── STUDENT ────────────────────────────────────
  {
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    path: '/student/dashboard',
    section: 'Main',
    roles: ['STUDENT'],
  },
  {
    label: 'My Loans',
    icon: 'BookOpen',
    path: '/student/loans',
    section: 'Library',
    roles: ['STUDENT'],
  },
  {
    label: 'Reservations',
    icon: 'Bookmark',
    path: '/student/reservations',
    section: 'Library',
    roles: ['STUDENT'],
  },
  {
    label: 'Bookings',
    icon: 'CalendarCheck',
    path: '/student/bookings',
    section: 'Library',
    roles: ['STUDENT'],
  },
  {
    label: 'Catalogue',
    icon: 'Search',
    path: '/student/catalogue',
    section: 'Library',
    roles: ['STUDENT'],
  },
  {
    label: 'Events',
    icon: 'Megaphone',
    path: '/student/events',
    section: 'Community',
    roles: ['STUDENT'],
  },
  {
    label: 'Profile',
    icon: 'User',
    path: '/student/profile',
    section: 'Account',
    roles: ['STUDENT'],
  },
  {
    label: 'Role Requests',
    icon: 'Shield',
    path: '/student/requests',
    section: 'Account',
    roles: ['STUDENT'],
  },
  {
    label: 'Help & Support',
    icon: 'HelpCircle',
    path: '/student/help',
    section: 'Account',
    roles: ['STUDENT'],
  },

  // ─── STAFF ──────────────────────────────────────
  {
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    path: '/staff/dashboard',
    section: 'Main',
    roles: ['STAFF'],
  },
  {
    label: 'Holds',
    icon: 'PackageCheck',
    path: '/staff/holds',
    section: 'My Library',
    roles: ['STAFF'],
  },
  {
    label: 'Bookmarks',
    icon: 'Star',
    path: '/staff/bookmarks',
    section: 'My Library',
    roles: ['STAFF'],
  },
  {
    label: 'History & Fines',
    icon: 'ScrollText',
    path: '/staff/history',
    section: 'My Library',
    roles: ['STAFF'],
  },
  {
    label: 'My Loans',
    icon: 'BookOpen',
    path: '/staff/loans',
    section: 'My Library',
    roles: ['STAFF'],
  },
  {
    label: 'Catalogue Search',
    icon: 'Search',
    path: '/staff/catalogue',
    section: 'Discover & Learn',
    roles: ['STAFF'],
  },
  {
    label: 'E-Resources',
    icon: 'Globe',
    path: '/staff/eresources',
    section: 'Discover & Learn',
    roles: ['STAFF'],
  },
  {
    label: 'Courses & Materials',
    icon: 'Briefcase',
    path: '/staff/courses',
    section: 'Discover & Learn',
    roles: ['STAFF'],
  },
  {
    label: 'AVR / Boardroom Booking',
    icon: 'Video',
    path: '/staff/booking',
    section: 'Spaces & Bookings',
    roles: ['STAFF'],
  },
  {
    label: 'Feedback & Requests',
    icon: 'Megaphone',
    path: '/staff/announcements',
    section: 'Requests & Support',
    roles: ['STAFF'],
  },
  {
    label: 'Profile',
    icon: 'User',
    path: '/staff/profile',
    section: 'Account',
    roles: ['STAFF'],
  },
  {
    label: 'Role Requests',
    icon: 'Shield',
    path: '/staff/requests',
    section: 'Account',
    roles: ['STAFF'],
  },
  {
    label: 'Help Centre',
    icon: 'HelpCircle',
    path: '/staff/help',
    section: 'Account',
    roles: ['STAFF'],
  },

  // ─── DESK ───────────────────────────────────────
  {
    label: 'Circulation Desk',
    icon: 'LayoutDashboard',
    path: '/desk/dashboard',
    section: 'Main',
    roles: ['ASSISTANT', 'CAPTAIN', 'PREFECT'],
  },
  {
    label: 'Returns',
    icon: 'ArrowDownToLine',
    path: '/desk/returns',
    section: 'Main',
    roles: ['ASSISTANT', 'CAPTAIN', 'PREFECT'],
  },
  {
    label: 'Issue Log',
    icon: 'ScrollText',
    path: '/desk/issue-log',
    section: 'Main',
    roles: ['ASSISTANT', 'CAPTAIN', 'PREFECT'],
  },
  {
    label: 'Catalogue',
    icon: 'Search',
    path: '/desk/catalogue',
    section: 'My Library',
    roles: ['ASSISTANT', 'CAPTAIN', 'PREFECT'],
  },
  {
    label: 'Bookings',
    icon: 'CalendarCheck',
    path: '/desk/bookings',
    section: 'My Library',
    roles: ['ASSISTANT', 'CAPTAIN', 'PREFECT'],
  },
  {
    label: 'Reservations',
    icon: 'Bookmark',
    path: '/desk/reservations',
    section: 'My Library',
    roles: ['ASSISTANT', 'CAPTAIN', 'PREFECT'],
  },
  {
    label: 'Loans',
    icon: 'BookOpen',
    path: '/desk/loans',
    section: 'My Library',
    roles: ['ASSISTANT', 'CAPTAIN', 'PREFECT'],
  },
  {
    label: 'Inventory & Stocktake',
    icon: 'Package',
    path: '/desk/inventory',
    section: 'Management',
    roles: ['ASSISTANT', 'CAPTAIN', 'PREFECT'],
  },
  {
    label: 'Book Management',
    icon: 'BookOpen',
    path: '/desk/items',
    section: 'Management',
    roles: ['ASSISTANT', 'CAPTAIN', 'PREFECT'],
  },
  {
    label: 'Lost & Found',
    icon: 'SearchCheck',
    path: '/desk/lost-found',
    section: 'Management',
    roles: ['ASSISTANT', 'CAPTAIN', 'PREFECT'],
  },
  {
    label: 'Member Lookup',
    icon: 'UserSearch',
    path: '/desk/member-lookup',
    section: 'Members',
    roles: ['ASSISTANT', 'CAPTAIN', 'PREFECT'],
  },
  {
    label: 'New Member',
    icon: 'UserPlus',
    path: '/desk/new-member',
    section: 'Members',
    roles: ['ASSISTANT', 'CAPTAIN', 'PREFECT'],
  },
  {
    label: 'Member Management',
    icon: 'Users',
    path: '/desk/members',
    section: 'Members',
    roles: ['ASSISTANT', 'CAPTAIN', 'PREFECT'],
  },
  {
    label: 'Card Management',
    icon: 'CreditCard',
    path: '/desk/cards',
    section: 'Members',
    roles: ['ASSISTANT', 'CAPTAIN', 'PREFECT'],
  },
  {
    label: 'Daily Reports',
    icon: 'BarChart2',
    path: '/desk/reports',
    section: 'Reports',
    roles: ['ASSISTANT', 'CAPTAIN', 'PREFECT'],
  },
  {
    label: 'Overdues Report',
    icon: 'AlertTriangle',
    path: '/desk/overdues-report',
    section: 'Reports',
    roles: ['ASSISTANT', 'CAPTAIN', 'PREFECT'],
  },

  // ─── EXECUTIVE ──────────────────────────────────
  {
    label: 'Overview Dashboard',
    icon: 'LayoutDashboard',
    path: '/executive/dashboard',
    section: 'Home',
    roles: ['EXECUTIVE'],
  },
  {
    label: 'Reading Resources',
    icon: 'BookOpen',
    path: '/executive/resources',
    section: 'Library Services',
    roles: ['EXECUTIVE'],
  },
  {
    label: 'Digital Library',
    icon: 'Globe',
    path: '/executive/digital',
    section: 'Library Services',
    roles: ['EXECUTIVE'],
  },
  {
    label: 'Catalogue Search',
    icon: 'Search',
    path: '/executive/catalogue',
    section: 'Library Services',
    roles: ['EXECUTIVE'],
  },
  {
    label: 'Research Support',
    icon: 'GraduationCap',
    path: '/executive/research',
    section: 'Library Services',
    roles: ['EXECUTIVE'],
  },
  {
    label: 'AV Rooms',
    icon: 'Video',
    path: '/executive/av-rooms',
    section: 'Bookings',
    roles: ['EXECUTIVE'],
  },
  {
    label: 'Equipment',
    icon: 'Monitor',
    path: '/executive/equipment',
    section: 'Bookings',
    roles: ['EXECUTIVE'],
  },
  {
    label: 'Approval Queue',
    icon: 'ClipboardCheck',
    path: '/executive/approvals',
    section: 'Governance',
    roles: ['EXECUTIVE'],
  },
  {
    label: 'Policy Rules',
    icon: 'ShieldCheck',
    path: '/executive/policies',
    section: 'Governance',
    roles: ['EXECUTIVE'],
  },
  {
    label: 'Reports & Analytics',
    icon: 'BarChart2',
    path: '/executive/reports',
    section: 'Governance',
    roles: ['EXECUTIVE'],
  },
  {
    label: 'Announcements',
    icon: 'Megaphone',
    path: '/executive/announcements',
    section: 'Communication',
    roles: ['EXECUTIVE'],
  },
  {
    label: 'Events',
    icon: 'CalendarCheck',
    path: '/executive/events',
    section: 'Communication',
    roles: ['EXECUTIVE'],
  },
  {
    label: 'Notices',
    icon: 'FileText',
    path: '/executive/notices',
    section: 'Communication',
    roles: ['EXECUTIVE'],
  },
  {
    label: 'Role Overview',
    icon: 'Users',
    path: '/executive/roles',
    section: 'Users',
    roles: ['EXECUTIVE'],
  },
  {
    label: 'Account Lookup',
    icon: 'UserSearch',
    path: '/executive/accounts',
    section: 'Users',
    roles: ['EXECUTIVE'],
  },
  {
    label: 'Settings',
    icon: 'Settings',
    path: '/executive/settings',
    section: 'Users',
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
