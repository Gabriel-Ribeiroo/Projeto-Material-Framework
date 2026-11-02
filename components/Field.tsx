import { AlertCircle } from 'lucide-react'
import { ComponentProps, ComponentType, ReactNode, useId } from 'react'

type FieldProps = {
  label: string
  icon: ComponentType<{ className?: string }>
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  /** Validation message; turns the field red and is read out with it. */
  error?: string
  required?: boolean
  disabled?: boolean
  type?: string
  autoComplete?: string
  inputMode?: ComponentProps<'input'>['inputMode']
  maxLength?: number
  placeholder?: string
  /** Control pinned to the right edge of the input, e.g. a show-password toggle. */
  trailing?: ReactNode
}

export function Field({
  label,
  icon: Icon,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  type = 'text',
  autoComplete,
  inputMode,
  maxLength,
  placeholder,
  trailing,
}: FieldProps) {
  const errorId = useId()

  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-foreground">
        {label}
        {required && (
          <span aria-hidden className="ml-0.5 text-destructive">
            *
          </span>
        )}
      </span>
      <span className="relative block">
        <Icon
          className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${error ? 'text-destructive' : 'text-muted-foreground'}`}
        />
        <input
          type={type}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={onBlur}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          inputMode={inputMode}
          maxLength={maxLength}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`focus-ring w-full rounded-xl border border-border bg-card py-3 pl-10 text-sm font-medium text-foreground transition duration-200 hover:border-input disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-destructive aria-invalid:focus-visible:outline-destructive ${trailing ? 'pr-12' : 'pr-3'}`}
        />
        {trailing && <span className="absolute right-1.5 top-1/2 -translate-y-1/2">{trailing}</span>}
      </span>
      {error && (
        <span id={errorId} className="animate-fade-in mt-1.5 flex items-start gap-1.5 text-xs font-medium text-destructive">
          <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" />
          {error}
        </span>
      )}
    </label>
  )
}
