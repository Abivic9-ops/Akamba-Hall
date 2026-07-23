/**
 * Akamba Hall Library - Design System Tokens
 *
 * These are the brand colours and typography tokens.
 * Use these values throughout all portals to keep consistent.
 */

export const colors = {
  /** Primary navy background – used for sidebars, dark panels, auth split-screen */
  navyDark:    '#0B1A3B',
  /** Slightly lighter navy for hover states */
  navyMid:     '#13285A',
  /** Mid navy */
  navy:        '#0E2150',
  /** Brand amber/gold – used for CTAs, highlights, QR card accents */
  amber:       '#E8A63C',
  /** Amber hover state */
  amberDark:   '#D4952F',
  /** Gold hover */
  goldHover:   '#F0AE3D',
  /** Muted slate blue – for secondary text, placeholders, dividers */
  slate:       '#A8B4C4',
  /** Very light blue-grey – used for page backgrounds */
  bgLight:     '#F8FAFC',
  /** White card backgrounds */
  white:       '#FFFFFF',
  /** Card borders */
  border:      '#E2E8F0',
  /** Error red */
  error:       '#EF4444',
  /** Success green */
  success:     '#22C55E',
  /** Warning yellow */
  warning:     '#EAB308',
  /** Teal – for issued badges, availability, sync indicators */
  teal:        '#0D9488',
  /** Teal light – for teal badge backgrounds */
  tealLight:   '#CCFBF1',
  /** Red 600 – for overdue, suspended, hard block modals */
  red600:      '#DC2626',
  /** Red 100 – for overdue row background tint */
  red100:      '#FEE2E2',
  /** Green 500 – for returned badge, success, available */
  green500:    '#16A34A',
  /** Amber 500 – for renewed badge, waiting holds */
  amber500:    '#D97706',
  /** Accent blue */
  accentBlue:  '#5B9BD5',
  /** Accent blue – for KPI card icon */
  accentBlueAlt: '#5B9BD5',
  /** Blue 500 – for KPI card icon */
  blue500:     '#3B82F6',
} as const

export type ColorKey = keyof typeof colors
