import { Check } from 'lucide-react'
import { AvailableSubject } from '@/types/academic'

type SubjectOptionProps = {
  subject: AvailableSubject
  selected: boolean
  onToggle: () => void
  disabled?: boolean
  delay?: number
}

export function SubjectOption({ subject, selected, onToggle, disabled = false, delay = 0 }: SubjectOptionProps) {
  return (
    <label
      style={{ animationDelay: `${delay}ms` }}
      className={`card animate-fade-up flex items-center gap-4 p-4 transition duration-200 sm:p-5 ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md'} ${selected ? 'border-primary ring-2 ring-primary/20' : ''}`}
    >
      <input type="checkbox" checked={selected} onChange={onToggle} disabled={disabled} className="peer sr-only" />
      <span
        className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg border-2 transition duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-card ${selected ? 'border-primary bg-primary text-primary-foreground' : 'border-input'}`}
      >
        {selected && <Check className="h-4 w-4" />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-bold">{subject.name}</span>
        <span className="mt-1 block text-xs text-muted-foreground">{subject.code} • {subject.professor} • {subject.schedule}</span>
        {/* On phones the vacancy chip moves under the details instead of disappearing. */}
        <span className="mt-2 inline-block rounded-lg bg-secondary px-2.5 py-1 text-[0.625rem] font-bold text-secondary-foreground sm:hidden">
          {subject.vacancies} vagas • {subject.credits} créditos
        </span>
      </span>
      <span className="hidden shrink-0 rounded-lg bg-secondary px-2.5 py-1.5 text-[0.625rem] font-bold text-secondary-foreground sm:block">
        {subject.vacancies} vagas
      </span>
    </label>
  )
}
