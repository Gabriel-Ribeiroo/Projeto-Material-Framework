'use client'

import { ChevronDown, LogOut, User } from 'lucide-react'
import { Popover } from '@/components/Popover'
import { PopoverItem } from '@/components/PopoverItem'
import { student } from '@/data/student'
import { useDismissableMenu } from '@/hooks/useDismissableMenu'
import { useLogout } from '@/hooks/useLogout'

export function ProfileMenu() {
  const { open, containerRef, toggle, close } = useDismissableMenu<HTMLDivElement>()
  const logout = useLogout()

  return (
    <div ref={containerRef} className="relative ml-1">
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        className="focus-ring cursor-pointer flex items-center gap-2 rounded-xl p-1.5 transition duration-200 hover:bg-secondary"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-linear-to-br from-brand to-brand-deep text-xs font-extrabold text-brand-foreground">
          {student.initials}
        </span>
        <span className="hidden text-left sm:block">
          <span className="block text-xs font-bold">{student.name}</span>
          <span className="block text-[0.6875rem] text-muted-foreground">{student.role}</span>
        </span>
        <ChevronDown className={`hidden h-4 w-4 text-muted-foreground transition-transform duration-200 sm:block ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <Popover role="menu" label="Conta" className="w-48">
          <PopoverItem href="/profile" icon={User} onClick={close}>
            Meu perfil
          </PopoverItem>
          <PopoverItem
            icon={LogOut}
            tone="destructive"
            onClick={() => {
              close()
              logout()
            }}
          >
            Sair
          </PopoverItem>
        </Popover>
      )}
    </div>
  )
}
