import { ComponentProps, ReactNode } from 'react'
import { Illustration } from '@/components/Illustration'

type StatusScreenProps = {
  illustration: ComponentProps<typeof Illustration>['name']
  /** Small label above the title, e.g. "Erro 404". */
  eyebrow: string
  title: string
  description: ReactNode
  /** Buttons or links that take the student somewhere useful. */
  children: ReactNode
}

/** Illustrated message for pages that could not be shown (not found, unexpected error). */
export function StatusScreen({ illustration, eyebrow, title, description, children }: StatusScreenProps) {
  return (
    <div className="animate-fade-up w-full max-w-md text-center">
      <Illustration name={illustration} className="mx-auto w-full max-w-72 sm:max-w-80" />
      <p className="mt-8 text-xs font-bold uppercase tracking-[.16em] text-primary">{eyebrow}</p>
      <h1 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">{title}</h1>
      <div className="mt-3 text-sm leading-6 text-muted-foreground">{description}</div>
      <div className="mt-8 flex flex-col-reverse justify-center gap-3 sm:flex-row">{children}</div>
    </div>
  )
}
