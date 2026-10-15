import { Grade, GradeStatus } from '@/types/academic'

export const grades: Grade[] = [
  { name: 'Desenvolvimento Web', code: 'WEB301', grade: 9.4, status: 'approved', professor: 'Marina Costa' },
  { name: 'Banco de Dados', code: 'BD204', grade: 8.7, status: 'approved', professor: 'Rafael Mendes' },
  { name: 'Engenharia de Software', code: 'ENG210', grade: 8.2, status: 'approved', professor: 'Carla Nunes' },
  { name: 'UX e Design de Interfaces', code: 'UX110', grade: 9.1, status: 'approved', professor: 'Lucas Alves' },
  { name: 'Estruturas de Dados', code: 'ED202', grade: 7.6, status: 'in-progress', professor: 'João Prado' },
  { name: 'Arquitetura de Computadores', code: 'AC101', grade: 8.0, status: 'in-progress', professor: 'Ana Lima' },
]

/** Wording shown to the student for each academic status. */
export const gradeStatusLabels: Record<GradeStatus, string> = {
  approved: 'Aprovado',
  'in-progress': 'Em andamento',
}

export const formatGrade = (grade: number) => grade.toFixed(1).replace('.', ',')
