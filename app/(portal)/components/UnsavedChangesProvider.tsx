'use client'

import { FileWarning } from 'lucide-react'
import { createContext, ReactNode, useMemo } from 'react'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { useNavigationGuard } from '../hooks/useNavigationGuard'

export type UnsavedChangesContextValue = {
  /** Pages call this (through `useUnsavedChanges`) while they hold unsaved edits. */
  setBlocked: (blocked: boolean) => void
}

export const UnsavedChangesContext = createContext<UnsavedChangesContextValue | null>(null)

/** Asks before leaving a page whose edits were not saved yet. */
export function UnsavedChangesProvider({ children }: { children: ReactNode }) {
  const { setBlocked, open, stay, leave } = useNavigationGuard()
  const value = useMemo(() => ({ setBlocked }), [setBlocked])

  return (
    <UnsavedChangesContext.Provider value={value}>
      {children}
      <ConfirmDialog
        open={open}
        title="Sair sem salvar?"
        confirmLabel="Sair sem salvar"
        cancelLabel="Continuar editando"
        icon={FileWarning}
        onConfirm={leave}
        onClose={stay}
      >
        Você tem alterações que ainda não foram salvas. Se sair agora, elas serão perdidas.
      </ConfirmDialog>
    </UnsavedChangesContext.Provider>
  )
}
