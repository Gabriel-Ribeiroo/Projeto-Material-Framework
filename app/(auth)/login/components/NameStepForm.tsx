import { ArrowLeft, ArrowRight, User } from 'lucide-react'
import { FormEvent } from 'react'
import { Button } from '@/components/Button'
import { Field } from '@/components/Field'

type NameStepFormProps = {
  name: string
  error?: string
  submitting: boolean
  onNameChange: (value: string) => void
  onBlur: () => void
  onBack: () => void
  onSubmit: (event: FormEvent) => void
}

/** First access with an e-mail: asks how the portal should greet the student. */
export function NameStepForm({ name, error, submitting, onNameChange, onBlur, onBack, onSubmit }: NameStepFormProps) {
  return (
    <form onSubmit={onSubmit} noValidate className="animate-fade-up space-y-5">
      <Field
        label="Nome completo"
        icon={User}
        autoComplete="name"
        placeholder="Como você quer ser chamado"
        value={name}
        onChange={onNameChange}
        onBlur={onBlur}
        error={error}
        disabled={submitting}
        maxLength={60}
        required
      />
      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        <Button variant="text" icon={ArrowLeft} onClick={onBack} disabled={submitting}>
          Voltar
        </Button>
        <Button type="submit" icon={ArrowRight} loading={submitting} loadingLabel="Entrando…" className="py-3 sm:flex-1">
          Continuar
        </Button>
      </div>
    </form>
  )
}
