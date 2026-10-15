'use client'

import { CircleHelp } from 'lucide-react'
import { Button } from '@/components/Button'
import { useToast } from '@/hooks/useToast'

export function HelpCallout() {
  const { showToast } = useToast()

  return (
    <section className="rounded-2xl border border-border bg-accent p-5 sm:flex sm:items-center sm:justify-between sm:p-6">
      <div className="flex gap-3">
        <div className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-card text-primary shadow-sm">
          <CircleHelp className="h-5 w-5" />
        </div>
        <div>
          <p className="font-bold text-foreground">Precisa de ajuda?</p>
          <p className="mt-1 text-sm text-accent-foreground">Acesse a central de atendimento para tirar dúvidas acadêmicas.</p>
        </div>
      </div>
      <Button
        onClick={() => showToast('Central de ajuda: em breve você poderá abrir um chamado.', 'info')}
        className="mt-4 shrink-0 sm:mt-0"
      >
        Central de ajuda
      </Button>
    </section>
  )
}
