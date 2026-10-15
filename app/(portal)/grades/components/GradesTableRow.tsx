import { BookOpen } from 'lucide-react'
import { formatGrade, gradeStatusLabels } from '@/data/grades'
import { Grade } from '@/types/academic'

type GradesTableRowProps = {
  grade: Grade
  delay?: number
}

export function GradesTableRow({ grade, delay = 0 }: GradesTableRowProps) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className="animate-fade-up grid gap-3 px-5 py-5 md:grid-cols-[1fr_8.75rem_9.375rem_6.25rem] md:items-center md:gap-4 md:px-6"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
          <BookOpen className="h-5 w-5" />
        </span>
        <div>
          <p className="font-bold">{grade.name}</p>
          <p className="mt-1 text-xs text-muted-foreground">{grade.code}</p>
        </div>
      </div>
      <span
        className={`w-fit rounded-full px-2.5 py-1 text-[0.625rem] font-extrabold ${grade.status === 'approved' ? 'bg-success-soft text-success' : 'bg-warning-soft text-warning'}`}
      >
        {gradeStatusLabels[grade.status]}
      </span>
      <span className="text-sm text-muted-foreground">{grade.professor}</span>
      <span className="font-display text-left text-2xl font-semibold tabular-nums md:text-right">{formatGrade(grade.grade)}</span>
    </div>
  )
}
