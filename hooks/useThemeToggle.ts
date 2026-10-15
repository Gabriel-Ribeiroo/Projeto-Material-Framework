'use client'

import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { ComponentType, useEffect, useState } from 'react'
import { useDismissableMenu } from '@/hooks/useDismissableMenu'

export type ThemeOption = {
  id: 'light' | 'dark' | 'system'
  label: string
  icon: ComponentType<{ className?: string }>
}

export const themeOptions: ThemeOption[] = [
  { id: 'light', label: 'Claro', icon: Sun },
  { id: 'dark', label: 'Escuro', icon: Moon },
  { id: 'system', label: 'Sistema', icon: Monitor },
]

/**
 * Theme selection (light, dark or system preference) along with the floating
 * menu that shows it. The theme is only known after hydration, so `mounted`
 * marks when the real state can be rendered.
 */
export function useThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const { open, containerRef, toggle, close } = useDismissableMenu<HTMLDivElement>()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const select = (id: ThemeOption['id']) => {
    setTheme(id)
    close()
  }

  // Before hydration the icon is neutral; afterwards it reflects the active theme.
  const TriggerIcon = !mounted ? Monitor : resolvedTheme === 'dark' ? Moon : Sun

  const current = mounted ? theme : undefined
  const currentLabel = themeOptions.find(option => option.id === current)?.label

  return {
    open,
    containerRef,
    toggle,
    select,
    options: themeOptions,
    current,
    currentLabel,
    TriggerIcon,
  }
}
