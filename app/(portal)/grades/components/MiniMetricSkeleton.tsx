import { Skeleton } from '@/components/Skeleton'

/** Loading placeholder with the same silhouette as `MiniMetric`. */
export function MiniMetricSkeleton() {
  return (
    <div className="card flex items-center gap-4 p-5">
      <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />
      <div>
        <Skeleton className="h-3 w-32" />
        <Skeleton className="mt-2 h-6 w-14" />
      </div>
    </div>
  )
}
