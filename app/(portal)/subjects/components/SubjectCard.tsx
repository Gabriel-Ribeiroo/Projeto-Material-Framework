import { BookOpen, CalendarDays, CreditCard, MapPin, UserRound } from 'lucide-react'
import { Subject } from '@/types/academic'
import { SubjectCardMenu } from './SubjectCardMenu'
import { SubjectInfo } from './SubjectInfo'

type SubjectCardProps = {
  subject: Subject
  onDrop: () => void
  delay?: number
}

export function SubjectCard({ subject, onDrop, delay = 0 }: SubjectCardProps) {
  return (
    // Each card is its own stacking context (animation, hover lift), so the one
    // holding focus is raised to keep its open menu above the next card.
    <article
      style={{ animationDelay: `${delay}ms` }}
      className="card animate-fade-up relative p-5 transition duration-300 focus-within:z-10 hover:-translate-y-1 hover:shadow-xl sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
            <BookOpen className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-extrabold">{subject.name}</h3>
            <p className="mt-1 text-xs font-semibold text-muted-foreground">{subject.code} • {subject.credits} créditos</p>
          </div>
        </div>
        <SubjectCardMenu subjectName={subject.name} onDrop={onDrop} />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <SubjectInfo icon={UserRound} text={subject.professor} />
        <SubjectInfo icon={CalendarDays} text={subject.schedule} />
        <SubjectInfo icon={MapPin} text={subject.room} />
        <SubjectInfo icon={CreditCard} text={`${subject.credits} créditos`} />
      </div>

      <div className="mt-5">
        <div className="mb-2 flex justify-between text-xs font-bold">
          <span className="text-muted-foreground">Progresso do semestre</span>
          <span>{subject.progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${subject.progress}%` }} />
        </div>
      </div>
    </article>
  )
}
