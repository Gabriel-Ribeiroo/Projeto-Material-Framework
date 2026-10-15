import { QuickActionItem } from '@/data/dashboard'
import { QuickAction } from './QuickAction'

export function QuickActions({ actions }: { actions: QuickActionItem[] }) {
  return (
    <section className="card animate-fade-up overflow-hidden">
      <div className="border-b border-border p-5 sm:p-6">
        <h3 className="font-extrabold">Ações rápidas</h3>
        <p className="mt-1 text-sm text-muted-foreground">Acesse o que você mais precisa.</p>
      </div>
      <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
        {actions.map(action => (
          <QuickAction key={action.id} action={action} />
        ))}
      </div>
    </section>
  )
}
