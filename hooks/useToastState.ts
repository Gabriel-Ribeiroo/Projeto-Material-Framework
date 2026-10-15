'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const TOAST_DURATION = 4000
/** Matches the length of `animate-float-out`. */
const EXIT_DURATION = 150

export type ToastTone = 'success' | 'error' | 'info'

export type ToastState = {
  /** Changes on every notice so a repeated message replays its entrance. */
  id: number
  message: string
  tone: ToastTone
  leaving: boolean
}

/** Holds the notice on screen, clears it automatically and animates it out. */
export function useToastState() {
  const [toast, setToast] = useState<ToastState | null>(null)
  const hideTimeout = useRef<number | undefined>(undefined)
  const removeTimeout = useRef<number | undefined>(undefined)

  const dismiss = useCallback(() => {
    window.clearTimeout(hideTimeout.current)
    setToast(current => current && { ...current, leaving: true })
    removeTimeout.current = window.setTimeout(() => setToast(null), EXIT_DURATION)
  }, [])

  const showToast = useCallback(
    (message: string, tone: ToastTone = 'success') => {
      window.clearTimeout(hideTimeout.current)
      window.clearTimeout(removeTimeout.current)
      setToast(current => ({ id: (current?.id ?? 0) + 1, message, tone, leaving: false }))
      hideTimeout.current = window.setTimeout(dismiss, TOAST_DURATION)
    },
    [dismiss],
  )

  useEffect(
    () => () => {
      window.clearTimeout(hideTimeout.current)
      window.clearTimeout(removeTimeout.current)
    },
    [],
  )

  return { toast, showToast, dismiss }
}
