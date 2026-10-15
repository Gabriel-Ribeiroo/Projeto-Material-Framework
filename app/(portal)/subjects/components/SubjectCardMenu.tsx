'use client'

import { CalendarX } from 'lucide-react'
import { IconButton } from '@/components/IconButton'
import { Popover } from '@/components/Popover'
import { PopoverItem } from '@/components/PopoverItem'
import { useDismissableMenu } from '@/hooks/useDismissableMenu'
import { MoreDots } from './MoreDots'

type SubjectCardMenuProps = {
  subjectName: string
  onDrop: () => void
}

export function SubjectCardMenu({ subjectName, onDrop }: SubjectCardMenuProps) {
  const { open, containerRef, toggle, close } = useDismissableMenu<HTMLDivElement>()

  return (
    <div ref={containerRef} className="relative shrink-0">
      <IconButton label={`Opções de ${subjectName}`} onClick={toggle} expanded={open}>
        <MoreDots />
      </IconButton>
      {open && (
        <Popover role="menu" label={`Opções de ${subjectName}`} className="w-52">
          <PopoverItem
            icon={CalendarX}
            tone="destructive"
            onClick={() => {
              close()
              onDrop()
            }}
          >
            Trancar disciplina
          </PopoverItem>
        </Popover>
      )}
    </div>
  )
}
