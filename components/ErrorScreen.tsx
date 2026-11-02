'use client'

import { House, RotateCcw } from 'lucide-react'
import { Button } from '@/components/Button'
import { ButtonLink } from '@/components/ButtonLink'
import { StatusScreen } from '@/components/StatusScreen'
import { useReportError } from '@/hooks/useReportError'

type ErrorScreenProps = {
  error: Error & { digest?: string }
  /** Re-fetches and re-renders the part of the page that failed. */
  retry: () => void
}

/** Content of the error boundaries: what happened, and two ways out. */
export function ErrorScreen({ error, retry }: ErrorScreenProps) {
  useReportError(error)

  return (
    <StatusScreen
      illustration="error"
      eyebrow="Erro inesperado"
      title="Algo deu errado por aqui"
      description={
        <>
          <p>Não conseguimos carregar esta página. Tente novamente; se continuar, volte ao início do portal.</p>
          {error.digest && (
            <p className="mt-3 text-xs">
              Código do erro: <code className="font-mono text-foreground">{error.digest}</code>
            </p>
          )}
        </>
      }
    >
      <ButtonLink href="/" variant="outlined" icon={House}>
        Voltar ao início
      </ButtonLink>
      <Button icon={RotateCcw} onClick={retry}>
        Tentar novamente
      </Button>
    </StatusScreen>
  )
}
