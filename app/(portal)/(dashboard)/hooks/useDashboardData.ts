'use client'

import { useCallback, useState } from 'react'
import { quickActions, stats, upcomingEvents } from '@/data/dashboard'
import { grades } from '@/data/grades'
import { useSimulatedFetch } from '@/hooks/useSimulatedFetch'

/** Everything the dashboard shows, as a single "response" payload. */
const dashboardPayload = {
  stats,
  quickActions,
  upcomingEvents,
  latestGrades: grades.slice(0, 4),
}

export function useDashboardData() {
  const dashboard = useSimulatedFetch(dashboardPayload)
  const { reload } = dashboard
  const [cleared, setCleared] = useState(false)

  const clear = useCallback(() => setCleared(true), [])

  /** Restoring goes through the request again, skeletons included. */
  const restore = useCallback(() => {
    setCleared(false)
    reload()
  }, [reload])

  return { ...dashboard, cleared, clear, restore }
}
