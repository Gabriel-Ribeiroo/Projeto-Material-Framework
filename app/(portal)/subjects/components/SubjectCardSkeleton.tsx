import { Skeleton } from '@/components/Skeleton'

/** Loading placeholder with the same silhouette as `SubjectCard`. */
export function SubjectCardSkeleton() {
  return (
    <article className="card p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3">
          <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />
          <div>
            <Skeleton className="h-4 w-44 max-w-full" />
            <Skeleton className="mt-2 h-3 w-32" />
          </div>
        </div>
        <Skeleton className="h-9 w-9 shrink-0 rounded-xl" />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-4 w-36 max-w-full" />
        ))}
      </div>

      <div className="mt-5">
        <div className="mb-2 flex justify-between">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-3 w-8" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
      </div>
    </article>
  )
}
