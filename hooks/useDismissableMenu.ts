import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Controls floating menus (dropdowns, panels), closing them on an outside
 * click or on Escape.
 */
export function useDismissableMenu<T extends HTMLElement>() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<T>(null)

  const close = useCallback(() => setOpen(false), [])
  const toggle = useCallback(() => setOpen(current => !current), [])

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) close()
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, close])

  return { open, containerRef, toggle, close }
}
