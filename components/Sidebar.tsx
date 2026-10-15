'use client'

import { GraduationCap, LogOut, ShieldCheck, X } from 'lucide-react'
import Link from 'next/link'
import { IconButton } from '@/components/IconButton'
import { navItems } from '@/data/navigation'
import { student } from '@/data/student'
import { useActiveRoute } from '@/hooks/useActiveRoute'
import { useLogout } from '@/hooks/useLogout'

type SidebarProps = {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const isActive = useActiveRoute()
  const logout = useLogout()

  return (
    <>
      {open && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar menu"
          className="animate-fade-in fixed inset-0 z-40 bg-overlay lg:hidden"
        />
      )}
      <aside
        // When closed on small screens the drawer is also hidden from Tab and screen readers,
        // not just moved off-screen; visibility flips only after the slide finishes.
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-sidebar px-5 py-6 text-sidebar-foreground transition-[translate,visibility] duration-300 ease-out lg:visible lg:translate-x-0 ${open ? 'visible translate-x-0' : 'invisible -translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-2">
          <Link
            href="/"
            className="focus-ring cursor-pointer flex items-center gap-3 rounded-xl p-1 transition duration-200 hover:opacity-90"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-black/25">
              <GraduationCap className="h-6 w-6" />
            </span>
            <span className="text-left">
              <span className="block font-display text-lg font-semibold">EduConnect</span>
              <span className="block text-xs text-sidebar-muted-foreground">Portal acadêmico</span>
            </span>
          </Link>
          <IconButton label="Fechar menu" onClick={onClose} variant="inverted" className="lg:hidden">
            <X className="h-5 w-5" />
          </IconButton>
        </div>

        <div className="mt-9 px-2 text-[0.6875rem] font-bold uppercase tracking-[.18em] text-sidebar-muted-foreground">Menu principal</div>
        <nav className="mt-3 space-y-1.5">
          {navItems.map(({ href, label, icon: Icon, badge }) => {
            const active = isActive(href)

            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`focus-ring cursor-pointer group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition duration-200 ${active ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-black/30' : 'text-sidebar-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}`}
              >
                <Icon className={`h-5 w-5 ${active ? 'text-sidebar-primary-foreground' : 'text-sidebar-muted-foreground group-hover:text-sidebar-accent-foreground'}`} />
                {label}
                {badge && (
                  <span className="ml-auto rounded-full bg-warning px-2 py-0.5 text-[0.625rem] font-extrabold uppercase text-warning-foreground">{badge}</span>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto">
          <div className="mb-4 rounded-2xl border border-sidebar-border bg-sidebar-accent/40 p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-sidebar-primary font-bold text-sidebar-primary-foreground">{student.initials}</div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{student.name}</p>
                <p className="truncate text-xs text-sidebar-muted-foreground">{student.registration}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-sidebar-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-sidebar-success" /> Conta protegida
            </div>
          </div>
          <button
            type="button"
            onClick={logout}
            className="focus-ring cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-sidebar-muted-foreground transition duration-200 hover:bg-sidebar-destructive/15 hover:text-sidebar-destructive"
          >
            <LogOut className="h-5 w-5" /> Sair do sistema
          </button>
        </div>
      </aside>
    </>
  )
}
