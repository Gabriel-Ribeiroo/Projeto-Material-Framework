'use client'

import { BarChart3, CheckCircle2, ListFilter, SearchX, TrendingUp } from 'lucide-react'
import { ClearDataButton } from '@/components/ClearDataButton'
import { EmptyState } from '@/components/EmptyState'
import { PageHeading } from '@/components/PageHeading'
import { Select } from '@/components/Select'
import { useSemester } from '@/hooks/useSemester'
import { gradeFilterLabels, gradeFilterOptions, useGradeFilter } from '../hooks/useGradeFilter'
import { GradesSkeleton } from './GradesSkeleton'
import { GradesTable } from './GradesTable'
import { MiniMetric } from './MiniMetric'

export function GradesPanel() {
  const { semester } = useSemester()
  const { loading, cleared, clear, restore, filter, setFilter, filteredGrades } = useGradeFilter()

  return (
    <div>
      <PageHeading
        eyebrow={`Boletim • ${semester}`}
        title="Acompanhe seu desempenho"
        description="Consulte suas notas, situação acadêmica e professores de cada disciplina."
        action={
          <div className="flex flex-wrap items-center gap-3">
            <Select
              label="Filtrar por situação"
              value={filter}
              options={gradeFilterOptions}
              onChange={setFilter}
              icon={ListFilter}
              disabled={loading || cleared}
              className="w-full sm:w-52"
            />
            <ClearDataButton onClear={clear} disabled={loading || cleared} />
          </div>
        }
      />
      {loading ? (
        <GradesSkeleton />
      ) : cleared ? (
        <EmptyState
          illustration="empty"
          title="Seu boletim está vazio"
          description="As notas deste semestre foram limpas. Recarregue para consultar novamente seu desempenho."
          actionLabel="Recarregar boletim"
          onAction={restore}
        />
      ) : (
        <>
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <MiniMetric label="Média do semestre" value="8,7" icon={TrendingUp} />
            <MiniMetric label="Maior nota" value="9,4" icon={BarChart3} />
            <MiniMetric label="Disciplinas concluídas" value="4 / 6" icon={CheckCircle2} />
          </div>
          {filteredGrades.length > 0 ? (
            <GradesTable grades={filteredGrades} />
          ) : (
            <EmptyState
              icon={SearchX}
              title="Nenhuma disciplina nesta situação"
              description={`Não há disciplinas com a situação “${gradeFilterLabels[filter]}” neste semestre.`}
              actionLabel="Mostrar todas"
              onAction={() => setFilter('all')}
            />
          )}
        </>
      )}
    </div>
  )
}
