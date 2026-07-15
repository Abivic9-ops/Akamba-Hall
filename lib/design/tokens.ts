/**
 * Akamba Hall Library - Design System Tokens
 *
 * These are the brand colours and typography tokens.
 * Use these values throughout all portals to keep consistent.
 */

export const colors = {
  /** Primary navy background – used for sidebars, dark panels, auth split-screen */
  navyDark:    '#0B1829',
  /** Slightly lighter navy for hover states */
  navyMid:     '#142236',
  /** Brand amber/gold – used for CTAs, highlights, QR card accents */
  amber:       '#F5A623',
  /** Amber hover state */
  amberDark:   '#E8931A',
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
} as const

export type ColorKey = keyof typeof colors
