import { Skeleton } from '@/components/Skeleton'

/** Loading placeholder with the same silhouette as `EventItem`. */
export function EventItemSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3">
      <Skeleton className="h-10 w-14 shrink-0 rounded-xl" />
      <div className="min-w-0 flex-1">
        <Skeleton className="h-3.5 w-40" />
        <Skeleton className="mt-2 h-3 w-24" />
      </div>
    </div>
  )
}
