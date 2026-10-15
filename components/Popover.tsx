import { ReactNode } from 'react'

type PopoverProps = {
  children: ReactNode
  /** Accessible name of the panel, e.g. "Semestre". */
  label?: string
  role?: 'menu' | 'listbox'
  /** Width utilities for the panel, e.g. "w-48". */
  className?: string
  /** Panels that lay out their own header and rows opt out of the list padding. */
  padded?: boolean
}

/**
 * Floating surface anchored to the trigger that precedes it. The caller owns
 * the open state (see `useDismissableMenu`) and must position it by wrapping
 * both trigger and panel in a `relative` container.
 */
export function Popover({ children, label, role, className = '', padded = true }: PopoverProps) {
  return (
    <div
      role={role}
      aria-label={label}
      className={`animate-float-in absolute right-0 z-20 mt-2 origin-top-right overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-xl ${padded ? 'p-1.5' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
