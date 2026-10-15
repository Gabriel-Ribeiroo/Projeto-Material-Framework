import { Skeleton } from '@/components/Skeleton'

/** Loading placeholder with the same silhouette as `GradesTableRow`. */
export function GradesTableRowSkeleton() {
  return (
    <div className="grid gap-3 px-5 py-5 md:grid-cols-[1fr_8.75rem_9.375rem_6.25rem] md:items-center md:gap-4 md:px-6">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
        <div>
          <Skeleton className="h-4 w-44 max-w-full" />
          <Skeleton className="mt-2 h-3 w-16" />
        </div>
      </div>
      <Skeleton className="h-6 w-24 rounded-full" />
      <Skeleton className="h-3.5 w-28" />
      <Skeleton className="h-7 w-12 md:ml-auto" />
    </div>
  )
}
