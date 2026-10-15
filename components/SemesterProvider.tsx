'use client'

import { createContext, ReactNode, useMemo, useState } from 'react'
import { semesters } from '@/data/navigation'

export type SemesterContextValue = {
  semester: string
  setSemester: (semester: string) => void
}

export const SemesterContext = createContext<SemesterContextValue | null>(null)

/** Keeps the semester picked in the header while navigating between pages. */
export function SemesterProvider({ children }: { children: ReactNode }) {
  const [semester, setSemester] = useState(semesters[0])
  const value = useMemo(() => ({ semester, setSemester }), [semester])

  return <SemesterContext.Provider value={value}>{children}</SemesterContext.Provider>
}
