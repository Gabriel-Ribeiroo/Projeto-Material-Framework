import { BookOpen } from 'lucide-react'
import { formatGrade, gradeStatusLabels } from '@/data/grades'
import { Grade } from '@/types/academic'

type GradeRowProps = {
  grade: Grade
  delay?: number
}

export function GradeRow({ grade, delay = 0 }: GradeRowProps) {
  return (
    <div style={{ animationDelay: `${delay}ms` }} className="animate-fade-up flex items-center gap-3 px-5 py-4 sm:px-6">
      <span className="hidden h-9 w-9 shrink-0 place-items-center rounded-xl bg-secondary text-muted-foreground sm:grid">
        <BookOpen className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold">{grade.name}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{grade.code} • {grade.professor}</p>
      </div>
      <span
        className={`hidden rounded-full px-2.5 py-1 text-[0.625rem] font-bold sm:block ${grade.status === 'approved' ? 'bg-success-soft text-success' : 'bg-warning-soft text-warning'}`}
      >
        {gradeStatusLabels[grade.status]}
      </span>
      <span className="font-display text-lg font-semibold tabular-nums text-foreground">{formatGrade(grade.grade)}</span>
    </div>
  )
}
