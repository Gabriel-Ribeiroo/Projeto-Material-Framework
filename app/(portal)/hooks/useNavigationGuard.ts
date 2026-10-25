'use client'

import { Route } from 'next'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

/**
 * Holds navigation back while a page has unsaved changes. The App Router has
 * no API to block a route change, so clicks on internal links are caught in
 * the capture phase, before `next/link` handles them, and parked until the
 * student decides. Closing or reloading the tab gets the browser's own prompt.
 */
export function useNavigationGuard() {
  const router = useRouter()
  const [blocked, setBlocked] = useState(false)
  const [pendingHref, setPendingHref] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!blocked) return

    const handleClick = (event: MouseEvent) => {
      // Modified clicks open a new tab, which leaves this page and its edits intact.
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = (event.target as Element | null)?.closest?.('a[href]')
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target === '_blank' || anchor.hasAttribute('download')) return

      const url = new URL(anchor.href)
      // Other sites, and links within this page (e.g. "pular para o conteúdo"), are let through.
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return

      event.preventDefault()
      event.stopPropagation()
      setPendingHref(`${url.pathname}${url.search}${url.hash}`)
      setOpen(true)
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      // Still required by some browsers to show the prompt.
      event.returnValue = ''
    }

    window.addEventListener('click', handleClick, true)
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('click', handleClick, true)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [blocked])

  const stay = useCallback(() => setOpen(false), [])

  const leave = useCallback(() => {
    setOpen(false)
    setBlocked(false)
    if (pendingHref) router.push(pendingHref as Route)
  }, [pendingHref, router])

  return { setBlocked, open, stay, leave }
}
