'use client'

import { useContext, useEffect } from 'react'
import { UnsavedChangesContext } from '../components/UnsavedChangesProvider'

/** Guards navigation away from the calling page while `dirty` is true. */
export function useUnsavedChanges(dirty: boolean) {
  const context = useContext(UnsavedChangesContext)
  if (!context) throw new Error('useUnsavedChanges must be used inside <UnsavedChangesProvider>.')

  const { setBlocked } = context

  useEffect(() => {
    setBlocked(dirty)
    return () => setBlocked(false)
  }, [dirty, setBlocked])
}
