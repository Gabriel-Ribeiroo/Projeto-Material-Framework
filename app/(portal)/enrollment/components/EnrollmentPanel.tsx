'use client'

import { ClearDataButton } from '@/components/ClearDataButton'
import { EmptyState } from '@/components/EmptyState'
import { PageHeading } from '@/components/PageHeading'
import { useSemester } from '@/hooks/useSemester'
import { useEnrollment } from '../hooks/useEnrollment'
import { EnrollmentSkeleton } from './EnrollmentSkeleton'
import { EnrollmentSummary } from './EnrollmentSummary'
import { SubjectOption } from './SubjectOption'

export function EnrollmentPanel() {
  const { semester } = useSemester()
  const {
    loading,
    cleared,
    clear,
    restore,
    subjects,
    isSelected,
    toggle,
    selectedSubjects,
    totalCredits,
    submit,
    submitting,
  } = useEnrollment()

  return (
    <div>
      <PageHeading
        eyebrow={`Período ${semester}`}
        title="Monte sua grade"
        description="Selecione as disciplinas desejadas. Você poderá revisar tudo antes de confirmar."
        action={
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-success-soft px-3 py-2 text-xs font-bold text-success">
              <span className="h-2 w-2 rounded-full bg-success" /> Matrículas abertas
            </span>
            <ClearDataButton onClear={clear} disabled={loading || cleared || submitting} />
          </div>
        }
      />
      {loading ? (
        <EnrollmentSkeleton />
      ) : cleared ? (
        <EmptyState
          illustration="empty"
          title="Nenhuma disciplina disponível"
          description="A oferta deste período foi limpa. Recarregue para montar sua grade novamente."
          actionLabel="Recarregar oferta"
          onAction={restore}
        />
      ) : (
        <div className="grid gap-6 xl:grid-cols-[1fr_21.25rem]">
          <section className="space-y-3">
            {subjects.map((subject, index) => (
              <SubjectOption
                key={subject.code}
                subject={subject}
                selected={isSelected(subject.code)}
                onToggle={() => toggle(subject.code)}
                disabled={submitting}
                delay={index * 50}
              />
            ))}
          </section>
          <EnrollmentSummary
            selectedSubjects={selectedSubjects}
            totalCredits={totalCredits}
            onRemove={toggle}
            onSubmit={submit}
            submitting={submitting}
          />
        </div>
      )}
    </div>
  )
}
