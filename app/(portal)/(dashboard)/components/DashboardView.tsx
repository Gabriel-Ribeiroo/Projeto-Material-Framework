'use client'

import { ClearDataButton } from '@/components/ClearDataButton'
import { EmptyState } from '@/components/EmptyState'
import { useDashboardData } from '../hooks/useDashboardData'
import { DashboardSkeleton } from './DashboardSkeleton'
import { GradesSummary } from './GradesSummary'
import { HelpCallout } from './HelpCallout'
import { QuickActions } from './QuickActions'
import { StatsGrid } from './StatsGrid'
import { UpcomingEvents } from './UpcomingEvents'
import { WelcomeBanner } from './WelcomeBanner'

/**
 * Composes the dashboard and swaps the data sections for a skeleton while the
 * simulated request is in flight, or for an empty state once they are cleared.
 * The banner and the help callout are static copy, so they stay on screen.
 */
export function DashboardView() {
  const { loading, data, cleared, clear, restore } = useDashboardData()

  return (
    <div className="space-y-6">
      <WelcomeBanner />

      <div className="flex justify-end">
        <ClearDataButton onClear={clear} disabled={loading || cleared} />
      </div>

      {loading ? (
        <DashboardSkeleton />
      ) : cleared ? (
        <EmptyState
          illustration="empty"
          title="Nenhum dado para exibir"
          description="O resumo do semestre foi limpo. Recarregue para trazer de volta suas métricas, atalhos e próximos prazos."
          actionLabel="Recarregar dados"
          onAction={restore}
        />
      ) : (
        <>
          <StatsGrid stats={data.stats} />

          <div className="grid gap-6 xl:grid-cols-[1.4fr_.8fr]">
            <QuickActions actions={data.quickActions} />
            <UpcomingEvents events={data.upcomingEvents} />
          </div>

          <GradesSummary grades={data.latestGrades} />
        </>
      )}

      <HelpCallout />
    </div>
  )
}
