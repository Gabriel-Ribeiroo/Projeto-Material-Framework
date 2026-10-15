import { Stat } from '@/data/dashboard'

const tones = {
  primary: 'bg-accent text-accent-foreground',
  success: 'bg-success-soft text-success',
  neutral: 'bg-secondary text-secondary-foreground',
  warning: 'bg-warning-soft text-warning',
}

type StatCardProps = {
  stat: Stat
  semester: string
}

export function StatCard({ stat: { label, value, detail, icon: Icon, tone }, semester }: StatCardProps) {
  return (
    <div className="card animate-fade-up p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-xs font-bold text-muted-foreground">{semester}</span>
      </div>
      <p className="mt-5 text-sm font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-3xl font-semibold tabular-nums">{value}</p>
      <p className="mt-1 text-xs font-medium text-muted-foreground">{detail}</p>
    </div>
  )
}
