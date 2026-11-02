'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSession } from '@/hooks/useSession'

/** Sends visitors without a session to the login screen. */
export function useAuthGuard() {
  const router = useRouter()
  const { session, ready } = useSession()

  useEffect(() => {
    if (ready && !session) router.replace('/login')
  }, [ready, session, router])

  return { authorized: Boolean(session) }
}
