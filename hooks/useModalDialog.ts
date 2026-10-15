'use client'

import { MouseEvent, SyntheticEvent, useEffect, useRef } from 'react'

/** Matches the length of `animate-float-out`. */
const EXIT_DURATION = 150

/**
 * Drives a native `<dialog>` from an `open` prop. `showModal` gives focus
 * trapping, Escape handling and an inert page for free; this hook adds the
 * exit animation and routes Escape and backdrop clicks through `onClose`, so
 * the caller stays in control (e.g. it can refuse to close mid-action).
 */
export function useModalDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return

    if (open) {
      dialog.removeAttribute('data-closing')
      if (!dialog.open) dialog.showModal()
      return
    }

    if (!dialog.open) return
    // Play the exit animation before the dialog leaves the top layer.
    dialog.setAttribute('data-closing', '')
    const timeout = window.setTimeout(() => {
      dialog.close()
      dialog.removeAttribute('data-closing')
    }, EXIT_DURATION)
    return () => window.clearTimeout(timeout)
  }, [open])

  /** Escape fires `cancel`; let the caller decide instead of closing outright. */
  const handleCancel = (event: SyntheticEvent) => {
    event.preventDefault()
    onClose()
  }

  /** The panel fills the dialog box, so a click landing on the dialog itself hit the backdrop. */
  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose()
  }

  return { ref, handleCancel, handleClick }
}
