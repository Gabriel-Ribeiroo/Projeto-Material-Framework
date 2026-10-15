import { EnrollmentSummarySkeleton } from './EnrollmentSummarySkeleton'
import { SubjectOptionSkeleton } from './SubjectOptionSkeleton'

/** Outline of the enrollment form while the open classes load. */
export function EnrollmentSkeleton() {
  return (
    <div role="status" aria-busy className="grid gap-6 xl:grid-cols-[1fr_21.25rem]">
      <span className="sr-only">Carregando as disciplinas disponíveis…</span>
      <section className="space-y-3">
        {Array.from({ length: 4 }, (_, index) => (
          <SubjectOptionSkeleton key={index} />
        ))}
      </section>
      <EnrollmentSummarySkeleton />
    </div>
  )
}
