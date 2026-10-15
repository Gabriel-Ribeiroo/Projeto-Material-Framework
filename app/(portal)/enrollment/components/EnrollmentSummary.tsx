import { ArrowRight, ClipboardCheck, Trash2 } from 'lucide-react'
import { Button } from '@/components/Button'
import { enrolledSubjectsCount } from '@/data/subjects'
import { AvailableSubject } from '@/types/academic'

type EnrollmentSummaryProps = {
  selectedSubjects: AvailableSubject[]
  totalCredits: number
  onRemove: (code: string) => void
  onSubmit: () => void
  submitting: boolean
}

export function EnrollmentSummary({
  selectedSubjects,
  totalCredits,
  onRemove,
  onSubmit,
  submitting,
}: EnrollmentSummaryProps) {
  return (
    <aside className="card h-fit p-5 xl:sticky xl:top-24">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground">
          <ClipboardCheck className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-extrabold">Resumo</h3>
          <p className="text-xs text-muted-foreground">Sua seleção atual</p>
        </div>
      </div>

      <div className="my-5 space-y-3 border-y border-border py-5 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Disciplinas atuais</span>
          <b>{enrolledSubjectsCount}</b>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Novas disciplinas</span>
          <b>{selectedSubjects.length}</b>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total de créditos</span>
          <b>{totalCredits}</b>
        </div>
      </div>

      {selectedSubjects.length > 0 && (
        <div className="mb-4 space-y-2">
          {selectedSubjects.map(subject => (
            <div key={subject.code} className="animate-fade-up flex items-center justify-between rounded-lg bg-secondary px-3 py-2 text-xs">
              <span className="truncate font-semibold">{subject.name}</span>
              <button
                type="button"
                onClick={() => onRemove(subject.code)}
                disabled={submitting}
                aria-label={`Remover ${subject.name}`}
                className="focus-ring cursor-pointer ml-2 rounded-lg p-1 text-muted-foreground transition duration-200 enabled:hover:bg-destructive-soft enabled:hover:text-destructive disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <Button
        onClick={onSubmit}
        icon={ArrowRight}
        loading={submitting}
        loadingLabel="Enviando…"
        disabled={!selectedSubjects.length}
        fullWidth
        className="py-3"
      >
        Enviar pré-matrícula
      </Button>
      <p aria-live="polite" className="mt-3 text-center text-[0.6875rem] leading-5 text-muted-foreground">
        {selectedSubjects.length
          ? 'A confirmação final será exibida na próxima etapa.'
          : 'Selecione ao menos uma disciplina para continuar.'}
      </p>
    </aside>
  )
}
