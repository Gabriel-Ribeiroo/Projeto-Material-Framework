import type { Metadata } from 'next'
import { EnrollmentPanel } from './components/EnrollmentPanel'

export const metadata: Metadata = {
  title: 'Matrícula',
  description: 'Selecione as disciplinas do próximo período e revise sua grade antes de confirmar.',
}

export default function EnrollmentPage() {
  return <EnrollmentPanel />
}
