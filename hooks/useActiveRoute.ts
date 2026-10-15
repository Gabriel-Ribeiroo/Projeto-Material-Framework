'use client'

import { Route } from 'next'
import { usePathname } from 'next/navigation'
import { useCallback } from 'react'

/**
 * Tells which route is on screen. The home route matches exactly; the others
 * also match their subroutes.
 */
export function useActiveRoute() {
  const pathname = usePathname()

  return useCallback(
    (href: Route) => (href === '/' ? pathname === '/' : pathname.startsWith(href)),
    [pathname],
  )
}
