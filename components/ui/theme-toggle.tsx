'use client'

import { useTheme } from '@/lib/contexts/theme-context'
import { Sun, Moon } from 'lucide-react'

interface ThemeToggleProps {
  /** Extra CSS classes on the button wrapper */
  className?: string
  /** Size preset: 'sm' (32px) | 'md' (40px, default) */
  size?: 'sm' | 'md'
}

/**
 * Standalone theme toggle button.
 * Reads/writes theme via ThemeContext. Triggers the View Transition ripple on
 * every toggle so the colour blend is always animated.
 */
export function ThemeToggle({ className = '', size = 'md' }: ThemeToggleProps) {
  const { theme, toggle_theme } = useTheme()
  const isDark = theme === 'dark'

  const dim = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'
  const iconDim = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'

  return (
    <button
      type="button"
      id="theme-toggle-btn"
      onClick={toggle_theme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`
        ${dim} rounded-full flex items-center justify-center
        text-[#1E275B] dark:text-[#B9C2D8]
        hover:bg-[#EEF4FF] dark:hover:bg-[#13285A]
        transition-all duration-200 cursor-pointer relative overflow-hidden
        ${className}
      `}
    >
      {/* Sun — visible in dark mode */}
      <Sun
        className={`
          ${iconDim} absolute
          transition-all duration-300
          ${isDark
            ? 'opacity-100 rotate-0 scale-100'
            : 'opacity-0 rotate-90 scale-75'}
        `}
      />
      {/* Moon — visible in light mode */}
      <Moon
        className={`
          ${iconDim} absolute
          transition-all duration-300
          ${isDark
            ? 'opacity-0 -rotate-90 scale-75'
            : 'opacity-100 rotate-0 scale-100'}
        `}
      />
    </button>
  )
}
