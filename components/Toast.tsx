import { CSSProperties, FocusEvent, MouseEvent } from 'react'
import { CheckCircle2, Info, X, XCircle } from 'lucide-react'
import { IconButton } from '@/components/IconButton'
import { ToastState } from '@/hooks/useToastState'

const tones = {
  success: { icon: CheckCircle2, className: 'text-sidebar-success', bar: 'bg-sidebar-success' },
  error: { icon: XCircle, className: 'text-sidebar-destructive', bar: 'bg-sidebar-destructive' },
  info: { icon: Info, className: 'text-sidebar-muted-foreground', bar: 'bg-sidebar-muted-foreground' },
}

type ToastProps = {
  toast: ToastState
  onDismiss: () => void
  onAction: () => void
  onPause: () => void
  onResume: () => void
}

/**
 * Snackbar: brief feedback on an action that does not interrupt the student.
 * On phones it sits above the bottom navigation instead of covering it.
 * A bar along the bottom shows the time left; hovering or focusing the notice stops it.
 */
export function Toast({
  toast: { message, tone, action, duration, paused, leaving },
  onDismiss,
  onAction,
  onPause,
  onResume,
}: ToastProps) {
  const { icon: Icon, className, bar } = tones[tone]

  // Resume only once neither the pointer nor the keyboard focus is on the notice.
  const handleMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(document.activeElement)) onResume()
  }
  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    const target = event.currentTarget
    if (!target.contains(event.relatedTarget) && !target.matches(':hover')) onResume()
  }

  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      aria-live={tone === 'error' ? 'assertive' : 'polite'}
      onMouseEnter={onPause}
      onMouseLeave={handleMouseLeave}
      onFocus={onPause}
      onBlur={handleBlur}
      className={`fixed inset-x-4 bottom-24 z-60 mx-auto flex max-w-md items-center gap-3 overflow-hidden rounded-2xl bg-sidebar py-2 pl-4 pr-2 text-sm font-semibold text-sidebar-foreground shadow-2xl lg:bottom-6 ${leaving ? 'animate-float-out' : 'animate-float-in'}`}
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
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-sidebar-accent">
        <span
          className={`toast-countdown block h-full origin-left ${bar} ${paused ? 'opacity-60' : ''}`}
          style={{ '--toast-duration': `${duration}ms`, animationPlayState: paused ? 'paused' : 'running' } as CSSProperties}
        />
      </span>
    </div>
  )
}
