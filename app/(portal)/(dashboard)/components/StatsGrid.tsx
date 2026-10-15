'use client'

import { Stat } from '@/data/dashboard'
import { useSemester } from '@/hooks/useSemester'
import { StatCard } from './StatCard'

export function StatsGrid({ stats }: { stats: Stat[] }) {
  const { semester } = useSemester()

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(stat => (
        <StatCard key={stat.id} stat={stat} semester={semester} />
      ))}
    </section>
  )
}
