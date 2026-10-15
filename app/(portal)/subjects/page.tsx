import type { Metadata } from 'next'
import { SubjectExplorer } from './components/SubjectExplorer'

export const metadata: Metadata = {
  title: 'Minhas disciplinas',
  description: 'Horários, professores, créditos e andamento das disciplinas do semestre.',
}

export default function SubjectsPage() {
  return <SubjectExplorer />
}
