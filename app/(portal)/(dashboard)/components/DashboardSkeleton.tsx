import { Skeleton } from '@/components/Skeleton'
import { EventItemSkeleton } from './EventItemSkeleton'
import { GradeRowSkeleton } from './GradeRowSkeleton'
import { QuickActionSkeleton } from './QuickActionSkeleton'
import { StatCardSkeleton } from './StatCardSkeleton'

/** Outline of the dashboard sections while the semester data loads. */
export function DashboardSkeleton() {
  return (
    <div role="status" aria-busy className="space-y-6">
      <span className="sr-only">Carregando o resumo do semestre…</span>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <StatCardSkeleton key={index} />
        ))}
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_.8fr]">
        <section className="card overflow-hidden">
          <div className="border-b border-border p-5 sm:p-6">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-2 h-3.5 w-48" />
          </div>
          <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
            {Array.from({ length: 4 }, (_, index) => (
              <QuickActionSkeleton key={index} />
            ))}
          </div>
        </section>

        <section className="card">
          <div className="flex items-center justify-between p-5 sm:p-6">
            <div>
              <Skeleton className="h-4 w-36" />
              <Skeleton className="mt-2 h-3.5 w-40" />
            </div>
            <Skeleton className="h-5 w-5 rounded-lg" />
          </div>
          <div className="space-y-1 px-5 pb-5 sm:px-6 sm:pb-6">
            {Array.from({ length: 3 }, (_, index) => (
              <EventItemSkeleton key={index} />
            ))}
          </div>
        </section>
      </div>

      <section className="card">
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <Skeleton className="h-4 w-40" />
            <Skeleton className="mt-2 h-3.5 w-44" />
          </div>
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="divide-y divide-border">
          {Array.from({ length: 4 }, (_, index) => (
            <GradeRowSkeleton key={index} />
          ))}
        </div>
      </section>
    </div>
  )
}
