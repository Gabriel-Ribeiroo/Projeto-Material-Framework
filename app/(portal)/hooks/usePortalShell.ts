'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { navItems } from '@/data/navigation'

const FALLBACK_TITLE = 'Portal acadêmico'

/**
 * Portal layout state: the sidebar on small screens and the title of the
 * current route shown in the header.
 */
export function usePortalShell() {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const openSidebar = useCallback(() => setSidebarOpen(true), [])
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  // The sidebar must not stay on top of the content after changing pages.
  useEffect(() => setSidebarOpen(false), [pathname])

  // Like any drawer, the open sidebar closes on Escape.
  useEffect(() => {
    if (!sidebarOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeSidebar()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [sidebarOpen, closeSidebar])

  const title = navItems.find(item => item.href === pathname)?.title ?? FALLBACK_TITLE

  return { title, sidebarOpen, openSidebar, closeSidebar }
}
