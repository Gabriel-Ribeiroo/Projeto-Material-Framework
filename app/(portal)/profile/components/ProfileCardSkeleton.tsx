import { Skeleton } from '@/components/Skeleton'

/** Loading placeholder with the same silhouette as `ProfileCard`. */
export function ProfileCardSkeleton() {
  return (
    <section className="card h-fit p-6">
      <Skeleton className="mx-auto h-24 w-24 rounded-full" />
      <Skeleton className="mx-auto mt-4 h-4 w-32" />
      <Skeleton className="mx-auto mt-2 h-3 w-24" />
      <Skeleton className="mt-5 h-16 w-full rounded-xl" />
      <Skeleton className="mt-4 h-11 w-full rounded-xl" />
    </section>
  )
}
