import { ComponentProps, ComponentType } from 'react'
import { Spinner } from '@/components/Spinner'

/**
 * `primary` is the one main action of a section, `outlined` a secondary one,
 * `text` a low-emphasis one and `destructive` an action that removes data.
 */
const variants = {
  primary:
    'bg-primary font-extrabold text-primary-foreground shadow-lg shadow-primary/20 enabled:hover:-translate-y-0.5 enabled:hover:bg-primary-hover',
  outlined: 'border border-border bg-card font-bold text-foreground enabled:hover:bg-secondary',
  text: 'font-bold text-muted-foreground enabled:hover:bg-secondary enabled:hover:text-foreground',
  destructive:
    'bg-destructive font-extrabold text-destructive-foreground shadow-lg shadow-destructive/20 enabled:hover:-translate-y-0.5 enabled:hover:bg-destructive/90',
}

type ButtonProps = Omit<ComponentProps<'button'>, 'children'> & {
  children: string
  variant?: keyof typeof variants
  icon?: ComponentType<{ className?: string }>
  /** Locks the button and swaps the icon for a spinner while an action runs. */
  loading?: boolean
  /** Label shown while `loading`, e.g. "Salvando…". Defaults to `children`. */
  loadingLabel?: string
  fullWidth?: boolean
}

export function Button({
  children,
  variant = 'primary',
  icon: Icon,
  loading = false,
  loadingLabel,
  fullWidth = false,
  disabled,
  type = 'button',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`focus-ring cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm transition duration-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {loading ? <Spinner /> : Icon && <Icon className="h-4 w-4 shrink-0" />}
      {loading ? (loadingLabel ?? children) : children}
    </button>
  )
}
