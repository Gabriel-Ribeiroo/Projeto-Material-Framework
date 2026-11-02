import Image from 'next/image'
import { BookOpen, CalendarDays, GraduationCap, TrendingUp } from 'lucide-react'

const highlights = [
  { icon: TrendingUp, text: 'Notas e frequência atualizadas a cada avaliação.' },
  { icon: BookOpen, text: 'Disciplinas, materiais e horários em um só lugar.' },
  { icon: CalendarDays, text: 'Matrícula e prazos do semestre sem complicação.' },
]

/** Brand panel beside the form on large screens. Purely presentational. */
export function LoginAside() {
  return (
    <aside className="relative hidden overflow-hidden bg-linear-to-br from-brand via-brand to-brand-deep p-10 text-brand-foreground lg:flex lg:flex-col xl:p-14">
      <div aria-hidden className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-white/10 blur-2xl" />
      <div aria-hidden className="absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

      <div className="relative flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 backdrop-blur">
          <GraduationCap className="h-6 w-6" />
        </span>
        <span>
          <span className="block font-display text-lg font-semibold">Trilha</span>
          <span className="block text-xs text-brand-muted-foreground">Portal acadêmico</span>
        </span>
      </div>

      <Image
        src="/illustrations/login-learning.svg"
        alt=""
        width={800}
        height={712}
        className="animate-fade-up relative mx-auto my-auto w-full max-w-sm py-8 xl:max-w-md"
      />

      <div className="animate-fade-up relative max-w-md">
        <h2 className="font-display text-3xl font-semibold leading-tight xl:text-4xl">
          Sua vida acadêmica, organizada.
        </h2>
        <ul className="mt-8 space-y-4">
          {highlights.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-start gap-3 text-sm leading-6 text-brand-muted-foreground">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/10">
                <Icon className="h-4 w-4 text-brand-foreground" />
              </span>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
