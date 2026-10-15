import { RotateCcw } from 'lucide-react'
import { ComponentType } from 'react'
import { Button } from '@/components/Button'

type EmptyStateProps = {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
  actionLabel: string
  onAction: () => void
  /** Icon of the action button. Defaults to the "try again" arrow. */
  actionIcon?: ComponentType<{ className?: string }>
}

/** Fallback shown in place of a section that has no data to display. */
export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  actionIcon: ActionIcon = RotateCcw,
}: EmptyStateProps) {
  return (
    <section className="card animate-fade-up flex flex-col items-center border-dashed px-6 py-14 text-center shadow-none sm:py-16">
      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-accent text-accent-foreground ring-8 ring-accent/40">
        <Icon className="h-7 w-7" />
      </span>
      <h3 className="mt-6 font-display text-xl font-semibold">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
      <Button onClick={onAction} icon={ActionIcon} className="mt-7">
        {actionLabel}
      </Button>
    </section>
  )
}
