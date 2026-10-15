'use client'

import { AlertTriangle } from 'lucide-react'
import { ComponentType, ReactNode, useId } from 'react'
import { Button } from '@/components/Button'
import { useModalDialog } from '@/hooks/useModalDialog'

const tones = {
  primary: { badge: 'bg-accent text-accent-foreground', button: 'primary' },
  destructive: { badge: 'bg-destructive-soft text-destructive', button: 'destructive' },
} as const

type ConfirmDialogProps = {
  open: boolean
  title: string
  children: ReactNode
  confirmLabel: string
  onConfirm: () => void
  onClose: () => void
  cancelLabel?: string
  tone?: keyof typeof tones
  icon?: ComponentType<{ className?: string }>
  /** Keeps the dialog open with a spinner on the confirm button. */
  loading?: boolean
  loadingLabel?: string
}

/**
 * Asks the student to confirm an action before it happens. Focus starts on
 * the cancel button, so pressing Enter by reflex never destroys anything.
 */
export function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel,
  onConfirm,
  onClose,
  cancelLabel = 'Cancelar',
  tone = 'destructive',
  icon: Icon = AlertTriangle,
  loading = false,
  loadingLabel,
}: ConfirmDialogProps) {
  const { ref, handleCancel, handleClick } = useModalDialog(open, loading ? () => {} : onClose)
  const titleId = useId()
  const descriptionId = useId()

  return (
    <dialog
      ref={ref}
      onCancel={handleCancel}
      onClick={handleClick}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className="animate-float-in m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-border bg-popover p-0 text-popover-foreground shadow-2xl backdrop:animate-fade-in backdrop:bg-overlay data-closing:animate-float-out data-closing:backdrop:animate-fade-out"
    >
      <div className="p-6">
        <div className="flex gap-4">
          <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${tones[tone].badge}`}>
            <Icon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h2 id={titleId} className="font-display text-lg font-semibold">
              {title}
            </h2>
            <div id={descriptionId} className="mt-2 text-sm leading-6 text-muted-foreground">
              {children}
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="text" onClick={onClose} disabled={loading} autoFocus>
            {cancelLabel}
          </Button>
          <Button variant={tones[tone].button} onClick={onConfirm} loading={loading} loadingLabel={loadingLabel}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  )
}
