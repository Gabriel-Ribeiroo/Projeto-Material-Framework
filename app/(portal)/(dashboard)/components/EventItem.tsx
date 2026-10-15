import { AcademicEvent } from '@/data/dashboard'

export function EventItem({ event: { date, title, meta, urgent } }: { event: AcademicEvent }) {
  return (
    <div className="flex items-center gap-3 rounded-xl p-3 transition duration-200 hover:bg-secondary">
      <div className={`w-14 shrink-0 rounded-xl px-2 py-2 text-center text-[0.625rem] font-extrabold ${urgent ? 'bg-destructive-soft text-destructive' : 'bg-accent text-accent-foreground'}`}>
        {date}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-bold">{title}</p>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">{meta}</p>
      </div>
    </div>
  )
}
