'use client'

import { CalendarDays } from 'lucide-react'
import { Select } from '@/components/Select'
import { useSemesterSelect } from '@/hooks/useSemesterSelect'

export function SemesterSelect() {
  const { options, current, select } = useSemesterSelect()

  return (
    <Select
      label="Semestre"
      value={current}
      options={options}
      onChange={select}
      icon={CalendarDays}
      variant="subtle"
      className="hidden sm:block"
    />
  )
}
