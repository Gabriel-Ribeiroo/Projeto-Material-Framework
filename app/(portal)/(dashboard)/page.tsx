import type { Metadata } from 'next'
import { DashboardView } from './components/DashboardView'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Resumo do semestre: médias, frequência, próximos prazos e atalhos.',
}

export default function DashboardPage() {
  return <DashboardView />
}
