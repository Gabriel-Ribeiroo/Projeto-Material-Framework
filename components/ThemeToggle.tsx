'use client'

import { IconButton } from '@/components/IconButton'
import { Popover } from '@/components/Popover'
import { PopoverItem } from '@/components/PopoverItem'
import { useThemeToggle } from '@/hooks/useThemeToggle'

export function ThemeToggle() {
  const { open, containerRef, toggle, select, options, current, currentLabel, TriggerIcon } = useThemeToggle()

  return (
    <div ref={containerRef} className="relative">
      <IconButton label={currentLabel ? `Tema: ${currentLabel}` : 'Alternar tema'} onClick={toggle} expanded={open}>
        <TriggerIcon className="h-5 w-5" />
      </IconButton>
      {open && (
        <Popover role="menu" label="Tema" className="w-44">
          {options.map(({ id, label, icon }) => (
            <PopoverItem
              key={id}
              role="menuitemradio"
              icon={icon}
              selected={current === id}
              onClick={() => select(id)}
            >
              {label}
            </PopoverItem>
          ))}
        </Popover>
      )}
    </div>
  )
}
