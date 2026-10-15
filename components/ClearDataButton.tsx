'use client'

import { Eraser } from 'lucide-react'
import { useState } from 'react'
import { ConfirmDialog } from '@/components/ConfirmDialog'

type ClearDataButtonProps = {
  onClear: () => void
  disabled?: boolean
}

/** Empties the current screen, after confirmation, so its empty state can be seen. */
export function ClearDataButton({ onClear, disabled }: ClearDataButtonProps) {
  const [confirming, setConfirming] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setConfirming(true)}
        disabled={disabled}
        className="focus-ring cursor-pointer inline-flex shrink-0 items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition duration-200 hover:border-destructive/40 hover:bg-destructive-soft hover:text-destructive disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-border disabled:hover:bg-card disabled:hover:text-foreground"
      >
        <Eraser className="h-4 w-4" />
        Limpar dados
      </button>
      <ConfirmDialog
        open={confirming}
        title="Limpar os dados desta tela?"
        confirmLabel="Limpar dados"
        icon={Eraser}
        onClose={() => setConfirming(false)}
        onConfirm={() => {
          setConfirming(false)
          onClear()
        }}
      >
        As informações exibidas aqui serão removidas da tela. Você poderá recarregá-las depois pelo botão de
        recarregar.
      </ConfirmDialog>
    </>
  )
}
