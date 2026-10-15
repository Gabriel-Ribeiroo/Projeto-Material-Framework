'use client'

import { useCallback, useMemo, useState } from 'react'
import { subjects } from '@/data/subjects'
import { useSimulatedFetch } from '@/hooks/useSimulatedFetch'

export function useSubjectSearch() {
  const schedule = useSimulatedFetch(subjects)
  const { reload } = schedule
  const [search, setSearch] = useState('')
  const [cleared, setCleared] = useState(false)
  /** Codes of subjects the student dropped during this visit. */
  const [droppedCodes, setDroppedCodes] = useState<string[]>([])

  const clear = useCallback(() => setCleared(true), [])

  /** Restoring goes through the request again, skeletons included. */
  const restore = useCallback(() => {
    setCleared(false)
    setDroppedCodes([])
    setSearch('')
    reload()
  }, [reload])

  const drop = useCallback((code: string) => setDroppedCodes(codes => [...codes, code]), [])

  const enrolled = useMemo(
    () => (cleared ? [] : (schedule.data ?? []).filter(subject => !droppedCodes.includes(subject.code))),
    [schedule.data, cleared, droppedCodes],
  )

  const results = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return enrolled

    return enrolled.filter(subject =>
      `${subject.name} ${subject.code} ${subject.professor}`.toLowerCase().includes(term),
    )
  }, [enrolled, search])

  return {
    loading: schedule.loading,
    cleared,
    clear,
    restore,
    search,
    setSearch,
    results,
    /** False once every subject was cleared or dropped, as opposed to filtered out. */
    hasSubjects: enrolled.length > 0,
    drop,
  }
}
