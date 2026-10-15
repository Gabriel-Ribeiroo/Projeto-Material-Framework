import { Skeleton } from '@/components/Skeleton'

/** Loading placeholder with the same silhouette as `EnrollmentSummary`. */
export function EnrollmentSummarySkeleton() {
  return (
    <aside className="card h-fit p-5 xl:sticky xl:top-24">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
        <div>
          <Skeleton className="h-4 w-20" />
          <Skeleton className="mt-2 h-3 w-28" />
        </div>
      </div>

      <div className="my-5 space-y-3 border-y border-border py-5">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="flex items-center justify-between">
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-3.5 w-6" />
          </div>
        ))}
      </div>

      <Skeleton className="h-12 w-full rounded-xl" />
      <Skeleton className="mx-auto mt-3 h-3 w-56 max-w-full" />
    </aside>
  )
}
