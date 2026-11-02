'use client'

import { useEffect } from 'react'

/** Logs an error caught by an error boundary. The place to plug a reporting service in later. */
export function useReportError(error: Error) {
  useEffect(() => {
    console.error(error)
  }, [error])
}
