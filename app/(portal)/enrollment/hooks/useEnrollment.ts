'use client'

import { useCallback, useMemo, useState } from 'react'
import { availableSubjects, enrolledCredits } from '@/data/subjects'
import { SIMULATED_SAVE_DELAY, simulateRequest, useSimulatedFetch } from '@/hooks/useSimulatedFetch'
import { useToast } from '@/hooks/useToast'

export function useEnrollment() {
  const { showToast } = useToast()
  const offer = useSimulatedFetch(availableSubjects)
  const { reload } = offer
  const [selectedCodes, setSelectedCodes] = useState<string[]>([])
  const [cleared, setCleared] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  /** Clearing the offer also drops the selection built from it. */
  const clear = useCallback(() => {
    setCleared(true)
    setSelectedCodes([])
  }, [])

  /** Restoring goes through the request again, skeletons included. */
  const restore = useCallback(() => {
    setCleared(false)
    reload()
  }, [reload])

  const subjects = useMemo(() => (cleared ? [] : offer.data ?? []), [offer.data, cleared])

  const isSelected = useCallback((code: string) => selectedCodes.includes(code), [selectedCodes])

  const toggle = useCallback((code: string) => {
    setSelectedCodes(codes => (codes.includes(code) ? codes.filter(item => item !== code) : [...codes, code]))
  }, [])

  const selectedSubjects = useMemo(
    () => subjects.filter(subject => selectedCodes.includes(subject.code)),
    [subjects, selectedCodes],
  )

  const totalCredits = useMemo(
    () => selectedSubjects.reduce((sum, subject) => sum + subject.credits, enrolledCredits),
    [selectedSubjects],
  )

  /** Sends the pre-enrollment; the button stays locked with a spinner meanwhile. */
  const submit = useCallback(async () => {
    if (!selectedSubjects.length) return

    setSubmitting(true)
    await simulateRequest(SIMULATED_SAVE_DELAY)
    setSubmitting(false)
    setSelectedCodes([])
    showToast(`Pré-matrícula enviada com ${selectedSubjects.length} nova(s) disciplina(s).`)
  }, [selectedSubjects, showToast])

  return {
    loading: offer.loading,
    cleared,
    clear,
    restore,
    subjects,
    isSelected,
    toggle,
    selectedSubjects,
    totalCredits,
    submit,
    submitting,
  }
}
