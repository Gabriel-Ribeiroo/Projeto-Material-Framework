import { Skeleton } from '@/components/Skeleton'

/** Loading placeholder with the same silhouette as `PersonalDataCard`. */
export function PersonalDataCardSkeleton() {
  return (
    <section className="card p-5 sm:p-7">
      <div className="flex items-center gap-3 border-b border-border pb-5">
        <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
        <div>
          <Skeleton className="h-4 w-32" />
          <Skeleton className="mt-2 h-3 w-48 max-w-full" />
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index}>
            <Skeleton className="h-3 w-24" />
            <Skeleton className="mt-2 h-12 w-full rounded-xl" />
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col justify-end gap-3 border-t border-border pt-5 sm:flex-row">
        <Skeleton className="h-11 w-full rounded-xl sm:w-28" />
        <Skeleton className="h-11 w-full rounded-xl sm:w-40" />
      </div>
    </section>
  )
}
