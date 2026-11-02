import { SemesterProvider } from '@/components/SemesterProvider'
import { ToastProvider } from '@/components/ToastProvider'
import { PortalShell } from './components/PortalShell'
import { UnsavedChangesProvider } from './components/UnsavedChangesProvider'

export default function PortalLayout({ children }: LayoutProps<'/'>) {

  return (
    <SemesterProvider>
      <ToastProvider>
        <UnsavedChangesProvider>
          <PortalShell>{children}</PortalShell>
        </UnsavedChangesProvider>
      </ToastProvider>
    </SemesterProvider>
  )
}
