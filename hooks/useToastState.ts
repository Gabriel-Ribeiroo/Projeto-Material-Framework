'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const TOAST_DURATION = 4000
/** Notices with an action stay longer, so there is time to reach the button. */
const TOAST_WITH_ACTION_DURATION = 7000
/** Matches the length of `animate-float-out`. */
const EXIT_DURATION = 150

export type ToastTone = 'success' | 'error' | 'info'

/** A single follow-up the notice offers, e.g. "Desfazer". */
export type ToastAction = {
  label: string
  onAction: () => void
}

export type ToastState = {
  /** Changes on every notice so a repeated message replays its entrance. */
  id: number
  message: string
  tone: ToastTone
  action?: ToastAction
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
    (message: string, tone: ToastTone = 'success', action?: ToastAction) => {
      window.clearTimeout(hideTimeout.current)
      window.clearTimeout(removeTimeout.current)
      setToast(current => ({ id: (current?.id ?? 0) + 1, message, tone, action, leaving: false }))
      hideTimeout.current = window.setTimeout(dismiss, action ? TOAST_WITH_ACTION_DURATION : TOAST_DURATION)
    },
    [dismiss],
  )

  /** Runs the notice's action. The action may show a new notice, so this one only closes if it did not. */
  const runAction = useCallback(() => {
    const id = toast?.id
    window.clearTimeout(hideTimeout.current)
    toast?.action?.onAction()
    setToast(current => (current && current.id === id ? { ...current, leaving: true } : current))
    window.setTimeout(() => setToast(current => (current && current.id === id ? null : current)), EXIT_DURATION)
  }, [toast])

  useEffect(
    () => () => {
      window.clearTimeout(hideTimeout.current)
      window.clearTimeout(removeTimeout.current)
    },
    [],
  )

  return { toast, showToast, dismiss, runAction }
}
