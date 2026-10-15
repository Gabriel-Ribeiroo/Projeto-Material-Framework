'use client'

import { Bell } from 'lucide-react'
import { IconButton } from '@/components/IconButton'
import { NotificationPanel } from '@/components/NotificationPanel'
import { useDismissableMenu } from '@/hooks/useDismissableMenu'

export function NotificationsMenu() {
  const { open, containerRef, toggle, close } = useDismissableMenu<HTMLDivElement>()

  return (
    <div ref={containerRef} className="relative">
      <IconButton label="Notificações" onClick={toggle} expanded={open}>
        <Bell className="h-5 w-5" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-card" />
      </IconButton>
      {open && <NotificationPanel onMarkAsRead={close} />}
    </div>
  )
}
