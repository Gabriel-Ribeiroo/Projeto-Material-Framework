import { CheckCircle2, ClipboardCheck } from 'lucide-react'
import { ComponentType } from 'react'

export type Notification = {
  id: string
  title: string
  description: string
  icon: ComponentType<{ className?: string }>
  tone: 'warning' | 'success'
}

export const notifications: Notification[] = [
  { id: 'enrollment', title: 'Matrícula aberta', description: 'Período 2026.2 disponível até 05/09.', icon: ClipboardCheck, tone: 'warning' },
  { id: 'grade', title: 'Nota atualizada', description: 'Estruturas de Dados recebeu uma nova nota.', icon: CheckCircle2, tone: 'success' },
]
