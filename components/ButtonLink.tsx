import { Route } from 'next'
import Link from 'next/link'
import { ComponentType } from 'react'

/** Same looks as `Button`, for navigation. Links have no disabled state, so hovers are unconditional. */
const variants = {
  primary:
    'bg-primary font-extrabold text-primary-foreground shadow-lg shadow-primary/20 hover:-translate-y-0.5 hover:bg-primary-hover',
  outlined: 'border border-border bg-card font-bold text-foreground hover:bg-secondary',
}

type ButtonLinkProps = {
  href: Route
  children: string
  variant?: keyof typeof variants
  icon?: ComponentType<{ className?: string }>
}

export function ButtonLink({ href, children, variant = 'primary', icon: Icon }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`focus-ring cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm transition duration-200 ${variants[variant]}`}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      {children}
    </Link>
  )
}
