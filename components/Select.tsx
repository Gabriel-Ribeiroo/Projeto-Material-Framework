'use client'

import { ChevronDown } from 'lucide-react'
import { ComponentType } from 'react'
import { Popover } from '@/components/Popover'
import { PopoverItem } from '@/components/PopoverItem'
import { useSelect } from '@/hooks/useSelect'

export type SelectOption<T extends string> = {
  value: T
  label: string
  icon?: ComponentType<{ className?: string }>
}

/** `surface` sits on the page background, `subtle` on card-coloured chrome. */
const variants = {
  surface: 'bg-card text-foreground shadow-sm',
  subtle: 'bg-secondary text-secondary-foreground',
}

type SelectProps<T extends string> = {
  /** Accessible name of the control, e.g. "Filtrar por situação". */
  label: string
  value: T
  options: SelectOption<T>[]
  onChange: (value: T) => void
  /** Leading icon of the trigger. Falls back to the selected option's icon. */
  icon?: ComponentType<{ className?: string }>
  disabled?: boolean
  variant?: keyof typeof variants
  className?: string
}

/**
 * Single-choice picker. Replaces the native `<select>`, whose dropdown cannot
 * be styled, with a floating listbox that follows the design system.
 */
export function Select<T extends string>({
  label,
  value,
  options,
  onChange,
  icon,
  disabled = false,
  variant = 'surface',
  className = '',
}: SelectProps<T>) {
  const { open, containerRef, toggle, select } = useSelect(onChange)

  const selected = options.find(option => option.value === value)
  const TriggerIcon = icon ?? selected?.icon

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={toggle}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label}: ${selected?.label ?? ''}`}
        className={`focus-ring cursor-pointer flex w-full items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold transition duration-200 hover:border-input disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-border ${variants[variant]}`}
      >
        {TriggerIcon && <TriggerIcon className="h-4 w-4 shrink-0 text-primary" />}
        <span className="truncate">{selected?.label}</span>
        <ChevronDown
          className={`ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? '-rotate-180' : ''}`}
        />
      </button>

      {open && (
        <Popover role="listbox" label={label} className="w-full min-w-44">
          {options.map(option => (
            <PopoverItem
              key={option.value}
              role="option"
              icon={option.icon}
              selected={option.value === value}
              onClick={() => select(option.value)}
            >
              {option.label}
            </PopoverItem>
          ))}
        </Popover>
      )}
    </div>
  )
}
