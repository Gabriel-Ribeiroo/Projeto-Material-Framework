import { ArrowLeft, Compass } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-6 py-16">
      <div className="animate-fade-up w-full max-w-md text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-accent text-accent-foreground">
          <Compass className="h-8 w-8" />
        </span>
        <p className="mt-6 text-xs font-bold uppercase tracking-[.16em] text-primary">Erro 404</p>
        <h1 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">Página não encontrada</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          O endereço acessado não existe ou foi movido. Volte para o início do portal e continue de lá.
        </p>
        <Link
          href="/"
          className="focus-ring cursor-pointer mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-extrabold text-primary-foreground shadow-lg shadow-primary/25 transition duration-200 hover:-translate-y-0.5 hover:bg-primary-hover"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar ao dashboard
        </Link>
      </div>
    </main>
  )
}
