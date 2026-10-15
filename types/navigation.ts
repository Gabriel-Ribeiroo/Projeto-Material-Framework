import { Route } from 'next'
import { ComponentType } from 'react'

export type NavItem = {
  /** Page route, also used to highlight the active item. */
  href: Route
  /** Short label shown in the navigation. */
  label: string
  /** Full page title shown in the header and the browser tab. */
  title: string
  icon: ComponentType<{ className?: string }>
  badge?: string
}
