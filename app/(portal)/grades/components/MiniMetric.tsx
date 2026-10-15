import { ComponentType } from 'react'

type MiniMetricProps = {
  label: string
  value: string
  icon: ComponentType<{ className?: string }>
}

export function MiniMetric({ label, value, icon: Icon }: MiniMetricProps) {
  return (
    <div className="card flex items-center gap-4 p-5">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs font-semibold text-muted-foreground">{label}</p>
        <p className="mt-0.5 font-display text-xl font-semibold tabular-nums">{value}</p>
      </div>
    </div>
  )
}
