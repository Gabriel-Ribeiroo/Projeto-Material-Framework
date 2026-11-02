'use client'

import { ErrorScreen } from '@/components/ErrorScreen'

/** Catches errors in portal pages; sidebar and header stay, so the student can move on. */
export default function PortalError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <section className="grid place-items-center py-10 sm:py-16">
      <ErrorScreen error={error} retry={retry} />
    </section>
  )
}
