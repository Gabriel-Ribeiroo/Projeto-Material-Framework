'use client'

import { useCallback } from 'react'
import { useDismissableMenu } from '@/hooks/useDismissableMenu'

/**
 * Floating listbox state behind every `Select`: opening, closing on an outside
 * click or Escape, and committing a choice.
 */
export function useSelect<T>(onChange: (value: T) => void) {
  const { open, containerRef, toggle, close } = useDismissableMenu<HTMLDivElement>()

  const select = useCallback(
    (value: T) => {
      onChange(value)
      close()
    },
    [onChange, close],
  )

  return { open, containerRef, toggle, select }
}
