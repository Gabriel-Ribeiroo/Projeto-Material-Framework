import { BarChart3, BookOpen, ClipboardCheck, Home, UserRound } from 'lucide-react'
import { NavItem } from '@/types/navigation'

export const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', title: 'Dashboard', icon: Home },
  { href: '/grades', label: 'Notas', title: 'Minhas notas', icon: BarChart3 },
  { href: '/subjects', label: 'Disciplinas', title: 'Minhas disciplinas', icon: BookOpen },
  { href: '/enrollment', label: 'Matrícula', title: 'Matrícula', icon: ClipboardCheck, badge: 'Aberta' },
  { href: '/profile', label: 'Meu perfil', title: 'Meu perfil', icon: UserRound },
]

export const semesters = ['2026.2', '2026.1', '2025.2']
