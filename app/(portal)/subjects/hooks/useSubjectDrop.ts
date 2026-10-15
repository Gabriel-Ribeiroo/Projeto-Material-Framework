'use client'

import { useCallback, useState } from 'react'
import { simulateRequest } from '@/hooks/useSimulatedFetch'
import { useToast } from '@/hooks/useToast'
import { Subject } from '@/types/academic'

const DROP_DELAY = 1500

/**
 * Dropping a subject is destructive, so it goes through a confirmation dialog
 * first. `target` outlives `open` on purpose: the dialog keeps its text while
 * it animates out.
 */
export function useSubjectDrop(onDropped: (code: string) => void) {
  const { showToast } = useToast()
  const [target, setTarget] = useState<Subject | null>(null)
  const [open, setOpen] = useState(false)
  const [dropping, setDropping] = useState(false)

  const request = useCallback((subject: Subject) => {
    setTarget(subject)
    setOpen(true)
  }, [])

  /** Ignored while the request runs: the action can no longer be cancelled. */
  const cancel = useCallback(() => {
    if (!dropping) setOpen(false)
  }, [dropping])

  const confirm = useCallback(async () => {
    if (!target) return

    setDropping(true)
    await simulateRequest(DROP_DELAY)
    setDropping(false)
    setOpen(false)
    onDropped(target.code)
    showToast(`${target.name} foi trancada.`)
  }, [target, onDropped, showToast])

  return { target, open, dropping, request, cancel, confirm }
}
