'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Delay of every simulated request. Long enough for the skeletons to be
 * noticed, short enough not to get in the way.
 */
export const SIMULATED_DELAY = 900

/** Delay of simulated writes (saving, submitting): long enough to show the spinner. */
export const SIMULATED_SAVE_DELAY = 2000

/** Resolves after `delay`, standing in for a round trip to the server. */
export function simulateRequest(delay = SIMULATED_DELAY) {
  return new Promise<void>(resolve => setTimeout(resolve, delay))
}

type FetchState<T> = { loading: true; data: null } | { loading: false; data: T }

export type SimulatedFetch<T> =
  | { loading: true; data: null; reload: () => void }
  | { loading: false; data: T; reload: () => void }

/**
 * The portal has no backend: all data lives in `@/data`. This hook wraps a
 * local value in a promise that resolves after a short delay, so the screens
 * go through the same loading state they would with a real request.
 *
 * `reload` replays that request, which is what restoring a cleared screen does.
 */
export function useSimulatedFetch<T>(value: T, delay = SIMULATED_DELAY): SimulatedFetch<T> {
  const latestValue = useRef(value)
  latestValue.current = value

  const [attempt, setAttempt] = useState(0)
  const [state, setState] = useState<FetchState<T>>({ loading: true, data: null })

  useEffect(() => {
    let active = true

    const request = async () => {
      await simulateRequest(delay)
      if (active) setState({ loading: false, data: latestValue.current })
    }

    request()

    return () => {
      active = false
    }
  }, [delay, attempt])

  const reload = useCallback(() => {
    setState({ loading: true, data: null })
    setAttempt(current => current + 1)
  }, [])

  return { ...state, reload }
}
