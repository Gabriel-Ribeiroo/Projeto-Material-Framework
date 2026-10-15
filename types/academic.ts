export type GradeStatus = 'approved' | 'in-progress'

export type Grade = {
  name: string
  code: string
  grade: number
  status: GradeStatus
  professor: string
}

export type Subject = {
  name: string
  code: string
  professor: string
  schedule: string
  room: string
  credits: number
  progress: number
}

export type AvailableSubject = {
  name: string
  code: string
  professor: string
  schedule: string
  credits: number
  vacancies: number
}
