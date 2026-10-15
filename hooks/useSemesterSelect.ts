'use client'

import { CalendarDays } from 'lucide-react'
import { SelectOption } from '@/components/Select'
import { semesters } from '@/data/navigation'
import { useSemester } from '@/hooks/useSemester'

const semesterOptions: SelectOption<string>[] = semesters.map(semester => ({
  value: semester,
  label: semester,
  icon: CalendarDays,
}))

/** Semester picker state: the active semester and the options to choose from. */
export function useSemesterSelect() {
  const { semester, setSemester } = useSemester()

  return { options: semesterOptions, current: semester, select: setSemester }
}
