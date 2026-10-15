import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { QuickActionItem } from '@/data/dashboard'

export function QuickAction({ action: { title, description, icon: Icon, href, badge } }: { action: QuickActionItem }) {
  return (
    <Link
      href={href}
      className="focus-ring cursor-pointer group flex items-center gap-4 rounded-2xl border border-border p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent/60 hover:shadow-md"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-secondary-foreground transition duration-200 group-hover:bg-accent group-hover:text-accent-foreground">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2 text-sm font-bold">
          {title}
          {badge && <span className="rounded-full bg-success-soft px-2 py-0.5 text-[0.5625rem] font-extrabold uppercase text-success">{badge}</span>}
        </span>
        <span className="mt-1 block text-xs text-muted-foreground">{description}</span>
      </span>
      <ArrowRight className="h-4 w-4 text-muted-foreground/60 transition duration-200 group-hover:translate-x-1 group-hover:text-primary" />
    </Link>
  )
}
