import type { Metadata } from 'next'
import { GradesPanel } from './components/GradesPanel'

export const metadata: Metadata = {
  title: 'Minhas notas',
  description: 'Boletim com notas, situação acadêmica e professores de cada disciplina.',
}

export default function GradesPage() {
  return <GradesPanel />
}
