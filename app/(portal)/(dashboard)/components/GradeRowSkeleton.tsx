import { Skeleton } from '@/components/Skeleton'

/** Loading placeholder with the same silhouette as `GradeRow`. */
export function GradeRowSkeleton() {
  return (
    <div className="flex items-center gap-3 px-5 py-4 sm:px-6">
      <Skeleton className="hidden h-9 w-9 shrink-0 rounded-xl sm:block" />
      <div className="min-w-0 flex-1">
        <Skeleton className="h-3.5 w-48 max-w-full" />
        <Skeleton className="mt-2 h-3 w-32" />
      </div>
      <Skeleton className="hidden h-6 w-20 rounded-full sm:block" />
      <Skeleton className="h-5 w-9" />
    </div>
  )
}
