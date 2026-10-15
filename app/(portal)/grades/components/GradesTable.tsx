import { Grade } from '@/types/academic'
import { GradesTableRow } from './GradesTableRow'

export function GradesTable({ grades }: { grades: Grade[] }) {
  return (
    <section className="card overflow-hidden">
      <div className="hidden grid-cols-[1fr_8.75rem_9.375rem_6.25rem] gap-4 border-b border-border bg-muted/60 px-6 py-3 text-[0.6875rem] font-extrabold uppercase tracking-wider text-muted-foreground md:grid">
        <span>Disciplina</span>
        <span>Situação</span>
        <span>Professor</span>
        <span className="text-right">Nota</span>
      </div>
      <div className="divide-y divide-border">
        {grades.map((grade, index) => (
          <GradesTableRow key={grade.code} grade={grade} delay={index * 50} />
        ))}
      </div>
    </section>
  )
}
