'use client'

import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { student } from '@/data/student'
import { useSemester } from '@/hooks/useSemester'

export function WelcomeBanner() {
  const { semester } = useSemester()
  const firstName = student.name.split(' ')[0]

  return (
    <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-brand via-brand to-brand-deep p-6 text-brand-foreground shadow-xl shadow-brand/25 sm:p-8">
      <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-28 right-24 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
      <div className="animate-fade-up relative max-w-2xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" /> Semestre {semester}
        </div>
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">
          Olá, {firstName}! <span className="inline-block">👋</span>
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-brand-muted-foreground sm:text-base">
          Acompanhe sua jornada acadêmica em um só lugar. Você está indo muito bem neste semestre.
        </p>
        <Link
          href="/grades"
          className="focus-ring cursor-pointer mt-6 inline-flex items-center gap-2 rounded-xl bg-card px-4 py-2.5 text-sm font-bold text-primary transition duration-200 hover:-translate-y-0.5 hover:bg-accent"
        >
          Ver meu desempenho <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
