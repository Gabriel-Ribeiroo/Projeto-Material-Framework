'use client'

import { ErrorScreen } from '@/components/ErrorScreen'

/** Catches errors in pages outside the portal (e.g. login). */
export default function RootError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-6 py-16">
      <ErrorScreen error={error} retry={retry} />
    </main>
  )
}
