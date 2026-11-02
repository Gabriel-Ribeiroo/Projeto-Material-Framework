'use client'

import { Pencil } from 'lucide-react'
import { Button } from '@/components/Button'
import { useCurrentStudent } from '@/hooks/useCurrentStudent'
import { useToast } from '@/hooks/useToast'

type ProfileCardProps = {
  name: string
  course: string
}

export function ProfileCard({ name, course }: ProfileCardProps) {
  const { showToast } = useToast()
  const student = useCurrentStudent()

  return (
    <section className="card h-fit p-6 text-center">
      <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-linear-to-br from-brand to-brand-deep font-display text-2xl font-semibold text-brand-foreground shadow-xl shadow-brand/20">
        {student.initials}
      </div>
      <h3 className="mt-4 font-extrabold">{name}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{student.registration}</p>
      <div className="mt-5 rounded-xl bg-secondary p-3 text-left text-xs">
        <p className="font-bold">Curso</p>
        <p className="mt-1 text-muted-foreground">{course}</p>
      </div>
      <Button
        variant="outlined"
        icon={Pencil}
        fullWidth
        onClick={() => showToast('A troca de foto estará disponível em breve.', 'info')}
        className="mt-4"
      >
        Alterar foto
      </Button>
    </section>
  )
}
