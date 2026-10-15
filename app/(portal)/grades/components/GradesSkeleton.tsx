import { GradesTableRowSkeleton } from './GradesTableRowSkeleton'
import { MiniMetricSkeleton } from './MiniMetricSkeleton'

/** Outline of the metrics and the report card while the grades load. */
export function GradesSkeleton() {
  return (
    <div role="status" aria-busy>
      <span className="sr-only">Carregando suas notas…</span>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <MiniMetricSkeleton key={index} />
        ))}
      </div>

      <section className="card overflow-hidden">
        <div className="hidden h-11 border-b border-border bg-muted/60 md:block" />
        <div className="divide-y divide-border">
          {Array.from({ length: 6 }, (_, index) => (
            <GradesTableRowSkeleton key={index} />
          ))}
        </div>
      </section>
    </div>
  )
}
