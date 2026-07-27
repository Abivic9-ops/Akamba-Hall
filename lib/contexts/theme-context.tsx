'use client'

import { createContext, useCallback, useContext, useLayoutEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface theme_context_value {
  theme: Theme
  toggle_theme: () => void
  set_theme: (t: Theme) => void
}

const ThemeContext = createContext<theme_context_value | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, set_theme_state] = useState<Theme>('light')

  useLayoutEffect(() => {
    const saved = window.localStorage.getItem('theme') as Theme | null
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initial = saved ?? preferred
    document.documentElement.classList.toggle('dark', initial === 'dark')
    set_theme_state(initial)
  }, [])

  const apply_theme = useCallback((next: Theme) => {
    const update = () => {
      document.documentElement.classList.toggle('dark', next === 'dark')
      localStorage.setItem('theme', next)
      set_theme_state(next)
    }

    if (document.startViewTransition) {
      const transition = document.startViewTransition(update)
      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              'circle(0% at calc(100% - 32px) 32px)',
              'circle(150% at calc(100% - 32px) 32px)',
            ],
          },
          {
            duration: 500,
            easing: 'ease-in-out',
            pseudoElement: '::view-transition-new(root)',
          },
        )
      })
    } else {
      update()
    }
  }, [])

  const toggle_theme = useCallback(() => {
    apply_theme(theme === 'light' ? 'dark' : 'light')
  }, [theme, apply_theme])

  const set_theme = useCallback((t: Theme) => {
    apply_theme(t)
  }, [apply_theme])

  return (
    <ThemeContext.Provider value={{ theme, toggle_theme, set_theme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
