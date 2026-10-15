'use client'

import { ReactNode } from 'react'
import { Header } from '@/components/Header'
import { MobileNav } from '@/components/MobileNav'
import { Sidebar } from '@/components/Sidebar'
import { usePortalShell } from '../hooks/usePortalShell'

/** Chrome shared by every page: sidebar, header and mobile navigation. */
export function PortalShell({ children }: { children: ReactNode }) {
  const { title, sidebarOpen, openSidebar, closeSidebar } = usePortalShell()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />
      <div className="lg:pl-72">
        <Header title={title} onMenu={openSidebar} />
        <main className="mx-auto max-w-[93.75rem] px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-10">{children}</main>
      </div>
      <MobileNav />
    </div>
  )
}
