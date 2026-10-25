'use client'

import { ReactNode } from 'react'
import { Header } from '@/components/Header'
import { MobileNav } from '@/components/MobileNav'
import { Sidebar } from '@/components/Sidebar'
import { SkipLink } from '@/components/SkipLink'
import { usePortalShell } from '../hooks/usePortalShell'

const MAIN_ID = 'conteudo'

/** Chrome shared by every page: sidebar, header and mobile navigation. */
export function PortalShell({ children }: { children: ReactNode }) {
  const { title, sidebarOpen, openSidebar, closeSidebar } = usePortalShell()

  return (
    <div className="min-h-screen bg-background">
      <SkipLink targetId={MAIN_ID} />
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />
      <div className="lg:pl-72">
        <Header title={title} onMenu={openSidebar} />
        {/* Focusable from script only, so the skip link can move focus here. */}
        <main
          id={MAIN_ID}
          tabIndex={-1}
          className="mx-auto max-w-[93.75rem] scroll-mt-24 px-4 pb-28 pt-6 outline-none sm:px-6 lg:px-8 lg:pb-10"
        >
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
