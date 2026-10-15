import Link from 'next/link'
import { Grade } from '@/types/academic'
import { GradeRow } from './GradeRow'

export function GradesSummary({ grades }: { grades: Grade[] }) {
  return (
    <section className="card">
      <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h3 className="font-extrabold">Resumo das notas</h3>
          <p className="mt-1 text-sm text-muted-foreground">Suas últimas avaliações.</p>
        </div>
        <Link
          href="/grades"
          className="focus-ring cursor-pointer self-start rounded-lg px-2 py-1 text-sm font-bold text-primary transition duration-200 hover:bg-accent hover:text-accent-foreground"
        >
          Ver todas →
        </Link>
      </div>
      <div className="divide-y divide-border">
        {grades.map((grade, index) => (
          <GradeRow key={grade.code} grade={grade} delay={index * 60} />
        ))}
      </div>
    </section>
  )
}
