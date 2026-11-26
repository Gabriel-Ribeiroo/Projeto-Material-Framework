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
  /** Total time on screen, in ms. Drives the countdown bar. */
  duration: number
  /** True while the student hovers or focuses the notice: the countdown stops. */
  paused: boolean
  leaving: boolean
}

/** Holds the notice on screen, clears it automatically and animates it out. */
export function useToastState() {
  const [toast, setToast] = useState<ToastState | null>(null)
  const hideTimeout = useRef<number | undefined>(undefined)
  const removeTimeout = useRef<number | undefined>(undefined)
  /** Time left before the notice closes, and when that countdown last (re)started. */
  const remaining = useRef(0)
  const startedAt = useRef(0)

  const dismiss = useCallback(() => {
    window.clearTimeout(hideTimeout.current)
    setToast(current => current && { ...current, leaving: true })
    removeTimeout.current = window.setTimeout(() => setToast(null), EXIT_DURATION)
  }, [])

  const startCountdown = useCallback(
    (ms: number) => {
      remaining.current = ms
      startedAt.current = Date.now()
      hideTimeout.current = window.setTimeout(dismiss, ms)
    },
    [dismiss],
  )

  const showToast = useCallback(
    (message: string, tone: ToastTone = 'success', action?: ToastAction) => {
      window.clearTimeout(hideTimeout.current)
      window.clearTimeout(removeTimeout.current)
      const duration = action ? TOAST_WITH_ACTION_DURATION : TOAST_DURATION
      setToast(current => ({
        id: (current?.id ?? 0) + 1,
        message,
        tone,
        action,
        duration,
        paused: false,
        leaving: false,
      }))
      startCountdown(duration)
    },
    [startCountdown],
  )

  /** Stops the countdown while the student reads or reaches for the action. */
  const pause = useCallback(() => {
    if (!toast || toast.paused || toast.leaving) return
    window.clearTimeout(hideTimeout.current)
    remaining.current = Math.max(0, remaining.current - (Date.now() - startedAt.current))
    setToast(current => current && { ...current, paused: true })
  }, [toast])

  const resume = useCallback(() => {
    if (!toast || !toast.paused || toast.leaving) return
    setToast(current => current && { ...current, paused: false })
    startCountdown(remaining.current)
  }, [toast, startCountdown])

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

  return { toast, showToast, dismiss, runAction, pause, resume }
}
