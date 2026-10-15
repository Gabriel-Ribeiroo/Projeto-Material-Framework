import { AlertCircle, BarChart3, BookOpen, ClipboardCheck, Clock3, TrendingUp, UserRound } from 'lucide-react'
import { Route } from 'next'
import { ComponentType } from 'react'

export type StatTone = 'primary' | 'success' | 'neutral' | 'warning'

export type Stat = {
  id: string
  label: string
  value: string
  detail: string
  icon: ComponentType<{ className?: string }>
  tone: StatTone
}

export const stats: Stat[] = [
  { id: 'average', label: 'Média geral', value: '8,7', detail: '+0,4 vs. semestre anterior', icon: TrendingUp, tone: 'primary' },
  { id: 'subjects', label: 'Disciplinas', value: '6', detail: '24 créditos matriculados', icon: BookOpen, tone: 'success' },
  { id: 'attendance', label: 'Frequência', value: '94%', detail: 'Excelente aproveitamento', icon: Clock3, tone: 'neutral' },
  { id: 'pending', label: 'Pendências', value: '2', detail: '1 atividade • 1 matrícula', icon: AlertCircle, tone: 'warning' },
]

export type QuickActionItem = {
  id: string
  title: string
  description: string
  icon: ComponentType<{ className?: string }>
  href: Route
  badge?: string
}

export const quickActions: QuickActionItem[] = [
  { id: 'grades', title: 'Consultar notas', description: 'Veja seu desempenho', icon: BarChart3, href: '/grades' },
  { id: 'subjects', title: 'Ver disciplinas', description: 'Horários e professores', icon: BookOpen, href: '/subjects' },
  { id: 'enrollment', title: 'Fazer matrícula', description: 'Escolha suas disciplinas', icon: ClipboardCheck, href: '/enrollment', badge: 'Aberta' },
  { id: 'profile', title: 'Atualizar perfil', description: 'Mantenha seus dados em dia', icon: UserRound, href: '/profile' },
]

export type AcademicEvent = {
  id: string
  date: string
  title: string
  meta: string
  urgent?: boolean
}

export const upcomingEvents: AcademicEvent[] = [
  { id: 'web-project', date: '02 SET', title: 'Entrega do projeto Web', meta: 'Desenvolvimento Web' },
  { id: 'enrollment-deadline', date: '05 SET', title: 'Fim do período de matrícula', meta: 'Secretaria acadêmica', urgent: true },
  { id: 'midterm', date: '12 SET', title: 'Avaliação parcial', meta: 'Estruturas de Dados' },
]
