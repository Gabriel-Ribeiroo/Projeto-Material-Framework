'use client'

import { Settings } from 'lucide-react'
import { useToast } from '@/hooks/useToast'

const options = [
  { id: 'password', title: 'Alterar senha', description: 'Atualize sua senha de acesso.', message: 'Fluxo de troca de senha iniciado.' },
  { id: 'sessions', title: 'Sessões ativas', description: '1 dispositivo conectado agora.', message: 'Sua conta está protegida com autenticação segura.' },
]

export function SecurityCard() {
  const { showToast } = useToast()

  return (
    <section className="card mt-6 p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-secondary-foreground">
          <Settings className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-extrabold">Segurança</h3>
          <p className="text-xs text-muted-foreground">Gerencie as configurações de acesso.</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {options.map(option => (
          <button
            key={option.id}
            type="button"
            onClick={() => showToast(option.message, 'info')}
            className="focus-ring cursor-pointer rounded-xl border border-border p-4 text-left transition duration-200 hover:border-primary/40 hover:bg-accent/60"
          >
            <p className="text-sm font-bold">{option.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{option.description}</p>
          </button>
        ))}
      </div>
    </section>
  )
}
