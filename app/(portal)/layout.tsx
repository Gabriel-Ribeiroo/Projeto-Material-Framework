import { SemesterProvider } from '@/components/SemesterProvider'
import { ToastProvider } from '@/components/ToastProvider'
import { PortalShell } from './components/PortalShell'

export default function PortalLayout({ children }: LayoutProps<'/'>) {
  return (
    <SemesterProvider>
      <ToastProvider>
        <PortalShell>{children}</PortalShell>
      </ToastProvider>
    </SemesterProvider>
  )
}
