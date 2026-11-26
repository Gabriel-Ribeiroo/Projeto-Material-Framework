'use client'

import { createContext, ReactNode, useMemo } from 'react'
import { Toast } from '@/components/Toast'
import { ToastAction, ToastTone, useToastState } from '@/hooks/useToastState'

export type ToastContextValue = {
  showToast: (message: string, tone?: ToastTone, action?: ToastAction) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

/** Exposes `showToast` to the whole tree and renders the current notice. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const { toast, showToast, dismiss, runAction, pause, resume } = useToastState()
  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast && (
        <Toast
          key={toast.id}
          toast={toast}
          onDismiss={dismiss}
          onAction={runAction}
          onPause={pause}
          onResume={resume}
        />
      )}
    </ToastContext.Provider>
  )
}
