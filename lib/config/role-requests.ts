export function getPromotableRoles(baseRole: 'STUDENT' | 'STAFF') {
  if (baseRole === 'STUDENT') {
    return [
      { role: 'ASSISTANT', label: 'Library Assistant', portal: 'Circulation Desk' },
      { role: 'CAPTAIN', label: 'Desk Captain', portal: 'Circulation Desk' },
      { role: 'PREFECT', label: 'Desk Prefect', portal: 'Circulation Desk' },
    ]
  }
  return [
    { role: 'ASSISTANT', label: 'Library Assistant', portal: 'Circulation Desk' },
    { role: 'CAPTAIN', label: 'Desk Captain', portal: 'Circulation Desk' },
    { role: 'PREFECT', label: 'Desk Prefect', portal: 'Circulation Desk' },
    { role: 'EXECUTIVE', label: 'Executive', portal: 'Executive Portal' },
  ]
}
