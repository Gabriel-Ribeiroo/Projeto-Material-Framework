import { ReactNode } from 'react'

type IconButtonProps = {
  children: ReactNode
  label: string
  onClick?: () => void
  variant?: 'default' | 'inverted'
  /** Set on triggers of a floating menu so assistive tech announces its state. */
  expanded?: boolean
  className?: string
}

const variants = {
  default: 'text-muted-foreground hover:bg-secondary hover:text-foreground',
  inverted: 'text-sidebar-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground',
}

export function IconButton({ children, label, onClick, variant = 'default', expanded, className = '' }: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-haspopup={expanded === undefined ? undefined : 'menu'}
      aria-expanded={expanded}
      className={`focus-ring cursor-pointer relative rounded-xl p-2 transition duration-200 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
