import { Popover } from '@/components/Popover'
import { notifications } from '@/data/notifications'

const tones = {
  warning: 'bg-warning-soft text-warning',
  success: 'bg-success-soft text-success',
}

export function NotificationPanel({ onMarkAsRead }: { onMarkAsRead: () => void }) {
  return (
    <Popover label="Notificações" className="w-80" padded={false}>
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="font-bold">Notificações</span>
        <button
          type="button"
          onClick={onMarkAsRead}
          className="focus-ring cursor-pointer rounded-lg px-2 py-1 text-xs font-semibold text-primary transition duration-200 hover:bg-accent"
        >
          Marcar lidas
        </button>
      </div>
      <div className="divide-y divide-border">
        {notifications.map(({ id, title, description, icon: Icon, tone }) => (
          <div key={id} className="flex gap-3 p-4">
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${tones[tone]}`}>
              <Icon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold">{title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </Popover>
  )
}
