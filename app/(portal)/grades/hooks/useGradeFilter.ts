'use client'

import { CheckCircle2, Clock3, List } from 'lucide-react'
import { ComponentType, useCallback, useMemo, useState } from 'react'
import { SelectOption } from '@/components/Select'
import { grades } from '@/data/grades'
import { useSimulatedFetch } from '@/hooks/useSimulatedFetch'
import { GradeStatus } from '@/types/academic'

export type GradeFilter = 'all' | GradeStatus

/** Wording shown to the student for each filter option. */
export const gradeFilterLabels: Record<GradeFilter, string> = {
  all: 'Todas',
  approved: 'Aprovado',
  'in-progress': 'Em andamento',
}

const gradeFilterIcons: Record<GradeFilter, ComponentType<{ className?: string }>> = {
  all: List,
  approved: CheckCircle2,
  'in-progress': Clock3,
}

export const gradeFilterOptions: SelectOption<GradeFilter>[] = (
  Object.keys(gradeFilterLabels) as GradeFilter[]
).map(value => ({ value, label: gradeFilterLabels[value], icon: gradeFilterIcons[value] }))

export function useGradeFilter() {
  const report = useSimulatedFetch(grades)
  const { reload } = report
  const [filter, setFilter] = useState<GradeFilter>('all')
  const [cleared, setCleared] = useState(false)

  const clear = useCallback(() => setCleared(true), [])

  /** Restoring goes through the request again, skeletons included. */
  const restore = useCallback(() => {
    setCleared(false)
    reload()
  }, [reload])

  const filteredGrades = useMemo(() => {
    if (cleared) return []
    return (report.data ?? []).filter(grade => filter === 'all' || grade.status === filter)
  }, [report.data, cleared, filter])

  return { loading: report.loading, cleared, clear, restore, filter, setFilter, filteredGrades }
}
