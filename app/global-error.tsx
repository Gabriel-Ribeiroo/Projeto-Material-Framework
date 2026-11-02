'use client'

import { ErrorScreen } from '@/components/ErrorScreen'
import '@/styles/globals.css'

/**
 * Last resort, for errors in the root layout itself. It replaces the whole
 * document, so the theme provider is gone: colors follow the system setting.
 */
export default function GlobalError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <title>Erro · Trilha</title>
        <main className="grid min-h-screen place-items-center bg-background px-6 py-16 text-foreground">
          <ErrorScreen error={error} retry={retry} />
        </main>
      </body>
    </html>
  )
}
