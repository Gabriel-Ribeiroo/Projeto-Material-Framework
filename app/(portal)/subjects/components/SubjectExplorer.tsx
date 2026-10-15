'use client'

import { BookOpen, CalendarX, Eraser, Search, SearchX } from 'lucide-react'
import { ClearDataButton } from '@/components/ClearDataButton'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { EmptyState } from '@/components/EmptyState'
import { PageHeading } from '@/components/PageHeading'
import { useSubjectDrop } from '../hooks/useSubjectDrop'
import { useSubjectSearch } from '../hooks/useSubjectSearch'
import { SubjectCard } from './SubjectCard'
import { SubjectsSkeleton } from './SubjectsSkeleton'

export function SubjectExplorer() {
  const { loading, cleared, clear, restore, search, setSearch, results, hasSubjects, drop } = useSubjectSearch()
  const dropFlow = useSubjectDrop(drop)
  const empty = cleared || !hasSubjects

  return (
    <div>
      <PageHeading
        eyebrow="Grade curricular"
        title="Minhas disciplinas"
        description="Veja seus horários, professores, créditos e andamento das disciplinas."
        action={
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={search}
                disabled={loading || empty}
                onChange={event => setSearch(event.target.value)}
                placeholder="Buscar disciplina..."
                aria-label="Buscar disciplina"
                className="focus-ring w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground shadow-sm transition duration-200 placeholder:text-muted-foreground hover:border-input disabled:cursor-not-allowed disabled:opacity-50 sm:w-64"
              />
            </div>
            <ClearDataButton onClear={clear} disabled={loading || empty} />
          </div>
        }
      />
      {loading ? (
        <SubjectsSkeleton />
      ) : empty ? (
        <EmptyState
          icon={BookOpen}
          title="Nenhuma disciplina na sua grade"
          description="Você não possui disciplinas neste semestre. Recarregue para ver novamente horários, professores e progresso."
          actionLabel="Recarregar disciplinas"
          onAction={restore}
        />
      ) : results.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {results.map((subject, index) => (
            <SubjectCard
              key={subject.code}
              subject={subject}
              onDrop={() => dropFlow.request(subject)}
              delay={index * 60}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={SearchX}
          title="Nenhuma disciplina encontrada"
          description={`Nada corresponde a “${search}”. Tente outro nome, código ou professor.`}
          actionLabel="Limpar busca"
          actionIcon={Eraser}
          onAction={() => setSearch('')}
        />
      )}

      <ConfirmDialog
        open={dropFlow.open}
        title={`Trancar ${dropFlow.target?.name ?? 'disciplina'}?`}
        confirmLabel="Trancar disciplina"
        loadingLabel="Trancando…"
        icon={CalendarX}
        loading={dropFlow.dropping}
        onConfirm={dropFlow.confirm}
        onClose={dropFlow.cancel}
      >
        Você deixará de frequentar a disciplina neste semestre e perderá a vaga na turma. Esta operação não poderá
        ser desfeita.
      </ConfirmDialog>
    </div>
  )
}
