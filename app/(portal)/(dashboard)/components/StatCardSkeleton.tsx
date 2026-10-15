import { Skeleton } from '@/components/Skeleton'

/** Loading placeholder with the same silhouette as `StatCard`. */
export function StatCardSkeleton() {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <Skeleton className="h-3 w-10" />
      </div>
      <Skeleton className="mt-5 h-3.5 w-24" />
      <Skeleton className="mt-2 h-8 w-16" />
      <Skeleton className="mt-2 h-3 w-32" />
    </div>
  )
}
