import { CheckCircle2, Info, X, XCircle } from 'lucide-react'
import { IconButton } from '@/components/IconButton'
import { ToastState } from '@/hooks/useToastState'

const tones = {
  success: { icon: CheckCircle2, className: 'text-sidebar-success' },
  error: { icon: XCircle, className: 'text-sidebar-destructive' },
  info: { icon: Info, className: 'text-sidebar-muted-foreground' },
}

type ToastProps = {
  toast: ToastState
  onDismiss: () => void
  onAction: () => void
}

/**
 * Snackbar: brief feedback on an action that does not interrupt the student.
 * On phones it sits above the bottom navigation instead of covering it.
 */
export function Toast({ toast: { message, tone, action, leaving }, onDismiss, onAction }: ToastProps) {
  const { icon: Icon, className } = tones[tone]

  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      aria-live={tone === 'error' ? 'assertive' : 'polite'}
      className={`fixed inset-x-4 bottom-24 z-60 mx-auto flex max-w-md items-center gap-3 rounded-2xl bg-sidebar py-2 pl-4 pr-2 text-sm font-semibold text-sidebar-foreground shadow-2xl lg:bottom-6 ${leaving ? 'animate-float-out' : 'animate-float-in'}`}
    >
      <Icon className={`h-5 w-5 shrink-0 ${className}`} />
      <span className="min-w-0 flex-1 py-1.5">{message}</span>
      {action && (
        <button
          type="button"
          onClick={onAction}
          className="focus-ring cursor-pointer shrink-0 rounded-lg px-3 py-1.5 text-sm font-extrabold text-sidebar-success transition duration-200 hover:bg-sidebar-accent"
        >
          {action.label}
        </button>
      )}
      <IconButton label="Fechar aviso" onClick={onDismiss} variant="inverted">
        <X className="h-4 w-4" />
      </IconButton>
    </div>
  )
}
