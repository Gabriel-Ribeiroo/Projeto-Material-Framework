import { Menu } from 'lucide-react'
import { IconButton } from '@/components/IconButton'
import { NotificationsMenu } from '@/components/NotificationsMenu'
import { ProfileMenu } from '@/components/ProfileMenu'
import { SemesterSelect } from '@/components/SemesterSelect'
import { ThemeToggle } from '@/components/ThemeToggle'

type HeaderProps = {
  title: string
  onMenu: () => void
}

export function Header({ title, onMenu }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <IconButton label="Abrir menu" onClick={onMenu} className="shrink-0 text-muted-foreground lg:hidden">
            <Menu className="h-5 w-5" />
          </IconButton>
          <div className="min-w-0">
            <p className="hidden text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:block">Área do aluno</p>
            <h1 className="truncate font-display text-lg font-semibold text-foreground sm:text-xl">{title}</h1>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <SemesterSelect />
          <ThemeToggle />
          <NotificationsMenu />
          <ProfileMenu />
        </div>
      </div>
    </header>
  )
}
