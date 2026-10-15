'use client'

import { useCallback } from 'react'
import { useToast } from '@/hooks/useToast'

/** Ends the student session. For now it only confirms the action with a notice. */
export function useLogout() {
  const { showToast } = useToast()

  return useCallback(() => showToast('Sessão encerrada com sucesso.'), [showToast])
}
