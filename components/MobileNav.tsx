'use client'

import Link from 'next/link'
import { navItems } from '@/data/navigation'
import { useActiveRoute } from '@/hooks/useActiveRoute'

export function MobileNav() {
  const isActive = useActiveRoute()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-around">
        {navItems.slice(0, 4).map(({ href, label, icon: Icon }) => {
          const active = isActive(href)

          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={`focus-ring cursor-pointer flex min-w-16 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[0.625rem] font-bold transition duration-200 ${active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
