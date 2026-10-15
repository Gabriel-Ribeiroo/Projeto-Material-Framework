import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react'
import { ReactNode } from 'react'

const tones = {
  error: { className: 'border-destructive/30 bg-destructive-soft text-destructive', icon: XCircle },
  warning: { className: 'border-warning/30 bg-warning-soft text-warning', icon: AlertTriangle },
  success: { className: 'border-success/30 bg-success-soft text-success', icon: CheckCircle2 },
  info: { className: 'border-primary/30 bg-accent text-accent-foreground', icon: Info },
}

type AlertProps = {
  tone: keyof typeof tones
  title: string
  children?: ReactNode
  /** Recovery action shown beside the message, e.g. a "try again" button. */
  action?: ReactNode
}

/**
 * Inline message tied to a section. Unlike a toast it stays on screen until the
 * situation is resolved, so it suits errors the student must act on.
 */
export function Alert({ tone, title, children, action }: AlertProps) {
  const { className, icon: Icon } = tones[tone]

  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={`animate-fade-up flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center ${className}`}
    >
      <div className="flex min-w-0 flex-1 gap-3">
        <Icon className="mt-0.5 h-5 w-5 shrink-0" />
        <div className="min-w-0">
          <p className="text-sm font-bold">{title}</p>
          {children && <p className="mt-0.5 text-sm text-foreground/80">{children}</p>}
        </div>
      </div>
      {action}
    </div>
  )
}
