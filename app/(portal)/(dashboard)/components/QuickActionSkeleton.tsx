import { Skeleton } from '@/components/Skeleton'

/** Loading placeholder with the same silhouette as `QuickAction`. */
export function QuickActionSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border p-4">
      <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />
      <div className="min-w-0 flex-1">
        <Skeleton className="h-3.5 w-32" />
        <Skeleton className="mt-2 h-3 w-24" />
      </div>
      <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
    </div>
  )
}
