import { Mail, MapPin, Phone, RotateCcw, Save, User } from 'lucide-react'
import { Alert } from '@/components/Alert'
import { Button } from '@/components/Button'
import { EditableField, ProfileFormErrors, ProfileFormValues } from '../hooks/useProfileForm'
import { Field } from './Field'

type PersonalDataCardProps = {
  form: ProfileFormValues
  errors: ProfileFormErrors
  dirty: boolean
  saving: boolean
  saveError: boolean
  onChange: (key: EditableField) => (value: string) => void
  onBlur: (key: EditableField) => () => void
  onDiscard: () => void
  onRetry: () => void
}

export function PersonalDataCard({
  form,
  errors,
  dirty,
  saving,
  saveError,
  onChange,
  onBlur,
  onDiscard,
  onRetry,
}: PersonalDataCardProps) {
  const field = (key: EditableField) => ({
    value: form[key],
    onChange: onChange(key),
    onBlur: onBlur(key),
    error: errors[key],
    disabled: saving,
    required: true,
  })

  return (
    <section className="card p-5 sm:p-7">
      <div className="flex items-center gap-3 border-b border-border pb-5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
          <User className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-extrabold">Dados pessoais</h3>
          <p className="text-xs text-muted-foreground">
            Informações básicas da sua conta. Campos com <span className="text-destructive">*</span> são obrigatórios.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Nome completo" icon={User} autoComplete="name" {...field('name')} />
        <Field label="E-mail" icon={Mail} type="email" autoComplete="email" {...field('email')} />
        <Field
          label="Telefone"
          icon={Phone}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={15}
          placeholder="(11) 99999-8888"
          {...field('phone')}
        />
        <Field label="Cidade" icon={MapPin} autoComplete="address-level2" {...field('city')} />
      </div>

      {saveError && (
        <div className="mt-6">
          <Alert
            tone="error"
            title="Não foi possível salvar."
            action={
              <Button variant="outlined" icon={RotateCcw} onClick={onRetry} className="shrink-0">
                Tentar novamente
              </Button>
            }
          >
            Verifique sua conexão com a internet. Suas alterações continuam aqui e não foram perdidas.
          </Alert>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center">
        <p aria-live="polite" className="text-xs text-muted-foreground sm:mr-auto">
          {saving ? 'Salvando suas alterações…' : dirty ? 'Você tem alterações não salvas.' : 'Nenhuma alteração pendente.'}
        </p>
        <Button variant="text" onClick={onDiscard} disabled={!dirty || saving}>
          Descartar alterações
        </Button>
        <Button type="submit" icon={Save} loading={saving} loadingLabel="Salvando…" disabled={!dirty}>
          Salvar alterações
        </Button>
      </div>
    </section>
  )
}
