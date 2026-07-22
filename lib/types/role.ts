export const all_roles = [
  'STUDENT',
  'STAFF',
  'ASSISTANT',
  'CAPTAIN',
  'PREFECT',
  'EXECUTIVE',
  'LIBRARY_HEAD',
  'SUPER_ADMIN',
] as const

export type Role = (typeof all_roles)[number]

export const desk_roles: Role[] = ['ASSISTANT', 'CAPTAIN', 'PREFECT']

export const role_display_names: Record<Role, string> = {
  STUDENT: 'Student',
  STAFF: 'Staff',
  ASSISTANT: 'Library Assistant',
  CAPTAIN: 'Desk Captain',
  PREFECT: 'Desk Prefect',
  EXECUTIVE: 'Executive',
  LIBRARY_HEAD: 'Library Head',
  SUPER_ADMIN: 'Super Admin',
}

export const role_short_names: Record<Role, string> = {
  STUDENT: 'Student',
  STAFF: 'Staff',
  ASSISTANT: 'Desk',
  CAPTAIN: 'Desk',
  PREFECT: 'Desk',
  EXECUTIVE: 'Executive',
  LIBRARY_HEAD: 'Library Head',
  SUPER_ADMIN: 'Super Admin',
}

export const role_home_routes: Record<Role, string> = {
  STUDENT: '/student/dashboard',
  STAFF: '/staff/dashboard',
  ASSISTANT: '/desk/dashboard',
  CAPTAIN: '/desk/dashboard',
  PREFECT: '/desk/dashboard',
  EXECUTIVE: '/executive/dashboard',
  LIBRARY_HEAD: '/library-head/dashboard',
  SUPER_ADMIN: '/super-admin/dashboard',
}

export function getHomeRoute(role: Role): string {
  return role_home_routes[role] ?? '/student/dashboard'
}

export function isDeskRole(role: string): boolean {
  return desk_roles.includes(role as Role)
}

export function getPermittedRoutes(role: Role): string[] {
  const base = role_home_routes[role]
  const shared = ['/catalogue', '/members', '/reservations', '/desk']

  switch (role) {
    case 'SUPER_ADMIN':
      return [base, '/super-admin', '/library-head', ...shared]
    case 'LIBRARY_HEAD':
      return [base, '/library-head', ...shared]
    case 'STUDENT':
      return [base, '/student', ...shared]
    case 'STAFF':
      return [base, '/staff', ...shared]
    case 'ASSISTANT':
    case 'CAPTAIN':
    case 'PREFECT':
      return [base, '/desk', ...shared]
    case 'EXECUTIVE':
      return [base, '/executive', ...shared]
    default:
      return [base]
  }
}

export const role_badge_colors: Record<Role, { bg: string; text: string }> = {
  STUDENT: { bg: 'bg-blue-50', text: 'text-blue-600' },
  STAFF: { bg: 'bg-purple-50', text: 'text-purple-600' },
  ASSISTANT: { bg: 'bg-amber-50', text: 'text-amber-600' },
  CAPTAIN: { bg: 'bg-amber-50', text: 'text-amber-600' },
  PREFECT: { bg: 'bg-amber-50', text: 'text-amber-600' },
  EXECUTIVE: { bg: 'bg-amber-50', text: 'text-amber-700' },
  LIBRARY_HEAD: { bg: 'bg-sky-50', text: 'text-sky-600' },
  SUPER_ADMIN: { bg: 'bg-red-50', text: 'text-red-600' },
}

export function parseRole(role: string): Role | null {
  const upper = role.toUpperCase() as Role
  return all_roles.includes(upper) ? upper : null
}
