import { SubjectCardSkeleton } from './SubjectCardSkeleton'

/** Outline of the subject grid while the semester schedule loads. */
export function SubjectsSkeleton() {
  return (
    <div role="status" aria-busy className="grid gap-4 lg:grid-cols-2">
      <span className="sr-only">Carregando suas disciplinas…</span>
      {Array.from({ length: 4 }, (_, index) => (
        <SubjectCardSkeleton key={index} />
      ))}
    </div>
  )
}
