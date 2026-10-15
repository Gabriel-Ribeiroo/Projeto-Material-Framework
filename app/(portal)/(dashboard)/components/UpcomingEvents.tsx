import { CalendarDays } from 'lucide-react'
import { AcademicEvent } from '@/data/dashboard'
import { EventItem } from './EventItem'

export function UpcomingEvents({ events }: { events: AcademicEvent[] }) {
  return (
    <section className="card animate-fade-up [animation-delay:100ms]">
      <div className="flex items-center justify-between p-5 sm:p-6">
        <div>
          <h3 className="font-extrabold">Próximos eventos</h3>
          <p className="mt-1 text-sm text-muted-foreground">Não perca os prazos.</p>
        </div>
        <CalendarDays className="h-5 w-5 text-primary" />
      </div>
      <div className="space-y-1 px-5 pb-5 sm:px-6 sm:pb-6">
        {events.map(event => (
          <EventItem key={event.id} event={event} />
        ))}
      </div>
    </section>
  )
}
