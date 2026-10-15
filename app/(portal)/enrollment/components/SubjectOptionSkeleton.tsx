import { Skeleton } from '@/components/Skeleton'

/** Loading placeholder with the same silhouette as `SubjectOption`. */
export function SubjectOptionSkeleton() {
  return (
    <div className="card flex items-center gap-4 p-4 sm:p-5">
      <Skeleton className="h-6 w-6 shrink-0 rounded-lg" />
      <div className="min-w-0 flex-1">
        <Skeleton className="h-4 w-48 max-w-full" />
        <Skeleton className="mt-2 h-3 w-64 max-w-full" />
      </div>
      <Skeleton className="hidden h-7 w-16 shrink-0 rounded-lg sm:block" />
    </div>
  )
}
