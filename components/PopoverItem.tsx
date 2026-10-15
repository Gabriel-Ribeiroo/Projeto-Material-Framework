import { Check } from 'lucide-react'
import { Route } from 'next'
import Link from 'next/link'
import { ComponentType, ReactNode } from 'react'

const tones = {
  default: 'hover:bg-secondary',
  destructive: 'text-destructive hover:bg-destructive-soft',
}

type PopoverItemProps = {
  children: ReactNode
  icon?: ComponentType<{ className?: string }>
  /** Renders a link instead of a button. */
  href?: Route
  onClick?: () => void
  /** Marks the current choice: tints the row and appends a check. */
  selected?: boolean
  tone?: keyof typeof tones
  role?: 'menuitem' | 'menuitemradio' | 'option'
}

/** A single row inside a `Popover`. */
export function PopoverItem({
  children,
  icon: Icon,
  href,
  onClick,
  selected = false,
  tone = 'default',
  role = 'menuitem',
}: PopoverItemProps) {
  const className = `focus-ring cursor-pointer flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition duration-200 ${tones[tone]} ${selected ? 'text-primary' : ''}`

  const content = (
    <>
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      {children}
      {selected && <Check className="ml-auto h-4 w-4 shrink-0" />}
    </>
  )

  if (href) {
    return (
      <Link href={href} role={role} onClick={onClick} className={className}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type="button"
      role={role}
      onClick={onClick}
      aria-selected={role === 'option' ? selected : undefined}
      aria-checked={role === 'menuitemradio' ? selected : undefined}
      className={className}
    >
      {content}
    </button>
  )
}
