'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useSession } from '@/hooks/useSession'

/**
 * Ends the student session right away and goes to the login screen, which
 * shows the "sessão encerrada" notice (kept in sessionStorage, not the URL).
 */
export function useLogout() {
  const router = useRouter()
  const { signOut } = useSession()

  return useCallback(() => {
    signOut()
    router.replace('/login')
  }, [signOut, router])
}
