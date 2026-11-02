import { ArrowLeft } from 'lucide-react'
import { ButtonLink } from '@/components/ButtonLink'
import { StatusScreen } from '@/components/StatusScreen'

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-6 py-16">
      <StatusScreen
        illustration="not-found"
        eyebrow="Erro 404"
        title="Página não encontrada"
        description="O endereço acessado não existe ou foi movido. Volte para o início do portal e continue de lá."
      >
        <ButtonLink href="/" icon={ArrowLeft}>
          Voltar ao dashboard
        </ButtonLink>
      </StatusScreen>
    </main>
  )
}
